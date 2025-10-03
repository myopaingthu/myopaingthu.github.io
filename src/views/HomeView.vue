<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroIcon from '../components/HeroIcon.vue'

const router = useRouter()

const taglineLines = ['Building modern web experiences!']
const displayedTaglineLines = ref(taglineLines.map(() => ''))
let lineIndex = 0
let charIndex = 0
let typingTimeout

function typeTagline() {
  if (lineIndex >= taglineLines.length) return

  const currentLine = taglineLines[lineIndex]
  if (charIndex <= currentLine.length) {
    displayedTaglineLines.value[lineIndex] += currentLine.charAt(charIndex)
    charIndex += 1
    typingTimeout = window.setTimeout(typeTagline, 55)
  } else {
    lineIndex += 1
    charIndex = 0
    if (lineIndex < taglineLines.length) {
      typingTimeout = window.setTimeout(typeTagline, 320)
    }
  }
}

const heroHighlights = ['PHP', 'JavaScript', 'Laravel', 'Vue', 'React']

function goToContact() {
  router.push({ name: 'contact' })
}

function goToProjects() {
  router.push({ name: 'projects' })
}

onMounted(() => {
  typeTagline()
})

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
})
</script>

<template>
  <section class="relative pb-24">
    <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="space-y-7" data-animate>
        <div class="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-primary">
          <HeroIcon name="code-bracket-square" class="h-10 w-10" />
          <span class="text-xl font-semibold uppercase tracking-[0.35em]">Software Engineer</span>
        </div>
        <div class="space-y-3">
          <div class="flex flex-col font-mono text-lg text-primary/80">
            <span>{{ displayedTaglineLines[0] }}</span>
          </div>
          <h1 class="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Hi, I'm <span class="text-primary">Myo Paing Thu</span>
          </h1>
          <p class="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Results-driven <strong class="font-semibold text-primary">Software Engineer</strong> with 5+ years of experience in FinTech, Core Banking, E-commerce, and Japanese Web Solutions. I love building scalable, secure, and impactful software.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <span v-for="highlight in heroHighlights" :key="highlight" class="chip">
            {{ highlight }}
          </span>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <button
            @click="goToContact"
            class="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.02] hover:bg-primary-dark focus:outline-none"
          >
            Let's collaborate
            <HeroIcon name="users" class="h-5 w-5" />
          </button>
          <button
            @click="goToProjects"
            class="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-white/70 px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-primary/10 transition hover:border-primary/60 hover:text-primary-dark dark:bg-slate-950/60"
          >
            View projects
            <HeroIcon name="folder" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="relative" data-animate>
        <div class="glass-card relative overflow-hidden px-6 pb-6 pt-8">
          <div class="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25"></div>
          <div class="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl shadow-primary/10">
            <img src="/public/images/image.png" alt="Profile portrait" class="h-[420px] w-full object-cover object-center object-top" />
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/50 bg-white/80 p-4 text-left shadow-md shadow-primary/5 dark:border-white/10 dark:bg-slate-900/70">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Current Focus</p>
              <p class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">Backend, Frontend, AI, and Cloud</p>
            </div>
            <div class="rounded-2xl border border-white/50 bg-white/80 p-4 text-left shadow-md shadow-primary/5 dark:border-white/10 dark:bg-slate-900/70">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Experience</p>
              <p class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">5+ years of full-stack delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
