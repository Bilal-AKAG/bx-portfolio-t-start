import {
  Link,
  createFileRoute,
  notFound,
  rootRouteId,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { getMDXComponents } from "@/components/mdx";
import { getPostPage } from "@/lib/posts";

import browserCollections from "../../../../.source/browser";

interface BlogMdxRenderProps {
  title: string;
  description: string;
}

interface BlogMdxModule {
  default: (props: {
    components: ReturnType<typeof getMDXComponents>;
  }) => JSX.Element;
  frontmatter?: Record<string, unknown>;
}

const clientLoader =
  browserCollections.blog.createClientLoader<BlogMdxRenderProps>({
    component(
      { default: Mdx }: BlogMdxModule,
      { title, description }: BlogMdxRenderProps
    ) {
      return (
        <article className="m-auto flex min-h-[calc(100dvh-100px)] w-full max-w-[700px] flex-col border-x border-dashed border-border-primary bg-background px-6 py-6">
          <Link
            to="/blog"
            className="group mb-8 mt-2 flex w-fit items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={10}
              className="inline-block rotate-45 transform transition-transform duration-200 ease-out group-hover:-translate-x-1"
            />
            <span>[Back]</span>
          </Link>

          <div className="mb-4 border-b border-dashed border-border-primary pb-6 font-doto font-medium">
            <h1 className="mb-3 text-3xl tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
           
          </div>

          <div className="w-full max-w-none pb-10 font-mono antialiased">
            <Mdx components={getMDXComponents()} />
          </div>
        </article>
      );
    },
  });

export const Route = createFileRoute("/_app/blog/$slug")({
  loader: async ({ params }) => {
    const page = await getPostPage({
      data: { slug: params.slug },
    });

    if (!page) {
      throw notFound({ routeId: rootRouteId });
    }

    await clientLoader.preload(page.path);

    return page;
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const page = Route.useLoaderData();

  return clientLoader.useContent(page.path, {
    title: page.meta.title,
    description: page.meta.description,
  });
}
