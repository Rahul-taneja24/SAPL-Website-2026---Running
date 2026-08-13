'use client';
import { useState } from 'react';
import { Send, CheckCircle, Package, Globe, Ship, Building2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

// Structured B2B RFQ form. Submits through the same Web3Forms endpoint the
// contact form uses. Deliberately contains NO response-time promises.

const PRODUCT_CATEGORIES = [
  'High Alumina / Fireclay Bricks',
  'Magnesia / MgO-C Bricks',
  'Castables (LCC / ULCC / Conventional)',
  'Ramming Mass / Gunning Mass',
  'Flow Control (Slide Gates, Nozzles, Shrouds, Porous Plugs)',
  'Ceramic Fiber / Insulation',
  'Acid Proof Bricks & Tiles',
  'Mixed / Multiple Categories',
  'Other / Not Sure — Need Guidance',
];

const INCOTERMS = ['CIF', 'FOB', 'CFR', 'Ex-Works', 'Not sure — advise me'];

export default function RfqForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'd0154692-c512-4e1b-9b4c-31f715ca3bfd',
          subject: `RFQ: ${data.product_category} — ${data.company || data.email}`,
          from_name: 'SAPL Website RFQ Form',
          ...data,
        }),
      });
      const json = await res.json();
      setStatus(json.success ? 'sent' : 'error');
      if (json.success) {
        trackEvent('rfq_submit', {
          form_variant: 'rfq_form',
          product_family: data.product_category,
          grade: data.grade_specification,
          application: data.application,
          dimensions: data.dimensions,
          operating_temperature: data.operating_temperature,
          required_standard: data.required_standard,
          has_drawing_reference: data.drawing_reference ? 'yes' : 'no',
          destination_country: data.destination_country,
          destination_port: data.destination_port,
          intent: 'quote',
          page_path: window.location.pathname,
        });
        form.reset();
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-16 px-6 bg-green-50 rounded-2xl border border-green-100">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" aria-hidden="true" />
        <h3 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-2">RFQ Received</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you. Our engineering team will review your requirement and get back to you
          with a quotation and any clarifying questions.
        </p>
      </div>
    );
  }

  const label = 'block text-sm font-semibold text-[#1E3A5F] mb-1.5';
  const input =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/40 focus:border-[#F97316]';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Requirement ── */}
      <fieldset>
        <legend className="flex items-center gap-2 font-oswald text-lg font-bold text-[#1E3A5F] mb-4">
          <Package size={18} className="text-[#F97316]" aria-hidden="true" /> Requirement
        </legend>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="rfq-category" className={label}>Product Category *</label>
            <select id="rfq-category" name="product_category" required className={input} defaultValue="">
              <option value="" disabled>Select a category…</option>
              {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="rfq-grade" className={label}>Grade / Specification <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-grade" name="grade_specification" type="text" placeholder="e.g. HA-70, LCC-80, MgO-C 14%C, 1260°C blanket" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-qty" className={label}>Quantity *</label>
            <input id="rfq-qty" name="quantity" type="text" required placeholder="e.g. 40 tonnes / 2,000 pcs / 1 container" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-application" className={label}>Application / Equipment <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-application" name="application" type="text" placeholder="e.g. steel ladle working lining, cement kiln burning zone" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-dimensions" className={label}>Dimensions / Shape <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-dimensions" name="dimensions" type="text" placeholder="e.g. 230x114x64mm, or a standard/special shape reference" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-temp" className={label}>Operating Temperature <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-temp" name="operating_temperature" type="text" placeholder="e.g. 1400°C hot face" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-standard" className={label}>Required Standard <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-standard" name="required_standard" type="text" placeholder="e.g. IS 4860, ASTM C279, EN, or not sure" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-drawing" className={label}>Drawing / Specification Reference <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-drawing" name="drawing_reference" type="text" placeholder="e.g. drawing no., spec sheet ref, or 'will email separately'" className={input} />
            <p className="text-xs text-gray-400 mt-1">Have a drawing or specification file? Email it to <a href="mailto:info@shankeragencies.com" className="underline">info@shankeragencies.com</a> referencing your RFQ, or attach it when we follow up — this form doesn't accept file attachments yet.</p>
          </div>
        </div>
      </fieldset>

      {/* ── Delivery ── */}
      <fieldset>
        <legend className="flex items-center gap-2 font-oswald text-lg font-bold text-[#1E3A5F] mb-4">
          <Ship size={18} className="text-[#F97316]" aria-hidden="true" /> Delivery
        </legend>
        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label htmlFor="rfq-country" className={label}>Destination Country *</label>
            <input id="rfq-country" name="destination_country" type="text" required placeholder="e.g. UAE, Nigeria, India" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-port" className={label}>Port / City <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-port" name="destination_port" type="text" placeholder="e.g. Jebel Ali, Apapa, Chennai" className={input} />
          </div>
          <div>
            <label htmlFor="rfq-incoterm" className={label}>Preferred Incoterm</label>
            <select id="rfq-incoterm" name="incoterm" className={input} defaultValue="Not sure — advise me">
              {INCOTERMS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="md:col-span-3">
            <label htmlFor="rfq-timeline" className={label}>Target Delivery Month <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="rfq-timeline" name="target_delivery" type="text" placeholder="e.g. September 2026, before our October shutdown" className={input} />
          </div>
        </div>
      </fieldset>

      {/* ── Contact ── */}
      <fieldset>
        <legend className="flex items-center gap-2 font-oswald text-lg font-bold text-[#1E3A5F] mb-4">
          <Building2 size={18} className="text-[#F97316]" aria-hidden="true" /> Your Details
        </legend>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="rfq-company" className={label}>Company Name *</label>
            <input id="rfq-company" name="company" type="text" required className={input} />
          </div>
          <div>
            <label htmlFor="rfq-name" className={label}>Contact Person *</label>
            <input id="rfq-name" name="name" type="text" required className={input} />
          </div>
          <div>
            <label htmlFor="rfq-email" className={label}>Email *</label>
            <input id="rfq-email" name="email" type="email" required className={input} />
          </div>
          <div>
            <label htmlFor="rfq-phone" className={label}>Phone / WhatsApp <span className="font-normal text-gray-400">(with country code)</span></label>
            <input id="rfq-phone" name="phone" type="tel" placeholder="+971 …" className={input} />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="rfq-notes" className={label}>Anything Else <span className="font-normal text-gray-400">(optional)</span></label>
            <textarea id="rfq-notes" name="notes" rows={3} placeholder="Test certificates needed, brand preference, existing supplier grade to match…" className={input} />
          </div>
        </div>
      </fieldset>

      {status === 'error' && (
        <p className="text-red-600 text-sm">
          Something went wrong sending the form. Please try again, or email us directly at{' '}
          <a href="mailto:info@shankeragencies.com" className="underline font-semibold">info@shankeragencies.com</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-60 text-white px-10 py-4 rounded-full font-bold text-sm transition-colors"
      >
        <Send size={15} aria-hidden="true" />
        {status === 'sending' ? 'Sending…' : 'Submit RFQ'}
      </button>
    </form>
  );
}
