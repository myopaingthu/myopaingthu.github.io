<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const $store = useStore()
const navOpen = ref(false)
const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  navOpen.value = false
  activeSection.value = id
}

// Animated typing tagline
const taglineLines = ['Building modern', 'web experiences']
const displayedTaglineLines = ref(['', ''])
let lineIndex = 0
let charIndex = 0
function typeTaglineLines() {
  if (lineIndex < taglineLines.length) {
    if (charIndex < taglineLines[lineIndex].length) {
      displayedTaglineLines.value[lineIndex] += taglineLines[lineIndex][charIndex]
      charIndex++
      setTimeout(typeTaglineLines, 45)
    } else {
      lineIndex++
      charIndex = 0
      setTimeout(typeTaglineLines, 350)
    }
  }
}
onMounted(() => {
  typeTaglineLines()
  // ... existing code ...
})

// Active section highlight
const sections = ['hero', 'about', 'projects', 'experience', 'contact']
const activeSection = ref('hero')
function handleScroll() {
  const offsets = sections.map(id => {
    const el = document.getElementById(id)
    return el ? el.getBoundingClientRect().top : Infinity
  })
  const index = offsets.findIndex(offset => offset > 0)
  activeSection.value = sections[Math.max(0, index - 1)] || 'hero'
}
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', handleScroll)
}

// Demo Gallery Modal for Social in uab pay
const showGallery = ref(false)
const galleryIndex = ref(0)
const galleryImages = [
  { src: '/images/social_home.jpg', label: 'Social Project Screenshot 1' },
  { src: '/images/social_landing.jpg', label: 'Social Project Screenshot 2' },
  { src: '/images/social_profile.jpg', label: 'Social Project Screenshot 3' },
]
const openGallery = (idx = 0) => {
  galleryIndex.value = idx
  showGallery.value = true
}
const closeGallery = () => {
  showGallery.value = false
}
const nextImage = () => {
  galleryIndex.value = (galleryIndex.value + 1) % galleryImages.length
}
const prevImage = () => {
  galleryIndex.value = (galleryIndex.value - 1 + galleryImages.length) % galleryImages.length
}

// Demo Gallery Modal for Sermal Admin Portals
const showSermalGallery = ref(false)
const sermalGalleryIndex = ref(0)
const sermalGalleryImages = [
  { src: '/images/sm_home.jpg', label: 'Sermal Portal Screenshot 1' },
  { src: '/images/sm_info.jpg', label: 'Sermal Portal Screenshot 2' },
]
const openSermalGallery = (idx = 0) => {
  sermalGalleryIndex.value = idx
  showSermalGallery.value = true
}
const closeSermalGallery = () => {
  showSermalGallery.value = false
}
const nextSermalImage = () => {
  sermalGalleryIndex.value = (sermalGalleryIndex.value + 1) % sermalGalleryImages.length
}
const prevSermalImage = () => {
  sermalGalleryIndex.value = (sermalGalleryIndex.value - 1 + sermalGalleryImages.length) % sermalGalleryImages.length
}

// Demo Gallery Modal for Grocery Project
const showGroceryGallery = ref(false)
const groceryGalleryIndex = ref(0)
const groceryGalleryImages = [
  { src: '/images/nm_dh.png', label: 'Dashboard Desktop Layout', isLandscape: true },
  { src: '/images/nm_hm.png', label: 'Mobile View Layout', isLandscape: false },
]
const openGroceryGallery = (idx = 0) => {
  groceryGalleryIndex.value = idx
  showGroceryGallery.value = true
}
const closeGroceryGallery = () => {
  showGroceryGallery.value = false
}
const nextGroceryImage = () => {
  groceryGalleryIndex.value = (groceryGalleryIndex.value + 1) % groceryGalleryImages.length
}
const prevGroceryImage = () => {
  groceryGalleryIndex.value = (groceryGalleryIndex.value - 1 + groceryGalleryImages.length) % groceryGalleryImages.length
}

// Demo Gallery Modal for Car Marketplace Project
const showCarMarketGallery = ref(false)
const carMarketGalleryIndex = ref(0)
const carMarketGalleryImages = [
  { src: '/images/na_dh.png', label: 'Dashboard Desktop Layout', isLandscape: true },
  { src: '/images/na_view.png', label: 'Mobile View Layout', isLandscape: false },
]
const openCarMarketGallery = (idx = 0) => {
  carMarketGalleryIndex.value = idx
  showCarMarketGallery.value = true
}
const closeCarMarketGallery = () => {
  showCarMarketGallery.value = false
}
const nextCarMarketImage = () => {
  carMarketGalleryIndex.value = (carMarketGalleryIndex.value + 1) % carMarketGalleryImages.length
}
const prevCarMarketImage = () => {
  carMarketGalleryIndex.value = (carMarketGalleryIndex.value - 1 + carMarketGalleryImages.length) % carMarketGalleryImages.length
}

