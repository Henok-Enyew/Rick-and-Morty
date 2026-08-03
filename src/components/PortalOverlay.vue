<script setup>
import PortalLoader from "./PortalLoader.vue";

defineProps({
  show: { type: Boolean, default: false },
  accent: { type: String, default: "green" },
  message: { type: String, default: "" },
});
</script>

<template>
  <Transition name="portal-fade">
    <div
      v-if="show"
      class="portal-overlay"
      :class="`portal-overlay--${accent}`"
      role="alertdialog"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
    >
      <div class="portal-overlay__backdrop" aria-hidden="true" />
      <div class="portal-overlay__content">
        <PortalLoader :accent="accent" :message="message" compact />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.portal-overlay {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  pointer-events: all;
}

.portal-overlay__backdrop {
  position: absolute;
  inset: 0;
  background: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.portal-overlay__content {
  position: relative;
  z-index: 1;
  background: transparent;
  border: 0;
  box-shadow: none;
  padding: 0;
  animation: soft-in 0.3s cubic-bezier(0.22, 1.2, 0.36, 1);
}

.portal-fade-enter-active,
.portal-fade-leave-active {
  transition: opacity 0.28s ease;
}

.portal-fade-enter-active .portal-overlay__content,
.portal-fade-leave-active .portal-overlay__content {
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.portal-fade-enter-from,
.portal-fade-leave-to {
  opacity: 0;
}

.portal-fade-enter-from .portal-overlay__content,
.portal-fade-leave-to .portal-overlay__content {
  opacity: 0;
  transform: scale(0.94) translateY(6px);
}

@keyframes soft-in {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
