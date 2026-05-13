import React, { useRef, useState } from "react";
import type { SupportedLang } from "../../i18n/supported-lang";

interface ProjectData {
  slug: string;
  name: string;
  images: string[];
  description: string;
  github?: string;
  website?: string;
  youtube?: string;
}

interface Props {
  pathname: string;
  project: ProjectData;
  lang?: SupportedLang;
}

const labels = {
  sk: {
    share: "Zdieľať",
    copied: "Skopírované!",
    prompt: "Skopírujte si adresu:",
    github: "Kód na GitHub",
    website: "Navštíviť web projektu",
    youtube: "Pozrieť na YouTube",
    showImage: (i: number) => `Ukázať obrázok ${i + 1}`,
  },
  en: {
    share: "Share",
    copied: "Copied!",
    prompt: "Copy this address:",
    github: "View code on GitHub",
    website: "Visit project website",
    youtube: "Watch on YouTube",
    showImage: (i: number) => `Show image ${i + 1}`,
  },
};

const ICONS = {
  github: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.428 2.867 8.186 6.839 9.525.5.092.682-.217.682-.481 0-.238-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.158-1.11-1.467-1.11-1.467-.908-.62.069-.608.069-.608 1 .07 1.528 1.025 1.528 1.025.893 1.531 2.341 1.089 2.91.833.091-.648.35-1.089.636-1.34-2.22-.254-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.447-1.276.098-2.661 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 7.08a9.56 9.56 0 0 1 2.506.338c1.909-1.296 2.748-1.026 2.748-1.026.546 1.385.202 2.407.1 2.661.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.694-4.566 4.943.357.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.134 20.204 22 16.447 22 12.021 22 6.486 17.522 2 12 2z" />
    </svg>
  ),
  website: (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  youtube: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.8 8.001a2.997 2.997 0 0 0-2.114-2.12C17.077 5.5 12 5.5 12 5.5s-5.078 0-7.687.381A2.997 2.997 0 0 0 2.2 8.001 31.46 31.46 0 0 0 2 12a31.53 31.53 0 0 0 .2 3.999 2.997 2.997 0 0 0 2.113 2.121C6.922 18.5 12 18.5 12 18.5s5.077 0 7.686-.381A2.997 2.997 0 0 0 21.8 16A31.695 31.695 0 0 0 22 12a31.695 31.695 0 0 0-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  ),
  copy: (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <rect x="2" y="2" width="13" height="13" rx="2" />
    </svg>
  ),
  check: (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.414 7.414-3.414-3.414a1 1 0 10-1.414 1.414l4.121 4.121a1 1 0 001.414 0l8.121-8.121a1 1 0 10-1.414-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const Project = ({ pathname, project, lang = "sk" }: Props) => {
  const [mainIdx, setMainIdx] = useState(0);
  const [copyOk, setCopyOk] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseDownX = useRef(0);
  const dragging = useRef(false);

  const t = labels[lang] ?? labels.sk;
  const images = project.images || [];
  const mainImg = images[mainIdx] || "";

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}#${project.slug}`;
    const title = project.name;
    const text = project.description;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {}
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopyOk(true);
        setTimeout(() => setCopyOk(false), 1200);
      } catch {
        setCopyOk(false);
      }
    } else {
      window.prompt(t.prompt, url);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0 && mainIdx < images.length - 1) setMainIdx(mainIdx + 1);
      else if (delta < 0 && mainIdx > 0) setMainIdx(mainIdx - 1);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    mouseDownX.current = e.clientX;
  };
  const handleMouseEnter = () => {
    dragging.current = false;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = mouseDownX.current - e.clientX;
    if (Math.abs(dx) > 40) {
      if (dx > 0 && mainIdx < images.length - 1) setMainIdx(mainIdx + 1);
      else if (dx < 0 && mainIdx > 0) setMainIdx(mainIdx - 1);
    }
    dragging.current = false;
    mouseDownX.current = 0;
  };

  return (
    <div
      id={project.slug}
      className="w-full gap-6 px-4 max-md:mx-auto max-md:max-w-90 md:flex"
    >
      <div className="flex flex-col items-center md:w-1/2">
        <div
          className="mb-2 flex h-55 w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-300 select-none md:max-w-75"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseEnter}
          style={{ WebkitUserSelect: "none", userSelect: "none" }}
        >
          {mainImg ? (
            <img
              src={mainImg}
              alt={project.name}
              className="pointer-events-none h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <span className="text-3xl font-black text-zinc-500">
              {project.name[0]}
            </span>
          )}
        </div>
        {images.length > 1 && (
          <div className="mx-auto flex w-full space-x-2 md:max-w-75">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setMainIdx(i)}
                className={`h-12 w-12 cursor-pointer overflow-hidden rounded-lg border-2 outline-none ${
                  mainIdx === i
                    ? "border-amber-500"
                    : "border-zinc-300 hover:border-amber-400"
                }`}
                type="button"
                tabIndex={0}
                aria-label={t.showImage(i)}
              >
                <img
                  src={img}
                  alt={`${project.name} obrázok ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col items-center justify-center md:mt-0 md:items-start">
        <div className="flex w-full flex-wrap-reverse items-center justify-between">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 md:text-left">
            {project.name}
          </h2>
          <button
            className="ml-3 flex cursor-pointer items-center rounded text-xs text-amber-500 hover:text-amber-600"
            onClick={handleShare}
            aria-label={t.share + " " + project.name}
            type="button"
          >
            {copyOk ? (
              <>
                {ICONS.check} <span className="ml-1">{t.copied}</span>
              </>
            ) : (
              <>
                {ICONS.copy}
                <span className="ml-1">{t.share}</span>
              </>
            )}
          </button>
        </div>
        <p className="mb-4 text-center md:text-left">{project.description}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-500 hover:text-amber-600"
              title={t.website}
            >
              {ICONS.website}
              <span>Web</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-500 hover:text-amber-600"
              title={t.github}
            >
              {ICONS.github}
              <span>GitHub</span>
            </a>
          )}
          {project.youtube && (
            <a
              href={project.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-500 hover:text-amber-600"
              title={t.youtube}
            >
              {ICONS.youtube}
              <span>YouTube</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
