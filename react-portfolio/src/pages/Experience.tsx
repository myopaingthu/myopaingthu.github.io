import { Briefcase } from "lucide-react";
import { experienceTimeline } from "../data/portfolio";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  GlowingCard,
} from "../components/Animations";

export default function Experience() {
  return (
    <section className="relative pb-16">
      {/* Header */}
      <div className="mb-12 space-y-4 text-center">
        <AnimatedSection>
          <span className="badge mx-auto bg-primary/15 text-primary">
            Experience
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Career journey & <span className="gradient-text">impact</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mx-auto max-w-2xl text-base text-slate-400">
            Empowering teams with thoughtful engineering, system modernization,
            and human-centered mentoring across diverse domains.
          </p>
        </AnimatedSection>
      </div>

      {/* Timeline */}
      <StaggerContainer className="relative space-y-6" staggerDelay={0.15}>
        {/* Timeline line */}
        <div className="absolute left-[27px] top-8 hidden h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:block" />

        {experienceTimeline.map((exp, index) => (
          <StaggerItem key={`${exp.role}-${exp.company}`}>
            <GlowingCard className="relative">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* Timeline dot */}
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary md:flex">
                  <Briefcase className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4 flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-slate-400">
                      {exp.company}
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex gap-3 text-sm leading-relaxed text-slate-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlowingCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
