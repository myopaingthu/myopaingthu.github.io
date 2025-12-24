import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, galleries } from "../data/portfolio";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
} from "../components/Animations";

export default function Projects() {
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const currentGallery = activeGallery ? galleries[activeGallery] : null;
  const currentImage = currentGallery?.images[galleryIndex];

  const openGallery = (key: string) => {
    setActiveGallery(key);
    setGalleryIndex(0);
  };

  const closeGallery = () => {
    setActiveGallery(null);
  };

  const nextImage = () => {
    if (currentGallery && galleryIndex < currentGallery.images.length - 1) {
      setGalleryIndex((i) => i + 1);
    }
  };

  const prevImage = () => {
    if (galleryIndex > 0) {
      setGalleryIndex((i) => i - 1);
    }
  };

  return (
    <section className="relative pb-16">
      {/* Header */}
      <div className="mb-12 space-y-4 text-center">
        <AnimatedSection>
          <span className="badge mx-auto bg-primary/15 text-primary">
            Projects
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Selected work & <span className="gradient-text">case studies</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mx-auto max-w-2xl text-base text-slate-400">
            A curated collection of professional delivery and learning
            explorations spanning FinTech, operations tooling, and immersive
            user experiences.
          </p>
        </AnimatedSection>
      </div>

      {/* Projects Grid */}
      <StaggerContainer
        className="grid gap-6 md:grid-cols-2"
        staggerDelay={0.1}
      >
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <ScaleOnHover scale={1.01}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-slate-900/80">
                {/* Glow on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-cyan-500/20 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`badge ${
                        project.category === "Professional Work"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-blue-500/15 text-blue-400"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="chip text-[10px]">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="chip text-[10px]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                {(project.links.length > 0 || project.gallery) && (
                  <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {link.label}
                      </a>
                    ))}
                    {project.gallery && (
                      <button
                        onClick={() => openGallery(project.gallery!)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
                      >
                        <Play className="h-3 w-3" />
                        View Gallery
                      </button>
                    )}
                  </div>
                )}
              </article>
            </ScaleOnHover>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Gallery Modal */}
      <AnimatePresence>
        {currentGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 backdrop-blur-md"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeGallery}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title */}
              <div className="mb-6 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {currentGallery.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {currentImage?.label}
                </p>
              </div>

              {/* Image */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevImage}
                  disabled={galleryIndex === 0}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10 disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                  className={`flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 ${
                    currentImage?.orientation === "landscape"
                      ? "h-64 w-full max-w-xl"
                      : "h-[24rem] w-56"
                  }`}
                >
                  <img
                    src={currentImage?.src}
                    alt={currentImage?.label}
                    className="h-full w-full object-contain"
                  />
                </div>

                <button
                  onClick={nextImage}
                  disabled={galleryIndex === currentGallery.images.length - 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10 disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dots indicator */}
              <div className="mt-4 flex justify-center gap-2">
                {currentGallery.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === galleryIndex ? "bg-primary" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
