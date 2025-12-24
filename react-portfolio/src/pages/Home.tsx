import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/portfolio";
import {
  AnimatedSection,
  FadeIn,
  ShimmerButton,
} from "../components/Animations";
import TextType from "../components/TextType";
import BlurText from "../components/BlurText";
import SpotlightCard from "../components/SpotlightCard";

// Code snippets for each skill
const codeSnippets: Record<string, { lines: JSX.Element[], color: string }> = {
  PHP: {
    color: "#8b5cf6",
    lines: [
      <div key="1" className="text-blue-400">{'<?php'}</div>,
      <div key="2" className="text-purple-400">$developer <span className="text-white">=</span> [</div>,
      <div key="3" className="pl-4 text-gray-400">'name' <span className="text-white">=&gt;</span> <span className="text-green-400">'Myo Paing Thu'</span>,</div>,
      <div key="4" className="pl-4 text-gray-400">'role' <span className="text-white">=&gt;</span> <span className="text-green-400">'Software Engineer'</span>,</div>,
      <div key="5" className="pl-4 text-gray-400">'experience' <span className="text-white">=&gt;</span> <span className="text-orange-400">5</span>,</div>,
      <div key="6" className="pl-4 text-gray-400">'skills' <span className="text-white">=&gt;</span> [</div>,
      <div key="7" className="pl-8 text-green-400">'Laravel', 'Livewire', 'Filament'</div>,
      <div key="8" className="pl-4 text-gray-400">],</div>,
      <div key="9" className="pl-4 text-gray-400">'passion' <span className="text-white">=&gt;</span> <span className="text-green-400">'Building Impact'</span></div>,
      <div key="10" className="text-purple-400">];</div>,
      <div key="11" className="text-blue-400">{'?>'}</div>,
    ]
  },
  JavaScript: {
    color: "#f59e0b",
    lines: [
      <div key="1" className="text-purple-400">const <span className="text-blue-400">developer</span> = {'{'}</div>,
      <div key="2" className="pl-4 text-gray-400">name: <span className="text-green-400">'Myo Paing Thu'</span>,</div>,
      <div key="3" className="pl-4 text-gray-400">role: <span className="text-green-400">'Software Engineer'</span>,</div>,
      <div key="4" className="pl-4 text-gray-400">experience: <span className="text-orange-400">5</span>,</div>,
      <div key="5" className="pl-4 text-gray-400">skills: [</div>,
      <div key="6" className="pl-8 text-green-400">'Node.js', 'Express', 'TypeScript'</div>,
      <div key="7" className="pl-4 text-gray-400">],</div>,
      <div key="8" className="pl-4 text-gray-400">passion: <span className="text-green-400">'Building Impact'</span></div>,
      <div key="9" className="text-purple-400">{'}'}</div>,
    ]
  },
  Laravel: {
    color: "#ef4444",
    lines: [
      <div key="1" className="text-blue-400">{'<?php'}</div>,
      <div key="2" className="text-purple-400">namespace <span className="text-blue-400">App\Models</span>;</div>,
      <div key="3"></div>,
      <div key="4" className="text-purple-400">class <span className="text-blue-400">Developer</span></div>,
      <div key="5" className="text-white">{'{'}</div>,
      <div key="6" className="pl-4 text-purple-400">public <span className="text-blue-400">string</span> $name = <span className="text-green-400">'Myo Paing Thu'</span>;</div>,
      <div key="7" className="pl-4 text-purple-400">public <span className="text-blue-400">string</span> $role = <span className="text-green-400">'Software Engineer'</span>;</div>,
      <div key="8" className="pl-4 text-purple-400">public <span className="text-blue-400">int</span> $experience = <span className="text-orange-400">5</span>;</div>,
      <div key="9" className="pl-4 text-purple-400">public <span className="text-blue-400">array</span> $skills = [<span className="text-green-400">'Backend', 'API', 'Database'</span>];</div>,
      <div key="10" className="text-white">{'}'}</div>,
    ]
  },
  Vue: {
    color: "#10b981",
    lines: [
      <div key="1" className="text-gray-400">{'<script setup>'}</div>,
      <div key="2" className="text-purple-400">const <span className="text-blue-400">developer</span> = <span className="text-blue-400">reactive</span>({'{'}</div>,
      <div key="3" className="pl-4 text-gray-400">name: <span className="text-green-400">'Myo Paing Thu'</span>,</div>,
      <div key="4" className="pl-4 text-gray-400">role: <span className="text-green-400">'Software Engineer'</span>,</div>,
      <div key="5" className="pl-4 text-gray-400">experience: <span className="text-orange-400">5</span>,</div>,
      <div key="6" className="pl-4 text-gray-400">skills: [<span className="text-green-400">'Vue 3', 'Composition API', 'Pinia'</span>],</div>,
      <div key="7" className="pl-4 text-gray-400">passion: <span className="text-green-400">'Building Impact'</span></div>,
      <div key="8" className="text-purple-400">{'})'}</div>,
      <div key="9" className="text-gray-400">{'</script>'}</div>,
    ]
  },
  React: {
    color: "#06b6d4",
    lines: [
      <div key="1" className="text-purple-400">interface <span className="text-blue-400">Developer</span> {'{'}</div>,
      <div key="2" className="pl-4 text-gray-400">name: <span className="text-blue-400">string</span>;</div>,
      <div key="3" className="pl-4 text-gray-400">role: <span className="text-blue-400">string</span>;</div>,
      <div key="4" className="pl-4 text-gray-400">experience: <span className="text-blue-400">number</span>;</div>,
      <div key="5" className="pl-4 text-gray-400">skills: <span className="text-blue-400">string[]</span>;</div>,
      <div key="6" className="text-purple-400">{'}'}</div>,
      <div key="7"></div>,
      <div key="8" className="text-purple-400">const <span className="text-blue-400">developer</span>: <span className="text-blue-400">Developer</span> = {'{'}</div>,
      <div key="9" className="pl-4 text-gray-400">name: <span className="text-green-400">'Myo Paing Thu'</span>,</div>,
      <div key="10" className="pl-4 text-gray-400">skills: [<span className="text-green-400">'React', 'TypeScript', 'Next.js'</span>]</div>,
      <div key="11" className="pl-4 text-gray-400">role: <span className="text-green-400">'Software Engineer'</span></div>,
      <div key="12" className="pl-4 text-gray-400">experience: <span className="text-green-400">5</span></div>,
      <div key="12" className="text-purple-400">{'}'}</div>,
    ]
  }
};

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState("PHP");
  
  const taglines = [
    "Building modern web experiences!",
    "Crafting scalable solutions!",
    "Turning ideas into reality!"
  ];

  const currentSnippet = codeSnippets[selectedSkill] || codeSnippets.PHP;

  return (
    <section className="relative pb-16 space-y-3">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left content */}
        <div className="space-y-8">
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              {/* Animated Tagline with TextType */}
              <div className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-primary overflow-hidden">
                <TextType
                  text={taglines}
                  typingSpeed={80}
                  deletingSpeed={50}
                  pauseDuration={2000}
                  loop={true}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-primary"
                />
              </div>

              {/* Name and Description with BlurText */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                  <span className="text-white">Hi, I'm </span>
                  <span className="gradient-text">{personalInfo.name}</span>
                </h1>
                <BlurText
                  text={personalInfo.description}
                  delay={50}
                  className="max-w-xl text-lg leading-relaxed text-slate-400"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Interactive Skill Tags */}
          <AnimatedSection delay={0.4}>
            <div className="flex flex-wrap gap-3">
              {personalInfo.heroHighlights.map((skill, index) => (
                <motion.button
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(skill)}
                  transition={{ 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }}
                  className={`chip cursor-pointer transition-all ${
                    selectedSkill === skill 
                      ? 'bg-primary/30 ring-2 ring-primary/50' 
                      : ''
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.5}>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/contact">
                <ShimmerButton>
                  Let's collaborate
                </ShimmerButton>
              </a>
              <a href="/projects">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-primary/10 transition-colors hover:border-primary/50 hover:bg-slate-900/80"
                >
                  View projects
                </motion.button>
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Right - Code Snippet Design */}
        <FadeIn delay={0.3} direction="left">
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72 border border-primary/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-96 h-96 border border-purple-500/20 rounded-full"
              />
            </div>

            {/* Center Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-8 shadow-2xl">
                {/* Code Window Header */}
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                {/* Code Content with AnimatePresence for smooth transitions */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSkill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 font-mono text-sm min-h-[280px]"
                  >
                    {currentSnippet.lines}
                  </motion.div>
                </AnimatePresence>

                {/* Floating Icons with dynamic color */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: currentSnippet.color,
                    boxShadow: `0 10px 25px ${currentSnippet.color}50`
                  }}
                >
                  <Code2 className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>

      {/* Info Cards with SpotlightCard - Below both columns */}
      <AnimatedSection delay={0.7}>
        <div className="grid gap-6 sm:grid-cols-2">
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Current Focus
              </p>
              <p className="text-lg font-medium text-slate-200">
                {personalInfo.currentFocus}
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                Experience
              </p>
              <p className="text-lg font-medium text-slate-200">
                {personalInfo.experience}
              </p>
            </div>
          </SpotlightCard>
        </div>
      </AnimatedSection>
    </section>
  );
}
