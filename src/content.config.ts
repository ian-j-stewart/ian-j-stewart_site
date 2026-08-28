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

const navigationSchema = linkSchema.extend({
  children: z.array(linkSchema).optional(),
});

const settings = defineCollection({
  loader: glob({ pattern: 'site.yml', base: './src/content/settings' }),
  schema: z.object({
    siteTitle: z.string().default('Ian J. Stewart'),
    siteDescription: z.string().default('Ian J. Stewart is an international-security scholar and practitioner researching strategic technology governance, AI and compute, export controls, research security, semiconductors, nuclear nonproliferation and deterrence.'),
    siteUrl: z.string().url().default('https://ian-j-stewart.com'),
    defaultImage: z.string().optional(),
    author: z.string().default('Ian J. Stewart'),
    institution: z.object({
      title: z.string().default('Executive Director, Washington, DC office'),
      name: z.string().default('James Martin Center for Nonproliferation Studies'),
      url: z.string().url().default('https://www.middlebury.edu/institute/people/ian-stewart'),
    }),
    contact: z.object({
      academicEmail: z.string().email().optional(),
      advisoryEmail: z.string().email().optional(),
      linkedin: z.string().url().default('https://www.linkedin.com/in/drianjstewart/'),
    }),
    social: z.array(z.object({ platform: z.string(), url: z.string().url() })).default([]),
    navigation: z.array(navigationSchema).default([]),
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

const publicationTypes = [
  'Monograph',
  'Edited volume',
  'Peer-reviewed article',
  'Book chapter',
  'Major report',
  'Policy paper',
  'Professional article',
  'Commentary',
  'Essay',
  'Institutional output',
] as const;

const publicationStatuses = [
  'Published',
  'Forthcoming',
  'Under contract',
  'In development',
] as const;

const ianRoles = [
  'Author',
  'Co-author',
  'Editor',
  'Co-editor',
  'Contributor',
  'Institutional contributor',
] as const;

const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    authors: z.array(z.string()).default([]),
    editors: z.array(z.string()).default([]),
    ianRole: z.enum(ianRoles).optional(),
    year: z.coerce.number().int().optional(),
    date: z.coerce.date().optional(),
    type: z.enum(publicationTypes).default('Commentary'),
    status: z.enum(publicationStatuses).default('Published'),
    venue: z.string().optional(),
    publisher: z.string().optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    citation: z.string().optional(),
    summary: z.string().optional(),
    doi: z.string().optional(),
    externalUrl: z.string().url().optional(),
    publisherUrl: z.string().url().optional(),
    pdfUrl: z.string().url().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    themes: z.array(z.string()).default([]),
    featuredOnThemes: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    displayOnEssays: z.boolean().default(false),
    displayOrder: z.number().default(0),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    proposition: z.string().optional(),
    status: z.enum(['Current', 'Developing', 'Completed', 'Working paper in development', 'Article project', 'Longer-term research programme', 'Book concept', 'Active institutional research']).default('Developing'),
    themes: z.array(z.string()).default([]),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    collaborators: z.array(z.string()).default([]),
    funder: z.string().optional(),
    outputs: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
    questions: z.array(z.string()).default([]),
    relatedPublications: z.array(z.string()).default([]),
    relatedEssays: z.array(z.string()).default([]),
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
    heroImageAlt: z.string().optional(),
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
