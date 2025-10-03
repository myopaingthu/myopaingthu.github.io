<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterView, RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import HeroIcon from '../components/HeroIcon.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const navOpen = ref(false)
const showBackToTop = ref(false)
let observer

const navItems = [
  { label: 'Home', to: { name: 'home' }, icon: 'home' },
  { label: 'About', to: { name: 'about' }, icon: 'identification' },
  { label: 'Projects', to: { name: 'projects' }, icon: 'folder' },
  { label: 'Experience', to: { name: 'experience' }, icon: 'briefcase' },
  { label: 'Contact', to: { name: 'contact' }, icon: 'chat-bubble-bottom-center' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/myopaingthu', icon: 'command-line' },
  { label: 'LinkedIn', href: 'http://linkedin.com/in/myo-paing-thu-027aaa214', icon: 'building-office' },
]

function handleNavigation(item) {
  navOpen.value = false
  router.push(item.to)
}

function onScroll() {
  showBackToTop.value = window.scrollY > 320
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeNavOnOutsideClick(event) {
  if (navOpen.value && !event.target.closest('.mobile-nav-modal') && !event.target.closest('button[aria-label*="navigation"]')) {
    navOpen.value = false
  }
}

function toggleNav() {
  navOpen.value = !navOpen.value
}

function initIntersectionObserver() {
  if (typeof window === 'undefined') return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const animatedElements = document.querySelectorAll('[data-animate]')

  observer?.disconnect()

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
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', closeNavOnOutsideClick)
  onScroll()
  initIntersectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', closeNavOnOutsideClick)
  observer?.disconnect()
})

watch(
  () => route.fullPath,
  async () => {
    navOpen.value = false
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'auto' })
    initIntersectionObserver()
  }
)
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
              <div>
                <p class="text-xs uppercase tracking-[0.35em] text-primary">Portfolio</p>
                <p class="text-base font-semibold text-slate-800 dark:text-white">Myo Paing Thu</p>
              </div>
            </div>

            <nav class="hidden items-center gap-2 md:flex">
              <RouterLink
                v-for="item in navItems"
                :key="item.label"
                :to="item.to"
                class="nav-pill"
                :class="route.name === item.to.name ? 'nav-pill-active' : 'text-slate-500 dark:text-slate-400 hover:none'"
              >
                {{ item.label }}
              </RouterLink>
            </nav>

            <div class="flex items-center gap-2">
              <!--<a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="hidden h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-500 transition-colors duration-300 hover:text-primary dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 md:inline-flex"
              >
                <HeroIcon :name="link.icon" class="h-5 w-5" />
              </a>-->

              <button
                @click="store.commit('toggleDarkMode')"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-600 transition-colors duration-300 hover:text-primary dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
                aria-label="Toggle theme"
              >
                <HeroIcon v-if="store.state.darkMode" name="sun" class="h-5 w-5" />
                <HeroIcon v-else name="moon" class="h-5 w-5" />
              </button>

              <button
                @click="toggleNav"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-slate-600 shadow-sm transition-colors duration-300 hover:text-primary dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 md:hidden"
                :aria-label="navOpen ? 'Close navigation' : 'Open navigation'"
                type="button"
              >
                <div class="hamburger-icon" :class="{ 'is-active': navOpen }">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <transition name="modal">
        <div v-if="navOpen" class="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden" @click="navOpen = false">
          <div class="mobile-nav-modal mx-4 mt-28 rounded-3xl bg-white/95 p-6 shadow-2xl dark:bg-slate-950/95 relative" @click.stop>
            <div class="flex flex-col gap-3">
              <button
                v-for="item in navItems"
                :key="item.label"
                @click="handleNavigation(item)"
                class="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-left text-base font-medium text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-300"
              >
                <HeroIcon :name="item.icon" class="h-6 w-6" />
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <main class="relative mx-auto max-w-6xl px-4 pt-32 pb-20 md:pt-48">
        <RouterView />
      </main>

      <footer class="border-t border-white/60 bg-white/80 py-6 text-center text-sm text-slate-500 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-400">
        © {{ new Date().getFullYear() }} Myo Paing Thu. Crafted with care.
      </footer>

      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary text-white shadow-lg shadow-primary/30 transition hover:scale-105 hover:bg-primary-dark"
        aria-label="Back to top"
      >
        <HeroIcon name="arrow-up" class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .mobile-nav-modal,
.modal-leave-active .mobile-nav-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .mobile-nav-modal,
.modal-leave-to .mobile-nav-modal {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

.hamburger-icon {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.hamburger-icon span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: currentColor;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.hamburger-icon.is-active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-icon.is-active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.hamburger-icon.is-active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.hamburger-icon:not(.is-active) span:nth-child(1) {
  transform: translateY(0) rotate(0deg);
}

.hamburger-icon:not(.is-active) span:nth-child(2) {
  opacity: 1;
  transform: scale(1);
}

.hamburger-icon:not(.is-active) span:nth-child(3) {
  transform: translateY(0) rotate(0deg);
}
</style>
