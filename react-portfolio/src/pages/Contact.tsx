import { Phone, Mail, Linkedin, Github, Send } from "lucide-react";
import { contactMethods, availability } from "../data/portfolio";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  ShimmerButton,
} from "../components/Animations";

const iconMap: Record<string, React.ReactNode> = {
  Phone: <Phone className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github: <Github className="h-5 w-5" />,
};

export default function Contact() {
  return (
    <section className="relative pb-16">
      {/* Header */}
      <div className="mb-12 space-y-4 text-center">
        <AnimatedSection>
          <span className="badge mx-auto bg-primary/15 text-primary">
            Contact
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Let's build something{" "}
            <span className="gradient-text">impactful</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mx-auto max-w-xl text-base text-slate-400">
            Want to work together or have a question? Reach out to me!
          </p>
        </AnimatedSection>
      </div>

      {/* Contact Content */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Contact Methods */}
        <AnimatedSection delay={0.2}>
          <div className="glass-card relative overflow-hidden p-8">
            {/* Background decoration */}
            <div className="absolute -top-32 left-1/3 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

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

              <div className="mt-8">
                <a href="mailto:paingthumyo41297@gmail.com">
                  <ShimmerButton className="w-full justify-center">
                    Start a conversation
                    <Send className="h-4 w-4" />
                  </ShimmerButton>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Availability Card */}
        <AnimatedSection delay={0.3}>
          <div className="glass-card h-full p-8">
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
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
