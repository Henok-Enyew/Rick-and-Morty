<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  accent: {
    type: String,
    default: "green", // green | gold
  },
  message: {
    type: String,
    default: "",
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const lines = [
  "Opening a portal…",
  "Don't look, Morty…",
  "Wubba lubba dub dub…",
  "Scanning dimensions…",
  "Hold my beer…",
  "Triangulating chaos…",
];

const index = ref(0);
let timer;

const text = computed(
  () => props.message || lines[index.value % lines.length]
);

onMounted(() => {
  timer = setInterval(() => {
    index.value += 1;
  }, 1800);
});

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div
    class="portal-loader"
    :class="[`portal-loader--${accent}`, { 'portal-loader--compact': compact }]"
    role="status"
    aria-live="polite"
  >
    <div class="portal-loader__rings" aria-hidden="true">
      <span class="portal-loader__ring portal-loader__ring--a" />
      <span class="portal-loader__ring portal-loader__ring--b" />
      <span class="portal-loader__ring portal-loader__ring--c" />
      <span class="portal-loader__core" />
      <span
        v-for="n in 8"
        :key="n"
        class="portal-loader__spark"
        :style="{ '--s': n }"
      />
    </div>
    <p class="portal-loader__text">{{ text }}</p>
  </div>
</template>

<style scoped>
.portal-loader {
  display: grid;
  place-items: center;
  gap: 1.25rem;
  min-height: 18rem;
  width: 100%;
  padding: 2rem 1rem;
  color: #e8ece4;
}

.portal-loader--compact {
  min-height: 0;
  padding: 0.35rem 0.25rem 0.15rem;
  gap: 0.9rem;
}

.portal-loader--compact .portal-loader__rings {
  width: 6.5rem;
  height: 6.5rem;
}

.portal-loader--compact .portal-loader__core {
  inset: 1.85rem;
}

.portal-loader--compact .portal-loader__spark {
  transform: rotate(calc(var(--s) * 45deg)) translateY(-2.9rem);
}

.portal-loader--compact .portal-loader__text {
  font-size: 0.86rem;
}

.portal-loader__rings {
  position: relative;
  width: 8.5rem;
  height: 8.5rem;
}

.portal-loader__ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 2px solid transparent;
}

.portal-loader--green .portal-loader__ring--a {
  border-top-color: #9cff66;
  border-right-color: rgba(81, 217, 40, 0.35);
  animation: spin 1.1s linear infinite;
}

.portal-loader--green .portal-loader__ring--b {
  inset: 0.7rem;
  border-bottom-color: #51d928;
  border-left-color: rgba(156, 255, 102, 0.25);
  animation: spin 1.6s linear infinite reverse;
}

.portal-loader--green .portal-loader__ring--c {
  inset: 1.4rem;
  border-top-color: rgba(81, 217, 40, 0.7);
  animation: spin 0.9s linear infinite;
}

.portal-loader--green .portal-loader__core {
  background: radial-gradient(circle, #9cff66 0%, #51d928 45%, transparent 70%);
  box-shadow: 0 0 28px rgba(81, 217, 40, 0.55);
}

.portal-loader--gold .portal-loader__ring--a {
  border-top-color: #f0d35c;
  border-right-color: rgba(224, 187, 55, 0.35);
  animation: spin 1.1s linear infinite;
}

.portal-loader--gold .portal-loader__ring--b {
  inset: 0.7rem;
  border-bottom-color: #e0bb37;
  border-left-color: rgba(240, 211, 92, 0.25);
  animation: spin 1.6s linear infinite reverse;
}

.portal-loader--gold .portal-loader__ring--c {
  inset: 1.4rem;
  border-top-color: rgba(224, 187, 55, 0.7);
  animation: spin 0.9s linear infinite;
}

.portal-loader--gold .portal-loader__core {
  background: radial-gradient(circle, #f0d35c 0%, #e0bb37 45%, transparent 70%);
  box-shadow: 0 0 28px rgba(224, 187, 55, 0.55);
}

.portal-loader__core {
  position: absolute;
  inset: 2.35rem;
  border-radius: 9999px;
  animation: pulse 1.4s ease-in-out infinite;
}

.portal-loader__spark {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 9999px;
  background: currentColor;
  opacity: 0.75;
  transform: rotate(calc(var(--s) * 45deg)) translateY(-3.7rem);
  animation: spark 1.8s ease-in-out infinite;
  animation-delay: calc(var(--s) * 0.08s);
}

.portal-loader--green {
  color: #9cff66;
}

.portal-loader--gold {
  color: #f0d35c;
}

.portal-loader__text {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(232, 236, 228, 0.88);
  animation: fade-swap 1.8s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.88);
    opacity: 0.75;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

@keyframes spark {
  0%,
  100% {
    opacity: 0.25;
    transform: rotate(calc(var(--s) * 45deg)) translateY(-3.4rem) scale(0.7);
  }
  50% {
    opacity: 1;
    transform: rotate(calc(var(--s) * 45deg)) translateY(-4rem) scale(1.2);
  }
}

@keyframes fade-swap {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}
</style>
