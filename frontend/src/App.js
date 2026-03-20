import { useState, useEffect, createContext, useContext } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import QuickQuoteModal from "./components/QuickQuoteModal";
import ScrollToTop from "./components/ScrollToTop";

// ── SAFE STUBS for files missing from your download ───────────────────────────
// ScrollAnimations exists — import the real components:
import { ScrollRevealManager, ScrollProgressBar } from "./components/ScrollAnimations";
// Admin pages are stubbed since the files don't exist yet:
//   import AdminLogin from "./pages/admin/AdminLogin";
//   import AdminDashboard from "./pages/admin/AdminDashboard";
const AdminLogin = ({ onLogin }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
    <div style={{ padding: "2rem 3rem", border: "1px solid #e5e7eb", borderRadius: "1rem", background: "#fff", maxWidth: "420px", textAlign: "center" }}>
      <h2 style={{ color: "#1E3A5F", marginBottom: "0.5rem" }}>Admin Login</h2>
      <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
        Restore <code>src/pages/admin/</code> from your original project to enable this page.
      </p>
    </div>
  </div>
);
const AdminDashboard = ({ onLogout }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "sans-serif" }}>
    <p style={{ color: "#6b7280" }}>Restore <code>src/pages/admin/</code> to enable the dashboard.</p>
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Industries from "./pages/Industries";
import KnowledgeBase from "./pages/KnowledgeBase";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CompanyProfile from "./pages/CompanyProfile";
import IndustrySolutions from "./pages/IndustrySolutions";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

function AppLayout({ children, region, onRegionChange, onQuoteClick, showQuoteModal, setShowQuoteModal }) {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <ScrollProgressBar />
      <Navbar region={region} onRegionChange={onRegionChange} onQuoteClick={onQuoteClick} />
      <main className="flex-1">{children}</main>
      <Footer region={region} />
      <WhatsAppButton />
      {showQuoteModal && <QuickQuoteModal onClose={() => setShowQuoteModal(false)} />}
    </>
  );
}

function ProductsWrapper({ region }) {
  const location = useLocation();
  return <Products key={location.pathname} region={region} />;
}

function App() {
  const [region, setRegion] = useState("international");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [adminToken, setAdminToken] = useState(() => {
    try { return localStorage.getItem("adminToken"); } catch { return null; }
  });

  useEffect(() => {
    try { const s = localStorage.getItem("shanker_region"); if (s) setRegion(s); } catch (e) { }
  }, []);

  const handleRegionChange = (r) => { setRegion(r); try { localStorage.setItem("shanker_region", r); } catch (e) { } };
  const handleAdminLogin = (t) => { setAdminToken(t); try { localStorage.setItem("adminToken", t); } catch (e) { } };
  const handleAdminLogout = () => { setAdminToken(null); try { localStorage.removeItem("adminToken"); } catch (e) { } };

  return (
    <HelmetProvider>
      <AppContext.Provider value={{ region, handleRegionChange }}>
        <div className="App min-h-screen flex flex-col bg-white">
          <BrowserRouter>
            <ScrollToTop />
            <ScrollRevealManager />
            <AppLayout region={region} onRegionChange={handleRegionChange}
              onQuoteClick={() => setShowQuoteModal(true)}
              showQuoteModal={showQuoteModal} setShowQuoteModal={setShowQuoteModal}>
              <Routes>
                <Route path="/" element={<Home region={region} onQuoteClick={() => setShowQuoteModal(true)} />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<ProductsWrapper region={region} />} />
                <Route path="/products/:categorySlug" element={<ProductsWrapper region={region} />} />
                <Route path="/products/:categorySlug/:productId" element={<ProductsWrapper region={region} />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/brands/:brandSlug" element={<Brands />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:industrySlug" element={<Industries />} />
                <Route path="/solutions" element={<IndustrySolutions />} />
                <Route path="/solutions/:industrySlug" element={<IndustrySolutions />} />
                <Route path="/knowledge" element={<KnowledgeBase />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:articleSlug" element={<Blog />} />
                <Route path="/contact" element={<Contact region={region} />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/admin" element={adminToken ? <AdminDashboard token={adminToken} onLogout={handleAdminLogout} /> : <AdminLogin onLogin={handleAdminLogin} />} />
                <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard token={adminToken} onLogout={handleAdminLogout} /> : <AdminLogin onLogin={handleAdminLogin} />} />
              </Routes>
            </AppLayout>
            <Toaster position="top-right" richColors />
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </HelmetProvider>
  );
}

export default App;