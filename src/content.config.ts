import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['學習紀錄', '專案開發紀錄', '技術文章', '鐵人賽系列']),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    status: z.enum(['draft', 'published']).default('published'),
    series: z.string().optional(),
    day: z.number().optional(),
    ithomeUrl: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    techStack: z.array(z.string()).default([]),
    status: z.enum(['進行中', '已完成', '停止維護']).default('進行中'),
    repoUrl: z.string().optional().nullable(),
    demoUrl: z.string().optional().nullable(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
