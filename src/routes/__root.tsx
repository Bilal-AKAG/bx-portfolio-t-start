import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import '@fontsource-variable/doto/wght.css';
// IBM Plex Mono — self-hosted via Fontsource. Only the weights/styles used
// by the site (400/500/600/700 + italics), so Vite bundles ~6 woff2 files
// instead of all 14. Each file uses unicode-range subsetting with
// font-display: swap, so browsers fetch only the subsets they need.
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/400-italic.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@fontsource/ibm-plex-mono/700-italic.css';
// Preload the above-the-fold font files so the browser fetches them with
// the CSS instead of after first paint — narrows the fallback→webfont
// swap window that was reflowing text (layout shift).
import dotoLatinWght from '@fontsource-variable/doto/files/doto-latin-wght-normal.woff2?url';
import ibmPlexMonoLatin400 from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url';
import ibmPlexMonoLatin500 from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2?url';
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
import { hotkeysDevtoolsPlugin } from '@tanstack/react-hotkeys-devtools'
import { SITE_NAME } from "@/lib/seo";
import appCss from "@/styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    links: [
      {
        as: "font",
        crossOrigin: "anonymous",
        href: dotoLatinWght,
        rel: "preload",
        type: "font/woff2",
      },
      {
        as: "font",
        crossOrigin: "anonymous",
        href: ibmPlexMonoLatin400,
        rel: "preload",
        type: "font/woff2",
      },
      {
        as: "font",
        crossOrigin: "anonymous",
        href: ibmPlexMonoLatin500,
        rel: "preload",
        type: "font/woff2",
      },
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
                position: "top-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
								TanStackQueryDevtools,
								hotkeysDevtoolsPlugin()
              ]}
            />
          </ThemeProvider>
        </TanStackQueryProvider>
        <Scripts />
      </body>
    </html>
  );
}
