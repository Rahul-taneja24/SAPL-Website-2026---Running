// Arabic (GCC) mini-site layout — wraps all /ar pages in an RTL container.
// The root <html> stays lang="en"; each /ar page declares inLanguage/lang via
// metadata + the dir/lang attributes on this wrapper, which is sufficient for
// search engines and screen readers at this scope.
export default function ArabicLayout({ children }) {
  return (
    <div dir="rtl" lang="ar" className="font-sans">
      {children}
    </div>
  );
}
