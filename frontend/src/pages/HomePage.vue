<script setup lang="ts">
import HeroSection from '@/components/organisms/HeroSection.vue'
import AboutSection from '@/components/organisms/AboutSection.vue'
import ExperienceSection from '@/components/organisms/ExperienceSection.vue'
import EducationSection from '@/components/organisms/EducationSection.vue'
import ExpertiseSection from '@/components/organisms/ExpertiseSection.vue'
import CollaborationSection from '@/components/organisms/CollaborationSection.vue'
import ContactSection from '@/components/organisms/ContactSection.vue'
</script>

<template>
  <main class="page">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <EducationSection />
    <ExpertiseSection />
    <CollaborationSection />
    <ContactSection />
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}
</style>
