import { GraduationCap, Code, Server, Database, Wrench, Mail, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo, skillGroups } from "../data/portfolio";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../components/Animations";
import BlurText from "../components/BlurText";
import SpotlightCard from "../components/SpotlightCard";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-5 w-5" />,
  Server: <Server className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
};

export default function About() {
  return (
    <section className="relative pb-16">
      {/* Main Grid Layout */}
      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Left Column - Profile Card */}
        <AnimatedSection>
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.3)">
            <div className="space-y-6">
              {/* Avatar */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-cyan-500/20 p-4"
                >
                  <img
                    src="/images/he_sitting_with_notebook.png"
                    alt="Myo Paing Thu"
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              </div>

              {/* Name & Title */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  {personalInfo.name}
                </h2>
                <p className="text-primary font-semibold">
                  {personalInfo.title}
                </p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Myanmar</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{personalInfo.experience}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-xs">Available for opportunities</span>
                </div>
              </div>

              {/* Education */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/15 p-2 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1">
                      Education
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {personalInfo.education.degree}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {personalInfo.education.institution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </AnimatedSection>

        {/* Right Column - About & Skills */}
        <div className="space-y-8">
          {/* About Section */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-cyan-500 rounded-full" />
                <h3 className="text-2xl font-bold text-white">About Me</h3>
              </div>
              <BlurText
                text={personalInfo.about}
                className="text-base leading-relaxed text-slate-300"
                delay={20}
                animateBy="words"
              />
            </div>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-cyan-500 rounded-full" />
                <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
              </div>

              <StaggerContainer className="grid gap-4 md:grid-cols-2" staggerDelay={0.08}>
                {skillGroups.map((group, index) => (
                  <StaggerItem key={group.title}>
                    <SpotlightCard 
                      spotlightColor={
                        index === 0 ? "rgba(59, 130, 246, 0.2)" :
                        index === 1 ? "rgba(6, 182, 212, 0.2)" :
                        index === 2 ? "rgba(139, 92, 246, 0.2)" :
                        "rgba(16, 185, 129, 0.2)"
                      }
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 p-2 text-primary"
                          >
                            {iconMap[group.icon]}
                          </motion.div>
                          <span className="text-base font-bold text-white">
                            {group.title}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item, itemIndex) => (
                            <motion.span
                              key={item}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + itemIndex * 0.05 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="chip text-xs cursor-default"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* Stats Grid */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Experience", value: "5+", suffix: "Years" },
                { label: "Projects", value: "50+", suffix: "Completed" },
                { label: "Technologies", value: "20+", suffix: "Mastered" },
                { label: "Clients", value: "30+", suffix: "Satisfied" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {stat.suffix}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
