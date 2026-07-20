// Arabic (GCC) mini-site layout — wraps all /ar pages in an RTL container.
// The root <html> stays lang="en" (see app/layout.jsx for why: making it
// per-route would force the whole site out of static rendering). This
// wrapper's dir="rtl" lang="ar" is what actually marks the Arabic content,
// and the hreflang <link> tags carry the language signal to search engines.
export default function ArabicLayout({ children }) {
  return (
    <div dir="rtl" lang="ar" className="font-sans">
      {children}
    </div>
  );
}
