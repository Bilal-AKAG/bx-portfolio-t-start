"use client";

import JSZip from "jszip";
import { Check, Copy, Loader2, MousePointerClick, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { IconButton, IconClipboard, IconDocFolder, IconImage, IconImageDepth } from "nucleo-glass";
import { sileo } from "sileo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ButtonToggle } from "./theme-toggle";

const MENU_CLOSE_DELAY_MS = 200;

const Footer = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  const clearCloseTimeout = (): void => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleMenuClose = (): void => {
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setMenuVisible(false);
      closeTimeoutRef.current = null;
    }, MENU_CLOSE_DELAY_MS);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    clearCloseTimeout();
    setMenuVisible(true);
  };

  const handleOpenChange = (open: boolean): void => {
    clearCloseTimeout();
    setMenuVisible(open);
  };

  const closeMenu = (): void => {
    clearCloseTimeout();
    setMenuVisible(false);
  };

  const downloadFile = (dataUrl: string, filename: string): void => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  };

  const getExportableSVG = (): SVGSVGElement | null => {
    if (!svgRef.current) {
      return null;
    }

    const clonedSvg = svgRef.current.cloneNode(true) as SVGSVGElement;
    clonedSvg.setAttribute("width", "500");
    clonedSvg.setAttribute("height", "500");

    const rects = clonedSvg.querySelectorAll("rect");

    if (rects[0]) {
      rects[0].setAttribute("rx", "90");
      rects[0].setAttribute("ry", "90");
    }

    if (rects[1]) {
      rects[1].setAttribute("rx", "22.5");
      rects[1].setAttribute("ry", "22.5");
    }

    if (rects[2]) {
      rects[2].setAttribute("rx", "11.25");
      rects[2].setAttribute("ry", "11.25");
    }

    if (rects[3]) {
      rects[3].setAttribute("rx", "11.25");
      rects[3].setAttribute("ry", "11.25");
    }

    return clonedSvg;
  };

  const handleCopySVG = (): void => {
    const svg = getExportableSVG();
    if (!svg) {
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    void navigator.clipboard.writeText(svgData);
    closeMenu();

    sileo.success({
      description:
        "The full SVG markup is now in your clipboard, ready to paste into code or design tools.",
      icon: <Copy className="h-4 w-4" />,
      title: "Copied",
    });
  };

  const handleDownloadSVG = (): void => {
    const svg = getExportableSVG();
    if (!svg) {
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    downloadFile(url, "window.svg");
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = (): void => {
    const svg = getExportableSVG();
    if (!svg) {
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const size = 500;
    canvas.width = size;
    canvas.height = size;

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (!ctx) {
        URL.revokeObjectURL(url);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, size, size);
      const pngUrl = canvas.toDataURL("image/png");
      downloadFile(pngUrl, "window.png");
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const handleDownloadAssets = (): void => {
    closeMenu();

    const syncPromise = (async () => {
      const zip = new JSZip();
      const folder = zip.folder("bilal-brand-assets");

      const svg = getExportableSVG();
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        folder?.file("logo.svg", svgData);
      }

      const pngBlob = await new Promise<Blob | null>((resolve) => {
        const exportableSvg = getExportableSVG();
        if (!exportableSvg) {
          resolve(null);
          return;
        }

        const svgData = new XMLSerializer().serializeToString(exportableSvg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const size = 512;

        canvas.width = size;
        canvas.height = size;

        const url = URL.createObjectURL(
          new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        );

        img.onload = () => {
          if (!ctx) {
            URL.revokeObjectURL(url);
            resolve(null);
            return;
          }

          ctx.clearRect(0, 0, size, size);
          ctx.drawImage(img, 0, 0, size, size);
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            resolve(blob);
          }, "image/png");
        };

        img.src = url;
      });

      if (pngBlob) {
        folder?.file("logo.png", pngBlob);
      }

      const staticAssets = [
        { name: "favicon.ico", url: "/favicon.ico" },
        { name: "icon-32.png", url: "/web-app-manifest-32x32.png" },
        { name: "icon-192.png", url: "/web-app-manifest-192x192.png" },
        { name: "icon-512.png", url: "/web-app-manifest-512x512.png" },
      ] as const;

      await Promise.all(
        staticAssets.map(async (asset) => {
          const response = await fetch(asset.url);
          const blob = await response.blob();
          folder?.file(asset.name, blob);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");

      link.href = url;
      link.download = "bilal-brand-assets.zip";
      document.body.append(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })();

    sileo.promise(syncPromise, {
      error: {
        description: "Something interrupted the export. Please try again.",
        icon: <X className="h-4 w-4" />,
        title: "Sync failed.",
      },
      loading: {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        title: "Synchronizing vault...",
      },
      success: {
        description:
          "Your brand pack is downloaded. Check your Downloads folder.",
        icon: <Check className="h-4 w-4" />,
        title: "Assets Ready.",
      },
    });
  };

  return (
    <footer className="relative w-full border-t border-dashed bg-background px-6 pt-4 pb-0">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <DropdownMenu modal={false} open={menuVisible} onOpenChange={handleOpenChange}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <div
                    className="flex h-8 w-8 cursor-context-menu items-center justify-center outline-hidden"
                    onContextMenu={handleContextMenu}
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <svg
                      ref={svgRef}
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 500 500"
                      className="block origin-center transition-transform duration-700 ease-out hover:rotate-180 hover:scale-105 active:scale-95"
                    >
                      <rect x="25" y="25" width="450" height="450" fill="#000000" />
                      <rect
                        x="103.75"
                        y="81.25"
                        width="292.5"
                        height="337.5"
                        fill="#ffffff"
                      />
                      <rect
                        x="137.5"
                        y="115"
                        width="225"
                        height="123.75"
                        fill="#000000"
                      />
                      <rect
                        x="137.5"
                        y="261.25"
                        width="225"
                        height="123.75"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                </DropdownMenuTrigger>
              </TooltipTrigger>

              <TooltipContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-white">Right-click</span>
                  <IconButton className="h-4 w-4" />
                </div>
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              side="top"
              align="start"
              sideOffset={2}
              alignOffset={24}
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={scheduleMenuClose}
              className="z-100 min-w-50 rounded-none border border-dashed bg-background/95 p-1.5 font-mono text-foreground data-[side=top]:slide-in-from-bottom-1 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.6] data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.6] dark:bg-bg-panel"
              style={{ transformOrigin: "bottom left" }}
            >
              <DropdownMenuItem
                onSelect={handleCopySVG}
                className="group/item flex cursor-pointer items-center gap-3 rounded-none px-3 py-2 text-[11px] text-muted-foreground outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:text-current"
              >
                <IconClipboard className="h-4 w-4" />
                <span>Copy Logo as SVG</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1.5 h-px bg-border-primary/50" />

              <DropdownMenuItem
                onSelect={() => {
                  handleDownloadPNG();
                  closeMenu();
                }}
                className="group/item flex cursor-pointer items-center gap-3 rounded-none px-3 py-2 text-[11px] text-muted-foreground outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:text-current"
              >
                <IconImage className="h-4 w-4" />
                <span>Download Logo PNG</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => {
                  handleDownloadSVG();
                  closeMenu();
                }}
                className="group/item flex cursor-pointer items-center gap-3 rounded-none px-3 py-2 text-[11px] text-muted-foreground outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:text-current"
              >
                <IconImageDepth className="h-4 w-4" />
                <span>Download Logo SVG</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1.5 h-px bg-border-primary/50" />

              <DropdownMenuItem
                onSelect={handleDownloadAssets}
                className="group/item flex cursor-pointer items-center gap-3 rounded-none px-3 py-2 text-[11px] text-muted-foreground outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:text-current"
              >
                <IconDocFolder className="h-4 w-4" />
                <span>Brand Assets (All)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-col">
            <p className="mb-1 text-[10px] leading-none font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Design & Build
            </p>
            <p className="text-xs leading-none font-mono text-muted-foreground">
              &copy; {new Date().getFullYear()} —{" "}
              <span className="text-foreground/60">Bilal</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ButtonToggle />
        </div>
      </div>

      <div className="pointer-events-none mt-4 flex h-6 w-full items-center justify-between border-t border-dashed border-border-primary opacity-10">
        <div className="h-full w-px bg-border-primary" />
        <div className="h-full w-px bg-border-primary" />
        <div className="h-full w-px bg-border-primary" />
        <div className="h-full w-px bg-border-primary" />
      </div>
    </footer>
  );
};

export default Footer;
