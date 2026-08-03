<script setup>
import PortalLoader from "./PortalLoader.vue";

defineProps({
  show: { type: Boolean, default: false },
  accent: { type: String, default: "green" },
  message: { type: String, default: "" },
});
</script>

<template>
  <Teleport to="body">
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
        <div class="portal-overlay__card">
          <PortalLoader :accent="accent" :message="message" compact />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.portal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  pointer-events: all;
}

.portal-overlay__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 16, 8, 0.45);
  backdrop-filter: blur(10px) saturate(1.05);
  -webkit-backdrop-filter: blur(10px) saturate(1.05);
}

.portal-overlay__card {
  position: relative;
  z-index: 1;
  width: min(20rem, 100%);
  padding: 1.5rem 1.25rem 1.25rem;
  border-radius: 1rem;
  border: 1px solid rgba(81, 217, 40, 0.28);
  background: rgba(18, 28, 14, 0.82);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(81, 217, 40, 0.08);
  animation: card-pop 0.35s cubic-bezier(0.22, 1.2, 0.36, 1);
}

.portal-overlay--gold .portal-overlay__card {
  border-color: rgba(224, 187, 55, 0.35);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(224, 187, 55, 0.1);
}

.portal-fade-enter-active,
.portal-fade-leave-active {
  transition: opacity 0.28s ease;
}

.portal-fade-enter-active .portal-overlay__card,
.portal-fade-leave-active .portal-overlay__card {
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.portal-fade-enter-from,
.portal-fade-leave-to {
  opacity: 0;
}

.portal-fade-enter-from .portal-overlay__card,
.portal-fade-leave-to .portal-overlay__card {
  opacity: 0;
  transform: scale(0.92) translateY(8px);
}

@keyframes card-pop {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
