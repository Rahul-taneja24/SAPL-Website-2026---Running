'use client';
import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div>
      

      {/* Hero Section */}
      <section className="py-16 px-4 gradient-dark industrial-texture">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-4">LEGAL</span>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">TERMS OF SERVICE</h1>
          <p className="text-gray-400">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <div className="glass-card p-8 md:p-12 rounded-2xl space-y-8">
            
            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the website of Shanker Agencies Private Limited ("SAPL"), located at 553, Main G.T Road, Shahdara, Delhi 110032, India, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">2. Services Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                SAPL supplies refractory materials from leading manufacturers including CUMI, Calderys, TRL Krosaki, Mahakoshal, Divine Cerawool, and Crown Ceramics. Our services include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Supply of shaped and unshaped refractories</li>
                <li>Technical consultation and product selection guidance</li>
                <li>Project-based quotations and bulk orders</li>
                <li>International logistics and export services</li>
                <li>After-sales technical support</li>
              </ul>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">3. Quotations & Orders</h2>
              <h3 className="font-semibold text-lg mb-2">3.1 Quotation Validity</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All quotations provided are valid for 15 days from the date of issue unless otherwise specified. Prices are subject to change based on manufacturer pricing and currency fluctuations.
              </p>
              
              <h3 className="font-semibold text-lg mb-2">3.2 Order Confirmation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Orders are confirmed only upon receipt of written purchase order and advance payment as per agreed terms. Lead times vary based on product availability and manufacturing schedules.
              </p>

              <h3 className="font-semibold text-lg mb-2">3.3 Minimum Order Quantities</h3>
              <p className="text-muted-foreground leading-relaxed">
                Certain products may have minimum order quantities (MOQ) as specified by manufacturers. These will be communicated at the time of quotation.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">4. Payment Terms</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Domestic orders: 50% advance, balance before dispatch</li>
                <li>Export orders: As per LC terms or 100% advance via wire transfer</li>
                <li>Credit terms available for established accounts</li>
                <li>All payments in INR for domestic, USD/EUR for international orders</li>
              </ul>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">5. Shipping & Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Delivery terms (FOB, CIF, DAP, etc.) will be specified in each quotation. Risk transfers to buyer upon delivery to carrier unless otherwise agreed. SAPL is not liable for delays due to force majeure, customs clearance, or carrier issues.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">6. Product Warranty</h2>
              <p className="text-muted-foreground leading-relaxed">
                All products carry manufacturer warranties. Warranty claims must be reported within 7 days of delivery with photographic evidence. Warranty does not cover:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Damage due to improper storage or handling</li>
                <li>Incorrect installation or usage</li>
                <li>Operation beyond specified parameters</li>
                <li>Normal wear and tear</li>
              </ul>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                SAPL's liability is limited to the value of goods supplied. We are not liable for any consequential, incidental, or indirect damages including loss of production, revenue, or profits arising from the use or inability to use our products.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website including text, graphics, logos, and images is the property of SAPL or its licensors and is protected by intellectual property laws. Technical datasheets are provided for informational purposes only.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Delhi, India. For international disputes, arbitration under ICC rules may be applicable.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">10. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                SAPL reserves the right to modify these terms at any time. Continued use of the website constitutes acceptance of modified terms.
              </p>
            </div>

            <div>
              <h2 className="font-oswald text-2xl font-bold mb-4 gradient-text">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these terms, contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-semibold">Shanker Agencies Private Limited</p>
                <p className="text-muted-foreground">553, Main G.T Road, Shahdara</p>
                <p className="text-muted-foreground">Delhi 110032, India</p>
                <p className="text-muted-foreground">Email: info@shankeragencies.com</p>
                <p className="text-muted-foreground">Phone: +91 9899957888</p>
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

export default TermsOfService;
