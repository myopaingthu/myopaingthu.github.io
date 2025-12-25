import { useState } from "react";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { experienceTimeline } from "../data/portfolio";
import {
  StaggerContainer,
  StaggerItem,
  GlowingCard,
} from "../components/Animations";

export default function Experience() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  
  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const companyLinks: Record<string, string> = {
    "NOCA.AI": "https://noca.ai",
    "Phluid Worldwide": "https://phluid.world/",
    "uab bank": "https://uab.com.mm",
    "Super Seven Stars Co., Ltd Myanmar": "https://www.supersevenstars.com/",
    "METATEAM MYANMAR Co., Ltd": "https://metateammyanmar.com/en/",
  };
  return (
    <section className="relative pb-16 md:mt-20">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 -translate-x-1/2 z-0" />

        <StaggerContainer className="space-y-12 md:space-y-20" staggerDelay={0.1}>
          {experienceTimeline.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedCards.has(index);
            const companyUrl = companyLinks[exp.company] || "https://example.com";
            
            return (
              <StaggerItem key={`${exp.role}-${exp.company}`}>
                <div className="relative grid grid-cols-1 md:grid-cols-2 relative">
                  <div className={`hidden md:block flex-1 ${isLeft ? 'pr-12' : 'order-3 pl-12'}`}>
                    <GlowingCard className="relative group">
                      <div className={`space-y-4 ${!isExpanded ? 'max-h-96 overflow-hidden' : ''}`}>
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                            {exp.period}
                          </span>
                          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-cyan-400 transition-all duration-300">
                            {exp.role}
                          </h3>
                          <p className="text-base font-medium text-slate-400">
                            <a href={companyUrl} target="_blank" rel="noopener noreferrer">
                              {exp.company}
                            </a>
                          </p>
                        </div>

                        <ul className="space-y-3 pt-2">
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex gap-3 text-sm leading-relaxed text-slate-300"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {exp.bullets.length > 3 && (
                        <button
                          onClick={() => toggleExpanded(index)}
                          className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-cyan-400 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              See less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              See more
                            </>
                          )}
                        </button>
                      )}
                    </GlowingCard>
                  </div>

                  {/*<div className="hidden md:flex shrink-0 w-0.5 items-center justify-center relative z-10">
                    <div className="absolute left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border-2 border-primary/50 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-primary/20">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                  </div>*/}

                  <div className={`hidden md:block h-100 flex-1 ${isLeft ? 'order-3 pl-12' : 'pr-12'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-sm" style={{ height: '100%' }}>
                      <img
                        src={`//image.thum.io/get/${companyUrl}`}
                        className="w-full"
                        style={{ border: 'none', height: '100%' }}
                        title={`${exp.company} website preview`}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="md:hidden w-full">
                    <GlowingCard className="relative">
                      <div className={`space-y-4 ${!isExpanded ? 'max-h-96 overflow-hidden' : ''}`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/50 flex items-center justify-center shrink-0">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary block mb-1">
                              {exp.period}
                            </span>
                            <h3 className="text-xl font-bold text-white">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-medium text-slate-400">
                              <a href={companyUrl} target="_blank" rel="noopener noreferrer">
                                {exp.company}
                              </a>
                            </p>
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex gap-3 text-sm leading-relaxed text-slate-300"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {exp.bullets.length > 3 && (
                        <button
                          onClick={() => toggleExpanded(index)}
                          className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-cyan-400 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              See less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              See more
                            </>
                          )}
                        </button>
                      )}
                    </GlowingCard>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
