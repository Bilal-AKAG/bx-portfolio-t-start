import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import '@fontsource-variable/doto/wght.css';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "better-themes";
import { Toaster } from "sileo";

import NotFoundPage from "@/components/pageComponent/not-found-page";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import TanStackQueryProvider from "@/integrations/tanstack-query/root-provider";

import { SITE_NAME } from "@/lib/seo";
import appCss from "@/styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    links: [
      {
        href: appCss,
        rel: "stylesheet",
      },
      {
        href: "/favicon.ico",
        rel: "icon",
      },
      {
        href: "/apple-icon.png",
        rel: "apple-touch-icon",
      },
      {
        href: "/manifest.json",
        rel: "manifest",
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1, maximum-scale=1",
        name: "viewport",
      },
      {
        content: "#18181B",
        name: "theme-color",
      },
      {
        content: SITE_NAME,
        name: "apple-mobile-web-app-title",
      },
      {
        content: "telephone=no",
        name: "format-detection",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="smooth-scrolling"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body className="bg-background font-mono relative">
        <TanStackQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
            enableSystem
          >
            {children}
            <Toaster
              position="top-center"
              options={{
                fill: "black",
                styles: {
                  description: "text-sm! text-white/70! font-mono",
                  title: "text-sm! text-white! font-mono",
                },
              }}
            />
            <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
          </ThemeProvider>
        </TanStackQueryProvider>
        <Scripts />
      </body>
    </html>
  );
}
