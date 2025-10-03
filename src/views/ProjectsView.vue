<script setup>
import { computed, ref } from 'vue'
import HeroIcon from '../components/HeroIcon.vue'

const projects = [
  {
    title: 'NOCA.ai',
    category: 'Professional Work',
    description:
      "An AI-powered automation platform where users can create many automation workflows from various SaaS like SalesForce, Google Drive and DropBox. I've involved as a frontend developer in building this platform.",
    tags: ['React', 'TypeScript', 'Material UI', 'Node.js', 'WebSocket'],
    links: [
      {
        label: 'View on Website',
        href: 'https://noca.ai/',
      }
    ],
  },
  {
    title: 'ISO Compliance System',
    category: 'Professional Work',
    description:
      'A comprehensive system enabling users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration.',
    tags: ['Laravel', 'Filament', 'Python', 'Livewire', 'Tailwind'],
    links: [],
  },
  {
    title: 'Social in uab pay',
    category: 'Professional Work',
    description:
      'A feature-rich social media system with multimedia management and an in-app gift system that facilitates real-time user interactions and reward claiming. Streamlines dynamic form control within the admin backend.',
    tags: ['Laravel', 'MySQL', 'Payment Gateways'],
    links: [
      {
        label: 'View on Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.uab.uabbankpay&pcampaignid=web_share',
      },
    ],
    gallery: 'social',
  },
  {
    title: 'Payroll Processing System',
    category: 'Professional Work',
    description:
      'A Payroll Processing System to streamline operations for internal teams and partner companies. This module enables the operations team to upload and process payroll data efficiently and integrates with external HR service providers via API. The system, built using Laravel 9 and MS SQL Server, incorporates background scheduling to handle large datasets seamlessly.',
    tags: ['Laravel 9', 'MS SQL Server', 'Background Jobs', 'API Integration'],
    links: [],
  },
  {
    title: 'Sermal Admin Portals',
    category: 'Professional Work',
    description:
      'Admin and client admin portals for the Sermal feature in the uab Pay mobile wallet application. These portals include advanced role-based permission management and dynamic forms to enhance the user experience.',
    tags: ['Laravel 9', 'MySQL', 'Livewire'],
    links: [
      {
        label: 'View on Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.uab.uabbankpay&pcampaignid=web_share',
      },
    ],
    gallery: 'sermal',
  },
  {
    title: 'On-Demand Grocery & Food Service',
    category: 'Professional Work',
    description:
      'Incorporating advanced algorithms such as real-time location-based delivery matching. The project featured real-time data handling with WebSocket for broadcasting, Firebase SDK for notifications, and Redis for optimized performance. It also included FCM push notifications and integrated payment systems.',
    tags: ['Laravel 9', 'MySQL', 'JavaScript', 'Firebase SDK', 'WebSocket', 'Redis'],
    links: [],
    gallery: 'grocery',
  },
  {
    title: 'Classified Car Marketplace Platform',
    category: 'Professional Work',
    description:
      'A Classified Car Marketplace platform, providing a seamless user experience for buying and selling vehicles. The system included FCM push notifications and payment integrations, ensuring smooth communication and secure transactions.',
    tags: ['Laravel 9', 'MySQL', 'JavaScript', 'Firebase SDK', 'WebSocket', 'Redis'],
    links: [],
    gallery: 'car',
  },
  {
    title: 'Evaluation Management System',
    category: 'Professional Work',
    description:
      "The Evaluation Management System, collaborating with senior team members to support a Japanese restaurant's operational needs.",
    tags: ['Laravel 6', 'MySQL', 'JavaScript'],
    links: [
      {
        label: 'View on Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.thanxi.canayell&pcampaignid=web_share',
      },
    ],
  },
  {
    title: 'Book Guide and Review System for Students',
    category: 'Professional Work',
    description:
      'The Book Guide and Review System for Students which is developed with Phalcon, incorporating user-requested changes and enhancements.',
    tags: ['Phalcon'],
    links: [
      { label: 'Visit Website', href: 'https://sonicmoov.com/works/studico/' },
    ],
  },
  {
    title: 'Responsive Language Learning App',
    category: 'Learning Project',
    description:
      'A responsive web app for language learning, featuring interactive exercises and progress tracking. Built with Vue 3 Composition API and TypeScript.',
    tags: ['Vue 3', 'TypeScript'],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/myopaingthu/language-learning-app' },
      { label: 'Live Demo', href: 'https://iridescent-melba-df9013.netlify.app/' },
    ],
  },
  {
    title: 'Mini Buy and Sell E-commerce with Admin Dashboard',
    category: 'Learning Project',
    description:
      'A simple e-commerce platform with admin dashboard, product management, and other features. Built for learning and experimentation.',
    tags: ['MySQL', 'jQuery', 'Laravel 8'],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/myopaingthu/Mini-buy-and-sell-ecommerce' },
    ],
  },
  {
    title: 'Real time forum app (Udemy Course)',
    category: 'Learning Project',
    description:
      'A real-time discussion platform where users can create topics, post replies, and interact instantly. Features real-time updates, user authentication, topic and post management, and admin moderation. Built with Laravel 8, MySQL, Vue.js, and Laravel WebSocket.',
    tags: ['MySQL', 'Vue.js', 'Laravel 8', 'Laravel WebSocket'],
    links: [
      { label: 'GitHub (Laravel Backend)', href: 'https://github.com/myopaingthu/Forum-backend' },
      { label: 'GitHub (Vue.js Frontend)', href: 'https://github.com/myopaingthu/Forum-frontend' },
    ],
  },
  {
    title: 'Inventory Management System',
    category: 'Learning Project',
    description:
      'A backend system for managing inventory, supporting CRUD operations for products, stock tracking, and reporting. Built with Node.js, Express.js, and MongoDB.',
    tags: ['Node.js', 'Express.js', 'MongoDB'],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/myopaingthu/Inventory_Management_System' },
    ],
  },
  {
    title: 'Library Management System',
    category: 'Learning Project',
    description:
      'A web-based system for managing library resources, including book inventory, member management, and lending operations. Built with Laravel 8, MySQL, and Docker.',
    tags: ['MySQL', 'Laravel 8', 'Docker'],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/myopaingthu/Library_Management_System' },
    ],
  },
  {
    title: 'Online Counselling System',
    category: 'Learning Project',
    description:
      'A web-based platform designed to facilitate online counselling sessions, appointment management, and secure communication between counsellors and clients. Built with Laravel 8, MySQL, and Docker for scalable deployment.',
    tags: ['MySQL', 'Laravel 8', 'Docker'],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/myopaingthu/Online_Counselling_System' },
    ],
  },
]

