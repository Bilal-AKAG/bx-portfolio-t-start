"use client";

import JSZip from "jszip";
import { Check, Copy, Loader2, MousePointerClick, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { sileo } from "sileo";
import { IconButton, IconClipboard, IconDocFolder, IconImage, IconImageDepth } from "nucleo-glass";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ButtonToggle } from "./theme-toggle";

const Footer = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuOpenId, setMenuOpenId] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClose = () => setMenuVisible(false);
    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose);
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuVisible(true);
    setMenuOpenId((id) => id + 1);
  };

  useLayoutEffect(() => {
    if (!menuVisible) {
      return;
    }
    const svgRect = triggerRef.current?.getBoundingClientRect();
    const menuEl = menuRef.current;
    if (!svgRect || !menuEl) {
      return;
    }

    const menuHeight = menuEl.offsetHeight;
    if (menuHeight === 0) {
      return;
    }

    const overlap = 0;
    const x = svgRect.right;
    const y = Math.max(2, svgRect.top - menuHeight + overlap);

    setMenuPosition({ x, y });
  }, [menuVisible, menuOpenId]);

  const downloadFile = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  };

  const getExportableSVG = () => {
    if (!svgRef.current) {
      return null;
    }
    const clonedSvg = svgRef.current.cloneNode(true) as SVGSVGElement;
    clonedSvg.setAttribute("width", "500");
    clonedSvg.setAttribute("height", "500");

    // Add rounding back for exports
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

  const handleCopySVG = () => {
    const svg = getExportableSVG();
    if (!svg) {
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    navigator.clipboard.writeText(svgData);
    setMenuVisible(false);
    sileo.success({
      description:
        "The full SVG markup is now in your clipboard, ready to paste into code or design tools.",
      icon: <Copy className="h-4 w-4" />,
      title: "Copied",
    });
  };

  const handleDownloadSVG = () => {
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

  const handleDownloadPNG = () => {
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
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
        const pngUrl = canvas.toDataURL("image/png");
        downloadFile(pngUrl, "window.png");
        URL.revokeObjectURL(url);
      }
    };
    img.src = url;
  };

  const handleDownloadAssets = () => {
    setMenuVisible(false);

    const syncPromise = (async () => {
      const zip = new JSZip();
      const folder = zip.folder("bilal-brand-assets");

      // 1. Add SVG
      const svg = getExportableSVG();
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        folder?.file("logo.svg", svgData);
      }

      // 2. Add PNG
      const pngBlob = await new Promise<Blob | null>((resolve) => {
        const svg = getExportableSVG();
        if (!svg) {
          return resolve(null);
        }
        const svgData = new XMLSerializer().serializeToString(svg);
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
          if (ctx) {
            ctx.clearRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);
            canvas.toBlob((blob) => {
              URL.revokeObjectURL(url);
              resolve(blob);
            }, "image/png");
          }
        };
        img.src = url;
      });
      if (pngBlob) {
        folder?.file("logo.png", pngBlob);
      }

      // 3. Add static assets from public
      const staticAssets = [
        { name: "favicon.ico", url: "/favicon.ico" },
        { name: "icon-32.png", url: "/web-app-manifest-32x32.png" },
        { name: "icon-192.png", url: "/web-app-manifest-192x192.png" },
        { name: "icon-512.png", url: "/web-app-manifest-512x512.png" },
      ];

      await Promise.all(
        staticAssets.map(async (asset) => {
          try {
            const response = await fetch(asset.url);
            const blob = await response.blob();
            folder?.file(asset.name, blob);
          } catch {
            console.error(`Failed to fetch ${asset.url}`);
          }
        })
      );

      // 4. Generate and download ZIP
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
    <footer className="w-full bg-background px-6 pt-4 pb-0 border-t border-dashed relative">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Downloadable Window SVG - Perfectly Aligned */}

          <Tooltip>
            <TooltipTrigger>
              <div
                ref={triggerRef}
                className="flex h-8 w-8 items-center justify-center cursor-context-menu"
                onContextMenu={handleContextMenu}
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
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-white ">Right-click</span>
                <IconButton className="h-4 w-4"/>
              </div>
            </TooltipContent>
          </Tooltip>
          {/* Credits */}
          <div className="flex flex-col">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1">
              Design & Build
            </p>
            <p className="text-xs font-mono text-muted-foreground leading-none">
              &copy; {new Date().getFullYear()} —{" "}
              <span className="text-foreground/60 ">Bilal</span>
            </p>
          </div>
        </div>

        {/* Right: Theme Toggle */}
        <div className="flex items-center gap-4">
          <ButtonToggle />
        </div>
      </div>

      {/* Custom Context Menu - Using Website Colors */}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            id="footer-context-menu"
            ref={menuRef}
            className="fixed z-[100] min-w-[200px] border border-border-primary bg-black dark:bg-bg-panel p-1.5 shadow-2xl"
            style={{
              left: menuPosition.x,
              top: menuPosition.y,
              transformOrigin: "bottom left",
            }}
            initial={{ opacity: 0, scale: 0.6, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: -6 }}
            transition={{
              damping: 30,
              mass: 0.8,
              stiffness: 360,
              type: "spring",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              if (closeTimeoutRef.current !== null) {
                window.clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
            }}
            onMouseLeave={() => {
              if (closeTimeoutRef.current !== null) {
                window.clearTimeout(closeTimeoutRef.current);
              }
              closeTimeoutRef.current = window.setTimeout(() => {
                setMenuVisible(false);
                closeTimeoutRef.current = null;
              }, 200);
            }}
          >
            <button
              onClick={handleCopySVG}
              className="group/item flex cursor-pointer  w-full items-center gap-3 px-3 py-2 text-left text-[11px] font-mono text-white transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              
              <IconClipboard className="h-4 w-4"/>
              <span>Copy Logo as SVG</span>
            </button>

            <div className="my-1.5 h-[1px] w-full bg-border-primary/50" />

            <button
              onClick={() => {
                handleDownloadPNG();
                setMenuVisible(false);
              }}
              className="group/item flex cursor-pointer w-full items-center gap-3 px-3 py-2 text-left text-[11px] font-mono text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <IconImage className="h-4 w-4"/>
              <span>Download Logo PNG</span>
            </button>

            <button
              onClick={() => {
                handleDownloadSVG();
                setMenuVisible(false);
              }}
              className="group/item flex cursor-pointer w-full items-center gap-3 px-3 py-2 text-left text-[11px] font-mono text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <IconImageDepth className="h-4 w-4" />
              <span>Download Logo SVG</span>
            </button>

            <div className="my-1.5 h-[1px] w-full bg-border-primary/50" />

            <button
              onClick={handleDownloadAssets}
              className="group/item flex cursor-pointer w-full items-center gap-3 px-3 py-2 text-left text-[11px] font-mono text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <IconDocFolder className="h-4 w-4" />
              <span>Brand Assets</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Grid Overlay - Integrated tightly */}
      <div className="pointer-events-none mt-4 flex h-6 w-full items-center justify-between border-border-primary border-t border-dashed opacity-10">
        <div className="h-full w-px bg-border-primary" />
        <div className="h-full w-px bg-border-primary" />
        <div className="h-full w-px bg-border-primary" />
        <div className="h-full w-px bg-border-primary" />
      </div>
    </footer>
  );
};

export default Footer;
