/**
 * The hairline grids on this page are drawn with `gap-px` over a border-coloured
 * container, so every cell must be filled — a partial last row would otherwise
 * leave a block of raw border colour where a card should be.
 *
 * This renders the blank cells needed to complete the final row, per breakpoint.
 */
export default function GridFillers({
  count,
  md = 2,
  lg = 3,
}: {
  count: number;
  /** Columns at the `md` breakpoint. */
  md?: number;
  /** Columns at the `lg` breakpoint. */
  lg?: number;
}) {
  const lgFillers = (lg - (count % lg)) % lg;
  const mdFillers = (md - (count % md)) % md;

  return (
    <>
      {Array.from({ length: lgFillers }).map((_, i) => (
        <div key={`lg-${i}`} className="hidden bg-[var(--bg)] lg:block" aria-hidden />
      ))}
      {Array.from({ length: mdFillers }).map((_, i) => (
        <div key={`md-${i}`} className="hidden bg-[var(--bg)] md:block lg:hidden" aria-hidden />
      ))}
    </>
  );
}