const galleries = {
  social: {
    title: 'Social in uab pay',
    images: [
      { src: '/images/social_home.jpg', label: 'Social Project Screenshot 1', orientation: 'portrait' },
      { src: '/images/social_landing.jpg', label: 'Social Project Screenshot 2', orientation: 'portrait' },
      { src: '/images/social_profile.jpg', label: 'Social Project Screenshot 3', orientation: 'portrait' },
    ],
  },
  sermal: {
    title: 'Sermal Admin Portals',
    images: [
      { src: '/images/sm_home.jpg', label: 'Sermal Portal Screenshot 1', orientation: 'portrait' },
      { src: '/images/sm_info.jpg', label: 'Sermal Portal Screenshot 2', orientation: 'portrait' },
    ],
  },
  grocery: {
    title: 'On-Demand Grocery & Food Service',
    images: [
      { src: '/images/nm_dh.png', label: 'Dashboard Desktop Layout', orientation: 'landscape' },
      { src: '/images/nm_hm.png', label: 'Mobile View Layout', orientation: 'portrait' },
    ],
  },
  car: {
    title: 'Classified Car Marketplace Platform',
    images: [
      { src: '/images/na_dh.png', label: 'Dashboard Desktop Layout', orientation: 'landscape' },
      { src: '/images/na_view.png', label: 'Mobile View Layout', orientation: 'portrait' },
    ],
  },
}

