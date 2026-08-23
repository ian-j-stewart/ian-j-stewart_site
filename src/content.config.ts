import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const personSchema = z.object({
  orcid: z.string().optional(),
  googleScholar: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  cns: z.string().url().optional(),
  fusionlabs: z.string().url().optional(),
  nonproarchive: z.string().url().optional(),
});

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const settings = defineCollection({
  loader: glob({ pattern: 'site.yml', base: './src/content/settings' }),
  schema: z.object({
    siteTitle: z.string().default('Ian J. Stewart'),
    siteDescription: z.string().default('Personal academic website of Dr Ian J. Stewart.'),
    siteUrl: z.string().url().default('https://ian-j-stewart.com'),
    defaultImage: z.string().optional(),
    author: z.string().default('Ian J. Stewart'),
    institution: z.object({
      title: z.string().default('Executive Director, Washington, DC office'),
      name: z.string().default('James Martin Center for Nonproliferation Studies'),
      url: z.string().url().default('https://www.middlebury.edu/institute/academics/centers-initiatives/nonproliferation-studies/people/ian-stewart'),
    }),
    contact: z.object({
      email: z.string().email().optional(),
      linkedin: z.string().url().default('https://www.linkedin.com/in/drianjstewart/'),
    }),
    social: z.array(z.object({ platform: z.string(), url: z.string().url() })).default([]),
    navigation: z.array(linkSchema).default([]),
    person: personSchema.default({}),
    footer: z.object({
      text: z.string().default('This is a personal website. Views expressed here do not necessarily represent those of current or former employers or affiliated institutions.'),
      copyright: z.string().default('Ian J. Stewart'),
    }),
    featured: z.object({
      publication: z.string().optional(),
      project: z.string().optional(),
      essay: z.string().optional(),
    }).default({}),
    analytics: z.object({
      cloudflareToken: z.string().optional(),
    }).default({}),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heading: z.string().optional(),
    eyebrow: z.string().optional(),
    descriptor: z.string().optional(),
    intro: z.string().optional(),
    primaryButton: linkSchema.optional(),
    secondaryButton: linkSchema.optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const researchThemes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/research-themes' }),
  schema: z.object({
    title: z.string(),
    proposition: z.string(),
    summary: z.string(),
    questions: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    relatedPublications: z.array(z.string()).default([]),
    relatedProjects: z.array(z.string()).default([]),
    relatedEssays: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    authors: z.array(z.string()).default([]),
    year: z.coerce.number().int().optional(),
    type: z.enum([
      'Book',
      'Peer-reviewed article',
      'Book chapter',
      'Major report',
      'Policy research',
      'Analysis',
      'Commentary',
      'Working paper',
      'Essay',
    ]).default('Analysis'),
    venue: z.string().optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    publisher: z.string().optional(),
    citation: z.string().optional(),
    summary: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    pdf: z.string().optional(),
    cover: z.string().optional(),
    themes: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    status: z.enum(['Published', 'Forthcoming', 'Under contract', 'In development']).default('Published'),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['Current', 'Developing', 'Completed']).default('Developing'),
    themes: z.array(z.string()).default([]),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    collaborators: z.array(z.string()).default([]),
    funder: z.string().optional(),
    outputs: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    themes: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    externalUrl: z.string().url().optional(),
    canonicalUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seoDescription: z.string().optional(),
  }),
});

export const collections = {
  settings,
  pages,
  researchThemes,
  publications,
  projects,
  essays,
};
