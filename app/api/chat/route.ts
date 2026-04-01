import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT_FALLBACK =
  'You are the AI portfolio assistant for Himanshu Kumar. Be concise, accurate, and use markdown bullets with relevant links.';

async function loadSystemPrompt(): Promise<string> {
  const promptPath = path.join(process.cwd(), 'app/api/chat/system-prompt.md');

  try {
    const prompt = await readFile(promptPath, 'utf8');
    return prompt.trim() || SYSTEM_PROMPT_FALLBACK;
  } catch (error) {
    console.error('Failed to load chat system prompt file:', error);
    return SYSTEM_PROMPT_FALLBACK;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get Hugging Face API key from server-side env
    const hfToken = process.env.HUGGINGFACE_API_KEY;
    
    if (!hfToken) {
      return NextResponse.json({ 
        error: 'AI service not configured. Add HUGGINGFACE_API_KEY to .env.local' 
      }, { status: 500 });
    }

    const configuredModel = process.env.HUGGINGFACE_CHAT_MODEL || 'katanemo/Arch-Router-1.5B:hf-inference';
    const systemPrompt = await loadSystemPrompt();
    const safeHistory: HistoryMessage[] = Array.isArray(history)
      ? history
          .slice(-5)
          .filter(
            (msg: unknown): msg is HistoryMessage =>
              typeof msg === 'object' &&
              msg !== null &&
              (msg as { role?: unknown }).role !== undefined &&
              (msg as { content?: unknown }).content !== undefined &&
              ((msg as { role?: unknown }).role === 'user' || (msg as { role?: unknown }).role === 'assistant') &&
              typeof (msg as { content?: unknown }).content === 'string'
          )
      : [];

    // Call Hugging Face Router Chat Completions API
    const response = await fetch(
      'https://router.huggingface.co/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: configuredModel,
          messages: [
            { role: 'system', content: systemPrompt },
            ...safeHistory,
            { role: 'user', content: message }
          ],
          max_tokens: 320,
          temperature: 0.6,
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', response.status, errorText);
      return NextResponse.json({ 
        error: `AI service error: ${response.status}. Check HUGGINGFACE_CHAT_MODEL or API key.` 
      }, { status: 500 });
    }

    const data = await response.json();
    
    // Extract the generated response
    let assistantReply = '';
    
    // Handle the new chat completions format
    if (data.choices && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
      assistantReply = data.choices[0].message.content;
    } else if (data.error) {
      console.error('Hugging Face Error:', data.error);
      return NextResponse.json({ 
        error: `AI service error: ${data.error}` 
      }, { status: 500 });
    }

    if (!assistantReply) {
      assistantReply = 'I apologize, but I could not generate a response. Please try again.';
    }

    return NextResponse.json({ response: assistantReply });
  } catch (error: unknown) {
    console.error('AI Chat Error:', error);
    
    let errorMessage = 'Failed to get AI response';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}