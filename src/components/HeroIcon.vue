<script setup>
import { computed } from 'vue'
import {
  AcademicCapIcon,
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpIcon,
  Bars3Icon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  EnvelopeIcon,
  MoonIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlayCircleIcon,
  ServerStackIcon,
  SparklesIcon,
  SunIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
  CodeBracketSquareIcon,
  UsersIcon,
  FolderIcon,
  HomeIcon,
  IdentificationIcon,
  ChatBubbleBottomCenterIcon
} from '@heroicons/vue/24/outline'

const heroIconComponents = {
  'academic-cap': AcademicCapIcon,
  'arrow-down': ArrowDownIcon,
  'arrow-up': ArrowUpIcon,
  'bars-3': Bars3Icon,
  briefcase: BriefcaseIcon,
  'building-office': BuildingOfficeIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'circle-stack': CircleStackIcon,
  'code-bracket': CodeBracketIcon,
  'command-line': CommandLineIcon,
  'cpu-chip': CpuChipIcon,
  email: EnvelopeIcon,
  moon: MoonIcon,
  'paper-airplane': PaperAirplaneIcon,
  phone: PhoneIcon,
  'play-circle': PlayCircleIcon,
  'server-stack': ServerStackIcon,
  sparkles: SparklesIcon,
  sun: SunIcon,
  'external-link': ArrowTopRightOnSquareIcon,
  'wrench-screwdriver': WrenchScrewdriverIcon,
  'x-mark': XMarkIcon,
  'code-bracket-square': CodeBracketSquareIcon,
  'users': UsersIcon,
  'folder': FolderIcon,
  'home': HomeIcon,
  'identification': IdentificationIcon,
  'chat-bubble-bottom-center': ChatBubbleBottomCenterIcon,
}

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const IconComponent = computed(() => heroIconComponents[props.name])
</script>

<template>
  <component :is="IconComponent" v-if="IconComponent" v-bind="$attrs" />
</template>
