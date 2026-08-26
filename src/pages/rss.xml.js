import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => data.status === 'published');

  return rss({
    title: 'learning/log',
    description: '一份持續累積 AI／自動化學習與專案開發過程的個人紀錄。',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.summary,
        link: `/blog/${post.id}/`,
      })),
    customData: `<language>zh-tw</language>`,
  });
}
