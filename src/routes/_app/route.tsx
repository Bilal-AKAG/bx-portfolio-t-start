import { Outlet, createFileRoute } from "@tanstack/react-router";

import Footer from "@/components/pageComponent/footer/footer";
import Navigations from "@/components/pageComponent/header";
import Separator from "@/components/pageComponent/separator";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="app-shell">
      <main
        id="content"
        className="site-main flex min-h-[100dvh] flex-col bg-background pb-10 sm:pb-0"
        role="main"
      >
        <Separator
          orientation="vertical"
          className="fixed top-0 bottom-0 left-0 z-0 hidden border-r md:flex"
        />
        <Separator
          orientation="vertical"
          className="fixed top-0 right-0 bottom-0 z-0 hidden border-l md:flex"
        />
        <Navigations />
        <div className="flex flex-1 flex-col overflow-hidden bg-background">
          <Outlet />
        </div>
        <div className="m-auto w-full max-w-[700px] overflow-hidden border-x border-dashed border-border-primary">
          <Footer />
        </div>
      </main>
    </div>
  );
}