const activeGalleryKey = ref(null)
const activeGalleryIndex = ref(0)

const currentGallery = computed(() => (activeGalleryKey.value ? galleries[activeGalleryKey.value] : null))
const currentGalleryImage = computed(() => {
  const gallery = currentGallery.value
  if (!gallery) return null
  return gallery.images[activeGalleryIndex.value]
})

function openGallery(key, index = 0) {
  if (!galleries[key]) return
  activeGalleryKey.value = key
  activeGalleryIndex.value = index
}

function closeGallery() {
  activeGalleryKey.value = null
}

function nextGalleryImage() {
  const gallery = currentGallery.value
  if (!gallery) return
  if (activeGalleryIndex.value < gallery.images.length - 1) {
    activeGalleryIndex.value += 1
  }
}

function prevGalleryImage() {
  if (activeGalleryIndex.value > 0) {
    activeGalleryIndex.value -= 1
  }
}
</script>

<template>
  <section class="relative pb-24">
    <div class="mb-12 space-y-4 text-center" data-animate>
      <span class="badge mx-auto bg-primary/10 text-primary text-xl">Projects</span>
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Selected work & case studies</h2>
      <p class="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">
        A curated collection of professional delivery and learning explorations spanning FinTech, operations tooling, and immersive user experiences.
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-2" data-animate>
      <article v-for="project in projects" :key="project.title" class="flex h-full flex-col justify-between rounded-3xl border border-white/60 bg-white/80 p-7 text-left shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/70">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="badge" :class="project.category === 'Professional Work'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'">
              {{ project.category }}
            </span>
          </div>
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ project.title }}</h3>
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </div>

        <div v-if="project.links.length || project.gallery" class="mt-6 flex flex-wrap items-center gap-3 border-t border-white/60 pt-4 dark:border-white/10">
          <a v-for="link in project.links" :key="link.label" :href="link.href" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:text-primary-dark">
            <HeroIcon name="external-link" class="h-4 w-4" />
            {{ link.label }}
          </a>
          <button v-if="project.gallery" type="button" @click="openGallery(project.gallery)" class="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:text-primary-dark">
            <HeroIcon name="play-circle" class="h-5 w-5" />
            View Demo Gallery
          </button>
        </div>
      </article>
    </div>

    <div v-if="currentGallery" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm px-4" role="dialog" aria-modal="true">
      <div class="relative w-full max-w-2xl rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl dark:border-white/10 dark:bg-slate-950/95">
        <button @click="closeGallery" class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:text-primary dark:border-slate-800" aria-label="Close gallery">
          <HeroIcon name="x-mark" class="h-6 w-6" />
        </button>
        <div class="mb-4 text-center">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white max-w-[80%] mx-auto">{{ currentGallery.title }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ currentGalleryImage?.label }}</p>
        </div>
        <div class="flex items-center justify-center gap-4">
          <button @click="prevGalleryImage" :disabled="activeGalleryIndex === 0" class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition disabled:opacity-40 disabled:hover:scale-100 hover:scale-105" aria-label="Previous image">
            <HeroIcon name="chevron-left" class="h-5 w-5" />
          </button>
          <div class="flex items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-slate-100 shadow-inner dark:border-white/10 dark:bg-slate-900" :class="currentGalleryImage?.orientation === 'landscape' ? 'h-60 w-full max-w-xl' : 'h-[28rem] w-60'">
            <img :src="currentGalleryImage?.src" :alt="currentGalleryImage?.label" class="h-full w-full object-contain" />
          </div>
          <button @click="nextGalleryImage" :disabled="currentGallery && activeGalleryIndex === currentGallery.images.length - 1" class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition disabled:opacity-40 disabled:hover:scale-100 hover:scale-105" aria-label="Next image">
            <HeroIcon name="chevron-right" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
