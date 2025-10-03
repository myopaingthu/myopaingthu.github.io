<script setup>
import HeroIcon from '../components/HeroIcon.vue'

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'code-bracket',
    items: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Bootstrap', 'jQuery', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: 'server-stack',
    items: ['PHP', 'Laravel', 'Express.js', 'Node.js', 'Livewire', 'Filament'],
  },
  {
    title: 'Database',
    icon: 'circle-stack',
    items: ['MySQL', 'MongoDB', 'MS SQL Server', 'Redis', 'Firebase'],
  },
  {
    title: 'DevOps & Tools',
    icon: 'wrench-screwdriver',
    items: ['Docker', 'AWS'],
  },
]
</script>

<template>
  <section class="relative pb-24">
    <div class="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-white/60 dark:from-primary/20 dark:via-transparent dark:to-slate-900/80"></div>
    <div class="glass-card relative overflow-hidden px-6 py-12 md:px-10">
      <div class="absolute -top-24 right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"></div>
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div class="space-y-6" data-animate>
          <span class="badge bg-primary/10 text-primary text-xl">About Me</span>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Blending product thinking with technical precision</h2>
          <p class="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            I specialize in both frontend and backend development, with expertise in PHP, JavaScript, Vue.js, and advanced proficiency in Laravel. I enjoy collaborating in teams and embracing new technologies to deliver efficient projects.
          </p>
          <div class="flex items-start gap-4 rounded-2xl border border-white/50 bg-white/80 p-5 shadow-md shadow-primary/10 dark:border-white/10 dark:bg-slate-900/70">
            <div class="rounded-2xl bg-primary/10 p-3 text-primary">
              <HeroIcon name="academic-cap" class="h-7 w-7" />
            </div>
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Education</p>
              <p class="mt-1 text-base font-semibold text-slate-800 dark:text-slate-100">Bachelor of Computer Science | Software Engineering</p>
              <p class="text-sm text-slate-600 dark:text-slate-300">University of Information Technology, Yangon</p>
            </div>
          </div>
        </div>

        <div class="space-y-6" data-animate>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Skills</h3>
          </div>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="group in skillGroups"
              :key="group.title"
              class="rounded-2xl border border-white/50 bg-white/80 p-5 shadow-md shadow-primary/10 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70"
            >
              <div class="mb-4 flex items-center gap-3">
                <div class="rounded-xl bg-primary/10 p-2 text-primary">
                  <HeroIcon :name="group.icon" class="h-6 w-6" />
                </div>
                <span class="text-base font-semibold text-slate-800 dark:text-slate-100">{{ group.title }}</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
