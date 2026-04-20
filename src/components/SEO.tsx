import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://bedwardsconstruction.com';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  /** Extra JSON-LD schema objects */
  schemas?: object[];
}

export default function SEO({
  title,
  description,
  path,
  image = '/images/gallery/gallery-26.jpg',
  type = 'website',
  publishedDate,
  schemas = [],
}: SEOProps) {
  const fullUrl = `${BASE_URL}${path}`;
  const fullImage = `${BASE_URL}${image}`;
  const fullTitle = path === '/'
    ? 'B. Edwards Construction | Metal Buildings, Concrete & More | Jonesville, LA'
    : `${title} | B. Edwards Construction`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="B. Edwards Construction" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article-specific */}
      {type === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}

      {/* Geo targeting for Louisiana */}
      <meta name="geo.region" content="US-LA" />
      <meta name="geo.placename" content="Jonesville, Louisiana" />
      <meta name="geo.position" content="31.5086091;-91.7334082" />
      <meta name="ICBM" content="31.5086091, -91.7334082" />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

/* ─── Reusable Schema Builders ────────────────────────────── */

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${BASE_URL}/#business`,
  name: 'B. Edwards Construction',
  url: BASE_URL,
  telephone: '+13184817588',
  email: 'info@bedwardsconstruction.com',
  description:
    "Louisiana's premier builder specializing in metal buildings, concrete foundations, roofs, shops, camps, barns, and patios. Serving Jonesville, LA and surrounding areas.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '350 Red Oak Tree Dr.',
    addressLocality: 'Jonesville',
    addressRegion: 'LA',
    postalCode: '71343',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.5086091,
    longitude: -91.7334082,
  },
  areaServed: [
    { '@type': 'State', name: 'Louisiana' },
    { '@type': 'City', name: 'Jonesville' },
    { '@type': 'City', name: 'Jena' },
    { '@type': 'City', name: 'Vidalia' },
    { '@type': 'City', name: 'Natchez' },
    { '@type': 'City', name: 'Alexandria' },
    { '@type': 'City', name: 'Ferriday' },
    { '@type': 'City', name: 'Harrisonburg' },
    { '@type': 'City', name: 'Wisner' },
  ],
  knowsAbout: [
    'Metal buildings',
    'Concrete foundations',
    'Roofing',
    'Shop construction',
    'Camp construction',
    'Barn construction',
    'Patio construction',
    'Pre-engineered metal buildings',
    'General contracting',
  ],
  sameAs: [],
  image: `${BASE_URL}/images/gallery/gallery-26.jpg`,
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '17:00',
  },
};

export function serviceSchema(service: { name: string; slug: string; description: string; img: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/services#${service.slug}`,
    name: service.name,
    description: service.description,
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: { '@type': 'State', name: 'Louisiana' },
    image: `${BASE_URL}${service.img}`,
    url: `${BASE_URL}/services#${service.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  img: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.img}`,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'B. Edwards Construction',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'B. Edwards Construction',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/logo.png`,
      },
    },
  };
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of buildings does B. Edwards Construction build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialize in metal buildings, concrete foundations, roofs, shops, camps, barns, and patios. We handle everything from site preparation to final construction across central Louisiana.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas does B. Edwards Construction serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve Jonesville, LA and surrounding areas including Jena, Vidalia, Natchez, Alexandria, Ferriday, Harrisonburg, and Wisner. We work throughout central Louisiana.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide free estimates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide free, no-obligation estimates for all construction projects. Contact us at (318) 481-7588 or fill out the form on our website to get started.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are metal buildings a good choice in Louisiana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metal buildings are ideal for Louisiana because they resist hurricanes with wind loads of 130+ mph, they are impervious to humidity and termite damage unlike wood, and they require minimal maintenance. Pre-engineered metal buildings also go up faster and cost less per square foot than traditional construction.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a metal building?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical metal building project takes 4 to 8 weeks from foundation to completion, depending on the size, complexity, and weather conditions. This is significantly faster than comparable wood-frame construction.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes construction difficult in Louisiana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Louisiana presents unique construction challenges including clay-heavy expansive soil, a high water table, extreme humidity, hurricane-force winds, and building codes that vary by parish. Experienced local builders understand how to engineer foundations, drainage, and structures to withstand these conditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle the concrete foundation as well as the building?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we are a full-service builder. We handle site preparation, concrete foundation pouring with proper rebar reinforcement and moisture barriers, and the complete building erection. Having one team manage the entire project ensures quality and accountability from start to finish.',
      },
    },
  ],
};
