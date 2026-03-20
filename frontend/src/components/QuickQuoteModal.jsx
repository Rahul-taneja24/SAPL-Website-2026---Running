import { useState } from "react";
import { X, Send, CheckCircle, Loader2, ChevronRight, Clock, Shield, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const industries = ["Steel", "Cement", "Aluminum", "Petrochemical", "Glass", "Power", "Foundry", "Other"];
const productCategories = [
  "Shaped Refractories (Bricks)",
  "Unshaped / Castables",
  "Flow Control Products",
  "Insulation (CF / IFB)",
  "Acid Proof Materials",
  "Other / Not Sure",
];

const QuickQuoteModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    productCategory: "",
    quantity: "",
    specs: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          industry: formData.industry,
          products: [formData.productCategory].filter(Boolean),
          quantity: formData.quantity,
          application: formData.specs,
          notes: formData.message,
          source: "quick-quote-modal",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        toast.success("Quote request submitted! We'll respond within 4 hours.");
      } else {
        throw new Error(data.detail || "Failed to submit");
      }
    } catch (error) {
      console.error("Quote submission error:", error);
      toast.error("Something went wrong. Please try again or call +91 98102 05154.");
    } finally {
      setLoading(false);
    }
  };

  const isComplete = formData.name && formData.email && formData.phone && formData.industry;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      data-testid="quote-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl" style={{ animation: "fadeUp 0.2s ease-out" }}>

        {/* ── Header ── */}
        <div
          className="sticky top-0 z-10 px-6 py-5 rounded-t-2xl flex items-start justify-between"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}
        >
          <div>
            <h2 id="modal-title" className="font-oswald text-2xl font-bold text-white">Quick Quote</h2>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1.5 text-blue-200 text-xs font-medium">
                <Clock size={11} aria-hidden="true" />
                Response within 4 hours
              </span>
              <span className="text-blue-300 text-xs">·</span>
              <span className="flex items-center gap-1.5 text-blue-200 text-xs font-medium">
                <Shield size={11} aria-hidden="true" />
                No spam, ever
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/15 text-white transition-colors flex-shrink-0 mt-0.5 focus:outline-none focus:ring-2 focus:ring-white/50"
            data-testid="close-quote-modal"
            aria-label="Close quote modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* ── Body ── */}
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="text-green-500" size={40} aria-hidden="true" />
            </div>
            <h3 className="font-oswald text-2xl font-bold mb-2 text-[#1E3A5F]">Quote Requested!</h3>
            <p className="text-gray-500 text-sm mb-1">
              We'll send a detailed quote to <strong className="text-[#1E3A5F]">{formData.email}</strong>
            </p>
            <p className="text-gray-400 text-xs mb-6">
              Typically within 4 hours — or call us now at{" "}
              <a href="tel:+919810205154" className="text-[#F97316] font-semibold hover:underline">+91 98102 05154</a>
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919810205154"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-colors"
                aria-label="Follow up on WhatsApp"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Follow Up on WhatsApp
              </a>
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4" aria-label="Quick quote form" noValidate>
            {/* Contact details */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Details</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="qq-name" className="form-label">Full Name *</label>
                  <input
                    id="qq-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="form-input"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="qq-phone" className="form-label">Phone *</label>
                  <input
                    id="qq-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98102 05154"
                    className="form-input"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="qq-email" className="form-label">Email *</label>
                  <input
                    id="qq-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="form-input"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="qq-company" className="form-label">Company</label>
                  <input
                    id="qq-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="ABC Industries Ltd."
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Requirements</p>
              <div className="space-y-3">
                <div>
                  <label htmlFor="qq-industry" className="form-label">Industry *</label>
                  <select
                    id="qq-industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="form-input"
                    aria-required="true"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="qq-product" className="form-label">Product Category</label>
                  <select
                    id="qq-product"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select product category</option>
                    {productCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="qq-qty" className="form-label">Quantity</label>
                    <input
                      id="qq-qty"
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 10 MT, 500 pcs"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="qq-specs" className="form-label">Specific Grade / Specs</label>
                    <input
                      id="qq-specs"
                      type="text"
                      name="specs"
                      value={formData.specs}
                      onChange={handleChange}
                      placeholder="e.g. AL70, LCC-80"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="qq-message" className="form-label">Additional Notes</label>
                  <textarea
                    id="qq-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Application details, delivery location, timeline..."
                    className="form-input resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isComplete}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
              data-testid="submit-quote"
              aria-describedby={!isComplete ? "form-hint" : undefined}
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Submitting...</>
              ) : (
                <><Send size={18} aria-hidden="true" /> Submit Quote Request</>
              )}
            </button>

            {!isComplete && (
              <p id="form-hint" className="text-center text-xs text-gray-400">
                Fill in name, phone, email & industry to submit
              </p>
            )}

            <p className="text-center text-xs text-gray-400">
              Prefer to call?{" "}
              <a href="tel:+919810205154" className="text-[#F97316] font-semibold hover:underline">+91 98102 05154</a>
              {" "}· Mon–Sat, 9 AM–6 PM IST
            </p>
          </form>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default QuickQuoteModal;
