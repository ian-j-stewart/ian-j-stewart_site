import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET = async (context: { site?: URL }) => {
  if (!context.site) {
    return new Response('Site URL not configured', { status: 500 });
  }

  const essays = await getCollection('essays', ({ data }) => data.draft !== true);
  const sorted = essays
    .filter((e) => !e.data.externalUrl)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Ian J. Stewart | Essays',
    description: 'Occasional essays on strategic technology, international security and the relationship between policy design and practical implementation.',
    site: context.site,
    items: sorted.map((essay) => ({
      title: essay.data.title,
      pubDate: essay.data.date,
      description: essay.data.excerpt ?? essay.data.seoDescription ?? '',
      link: `/essays/${essay.id}/`,
    })),
    customData: '<language>en</language>',
  });
};
