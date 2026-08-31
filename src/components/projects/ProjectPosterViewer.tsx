import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import {
  IconArrowsMaximize,
  IconExternalLink,
  IconFileTypePdf,
  IconPhoto,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";
import type { ProjectEntry } from "@/types/content";

type Point = { x: number; y: number };

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
const ZOOM_STEP = 0.25;

const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

function distanceBetween(points: Point[]) {
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
}

export function ProjectPosterViewer({ project }: { project: ProjectEntry }) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const panOriginRef = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const pinchOriginRef = useRef({ distance: 0, zoom: MIN_ZOOM });
  const previewSrc = project.assetType === "image" ? project.assetSrc : project.assetPreviewSrc;
  const isPdf = project.assetType === "pdf";

  const setClampedZoom = useCallback((nextZoom: number | ((current: number) => number)) => {
    setZoom((current) => clampZoom(typeof nextZoom === "function" ? nextZoom(current) : nextZoom));
  }, []);

  const resetView = useCallback(() => {
    setZoom(MIN_ZOOM);
    window.requestAnimationFrame(() => viewportRef.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" }));
  }, []);

  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setClampedZoom((current) => current + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 1) {
      panOriginRef.current = {
        x: event.clientX,
        y: event.clientY,
        left: viewport.scrollLeft,
        top: viewport.scrollTop,
      };
    } else if (pointersRef.current.size === 2) {
      pinchOriginRef.current = {
        distance: distanceBetween(Array.from(pointersRef.current.values())),
        zoom,
      };
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    event.stopPropagation();
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (pointersRef.current.size >= 2) {
      const distance = distanceBetween(Array.from(pointersRef.current.values()).slice(0, 2));
      if (pinchOriginRef.current.distance > 0) {
        setClampedZoom(pinchOriginRef.current.zoom * (distance / pinchOriginRef.current.distance));
      }
      return;
    }

    viewport.scrollLeft = panOriginRef.current.left - (event.clientX - panOriginRef.current.x);
    viewport.scrollTop = panOriginRef.current.top - (event.clientY - panOriginRef.current.y);
  };

  const releasePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size === 1) {
      const [point] = Array.from(pointersRef.current.values());
      const viewport = viewportRef.current;
      panOriginRef.current = {
        x: point.x,
        y: point.y,
        left: viewport?.scrollLeft ?? 0,
        top: viewport?.scrollTop ?? 0,
      };
    }
  };

  if (!project.assetSrc) return null;

  return (
    <figure className={`project-asset ${isPdf ? "project-asset-pdf" : "project-asset-image"}`}>
      <figcaption className="project-asset-toolbar">
        <span className="project-asset-label">
          {isPdf ? <IconFileTypePdf size={17} aria-hidden="true" /> : <IconPhoto size={17} aria-hidden="true" />}
          Proje posteri
        </span>
        {previewSrc ? (
          <div className="project-poster-controls" aria-label="Poster yakınlaştırma kontrolleri">
            <button type="button" onClick={() => setClampedZoom((current) => current - ZOOM_STEP)} disabled={zoom <= MIN_ZOOM} aria-label="Posteri uzaklaştır">
              <IconZoomOut size={18} aria-hidden="true" />
            </button>
            <output aria-live="polite" aria-label="Poster yakınlaştırma oranı">%{Math.round(zoom * 100)}</output>
            <button type="button" onClick={() => setClampedZoom((current) => current + ZOOM_STEP)} disabled={zoom >= MAX_ZOOM} aria-label="Posteri yakınlaştır">
              <IconZoomIn size={18} aria-hidden="true" />
            </button>
            <button type="button" className="project-poster-fit" onClick={resetView} aria-label="Posteri genişliğe sığdır">
              <IconArrowsMaximize size={17} aria-hidden="true" /> <span>Sığdır</span>
            </button>
          </div>
        ) : null}
      </figcaption>

      {previewSrc ? (
        <div
          ref={viewportRef}
          className={`project-poster-viewport ${zoom > MIN_ZOOM ? "is-zoomed" : ""}`}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
          aria-label={`${project.title} poster önizlemesi. Tekerlek, düğmeler veya iki parmak hareketiyle yakınlaştırılabilir.`}
        >
          <img
            src={previewSrc}
            alt={project.assetAlt ?? `${project.title} proje posteri`}
            style={{ width: `${zoom * 100}%` }}
            decoding="async"
            draggable={false}
          />
        </div>
      ) : (
        <object
          data={`${project.assetSrc}#view=FitH&toolbar=0&navpanes=0`}
          type="application/pdf"
          aria-label={project.assetAlt ?? `${project.title} PDF önizlemesi`}
        >
          <p>Tarayıcınız gömülü PDF önizlemesini desteklemiyor.</p>
        </object>
      )}

      <div className="project-asset-footer">
        <span>Tekerlek veya +/− ile yakınlaştırın; sürükleyerek gezinin.</span>
        <a href={project.assetSrc} target="_blank" rel="noreferrer">
          Tam belgeyi aç <IconExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    </figure>
  );
}
