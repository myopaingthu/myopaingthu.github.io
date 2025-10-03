<script setup>
import HeroIcon from '../components/HeroIcon.vue'

const contactMethods = [
  {
    label: 'Phone',
    value: '+66 95 120 0272',
    href: 'tel:+66951200272',
    icon: 'phone',
  },
  {
    label: 'Email',
    value: 'paingthumyo41297@gmail.com',
    href: 'mailto:paingthumyo41297@gmail.com',
    icon: 'email',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/myo-paing-thu-027aaa214',
    href: 'http://linkedin.com/in/myo-paing-thu-027aaa214',
    icon: 'building-office',
  },
  {
    label: 'GitHub',
    value: 'github.com/myopaingthu',
    href: 'https://github.com/myopaingthu',
    icon: 'command-line',
  },
]
</script>

<template>
  <section class="relative pb-16">
    <div class="mb-12 space-y-4 text-center" data-animate>
      <span class="badge mx-auto bg-primary/10 text-primary text-xl">Contact</span>
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
          <HeroIcon name="paper-airplane" class="h-5 w-5" />
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
</template>
