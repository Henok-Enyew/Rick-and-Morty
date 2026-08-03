<script setup>
defineProps({
  backLabel: {
    type: String,
    default: "Back home",
  },
});
</script>

<template>
  <header class="detail-nav">
    <router-link to="/" class="detail-nav__brand" aria-label="Rick and Morty home">
      <img src="../assets/Images/Logo.png" alt="" class="detail-nav__logo" />
      <span>Rick &amp; Morty</span>
    </router-link>

    <router-link to="/" class="detail-nav__back">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
      </svg>
      {{ backLabel }}
    </router-link>
  </header>
</template>

<style scoped>
.detail-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  background: rgba(18, 28, 14, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(45, 69, 35, 0.55);
}

.detail-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: #e8ece4;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
}

.detail-nav__logo {
  width: 2.5rem;
  height: 2.35rem;
  border-radius: 9999px;
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(81, 217, 40, 0.3);
}

.detail-nav__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 0.55rem;
  border: 1px solid rgba(45, 69, 35, 0.8);
  background: rgba(23, 35, 18, 0.55);
  color: #9cff66;
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.detail-nav__back:hover {
  transform: translateY(-1px);
  border-color: rgba(81, 217, 40, 0.55);
  background: rgba(81, 217, 40, 0.1);
}

@media (max-width: 767px) {
  .detail-nav {
    padding: 0.75rem 0.85rem;
  }

  .detail-nav__brand span {
    font-size: 0.86rem;
  }
}
</style>
