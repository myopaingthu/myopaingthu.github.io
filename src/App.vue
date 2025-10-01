<script setup>
import { computed, defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

const iconPaths = {
  'bars-3': {
    paths: [{ d: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' }],
  },
  'x-mark': {
    paths: [{ d: 'M6 18 18 6M6 6l12 12' }],
  },
  'arrow-down': {
    paths: [{ d: 'M12 4.5v15m0 0 6.75-6.75M12 19.5 5.25 12.75' }],
  },
  'arrow-up': {
    paths: [{ d: 'M12 19.5V4.5m0 0L5.25 11.25M12 4.5l6.75 6.75' }],
  },
  'play-circle': {
    paths: [
      { d: 'M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z' },
      { d: 'M10.125 9.75 15 12l-4.875 2.25v-4.5z', strokeLinejoin: 'round', strokeLinecap: 'round' },
    ],
  },
  'chevron-left': {
    paths: [{ d: 'M15.75 19.5 8.25 12l7.5-7.5' }],
  },
  'chevron-right': {
    paths: [{ d: 'M8.25 4.5 15.75 12l-7.5 7.5' }],
  },
  sun: {
    paths: [
      { d: 'M12 3.75V5.25m0 13.5V20.25m8.25-8.25H20.25m-16.5 0H3.75m13.59-6.09 1.06-1.06m-11.18 0-1.06 1.06m0 11.18 1.06 1.06m11.18 0 1.06-1.06', strokeLinejoin: 'round', strokeLinecap: 'round' },
      { d: 'M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' },
    ],
  },
  moon: {
    paths: [{ d: 'M21 12.75A9 9 0 1111.25 3a7.5 7.5 0 009.75 9.75z' }],
  },
}

const HeroIcon = defineComponent({
  name: 'HeroIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { attrs }) {
    return () => {
      const icon = iconPaths[props.name]
      if (!icon) {
        return null
      }
      return h(
        'svg',
        {
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor',
          'stroke-width': 1.5,
          'aria-hidden': 'true',
          ...attrs,
        },
        icon.paths.map((path, index) =>
          h('path', {
            key: index,
            d: path.d,
            stroke: path.stroke ?? 'currentColor',
            fill: path.fill ?? 'none',
            'stroke-linecap': path.strokeLinecap ?? 'round',
            'stroke-linejoin': path.strokeLinejoin ?? 'round',
          })
        )
      )
    }
  },
})

const store = useStore()
const navOpen = ref(false)

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]
const sectionIds = navItems.map(item => item.id)
const activeSection = ref(sectionIds[0])

const taglineLines = ['Building modern', 'web experiences']
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

const heroHighlights = ['FinTech', 'Core Banking', 'E-commerce', 'Japanese Web Solutions']

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/myopaingthu', icon: 'arrow-up' },
  { label: 'LinkedIn', href: 'http://linkedin.com/in/myo-paing-thu-027aaa214', icon: 'arrow-up' },
]

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'arrow-down',
    items: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Bootstrap', 'jQuery', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: 'arrow-down',
    items: ['PHP', 'Laravel', 'Express.js', 'Node.js', 'Livewire', 'Filament'],
  },
  {
    title: 'Database',
    icon: 'arrow-down',
    items: ['MySQL', 'MongoDB', 'MS SQL Server', 'Redis', 'Firebase'],
  },
  {
    title: 'DevOps & Tools',
    icon: 'arrow-down',
    items: ['Docker', 'AWS'],
  },
]

