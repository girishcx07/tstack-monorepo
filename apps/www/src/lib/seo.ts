export interface SeoMetaOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
  schema?: Record<string, any>;
}

export function getSeoMeta({
  title = 'TanStack Start Enterprise Boilerplate | Build Scalable SaaS Fast',
  description = 'The ultimate full-stack framework powered by TanStack Router. Build modern, type-safe, and SEO-optimized AI applications with powerful server functions.',
  url = 'https://tstack.dev',
  image = 'https://tstack.dev/og.png', // Replace with a real og image path later
  type = 'website',
  schema,
}: SeoMetaOptions = {}) {
  const meta: any[] = [
    { title },
    { name: 'description', content: description },

    // OpenGraph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'TStack' },
    { property: 'og:image', content: image },
    { property: 'og:type', content: type },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];

  const links: any[] = [{ rel: 'canonical', href: url }];

  const scripts: any[] = [];

  if (schema) {
    scripts.push({
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    });
  }

  return { meta, links, scripts };
}
