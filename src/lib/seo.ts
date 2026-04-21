const SITE_URL = "https://bilal.works";
export const SITE_NAME = "Bilal Ali";
const SITE_TITLE = "Software Engineer";
export const SITE_DESCRIPTION =
  "doing clean UI, thoughtful UX, and practical engineering.";
const DEFAULT_OG_IMAGE_PATH = "/og-image.png";
const DEFAULT_OG_IMAGE_WIDTH = 1200;
const DEFAULT_OG_IMAGE_HEIGHT = 630;
const DEFAULT_LOCALE = "en_US";
const TWITTER_HANDLE = "@bil0lali";

type MetaTag = {
  content?: string;
  name?: string;
  property?: string;
  title?: string;
};

type LinkTag = {
  href: string;
  rel: string;
};

type ScriptTag = {
  children: string;
  type: "application/ld+json";
};

type JsonLdValue =
  | boolean
  | number
  | string
  | null
  | undefined
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

interface BuildSeoInput {
  canonicalPath: string;
  description?: string;
  imageAlt?: string;
  imagePath?: string;
  keywords?: string[];
  locale?: string;
  noIndex?: boolean;
  structuredData?: JsonLdValue | JsonLdValue[];
  title?: string;
  twitterCard?: "summary" | "summary_large_image";
  type?: "article" | "profile" | "website";
}

interface ArticleSeoInput extends BuildSeoInput {
  author?: string;
  modifiedTime?: string;
  publishedTime?: string;
  section?: string;
  tags?: string[];
}

function ensureLeadingSlash(pathname: string): string {
  if (pathname.startsWith("/")) {
    return pathname;
  }

  return `/${pathname}`;
}

function removeTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function getCanonicalPath(pathname: string): string {
  return removeTrailingSlash(ensureLeadingSlash(pathname));
}

function getCanonicalUrl(pathname: string): string {
  const canonicalPath = getCanonicalPath(pathname);

  return canonicalPath === "/" ? SITE_URL : `${SITE_URL}${canonicalPath}`;
}

function getSocialImageUrl(imagePath = DEFAULT_OG_IMAGE_PATH): string {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${SITE_URL}${ensureLeadingSlash(imagePath)}`;
}

function createTitle(title?: string): string {
  if (!title || title.trim().length === 0) {
    return SITE_TITLE;
  }

  return `${title} | ${SITE_NAME}`;
}

function createRobotsContent(noIndex = false): string {
  if (noIndex) {
    return "noindex, nofollow";
  }

  return "index, follow";
}

function createKeywordsContent(keywords?: string[]): string | undefined {
  if (!keywords || keywords.length === 0) {
    return undefined;
  }

  const uniqueKeywords = [...new Set(keywords.map((keyword) => keyword.trim()))]
    .filter((keyword) => keyword.length > 0)
    .join(", ");

  return uniqueKeywords.length > 0 ? uniqueKeywords : undefined;
}

function createStructuredDataScripts(
  structuredData?: JsonLdValue | JsonLdValue[]
): ScriptTag[] | undefined {
  if (!structuredData) {
    return undefined;
  }

  return [
    {
      children: JSON.stringify(structuredData),
      type: "application/ld+json",
    },
  ];
}

function createBaseMeta({
  canonicalPath,
  description = SITE_DESCRIPTION,
  imageAlt,
  imagePath = DEFAULT_OG_IMAGE_PATH,
  keywords,
  locale = DEFAULT_LOCALE,
  noIndex = false,
  title,
  twitterCard = "summary_large_image",
  type = "website",
}: BuildSeoInput): MetaTag[] {
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const socialImageUrl = getSocialImageUrl(imagePath);
  const pageTitle = createTitle(title);
  const keywordsContent = createKeywordsContent(keywords);

  const meta: MetaTag[] = [
    { title: pageTitle },
    { name: "description", content: description },
    { name: "robots", content: createRobotsContent(noIndex) },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonicalUrl },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: socialImageUrl },
    {
      property: "og:image:width",
      content: String(DEFAULT_OG_IMAGE_WIDTH),
    },
    {
      property: "og:image:height",
      content: String(DEFAULT_OG_IMAGE_HEIGHT),
    },
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:site", content: TWITTER_HANDLE },
    { name: "twitter:creator", content: TWITTER_HANDLE },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: socialImageUrl },
  ];

  if (keywordsContent) {
    meta.push({ name: "keywords", content: keywordsContent });
  }

  if (imageAlt && imageAlt.trim().length > 0) {
    meta.push(
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:image:alt", content: imageAlt }
    );
  }

  return meta;
}

export function buildSeoHead(input: BuildSeoInput): {
  links: LinkTag[];
  meta: MetaTag[];
  scripts?: ScriptTag[];
} {
  const canonicalPath = getCanonicalPath(input.canonicalPath);

  return {
    links: [
      {
        href: getCanonicalUrl(canonicalPath),
        rel: "canonical",
      },
    ],
    meta: createBaseMeta({
      ...input,
      canonicalPath,
    }),
    scripts: createStructuredDataScripts(input.structuredData),
  };
}

export function buildArticleSeoHead(input: ArticleSeoInput): {
  links: LinkTag[];
  meta: MetaTag[];
  scripts?: ScriptTag[];
} {
  const baseHead = buildSeoHead({
    ...input,
    type: "article",
  });

  const articleMeta: MetaTag[] = [];

  if (input.author) {
    articleMeta.push(
      { name: "author", content: input.author },
      { property: "article:author", content: input.author }
    );
  }

  if (input.publishedTime) {
    articleMeta.push({
      property: "article:published_time",
      content: input.publishedTime,
    });
  }

  if (input.modifiedTime) {
    articleMeta.push({
      property: "article:modified_time",
      content: input.modifiedTime,
    });
  }

  if (input.section) {
    articleMeta.push({
      property: "article:section",
      content: input.section,
    });
  }

  if (input.tags) {
    for (const tag of input.tags) {
      if (tag.trim().length > 0) {
        articleMeta.push({
          property: "article:tag",
          content: tag,
        });
      }
    }
  }

  return {
    ...baseHead,
    meta: [...baseHead.meta, ...articleMeta],
  };
}

export function createPersonJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bilal Ali",
    url: SITE_URL,
    image: getSocialImageUrl("/dithered-image.png"),
    jobTitle: "Software Engineer",
    homeLocation: {
      "@type": "Place",
      name: "Adama, Ethiopia",
    },
    sameAs: [
      "https://github.com/Bilal-AKAG",
      "https://www.linkedin.com/in/bilal-ali-588537338/",
      "https://x.com/bil0lali",
    ],
  };
}

export function createWebsiteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function createProfilePageJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2025-01-01",
    description: SITE_DESCRIPTION,
    mainEntity: createPersonJsonLd(),
    name: SITE_TITLE,
    url: SITE_URL,
  };
}

interface ArticleJsonLdInput {
  authorName?: string;
  canonicalPath: string;
  dateModified?: string;
  datePublished?: string;
  description: string;
  imagePath?: string;
  title: string;
}

export function createArticleJsonLd(input: ArticleJsonLdInput): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    author: input.authorName
      ? {
          "@type": "Person",
          name: input.authorName,
        }
      : undefined,
    dateModified: input.dateModified,
    datePublished: input.datePublished,
    description: input.description,
    headline: input.title,
    image: getSocialImageUrl(input.imagePath),
    mainEntityOfPage: getCanonicalUrl(input.canonicalPath),
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