const projects = [
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

const experienceTimeline = [
  {
    role: 'Senior Software Engineer',
    company: 'Phluid Worldwide',
    period: 'Feb 2025 - Present',
    bullets: [
      'Contributed to the development of an ISO compliance system that enables users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration. The system was built using Laravel Filament.',
    ],
  },
  {
    role: 'Senior Software Engineer',
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

const contactMethods = [
  {
    label: 'Phone',
    value: '+66 95 120 0272',
    href: 'tel:+66951200272',
    icon: 'arrow-down',
  },
  {
    label: 'Email',
    value: 'paingthumyo41297@gmail.com',
    href: 'mailto:paingthumyo41297@gmail.com',
    icon: 'arrow-up',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/myo-paing-thu-027aaa214',
    href: 'http://linkedin.com/in/myo-paing-thu-027aaa214',
    icon: 'play-circle',
  },
  {
    label: 'GitHub',
    value: 'github.com/myopaingthu',
    href: 'https://github.com/myopaingthu',
    icon: 'play-circle',
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

const showBackToTop = ref(false)

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  navOpen.value = false
}

function updateActiveSection() {
  if (typeof window === 'undefined') return
  const scrollPosition = window.scrollY + window.innerHeight / 3
  let current = sectionIds[0]
  sectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el && scrollPosition >= el.offsetTop) {
      current = id
    }
  })
  activeSection.value = current
}

function handleScroll() {
  if (typeof window === 'undefined') return
  updateActiveSection()
  showBackToTop.value = window.scrollY > 320
}

let observer

function initIntersectionObserver() {
  if (typeof window === 'undefined') return
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const animatedElements = document.querySelectorAll('[data-animate]')

  if (prefersReducedMotion.matches) {
    animatedElements.forEach(el => el.classList.add('in-view'))
    return
  }

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  animatedElements.forEach(el => observer?.observe(el))
}

onMounted(() => {
  typeTagline()
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  initIntersectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
  observer?.disconnect()
})
</script>

<template>
  <div :class="[store.state.darkMode ? 'dark' : '', 'min-h-screen']">
    <div
      class="relative min-h-screen overflow-hidden bg-gradient-to-br from-background-light via-white to-blue-50 transition-colors duration-500 dark:from-background-dark dark:via-slate-950 dark:to-slate-900"
    >
      <div class="pointer-events-none absolute inset-0 bg-grid-primary opacity-40 dark:opacity-10"></div>
      <div class="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30"></div>
      <div class="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"></div>

      <header class="fixed inset-x-0 top-0 z-50">
        <div class="mx-auto max-w-6xl px-4">
          <div
            class="mt-6 flex items-center justify-between gap-4 rounded-full border border-white/60 bg-white/80 px-5 py-3 shadow-glow backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-950/70"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HeroIcon name="sun" class="h-5 w-5" />
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.35em] text-primary">Portfolio</p>
                <p class="text-base font-semibold text-slate-800 dark:text-white">Myo Paing Thu</p>
              </div>
            </div>

            <nav class="hidden items-center gap-2 md:flex">
              <button
                v-for="item in navItems"
                :key="item.id"
                @click="scrollToSection(item.id)"
                class="nav-pill"
                :class="activeSection === item.id ? 'nav-pill-active' : 'text-slate-500 dark:text-slate-400'"
              >
                {{ item.label }}
              </button>
            </nav>

            <div class="flex items-center gap-2">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="hidden h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-500 transition-colors duration-300 hover:text-primary dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 md:inline-flex"
              >
                <HeroIcon :name="link.icon" class="h-5 w-5" />
              </a>

              <button
                @click="store.commit('toggleDarkMode')"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-600 transition-colors duration-300 hover:text-primary dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
                aria-label="Toggle theme"
              >
                <HeroIcon v-if="store.state.darkMode" name="sun" class="h-5 w-5" />
                <HeroIcon v-else name="moon" class="h-5 w-5" />
              </button>

              <button
                @click="navOpen = true"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-slate-600 shadow-sm transition-colors duration-300 hover:text-primary dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 md:hidden"
                aria-label="Open navigation"
              >
                <HeroIcon name="bars-3" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <transition name="fade">
        <div v-if="navOpen" class="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden">
          <div class="mx-4 mt-28 rounded-3xl bg-white/95 p-6 shadow-2xl dark:bg-slate-950/95">
            <div class="mb-6 flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.35em] text-primary">Navigate</p>
                <p class="text-lg font-semibold text-slate-700 dark:text-slate-100">Quick access</p>
              </div>
              <button
                @click="navOpen = false"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-primary dark:border-slate-800"
                aria-label="Close navigation"
              >
                <HeroIcon name="x-mark" class="h-6 w-6" />
              </button>
            </div>
            <div class="flex flex-col gap-3">
              <button
                v-for="item in navItems"
                :key="item.id"
                @click="scrollToSection(item.id)"
                class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-base font-medium text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-300"
              >
                {{ item.label }}
                <HeroIcon name="arrow-down" class="h-5 w-5 rotate-[-90deg]" />
              </button>
            </div>
            <div class="mt-6 grid grid-cols-2 gap-3">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-300"
              >
                <HeroIcon :name="link.icon" class="h-5 w-5" />
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </transition>

      <main class="relative mx-auto max-w-6xl px-4 pt-32 pb-20 md:pt-48">
        <section id="hero" class="relative pb-24">
          <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div class="space-y-7" data-animate>
              <div class="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-primary">
                <HeroIcon name="play-circle" class="h-4 w-4" />
                <span class="text-xs font-semibold uppercase tracking-[0.35em]">Software Engineer</span>
              </div>
              <div class="space-y-3">
                <div class="flex flex-col font-mono text-lg text-primary/80">
                  <span>{{ displayedTaglineLines[0] }}</span>
                  <span>{{ displayedTaglineLines[1] }}</span>
                </div>
                <h1 class="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
                  Hi, I'm <span class="text-primary">Myo Paing Thu</span>
                </h1>
                <p class="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  Results-driven <strong class="font-semibold text-primary">Software Engineer</strong> with 3+ years of experience in FinTech, Core Banking, E-commerce, and Japanese Web Solutions. I love building scalable, secure, and impactful software.
                </p>
              </div>
              <div class="flex flex-wrap gap-3">
                <span v-for="highlight in heroHighlights" :key="highlight" class="chip">
                  {{ highlight }}
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-4">
                <button
                  @click="scrollToSection('contact')"
                  class="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.02] hover:bg-primary-dark focus:outline-none"
                >
                  Let's collaborate
                  <HeroIcon name="arrow-down" class="h-5 w-5" />
                </button>
                <button
                  @click="scrollToSection('projects')"
                  class="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-white/70 px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-primary/10 transition hover:border-primary/60 hover:text-primary-dark dark:bg-slate-950/60"
                >
                  View projects
                  <HeroIcon name="arrow-down" class="h-5 w-5" />
                </button>
              </div>
            </div>

            <div class="relative" data-animate>
              <div class="glass-card relative overflow-hidden px-6 pb-6 pt-8">
                <div class="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25"></div>
                <div class="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/60 shadow-2xl shadow-primary/10">
                  <img src="/public/images/prof.jpg" alt="Profile portrait" class="h-[420px] w-full object-cover object-center" />
                </div>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-2xl border border-white/50 bg-white/80 p-4 text-left shadow-md shadow-primary/5 dark:border-white/10 dark:bg-slate-900/70">
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Current Focus</p>
                    <p class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">Core banking & FinTech platforms</p>
                  </div>
                  <div class="rounded-2xl border border-white/50 bg-white/80 p-4 text-left shadow-md shadow-primary/5 dark:border-white/10 dark:bg-slate-900/70">
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Experience</p>
                    <p class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">3+ years of full-stack delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="scrollToSection('about')"
            class="group absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-primary/20 bg-white/70 p-4 text-primary shadow-lg shadow-primary/10 transition hover:border-primary/40 hover:text-primary-dark dark:bg-slate-950/70"
            aria-label="Scroll to about section"
          >
            <HeroIcon name="arrow-down" class="h-6 w-6 animate-scroll-bounce" />
          </button>
        </section>

        <section id="about" class="relative pb-24">
          <div class="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-white/60 dark:from-primary/20 dark:via-transparent dark:to-slate-900/80"></div>
          <div class="glass-card relative overflow-hidden px-6 py-12 md:px-10">
            <div class="absolute -top-24 right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"></div>
            <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div class="space-y-6" data-animate>
                <span class="badge bg-primary/10 text-primary">About Me</span>
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Blending product thinking with technical precision</h2>
                <p class="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  I specialize in both frontend and backend development, with expertise in PHP, JavaScript, Vue.js, and advanced proficiency in Laravel. I enjoy collaborating in teams and embracing new technologies to deliver efficient projects.
                </p>
                <div class="flex items-start gap-4 rounded-2xl border border-white/50 bg-white/80 p-5 shadow-md shadow-primary/10 dark:border-white/10 dark:bg-slate-900/70">
                  <div class="rounded-2xl bg-primary/10 p-3 text-primary">
                    <HeroIcon name="play-circle" class="h-7 w-7" />
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
        <section id="projects" class="relative pb-24">
          <div class="mb-12 space-y-4 text-center" data-animate>
            <span class="badge mx-auto bg-primary/10 text-primary">Projects</span>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Selected work & case studies</h2>
            <p class="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">
              A curated collection of professional delivery and learning explorations spanning FinTech, operations tooling, and immersive user experiences.
            </p>
          </div>

          <div class="grid gap-8 md:grid-cols-2" data-animate>
            <article
              v-for="project in projects"
              :key="project.title"
              class="flex h-full flex-col justify-between rounded-3xl border border-white/60 bg-white/80 p-7 text-left shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/70"
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span
                    class="badge"
                    :class="project.category === 'Professional Work'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'"
                  >
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
                <a
                  v-for="link in project.links"
                  :key="link.label"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:text-primary-dark"
                >
                  <HeroIcon name="arrow-up" class="h-4 w-4" />
                  {{ link.label }}
                </a>
                <button
                  v-if="project.gallery"
                  type="button"
                  @click="openGallery(project.gallery)"
                  class="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:text-primary-dark"
                >
                  <HeroIcon name="play-circle" class="h-5 w-5" />
                  View Demo Gallery
                </button>
              </div>
            </article>
          </div>
        </section>

        <section id="experience" class="relative pb-24">
          <div class="mb-12 space-y-4 text-center" data-animate>
            <span class="badge mx-auto bg-primary/10 text-primary">Experience</span>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Career journey & impact</h2>
            <p class="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Empowering teams with thoughtful engineering, system modernization, and human-centered mentoring across diverse domains.
            </p>
          </div>

          <div class="space-y-8" data-animate>
            <article
              v-for="experience in experienceTimeline"
              :key="experience.role + experience.company"
              class="rounded-3xl border border-white/60 bg-white/85 p-7 text-left shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/70"
            >
              <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div class="flex items-start gap-4">
                  <div class="rounded-2xl bg-primary/10 p-3 text-primary">
                    <HeroIcon name="play-circle" class="h-7 w-7" />
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

        <section id="contact" class="relative pb-16">
          <div class="mb-12 space-y-4 text-center" data-animate>
            <span class="badge mx-auto bg-primary/10 text-primary">Contact</span>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Let's build something impactful</h2>
            <p class="mx-auto max-w-xl text-base text-slate-600 dark:text-slate-300">
              Want to work together or have a question? Reach out to me!
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-[1fr_0.9fr]" data-animate>
            <div class="glass-card relative overflow-hidden px-6 py-10">
              <div class="absolute -top-24 left-1/3 h-60 w-60 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"></div>
              <h3 class="text-2xl font-semibold text-slate-900 dark:text-white">Let's create your next milestone</h3>
              <p class="mt-3 text-base text-slate-600 dark:text-slate-300">
                Share your ideas, product vision, or technical challenges—I’m ready to collaborate on scalable solutions.
              </p>
              <div class="mt-8 grid gap-4">
                <a
                  v-for="method in contactMethods"
                  :key="method.label"
                  :href="method.href"
                  class="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 text-left shadow-md shadow-primary/5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70"
                >
                  <div class="rounded-2xl bg-primary/10 p-3 text-primary">
                    <HeroIcon :name="method.icon" class="h-6 w-6" />
                  </div>
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{{ method.label }}</p>
                    <p class="text-base font-semibold text-slate-800 dark:text-slate-100">{{ method.value }}</p>
                  </div>
                </a>
              </div>
              <a
                href="mailto:paingthumyo41297@gmail.com"
                class="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:scale-[1.02] hover:bg-primary-dark"
              >
                Start a conversation
                <HeroIcon name="arrow-up" class="h-5 w-5 rotate-180" />
              </a>
            </div>

            <div class="glass-card px-6 py-10" data-animate>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Availability</h3>
              <p class="mt-3 text-base text-slate-600 dark:text-slate-300">
                I'm available for full-time opportunities and impactful collaborations in FinTech, operations tooling, and product-led initiatives.
              </p>
              <div class="mt-8 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <p>• Based in Thailand with remote collaboration across time zones.</p>
                <p>• Passionate about end-to-end product delivery and engineering mentorship.</p>
                <p>• Focused on building resilient, secure, and user-centric platforms.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="border-t border-white/60 bg-white/80 py-6 text-center text-sm text-slate-500 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-400">
        © {{ new Date().getFullYear() }} Myo Paing Thu. Crafted with care.
      </footer>

      <button
        v-show="showBackToTop"
        @click="scrollToSection('hero')"
        class="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary text-white shadow-lg shadow-primary/30 transition hover:scale-105 hover:bg-primary-dark"
        aria-label="Back to top"
      >
        <HeroIcon name="arrow-up" class="h-6 w-6" />
      </button>
    </div>

    <div
      v-if="currentGallery"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-2xl rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl dark:border-white/10 dark:bg-slate-950/95">
        <button
          @click="closeGallery"
          class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:text-primary dark:border-slate-800"
          aria-label="Close gallery"
        >
          <HeroIcon name="x-mark" class="h-6 w-6" />
        </button>
        <div class="mb-4 text-center">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ currentGallery.title }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ currentGalleryImage?.label }}</p>
        </div>
        <div class="flex items-center justify-center gap-4">
          <button
            @click="prevGalleryImage"
            :disabled="activeGalleryIndex === 0"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition disabled:opacity-40 disabled:hover:scale-100 hover:scale-105"
            aria-label="Previous image"
          >
            <HeroIcon name="chevron-left" class="h-5 w-5" />
          </button>
          <div
            class="flex items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-slate-100 shadow-inner dark:border-white/10 dark:bg-slate-900"
            :class="currentGalleryImage?.orientation === 'landscape' ? 'h-60 w-full max-w-xl' : 'h-[28rem] w-60'"
          >
            <img :src="currentGalleryImage?.src" :alt="currentGalleryImage?.label" class="h-full w-full object-contain" />
          </div>
          <button
            @click="nextGalleryImage"
            :disabled="currentGallery && activeGalleryIndex === currentGallery.images.length - 1"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition disabled:opacity-40 disabled:hover:scale-100 hover:scale-105"
            aria-label="Next image"
          >
            <HeroIcon name="chevron-right" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