// Back to Top button logic
const showBackToTop = ref(false)
function handleBackToTopScroll() {
  showBackToTop.value = window.scrollY > 300
}
onMounted(() => {
  window.addEventListener('scroll', handleBackToTopScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleBackToTopScroll)
})
</script>

<template>
  <div :class="[$store.state.darkMode ? 'dark' : '', 'bg-background-light dark:bg-background-dark min-h-screen font-sans transition-colors duration-500 text-[17px] md:text-[16px]']">
    <!-- Sidebar (desktop) -->
    <aside class="hidden md:fixed md:flex md:flex-col md:justify-between md:h-screen md:w-56 bg-white/90 dark:bg-gray-900/90 border-r border-gray-100 dark:border-gray-800 px-6 py-8 z-40 shadow-sm">
  <div>
        <div class="flex flex-col items-center mb-8">
          <h1 class="text-lg font-bold tracking-tight text-primary mb-1">MYO PAING THU</h1>
          <p class="text-gray-500 dark:text-gray-400 text-xs text-center">Software Engineer</p>
          <div class="mt-2 min-h-[40px] flex flex-col items-center">
            <span class="text-primary text-xs font-mono  block leading-tight">{{ displayedTaglineLines[0] }}</span>
            <span class="text-primary text-xs font-mono typing-tagline block leading-tight mt-1">{{ displayedTaglineLines[1] }}</span>
          </div>
        </div>
        <nav class="flex flex-col gap-2 text-base">
          <button
            v-for="section in sections"
            :key="section"
            @click="scrollToSection(section)"
            class="nav-link-clean sidebar-nav-link relative"
            :class="activeSection === section ? 'active-sidebar-link' : ''"
          >
            <span class="sidebar-link-underline">{{ section.charAt(0).toUpperCase() + section.slice(1) }}</span>
            <span v-if="activeSection === section" class="active-bar"></span>
          </button>
        </nav>
      </div>
      <div class="flex flex-col items-center gap-3 mt-8">
        <div class="flex gap-2">
          <a href="https://github.com/myopaingthu" target="_blank" class="text-gray-400 hover:text-primary transition" title="GitHub">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.99.01 1.99.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
          </a>
          <a href="http://linkedin.com/in/myo-paing-thu-027aaa214" target="_blank" class="text-gray-400 hover:text-primary transition" title="LinkedIn">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
          </a>
          <a href="tel:+66951200272" class="text-gray-400 hover:text-primary transition" title="Call">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-.96.96a16.06 16.06 0 006.36 6.36l.96-.96a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"/></svg>
          </a>
          <a href="mailto:paingthumyo41297@gmail.com" class="text-gray-400 hover:text-primary transition" title="Email">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 12v1a4 4 0 01-8 0v-1"/><rect width="20" height="14" x="2" y="6" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
          </a>
        </div>
        <button @click="$store.commit('toggleDarkMode')" class="w-[40px] h-[40px] rounded-full bg-primary/90 text-white dark:bg-primary-light dark:text-primary-dark shadow hover:scale-110 transition-transform duration-200">
          <span v-if="$store.state.darkMode">🌞</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Menu Button -->
    <button v-if="!navOpen" @click="navOpen = true" class="fixed top-3 left-3 z-50 md:hidden bg-primary text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center focus:outline-none" aria-label="Open Menu">
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    <!-- Top nav (mobile) -->
    <nav v-if="navOpen" class="fixed inset-0 bg-black/40 z-50 flex flex-col md:hidden">
      <div class="bg-white/95 dark:bg-gray-900/95 border-b border-gray-100 dark:border-gray-800 flex flex-col items-center gap-2 py-4 animate-fade-in shadow w-full max-w-xs mx-auto mt-6 rounded-xl relative">
        <button @click="navOpen = false" class="absolute top-2 right-2 p-2 text-primary focus:outline-none">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <button @click="scrollToSection('hero')" class="nav-link-clean w-full" @click.native="navOpen = false">Home</button>
        <button @click="scrollToSection('about')" class="nav-link-clean w-full" @click.native="navOpen = false">About</button>
        <button @click="scrollToSection('projects')" class="nav-link-clean w-full" @click.native="navOpen = false">Projects</button>
        <button @click="scrollToSection('experience')" class="nav-link-clean w-full" @click.native="navOpen = false">Experience</button>
        <button @click="scrollToSection('contact')" class="nav-link-clean w-full" @click.native="navOpen = false">Contact</button>
        <!-- Add dark mode toggle -->
        <div class="w-full flex justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button @click="$store.commit('toggleDarkMode')" class="w-[40px] h-[40px] rounded-full bg-primary/90 text-white dark:bg-primary-light dark:text-primary-dark shadow hover:scale-110 transition-transform duration-200">
            <span v-if="$store.state.darkMode">🌞</span>
            <span v-else>🌙</span>
          </button>
        </div>
      </div>
      <div class="flex-1" @click="navOpen = false"></div>
    </nav>

    <!-- Main content -->
    <main class="md:ml-56 px-4 md:px-12 mx-auto space-y-12 md:space-y-0 dark:bg-gray-900/90">
      <!-- Hero -->
      <section id="hero" class="relative flex flex-col items-center justify-center min-h-screen text-center animate-fade-in overflow-hidden pb-12 md:pb-0">
        <!-- Animated gradient background -->
        <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-blue-100/40 to-white dark:from-primary/20 dark:via-blue-900/30 dark:to-gray-900 animate-gradient-move"></div>
        <!-- Avatar icon -->
        <div class="mb-8 flex items-center justify-center">
          <div class="w-32 h-32 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg flex items-center justify-center border-4 border-primary/40 backdrop-blur-md overflow-hidden">
            <img src="/public/images/prof.jpg" alt="profile" class="w-full h-full object-cover object-center" style="aspect-ratio: 3/4;">
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-primary drop-shadow-lg animate-fade-in">Hi, I'm Myo Paing Thu</h1>
        <p class="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl animate-fade-in delay-100">Results-driven <strong class="text-primary">Software Engineer</strong> with 3+ years of experience in FinTech, Core Banking, E-commerce, and Japanese Web Solutions. I love building scalable, secure, and impactful software.</p>
        <button @click="scrollToSection('contact')" class="px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 animate-fade-in delay-200">Contact Me</button>
        <!-- Scroll down indicator -->
        <div id="scroll-indicator" @click="scrollToSection('about')" class="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center group animate-fade-in delay-300">
          <svg class="w-8 h-8 text-primary group-hover:text-primary-dark transition animate-point-down" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M6 10l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!--<span class="text-xs text-primary mt-1">Scroll</span>-->
        </div>
      </section>

      <!-- About -->
      <section id="about" class="relative flex flex-col items-center justify-center min-h-screen text-center animate-fade-in overflow-hidden pb-12 md:pb-0">
        <div class="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100/30 via-white/60 to-primary/10 dark:from-blue-900/20 dark:via-gray-900/60 dark:to-primary/20 animate-gradient-move"></div>
        <h2 class="text-3xl font-bold text-primary mb-4 animate-fade-in">About Me</h2>
        <div class="flex flex-col items-center max-w-2xl mx-auto animate-fade-in delay-100">
          <p class="text-gray-700 dark:text-gray-200 mb-4">I specialize in both frontend and backend development, with expertise in PHP, JavaScript, Vue.js, and advanced proficiency in Laravel. I enjoy collaborating in teams and embracing new technologies to deliver efficient projects.</p>
          <!-- Education Card -->
          <div class="flex items-center gap-4 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow p-4 mb-6 mt-2 max-w-xl mx-auto">
            <div class="flex-shrink-0">
              <svg class="w-10 h-10 text-primary/70" fill="rgb(59 130 246 / 0.7)" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9l0 57.1c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-57.1L48 93.3l0 65.1 15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9l-32 0c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4l0-71.8C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7L30.7 512C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z"/></svg>
            </div>
            <div class="text-left">
              <div class="font-semibold text-primary">Bachelor of Computer Science | Software Engineering</div>
              <div class="text-sm text-gray-700 dark:text-gray-200">University of Information Technology, Yangon</div>
            </div>
          </div>
          <!-- Skills Grid -->
          <div class="mt-4 w-full">
            <h3 class="text-lg font-semibold text-primary mb-2">Skills</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Frontend -->
              <div class="bg-white/70 dark:bg-gray-900/70 rounded-lg shadow p-4 flex flex-col gap-2 border border-primary/10 dark:border-primary/20">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 17v-2a4 4 0 014-4h8a4 4 0 014 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span class="font-semibold text-primary">Frontend</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">HTML</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">CSS</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">JavaScript</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Vue.js</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Bootstrap</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">jQuery</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Tailwind CSS</span>
                </div>
              </div>
              <!-- Backend -->
              <div class="bg-white/70 dark:bg-gray-900/70 rounded-lg shadow p-4 flex flex-col gap-2 border border-primary/10 dark:border-primary/20">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"/><path d="M16 3v4H8V3"/></svg>
                  <span class="font-semibold text-primary">Backend</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">PHP</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Laravel</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Express.js</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Node.js</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Livewire</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Filament</span>
                </div>
              </div>
              <!-- Database -->
              <div class="bg-white/70 dark:bg-gray-900/70 rounded-lg shadow p-4 flex flex-col gap-2 border border-primary/10 dark:border-primary/20">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/></svg>
                  <span class="font-semibold text-primary">Database</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">MySQL</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">MongoDB</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">MS SQL Server</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Redis</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Firebase</span>
                </div>
              </div>
              <!-- DevOps & Tools -->
              <div class="bg-white/70 dark:bg-gray-900/70 rounded-lg shadow p-4 flex flex-col gap-2 border border-primary/10 dark:border-primary/20">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2M19.364 19.364l-1.414-1.414M12 22v-2M4.636 19.364l1.414-1.414M2 12h2M4.636 4.636l1.414 1.414"/><circle cx="12" cy="12" r="5"/></svg>
                  <span class="font-semibold text-primary">DevOps & Tools</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Docker</span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">AWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="relative flex flex-col items-center justify-center min-h-screen text-center animate-fade-in overflow-hidden pb-[50px] pb-12 md:pb-[50px]">
        <div class="absolute inset-0 -z-10 bg-gradient-to-br from-white/60 via-blue-100/30 to-primary/10 dark:from-gray-900/60 dark:via-blue-900/20 dark:to-primary/20 animate-gradient-move"></div>
        <h2 class="text-3xl font-bold text-primary mb-8 animate-fade-in">Projects</h2>
        <div class="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto animate-fade-in delay-100">
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">ISO Compliance System</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A comprehensive system enabling users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration.</p>
            </div>
            
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Filament</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Python</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Livewire</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Tailwind</span>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">Social in uab pay</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A feature-rich social media system with multimedia management and an in-app gift system that facilitates real-time user interactions and reward claiming. Streamlines dynamic form control within the admin backend.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Payment Gateways</span>
            </div>

            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://play.google.com/store/apps/details?id=com.uab.uabbankpay&pcampaignid=web_share" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on Play Store</span>
              </a>
              <button @click="openGallery(0)" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors focus:outline-none">
                <span class="text-sm">View Demo Gallery</span>
              </button>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">Payroll Processing System</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A Payroll Processing System to streamline operations for internal teams and partner companies. This module enables the operations team to upload and process payroll data efficiently and integrates with external HR service providers via API. The system, built using Laravel 9 and MS SQL Server, incorporates background scheduling to handle large datasets seamlessly.</p>
            </div>

            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 9</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MS SQL Server</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Background Jobs</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">API Integration</span>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">Sermal Admin Portals</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">Admin and client admin portals for the Sermal feature in the uab Pay mobile wallet application. These portals include advanced role-based permission management and dynamic forms to enhance the user experience.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 9</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Livewire</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://play.google.com/store/apps/details?id=com.uab.uabbankpay&pcampaignid=web_share" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on Play Store</span>
              </a>
              <button @click="openSermalGallery(0)" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors focus:outline-none">
                <span class="text-sm">View Demo Gallery</span>
              </button>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">On-Demand Grocery & Food Service</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">Incorporating advanced algorithms such as real-time location-based delivery matching. The project featured real-time data handling with WebSocket for broadcasting, Firebase SDK for notifications, and Redis for optimized performance. It also included FCM push notifications and integrated payment systems.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 9</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">JavaScript</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Firebase SDK</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">WebSocket</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Redis</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <button @click="openGroceryGallery(0)" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors focus:outline-none">
                <span class="text-sm">View Demo Gallery</span>
              </button>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">Classified Car Marketplace Platform</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A Classified Car Marketplace platform, providing a seamless user experience for buying and selling vehicles. The system included FCM push notifications and payment integrations, ensuring smooth communication and secure transactions.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 9</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">JavaScript</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Firebase SDK</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">WebSocket</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Redis</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <button @click="openCarMarketGallery(0)" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors focus:outline-none">
                <span class="text-sm">View Demo Gallery</span>
              </button>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">Evaluation Management System</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">The Evaluation Management System, collaborating with senior team members to support a Japanese restaurant's operational needs.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 6</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">JavaScript</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://play.google.com/store/apps/details?id=com.thanxi.canayell&pcampaignid=web_share" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on Play Store</span>
              </a>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Professional Work</span>
              <h3 class="font-bold text-lg text-primary">Book Guide and Review System for Students</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">The Book Guide and Review System for Students which is developed with Phalcon, incorporating user-requested changes and enhancements.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Phalcon</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://sonicmoov.com/works/studico/" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">Visit Website</span>
              </a>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Learning Project</span>
              <h3 class="font-bold text-lg text-primary">Responsive Language Learning App</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A responsive web app for language learning, featuring interactive exercises and progress tracking. Built with Vue 3 Composition API and TypeScript.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Vue 3</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">TypeScript</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://github.com/myopaingthu/language-learning-app" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on GitHub</span>
              </a>
              <a href="https://iridescent-melba-df9013.netlify.app/" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">Live Demo</span>
              </a>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Learning Project</span>
              <h3 class="font-bold text-lg text-primary">Mini Buy and Sell E-commerce with Admin Dashboard</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A simple e-commerce platform with admin dashboard, product management, and other features. Built for learning and experimentation.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">jQuery</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 8</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://github.com/myopaingthu/Mini-buy-and-sell-ecommerce" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on GitHub</span>
              </a>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Learning Project</span>
              <h3 class="font-bold text-lg text-primary">Real time forum app (Udemy Course)</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A real-time discussion platform where users can create topics, post replies, and interact instantly. Features real-time updates, user authentication, topic and post management, and admin moderation. Built with Laravel 8, MySQL, Vue.js, and Laravel WebSocket.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Vue.js</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 8</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel WebSocket</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://github.com/myopaingthu/Forum-backend" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">GitHub (Laravel Backend)</span>
              </a>
              <a href="https://github.com/myopaingthu/Forum-frontend" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">GitHub (Vue.js Frontend)</span>
              </a>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Learning Project</span>
              <h3 class="font-bold text-lg text-primary">Inventory Management System</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A backend system for managing inventory, supporting CRUD operations for products, stock tracking, and reporting. Built with Node.js, Express.js, and MongoDB.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Node.js</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Express.js</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MongoDB</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://github.com/myopaingthu/Inventory_Management_System" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on GitHub</span>
              </a>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Learning Project</span>
              <h3 class="font-bold text-lg text-primary">Library Management System</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A web-based system for managing library resources, including book inventory, member management, and lending operations. Built with Laravel 8, MySQL, and Docker.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 8</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Docker</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://github.com/myopaingthu/Library_Management_System" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on GitHub</span>
              </a>
            </div>
          </div>
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Learning Project</span>
              <h3 class="font-bold text-lg text-primary">Online Counselling System</h3>
            </div>
            <div class="group relative">
              <p class="text-gray-700 dark:text-gray-200 text-sm h-32 flex">A web-based platform designed to facilitate online counselling sessions, appointment management, and secure communication between counsellors and clients. Built with Laravel 8, MySQL, and Docker for scalable deployment.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">MySQL</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Laravel 8</span>
              <span class="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Docker</span>
            </div>
            <!-- Project Links -->
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-4 justify-center">
              <a href="https://github.com/myopaingthu/Online_Counselling_System" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <span class="text-sm">View on GitHub</span>
              </a>
            </div>
          </div>
          
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="relative flex flex-col items-center justify-center min-h-screen text-center animate-fade-in overflow-hidden pb-[50px] pb-12 md:pb-[50px]">
        <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-blue-100/30 to-white/60 dark:from-primary/20 dark:via-blue-900/20 dark:to-gray-900/60 animate-gradient-move"></div>
        <h2 class="text-3xl font-bold text-primary mb-8 animate-fade-in">Experience</h2>
        <div class="flex flex-col gap-6 w-full max-w-4xl mx-auto animate-fade-in delay-100">
          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 text-left flex gap-6 items-start animate-fade-in hover:shadow-2xl transition-shadow duration-300">
            <div class="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 h-10 text-primary/70" viewBox="0 0 512 512"><path d="M176 56l0 40 160 0 0-40c0-4.4-3.6-8-8-8L184 48c-4.4 0-8 3.6-8 8zM128 96l0-40c0-30.9 25.1-56 56-56L328 0c30.9 0 56 25.1 56 56l0 40 0 32 0 352-256 0 0-352 0-32zM64 96l32 0 0 384-32 0c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64zM448 480l-32 0 0-384 32 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64z"/></svg>
            </div>
            <div class="flex-grow">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <h3 class="font-bold text-xl text-primary">Senior Software Engineer</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">Feb 2025 - Present</span>
              </div>
              <div class="text-gray-600 dark:text-gray-300 font-medium mb-3">Phluid Worldwide</div>
              <ul class="list-disc ml-6 text-gray-700 dark:text-gray-200 text-sm space-y-2">
                <li>Contributed to the development of an ISO compliance system that enables users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration. The system was built using Laravel Filament.</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 text-left flex gap-6 items-start animate-fade-in hover:shadow-2xl transition-shadow duration-300">
            <div class="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 h-10 text-primary/70" viewBox="0 0 512 512"><path d="M176 56l0 40 160 0 0-40c0-4.4-3.6-8-8-8L184 48c-4.4 0-8 3.6-8 8zM128 96l0-40c0-30.9 25.1-56 56-56L328 0c30.9 0 56 25.1 56 56l0 40 0 32 0 352-256 0 0-352 0-32zM64 96l32 0 0 384-32 0c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64zM448 480l-32 0 0-384 32 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64z"/></svg>
            </div>
            <div class="flex-grow">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <h3 class="font-bold text-xl text-primary">Senior Software Engineer</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">Jan 2024 - Present</span>
              </div>
              <div class="text-gray-600 dark:text-gray-300 font-medium mb-3">uab bank</div>
              <ul class="list-disc ml-6 text-gray-700 dark:text-gray-200 text-sm space-y-2">
                <li>Mainly contribute in core banking system migration projects, enhancing system reliability, reducing human error by 30%, and improving user experience through automation enhancements.</li>
                <li>Successfully launched a social media system with multimedia management and an in-app gift system that facilitates real-time user interactions and reward claiming. Built with Laravel, MySQL, and Livewire, system streamlines dynamic form control within the admin backend.</li>
                <li>Designed, developed, and launched a Payroll Processing System to streamline operations for internal teams and partner companies.</li>
                <li>Designed and implemented admin and client admin portals for the Sermal feature in the uab Pay mobile wallet application.</li>
                <li>Successfully migrated the Clearing House System and Operation Cash Management System from legacy stacks to modern PHP and MS SQL Server versions.</li>
                <li>Maintain and troubleshoot other core banking support modules to ensure smooth operation.</li>
                <li>Mentor and train interns and junior team members, ensuring a smooth onboarding process and skill development for newcomers.</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 text-left flex gap-6 items-start animate-fade-in hover:shadow-2xl transition-shadow duration-300">
            <div class="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 h-10 text-primary/70" viewBox="0 0 512 512"><path d="M176 56l0 40 160 0 0-40c0-4.4-3.6-8-8-8L184 48c-4.4 0-8 3.6-8 8zM128 96l0-40c0-30.9 25.1-56 56-56L328 0c30.9 0 56 25.1 56 56l0 40 0 32 0 352-256 0 0-352 0-32zM64 96l32 0 0 384-32 0c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64zM448 480l-32 0 0-384 32 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64z"/></svg>
            </div>
            <div class="flex-grow">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <h3 class="font-bold text-xl text-primary">Backend Developer</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">Jan 2023 - Jan 2024</span>
              </div>
              <div class="text-gray-600 dark:text-gray-300 font-medium mb-3">Super Seven Stars Co., Ltd Myanmar</div>
              <ul class="list-disc ml-6 text-gray-700 dark:text-gray-200 text-sm space-y-2">
                <li>Designed and developed APIs and Admin Portals for an On-Demand Grocery and Food Service platform, incorporating advanced algorithms such as real-time location-based delivery matching.</li>
                <li>Fully developed APIs and Admin Portals for a Classified Car Marketplace platform, providing a seamless user experience for buying and selling vehicles.</li>
                <li>Contributed to all stages of the development lifecycle, ensuring robust architecture and efficient performance.</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 text-left flex gap-6 items-start animate-fade-in hover:shadow-2xl transition-shadow duration-300">
            <div class="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 h-10 text-primary/70" viewBox="0 0 512 512"><path d="M176 56l0 40 160 0 0-40c0-4.4-3.6-8-8-8L184 48c-4.4 0-8 3.6-8 8zM128 96l0-40c0-30.9 25.1-56 56-56L328 0c30.9 0 56 25.1 56 56l0 40 0 32 0 352-256 0 0-352 0-32zM64 96l32 0 0 384-32 0c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64zM448 480l-32 0 0-384 32 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64z"/></svg>
            </div>
            <div class="flex-grow">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <h3 class="font-bold text-xl text-primary">Junior Developer</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">Nov 2021 - Jan 2023</span>
              </div>
              <div class="text-gray-600 dark:text-gray-300 font-medium mb-3">METATEAM MYANMAR Co., Ltd</div>
              <ul class="list-disc ml-6 text-gray-700 dark:text-gray-200 text-sm space-y-2">
                <li>Developed and maintained APIs and Admin Portals for the Evaluation Management System, collaborating with senior team members to support a Japanese restaurant's operational needs.</li>
                <li>Maintained and updated the Japan Television Programs Guide System, developed using Vue 3 Composition API with TypeScript.</li>
                <li>Maintained and updated Japanese systems, including the Book Guide and Review System for Students.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="relative flex flex-col items-center justify-center min-h-screen text-center animate-fade-in overflow-hidden pb-12 md:pb-0">
        <div class="absolute inset-0 -z-10 bg-gradient-to-br from-white/60 via-blue-100/30 to-primary/10 dark:from-gray-900/60 dark:via-blue-900/20 dark:to-primary/20 animate-gradient-move"></div>
        <h2 class="text-3xl font-bold text-primary mb-8 animate-fade-in">Contact</h2>
        <div class="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-8 max-w-lg mx-auto border border-primary/10 dark:border-primary/30 animate-fade-in delay-100">
          <p class="text-gray-700 dark:text-gray-200 text-lg font-medium mb-2">Want to work together or have a question? Reach out to me!</p>
          <div class="w-full flex flex-col gap-5 text-left">
            <div class="flex items-center gap-4">
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-xl">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-.96.96a16.06 16.06 0 006.36 6.36l.96-.96a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"/></svg>
              </span>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400 font-semibold">Phone</div>
                <a href="tel:+66951200272" class="text-base text-primary font-bold hover:underline">+66 95 120 0272</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-xl">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M16 12v1a4 4 0 01-8 0v-1"/><rect width="20" height="14" x="2" y="6" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
              </span>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400 font-semibold">Email</div>
                <a href="mailto:paingthumyo41297@gmail.com" class="text-base text-primary font-bold hover:underline">paingthumyo41297@gmail.com</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-xl">
                <svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              </span>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400 font-semibold">LinkedIn</div>
                <a href="http://linkedin.com/in/myo-paing-thu-027aaa214" target="_blank" class="text-base text-primary font-bold hover:underline">linkedin.com/in/myo-paing-thu-027aaa214</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-xl">
                <svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.99.01 1.99.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
              </span>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400 font-semibold">GitHub</div>
                <a href="https://github.com/myopaingthu" target="_blank" class="text-base text-primary font-bold hover:underline">github.com/myopaingthu</a>
              </div>
            </div>
          </div>
          <a href="mailto:paingthumyo41297@gmail.com" class="px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 mt-4">Email Me</a>
        </div>
      </section>
    </main>
    <!-- Back to Top Button -->
    <button v-show="showBackToTop" @click="scrollToSection('hero')" class="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center hover:bg-primary-dark transition-all duration-200 animate-fade-in" aria-label="Back to Top">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>

  <!-- Demo Gallery Modal -->
  <div v-if="showGallery" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 animate-fade-in">
      <button @click="closeGallery" class="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none">&times;</button>
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center gap-4 mb-4">
          <button @click="prevImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="galleryIndex === 0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div :class="[
            'w-48 h-96',
            'bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center overflow-hidden'
          ]">
            <img :src="galleryImages[galleryIndex].src" :alt="galleryImages[galleryIndex].label" class="object-contain max-h-full max-w-full" />
          </div>
          <button @click="nextImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="galleryIndex === galleryImages.length - 1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">{{ galleryImages[galleryIndex].label }}</div>
      </div>
    </div>
  </div>

  <!-- Sermal Gallery Modal -->
  <div v-if="showSermalGallery" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 animate-fade-in">
      <button @click="closeSermalGallery" class="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none">&times;</button>
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center gap-4 mb-4">
          <button @click="prevSermalImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="sermalGalleryIndex === 0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div :class="[
            'w-48 h-96',
            'bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center overflow-hidden'
          ]">
            <img :src="sermalGalleryImages[sermalGalleryIndex].src" :alt="sermalGalleryImages[sermalGalleryIndex].label" class="object-contain max-h-full max-w-full" />
          </div>
          <button @click="nextSermalImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="sermalGalleryIndex === sermalGalleryImages.length - 1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">{{ sermalGalleryImages[sermalGalleryIndex].label }}</div>
      </div>
    </div>
  </div>

  <!-- Grocery Gallery Modal -->
  <div v-if="showGroceryGallery" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 animate-fade-in">
      <button @click="closeGroceryGallery" class="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none">&times;</button>
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center gap-4 mb-4">
          <button @click="prevGroceryImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="groceryGalleryIndex === 0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div :class="[
            groceryGalleryImages[groceryGalleryIndex].isLandscape ? 'w-80 h-48' : 'w-48 h-96',
            'bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center overflow-hidden'
          ]">
            <img :src="groceryGalleryImages[groceryGalleryIndex].src" :alt="groceryGalleryImages[groceryGalleryIndex].label" class="object-contain max-h-full max-w-full" />
          </div>
          <button @click="nextGroceryImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="groceryGalleryIndex === groceryGalleryImages.length - 1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">{{ groceryGalleryImages[groceryGalleryIndex].label }}</div>
      </div>
    </div>
  </div>

  <!-- Car Marketplace Gallery Modal -->
  <div v-if="showCarMarketGallery" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 animate-fade-in">
      <button @click="closeCarMarketGallery" class="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none">&times;</button>
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center gap-4 mb-4">
          <button @click="prevCarMarketImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="carMarketGalleryIndex === 0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div :class="[
            carMarketGalleryImages[carMarketGalleryIndex].isLandscape ? 'w-80 h-48' : 'w-48 h-96',
            'bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center overflow-hidden'
          ]">
            <img :src="carMarketGalleryImages[carMarketGalleryIndex].src" :alt="carMarketGalleryImages[carMarketGalleryIndex].label" class="object-contain max-h-full max-w-full" />
          </div>
          <button @click="nextCarMarketImage" class="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition disabled:opacity-50" :disabled="carMarketGalleryIndex === carMarketGalleryImages.length - 1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">{{ carMarketGalleryImages[carMarketGalleryIndex].label }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.nav-link-clean {
  @apply px-2 py-1 rounded text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary bg-transparent font-medium text-left w-full transition-colors duration-200;
}
.animate-fade-in {
  animation: fadeIn 1s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-move {
  background-size: 200% 200%;
  animation: gradientMove 8s ease-in-out infinite;
}
@keyframes pointDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(12px); }
}
.animate-point-down {
  animation: pointDown 1.2s infinite cubic-bezier(0.4,0,0.2,1);
}
.typing-tagline {
  letter-spacing: 0.01em;
  white-space: pre;
  overflow: hidden;
  border-right: 2px solid #3b82f6;
  animation: blink-caret 0.8s step-end infinite;
}
@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #3b82f6; }
}
.sidebar-nav-link {
  position: relative;
  overflow: visible;
  transition: background 0.2s;
}
.sidebar-link-underline {
  position: relative;
  display: inline-block;
}
.sidebar-nav-link:hover .sidebar-link-underline::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: #3b82f6;
  border-radius: 1px;
  transform: scaleX(1);
  transition: transform 0.2s;
}
.sidebar-link-underline::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: #3b82f6;
  border-radius: 1px;
  transform: scaleX(0);
  transition: transform 0.2s;
}
.sidebar-nav-link:hover .sidebar-link-underline::after {
  transform: scaleX(1);
}
.active-sidebar-link {
  background: linear-gradient(90deg, #3b82f6 0 4px, transparent 4px 100%);
  color: #3b82f6;
  font-weight: bold;
}
.active-bar {
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #3b82f6;
  border-radius: 2px;
}
.bg-white\/80, .dark\:bg-gray-900\/80 {
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
}
@media (max-width: 768px) {
  .bg-white\/80, .dark\:bg-gray-900\/80 {
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.10);
  }
  main > section {
    margin-bottom: 3rem;
  }
}
</style>
