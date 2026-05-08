'use client';
import Link from "next/link";
import { useApp } from '@/context/AppContext';

import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Youtube, Globe, Download } from "lucide-react";

const LOGO_URL = "/images/sapl-logo.png";

const internationalRegions = [
  "UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain",
  "UK", "Germany", "France", "Singapore", "Malaysia", "Indonesia", "Vietnam", "Thailand",
];

const certifications = ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"];

const Footer = () => {
  const { region } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1628] text-white" data-testid="footer">

      {/* ── MAIN FOOTER ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Company Info */}
          <div className="text-left">
            <Link
              href="/"
              aria-label="Shanker Agencies Home"
              className="inline-flex items-center gap-3.5 mb-5 group"
            >
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/95 ring-1 ring-white/20 shadow-lg shadow-black/20 p-1.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src={LOGO_URL}
                  alt="Shanker Agencies logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </span>
              <span className="flex flex-col justify-center leading-tight">
                <span className="font-oswald text-[17px] font-bold text-white tracking-wide">
                  SHANKER AGENCIES
                </span>
                <span className="text-[10px] text-[#F97316] font-semibold tracking-[0.18em] uppercase mt-1">
                  Pvt. Ltd. &middot; Since 1980
                </span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's premier refractory engineering partner since 1980. Strategic supply partner of CUMI, Calderys, TRL Krosaki & IFGL — delivering world-class refractory solutions to steel, cement, aluminium, glass, power and petrochemical industries across India and 50+ countries worldwide.
            </p>

            {/* Social icons */}
            <div className="flex gap-3" aria-label="Social media links">
              <a href="https://linkedin.com/company/shankeragencies" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077B5] transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} aria-hidden="true" />
              </a>
              <a href="https://twitter.com/shankeragencies" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1DA1F2] transition-colors" aria-label="Twitter / X">
                <Twitter size={16} aria-hidden="true" />
              </a>
              <a href="https://facebook.com/shankeragencies" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors" aria-label="Facebook">
                <Facebook size={16} aria-hidden="true" />
              </a>
              <a href="https://youtube.com/@shankeragencies" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] transition-colors" aria-label="YouTube">
                <Youtube size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links + Certifications */}
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase tracking-widest text-white mb-5 border-b-2 border-[#F97316] pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2 mb-6">
              {[
                { name: "Shaped Refractories", path: "/products/shaped-refractories" },
                { name: "Unshaped Refractories", path: "/products/unshaped-refractories" },
                { name: "Flow Control", path: "/products/flow-control" },
                { name: "Insulation", path: "/products/insulation" },
                { name: "Acid Proofing", path: "/products/acid-proofing" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Company links */}
            <ul className="space-y-2 mb-6">
              {[
                { name: "Partner Brands", path: "/brands" },
                { name: "Technical Resources", path: "/knowledge" },
                { name: "Engineering References", path: "/engineering-references" },
                { name: "Blog & Insights", path: "/blog" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 hover:text-[#F97316] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <h4 className="font-oswald text-sm font-bold uppercase tracking-widest text-white mb-3">Certifications</h4>
            <div className="flex flex-wrap gap-2 mb-5">
              {certifications.map((cert) => (
                <span key={cert} className="px-3 py-1 bg-green-900/40 border border-green-700/50 rounded-lg text-xs text-green-400 font-medium">
                  {cert}
                </span>
              ))}
            </div>

            {/* Download Company Profile */}
            <Link
              href="/company-profile"

              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors inline-flex"
            >
              <Download size={16} aria-hidden="true" />
              Download Company Profile
            </Link>
            <p className="text-gray-500 text-xs mt-2">PDF brochure. Click to view and download.</p>
          </div>

          {/* Col 3 — Global Presence */}
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase tracking-widest text-white mb-5 border-b-2 border-[#3B82F6] pb-2 inline-block">
              <span className="flex items-center gap-2">
                <Globe size={14} className="text-[#3B82F6]" aria-hidden="true" />
                Global Presence
              </span>
            </h4>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Countries served">
              {internationalRegions.map((country) => (
                <span key={country} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:bg-[#3B82F6]/20 hover:text-white hover:border-[#3B82F6]/30 transition-all cursor-default" role="listitem">
                  {country}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase tracking-widest text-white mb-5 border-b-2 border-green-500 pb-2 inline-block">Corporate Headquarters</h4>

            <address className="not-italic space-y-4 mb-6">
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-[#F97316]" aria-hidden="true" />
                <div>
                  <p>553, Main G.T Road, Shahdara</p>
                  <p>Delhi 110032, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone size={14} className="text-[#3B82F6] flex-shrink-0 mt-1" aria-hidden="true" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  <a href="tel:+919899957888" className="hover:text-[#F97316] transition-colors block">+91 98999 57888</a>
                  <a href="tel:+919810205154" className="hover:text-[#F97316] transition-colors block">+91 98102 05154</a>
                  <a href="tel:+919811909394" className="hover:text-[#F97316] transition-colors block">+91 98119 09394</a>
                  <a href="tel:+918800203083" className="hover:text-[#F97316] transition-colors block">+91 88002 03083</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={14} className="text-green-500 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@shankeragencies.com" className="hover:text-[#F97316] transition-colors">info@shankeragencies.com</a>
              </div>
            </address>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919899957888"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-sm transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quick Inquiry via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} Shanker Agencies Pvt. Ltd. All rights reserved.
          </p>
          <nav className="flex gap-5 text-xs text-gray-500" aria-label="Legal links">
            <Link href="/privacy" className="hover:text-[#F97316] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#F97316] transition-colors">Terms of Service</Link>
            <a href="/sitemap.xml" className="hover:text-[#F97316] transition-colors">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
