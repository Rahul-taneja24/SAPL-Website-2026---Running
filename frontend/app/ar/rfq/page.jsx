import Link from 'next/link';
import RfqForm from '@/sections/RfqForm';
import { AR_COMMON } from '@/data/arData';

export const metadata = {
  title: { absolute: 'اطلب عرض سعر للمواد الحرارية | شانكر أجنسيز' },
  description:
    'أرسل طلب عرض سعر منظّم للمواد الحرارية: المنتج والدرجة والكمية وميناء الوصول وشروط الشحن. توريد بالجملة من الهند إلى دول الخليج مع شهادات اختبار المصنع.',
  alternates: {
    canonical: '/ar/rfq',
    languages: {
      en: 'https://www.shankeragencies.com/rfq',
      ar: 'https://www.shankeragencies.com/ar/rfq',
      'x-default': 'https://www.shankeragencies.com/rfq',
    },
  },
  openGraph: {
    title: 'اطلب عرض سعر للمواد الحرارية | شانكر أجنسيز',
    description: 'طلب عرض سعر للمواد الحرارية بالجملة من الهند إلى الخليج.',
    url: 'https://www.shankeragencies.com/ar/rfq',
    siteName: 'Shanker Agencies',
    locale: 'ar_AE',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'شانكر أجنسيز' }],
  },
};

export default function ArabicRfqPage() {
  return (
    <>
      <section className="bg-[#1E3A5F] py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="text-sm text-white/60 mb-6 text-right">
            <Link href="/ar" className="hover:text-[#F97316]">{AR_COMMON.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{AR_COMMON.ctaRfq}</span>
          </nav>
          <h1 className="font-bold text-3xl md:text-4xl text-white mb-4">اطلب عرض سعر للمواد الحرارية</h1>
          <p className="text-white/75 max-w-2xl mx-auto leading-loose">
            أخبرنا بما تحتاجه بالصيغة التي يعمل بها فريق المشتريات لديكم: المنتج والدرجة
            والكمية وميناء الوصول وشروط الشحن. يراجع مهندسونا كل طلب ويردّون بعرض سعر
            وشهادات الاختبار وأي توصيات فنية.
          </p>
          <p className="text-white/50 text-sm mt-4">(نموذج الطلب أدناه باللغة الإنجليزية — يمكنكم أيضاً مراسلتنا بالعربية عبر info@shankeragencies.com أو واتساب +91-9899957888)</p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-4 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto">
          <RfqForm />
        </div>
      </section>
    </>
  );
}
