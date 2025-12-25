import { Phone, Mail, Linkedin, Github } from "lucide-react";
import { contactMethods, availability } from "../data/portfolio";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
} from "../components/Animations";
import SpotlightCard from "../components/SpotlightCard";

const iconMap: Record<string, React.ReactNode> = {
  Phone: <Phone className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github: <Github className="h-5 w-5" />,
};

export default function Contact() {
  return (
    <section className="relative pb-16 md:mt-20">

      {/* Contact Content */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Contact Methods */}
        <AnimatedSection delay={0.2}>
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)">
            <div className="relative">
              <h3 className="text-2xl font-semibold text-white">
                Let's create your next milestone
              </h3>
              <p className="mt-3 text-base text-slate-400">
                Share your ideas, product vision, or technical challenges—I'm
                ready to collaborate on scalable solutions.
              </p>

              <StaggerContainer className="mt-8 space-y-3" staggerDelay={0.1}>
                {contactMethods.map((method) => (
                  <StaggerItem key={method.label}>
                    <ScaleOnHover>
                      <a
                        href={method.href}
                        target={
                          method.label === "Phone" || method.label === "Email"
                            ? undefined
                            : "_blank"
                        }
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-800/40 px-5 py-4 transition-colors hover:border-primary/30 hover:bg-slate-800/60"
                      >
                        <div className="rounded-xl bg-primary/15 p-3 text-primary">
                          {iconMap[method.icon]}
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                            {method.label}
                          </p>
                          <p className="text-sm font-medium text-slate-200">
                            {method.value}
                          </p>
                        </div>
                      </a>
                    </ScaleOnHover>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </SpotlightCard>
        </AnimatedSection>

        {/* Availability Card */}
        <AnimatedSection delay={0.3}>
          <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="h-full">
            <h3 className="text-xl font-semibold text-white">Availability</h3>
            <p className="mt-3 text-base text-slate-400">{availability.intro}</p>

            <div className="mt-8 space-y-4">
              {availability.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-sm text-slate-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4 text-center">
                <p className="text-2xl font-bold text-primary">5+</p>
                <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">
                  Years Exp
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4 text-center">
                <p className="text-2xl font-bold text-primary">15+</p>
                <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">
                  Projects
                </p>
              </div>
            </div>
          </SpotlightCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
