'use client';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div>
      

      {/* Hero Section */}
      <section className="py-16 px-4 gradient-dark industrial-texture">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-4">LEGAL</span>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">PRIVACY POLICY</h1>
          <p className="text-gray-400">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <div className="glass-card p-8 md:p-12 rounded-2xl space-y-8">
            
            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Shanker Agencies Private Limited ("SAPL", "we", "us", or "our"), headquartered at 553, Main G.T Road, Shahdara, Delhi 110032, India, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">2. Information We Collect</h2>
              <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you submit inquiries or request quotes, we may collect:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name and contact details (email, phone number)</li>
                <li>Company name and designation</li>
                <li>Country and region</li>
                <li>Industry type and project requirements</li>
                <li>Technical documents you choose to share (BOQ, drawings)</li>
              </ul>
              
              <h3 className="font-semibold text-lg mb-2 mt-6">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
              </ul>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Respond to your inquiries and provide quotations</li>
                <li>Process and fulfill orders</li>
                <li>Send technical documentation and product information</li>
                <li>Improve our website and customer service</li>
                <li>Send periodic newsletters (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li><strong>Partner manufacturers</strong> (CUMI, Calderys, TRL Krosaki, etc.) to fulfill orders</li>
                <li><strong>Logistics providers</strong> for shipping and delivery</li>
                <li><strong>Legal authorities</strong> when required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unstrategic access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">6. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses cookies to enhance your browsing experience. You can set your browser to refuse cookies, but this may limit some features of our website.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">7. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                As we serve clients globally (GCC, ASEAN, UK, Europe), your information may be transferred to and processed in countries outside your jurisdiction. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">8. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related inquiries, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-semibold">Shanker Agencies Private Limited</p>
                <p className="text-muted-foreground">553, Main G.T Road, Shahdara</p>
                <p className="text-muted-foreground">Delhi 110032, India</p>
                <p className="text-muted-foreground">Email: info@shankeragencies.com</p>
                <p className="text-muted-foreground">Phone: +91 9810205154</p>
              </div>
            </div>

          </div>

          <div className="text-center mt-8">
            <Link href="/contact" className="gradient-primary text-white px-8 py-3 rounded-full font-medium hover-lift inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
