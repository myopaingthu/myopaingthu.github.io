<script setup>
import HeroIcon from '../components/HeroIcon.vue'

const experienceTimeline = [
  {
    role: 'Frontend Developer',
    company: 'NOCA.AI',
    period: 'June 2025 - Present',
    bullets: [
      'Contributed to the development of an AI-powered project, focusing on frontend implementation.',
      'Built user-friendly and responsive interfaces with React.js.',
      'Collaborated closely with backend engineers to integrate AI-driven features.'
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Phluid Worldwide',
    period: 'Feb 2025 - Present',
    bullets: [
      'Contributed to the development of an ISO compliance system that enables users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration. The system was built using Laravel Filament.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'uab bank',
    period: 'Jan 2024 - Present',
    bullets: [
      'Mainly contribute in core banking system migration projects, enhancing system reliability, reducing human error by 30%, and improving user experience through automation enhancements.',
      'Successfully launched a social media system with multimedia management and an in-app gift system that facilitates real-time user interactions and reward claiming. Built with Laravel, MySQL, and Livewire, system streamlines dynamic form control within the admin backend.',
      'Designed, developed, and launched a Payroll Processing System to streamline operations for internal teams and partner companies.',
      'Designed and implemented admin and client admin portals for the Sermal feature in the uab Pay mobile wallet application.',
      'Successfully migrated the Clearing House System and Operation Cash Management System from legacy stacks to modern PHP and MS SQL Server versions.',
      'Maintain and troubleshoot other core banking support modules to ensure smooth operation.',
      'Mentor and train interns and junior team members, ensuring a smooth onboarding process and skill development for newcomers.',
    ],
  },
  {
    role: 'Backend Developer',
    company: 'Super Seven Stars Co., Ltd Myanmar',
    period: 'Jan 2023 - Jan 2024',
    bullets: [
      'Designed and developed APIs and Admin Portals for an On-Demand Grocery and Food Service platform, incorporating advanced algorithms such as real-time location-based delivery matching.',
      'Fully developed APIs and Admin Portals for a Classified Car Marketplace platform, providing a seamless user experience for buying and selling vehicles.',
      'Contributed to all stages of the development lifecycle, ensuring robust architecture and efficient performance.',
    ],
  },
  {
    role: 'Junior Developer',
    company: 'METATEAM MYANMAR Co., Ltd',
    period: 'Nov 2021 - Jan 2023',
    bullets: [
      "Developed and maintained APIs and Admin Portals for the Evaluation Management System, collaborating with senior team members to support a Japanese restaurant's operational needs.",
      'Maintained and updated the Japan Television Programs Guide System, developed using Vue 3 Composition API with TypeScript.',
      'Maintained and updated Japanese systems, including the Book Guide and Review System for Students.',
    ],
  },
]
</script>

<template>
  <section class="relative pb-24">
    <div class="mb-12 space-y-4 text-center" data-animate>
      <span class="badge mx-auto bg-primary/10 text-primary text-xl">Experience</span>
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Career journey & impact</h2>
      <p class="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">
        Empowering teams with thoughtful engineering, system modernization, and human-centered mentoring across diverse domains.
      </p>
    </div>

    <div class="space-y-8" data-animate>
      <article v-for="experience in experienceTimeline" :key="experience.role + experience.company" class="rounded-3xl border border-white/60 bg-white/85 p-7 text-left shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/70">
        <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div class="flex items-start gap-4">
            <div class="rounded-2xl bg-primary/10 p-3 text-primary">
              <HeroIcon name="briefcase" class="h-7 w-7" />
            </div>
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{{ experience.period }}</p>
              <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ experience.role }}</h3>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ experience.company }}</p>
            </div>
          </div>
        </div>
        <ul class="mt-6 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <li v-for="point in experience.bullets" :key="point" class="flex gap-3">
            <span class="mt-[6px] h-2 w-2 flex-shrink-0 rounded-full bg-primary/70"></span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
