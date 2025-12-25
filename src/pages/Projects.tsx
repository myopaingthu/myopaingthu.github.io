import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { projects, galleries } from "../data/portfolio";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../components/Animations";
import SpotlightCard from "../components/SpotlightCard";
import Carousel from "../components/Carousel";

export default function Projects() {
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  const currentGallery = activeGallery ? galleries[activeGallery] : null;

  const categories = ["All", "Professional Work", "Learning Project"];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const otherProjects = filteredProjects;

  const openGallery = (key: string) => {
    setActiveGallery(key);
    setGalleryIndex(0);
  };

  const closeGallery = () => {
    setActiveGallery(null);
  };

  const handleIndexChange = (index: number) => {
    setGalleryIndex(index);
  };

  const toggleDescription = (projectTitle: string) => {
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(projectTitle)) {
      newExpanded.delete(projectTitle);
    } else {
      newExpanded.add(projectTitle);
    }
    setExpandedDescriptions(newExpanded);
  };

  return (
    <section className="relative pb-16 md:mt-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

      {/* Category Filter */}
      <AnimatedSection delay={0.1}>
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-sm ${
                activeCategory === category
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-primary/30 to-cyan-500/30 rounded-full border border-primary/50 shadow-lg shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {category === "All" && <Filter className="h-4 w-4" />}
                {category}
              </span>
            </motion.button>
          ))}
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <div className="space-y-10">

        <StaggerContainer
          key={activeCategory}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.05}
        >
          {otherProjects.map((project) => {
            const isExpanded = expandedDescriptions.has(project.title);
            const shouldShowToggle = project.description.length > 150;
            
            return (
            <StaggerItem key={project.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <SpotlightCard 
                  spotlightColor={
                    project.category === "Professional Work" 
                      ? "rgba(59, 130, 246, 0.2)"
                      : "rgba(168, 85, 247, 0.2)"
                  }
                >
                  <div className="flex h-full flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border backdrop-blur-sm ${
                            project.category === "Professional Work"
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-blue-500/20"
                              : "bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-purple-500/20"
                          }`}
                        >
                          {project.category === "Professional Work" ? "Work" : "Learning"}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-cyan-400 transition-all duration-300">
                          {project.title}
                        </h3>
                        <div>
                          <p className={`text-sm leading-relaxed text-slate-400 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                            {project.description}
                          </p>
                          {shouldShowToggle && (
                            <button
                              onClick={() => toggleDescription(project.title)}
                              className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-cyan-400 transition-colors"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="h-3.5 w-3.5" />
                                  See less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-3.5 w-3.5" />
                                  See more
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <motion.span 
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${
                              project.category === "Professional Work"
                                ? "bg-blue-500/10 text-blue-300/90 border-blue-500/20"
                                : "bg-purple-500/10 text-purple-300/90 border-purple-500/20"
                            }`}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {(project.links.length > 0 || project.gallery) && (
                      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 mt-auto">
                        {project.links.map((link) => (
                          <motion.a
                            key={link.label + link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                              project.category === "Professional Work"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/50"
                                : "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50"
                            }`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {link.label === "View on Website" ? "Website" : link.label === "View on GitHub" ? "GitHub" : link.label === "View on Play Store" ? "App Store" : link.label}
                          </motion.a>
                        ))}
                        {project.gallery && (
                          <motion.button
                            onClick={() => openGallery(project.gallery!)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                              project.category === "Professional Work"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/50"
                                : "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50"
                            }`}
                          >
                            <Play className="h-3.5 w-3.5" />
                            Gallery
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

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
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/*<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-cyan-500" />*/}
              
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {currentGallery.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {currentGallery.images[galleryIndex]?.label || `Image ${galleryIndex + 1}`} <span className="mx-2">•</span> {galleryIndex + 1} / {currentGallery.images.length}
                    </p>
                  </div>
                  <button
                    onClick={closeGallery}
                    className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Carousel */}
                <Carousel
                  items={currentGallery.images.map(img => ({
                    ...img,
                    orientation: (img.orientation === 'portrait' || img.orientation === 'landscape') 
                      ? img.orientation as 'portrait' | 'landscape' 
                      : undefined
                  }))}
                  initialIndex={galleryIndex}
                  onIndexChange={handleIndexChange}
                  showIndicators={true}
                  showThumbnails={true}
                  autoPlay={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
