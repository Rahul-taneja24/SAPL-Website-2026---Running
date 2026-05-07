// SpecPropertyTable.jsx — server-renderable HTML table for product
// properties. Keeps the markup parseable for AI engines (proper <table>,
// <thead>, <tbody>, <th>, <td>) while looking like the rest of the site.
//
// Two render shapes:
//   1. Single-product key/value pairs:
//        <SpecPropertyTable rows={[{label, value}, ...]} />
//      Renders a 2-column table: Property | Value.
//
//   2. Multi-product comparison grid:
//        <SpecPropertyTable
//           variant="compare"
//           rows={[{ name, properties: [{label, value}, ...] }, ...]}
//        />
//      Renders one row per product with a column per unique property label.
//
// Optional props:
//   - title       : optional caption above the table
//   - footnote    : small italic footnote under the table
//   - className   : passthrough wrapper class
//
// No client interactivity — safe to import from server components.

const HEADER_CLS =
  'px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide whitespace-nowrap';
const CELL_CLS = 'px-4 py-3 text-gray-700 text-[12px]';
const ALT_ROW = 'bg-white';
const ALT_ROW_2 = 'bg-gray-50';

function SimpleTable({ rows, title, footnote, className }) {
  if (!rows?.length) return null;
  return (
    <div className={className}>
      {title && (
        <h3 className="font-oswald text-base font-bold text-[#1E3A5F] mb-3">
          {title}
        </h3>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm" data-testid="spec-property-table">
          <caption className="sr-only">
            {title || 'Technical specifications'}
          </caption>
          <thead>
            <tr
              style={{ background: 'linear-gradient(90deg,#1E3A5F,#3B82F6)' }}
              className="text-white"
            >
              <th scope="col" className={HEADER_CLS}>
                Property
              </th>
              <th scope="col" className={HEADER_CLS}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.label}-${i}`}
                className={`${i % 2 === 0 ? ALT_ROW : ALT_ROW_2} hover:bg-blue-50 transition-colors`}
              >
                <th
                  scope="row"
                  className="px-4 py-3 font-semibold text-[#1E3A5F] text-[12px] whitespace-nowrap text-left"
                >
                  {row.label}
                </th>
                <td className={CELL_CLS}>{row.value || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p className="mt-3 text-xs text-gray-400 italic">{footnote}</p>
      )}
    </div>
  );
}

function CompareTable({ rows, title, footnote, className }) {
  if (!rows?.length) return null;

  // Collect every unique property label across all products, preserving
  // first-seen order so the table feels predictable.
  const seen = new Set();
  const columns = [];
  rows.forEach((entry) => {
    (entry.properties || []).forEach((p) => {
      if (!seen.has(p.label)) {
        seen.add(p.label);
        columns.push(p.label);
      }
    });
  });

  if (!columns.length) return null;

  return (
    <div className={className}>
      {title && (
        <h3 className="font-oswald text-lg font-bold text-[#1E3A5F] mb-4">
          {title}
        </h3>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table
          className="w-full min-w-[640px] text-sm"
          data-testid="spec-compare-table"
        >
          <caption className="sr-only">{title || 'Product comparison'}</caption>
          <thead>
            <tr
              style={{ background: 'linear-gradient(90deg,#1E3A5F,#3B82F6)' }}
              className="text-white"
            >
              <th scope="col" className={HEADER_CLS}>
                Product
              </th>
              {columns.map((col) => (
                <th key={col} scope="col" className={HEADER_CLS}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((entry, i) => {
              const lookup = new Map(
                (entry.properties || []).map((p) => [p.label, p.value])
              );
              return (
                <tr
                  key={`${entry.name}-${i}`}
                  className={`${i % 2 === 0 ? ALT_ROW : ALT_ROW_2} hover:bg-blue-50 transition-colors`}
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-bold text-[#F97316] text-[12px] whitespace-nowrap text-left"
                  >
                    {entry.name}
                  </th>
                  {columns.map((col) => (
                    <td key={col} className={CELL_CLS}>
                      {lookup.get(col) || '—'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p className="mt-3 text-xs text-gray-400 italic">{footnote}</p>
      )}
    </div>
  );
}

export default function SpecPropertyTable({
  rows,
  variant = 'simple',
  title,
  footnote,
  className = '',
}) {
  if (variant === 'compare') {
    return (
      <CompareTable
        rows={rows}
        title={title}
        footnote={footnote}
        className={className}
      />
    );
  }
  return (
    <SimpleTable
      rows={rows}
      title={title}
      footnote={footnote}
      className={className}
    />
  );
}
