<script setup>
defineProps({
  show: { type: Boolean, default: false },
  accent: { type: String, default: "green" }, // green | gold
  message: { type: String, default: "Failed to fetch" },
});

const emit = defineEmits(["retry", "home"]);
</script>

<template>
  <Teleport to="body">
    <Transition name="portal-fade">
      <div
        v-if="show"
        class="fetch-error"
        :class="`fetch-error--${accent}`"
        role="alertdialog"
        aria-live="assertive"
        aria-label="Failed to load content"
      >
        <div class="fetch-error__backdrop" aria-hidden="true" />
        <div class="fetch-error__card">
          <p class="fetch-error__eyebrow">Portal glitch detected</p>
          <h2 class="fetch-error__title">Couldn’t pull this dimension</h2>
          <p class="fetch-error__message">{{ message }}</p>
          <p class="fetch-error__hint">
            The API hiccuped. Retry the hop, or bail back home.
          </p>
          <div class="fetch-error__actions">
            <button
              type="button"
              class="fetch-error__btn fetch-error__btn--primary"
              @click="emit('retry')"
            >
              Retry portal
            </button>
            <router-link
              to="/"
              class="fetch-error__btn fetch-error__btn--ghost"
              @click="emit('home')"
            >
              Back home
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fetch-error {
  position: fixed;
  inset: 0;
  z-index: 210;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.fetch-error__backdrop {
  position: absolute;
  inset: 0;
  background: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.fetch-error__card {
  position: relative;
  z-index: 1;
  width: min(24rem, 100%);
  padding: 1.6rem 1.35rem 1.35rem;
  border-radius: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.28);
  background: rgba(18, 28, 14, 0.88);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.35);
  text-align: center;
  animation: card-pop 0.35s cubic-bezier(0.22, 1.2, 0.36, 1);
}

.fetch-error__eyebrow {
  margin: 0 0 0.4rem;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fca5a5;
}

.fetch-error__title {
  margin: 0;
  font-size: clamp(1.2rem, 3vw, 1.45rem);
  color: #f3f6ef;
  line-height: 1.25;
}

.fetch-error__message {
  margin: 0.7rem 0 0;
  padding: 0.55rem 0.7rem;
  border-radius: 0.55rem;
  background: rgba(239, 68, 68, 0.12);
  color: #fecaca;
  font-size: 0.86rem;
  word-break: break-word;
}

.fetch-error__hint {
  margin: 0.75rem 0 0;
  font-size: 0.84rem;
  color: rgba(209, 213, 203, 0.72);
  line-height: 1.45;
}

.fetch-error__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 1.15rem;
}

.fetch-error__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.45rem;
  padding: 0.55rem 1rem;
  border-radius: 0.6rem;
  font-family: var(--font-display);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.fetch-error__btn:hover {
  transform: translateY(-1px);
}

.fetch-error--green .fetch-error__btn--primary {
  border: 0;
  background: #51d928;
  color: #0b1408;
}

.fetch-error--gold .fetch-error__btn--primary {
  border: 0;
  background: #e0bb37;
  color: #1a1505;
}

.fetch-error__btn--ghost {
  border: 1px solid rgba(45, 69, 35, 0.85);
  background: rgba(23, 35, 18, 0.55);
  color: #e8ece4;
}

.fetch-error--gold .fetch-error__btn--ghost {
  border-color: rgba(224, 187, 55, 0.35);
}

.portal-fade-enter-active,
.portal-fade-leave-active {
  transition: opacity 0.28s ease;
}

.portal-fade-enter-active .fetch-error__card,
.portal-fade-leave-active .fetch-error__card {
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.portal-fade-enter-from,
.portal-fade-leave-to {
  opacity: 0;
}

.portal-fade-enter-from .fetch-error__card,
.portal-fade-leave-to .fetch-error__card {
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
