<script setup>
defineProps({
  figmaUrl: {
    type: String,
    default:
      "https://www.figma.com/design/ZSVmfKMGibjB1y3a2mzXWg/Home-Page-of-the-Rick-and-Morty-Website?node-id=0-1&t=cFiTbdoqk9C7olcl-1",
  },
});

const year = new Date().getFullYear();

const links = [
  { label: "About", href: "/#about" },
  { label: "Episodes", href: "/#episodes" },
  { label: "Characters", href: "/#characters" },
  { label: "Locations", href: "/#locations" },
];
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__glow" aria-hidden="true" />

    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <img
          src="../assets/Images/Logo.png"
          alt="Rick and Morty"
          class="site-footer__logo"
        />
        <div>
          <p class="site-footer__title">Rick &amp; Morty</p>
          <p class="site-footer__tagline">
            A fan-made portal through dimensions, episodes, and weirdos.
          </p>
        </div>
      </div>

      <nav class="site-footer__nav" aria-label="Footer">
        <a v-for="link in links" :key="link.href" :href="link.href">
          {{ link.label }}
        </a>
      </nav>

      <div class="site-footer__socials">
        <a
          :href="figmaUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Figma design"
          class="site-footer__social"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M192,96a40,40,0,0,0-24-72H96A40,40,0,0,0,72,96a40,40,0,0,0,1.37,65A44,44,0,1,0,144,196V160a40,40,0,1,0,48-64Zm-64,56H96a24,24,0,0,1,0-48h32Zm40-64H144V40h24a24,24,0,0,1,0,48Z" />
          </svg>
        </a>
        <a
          href="https://github.com/Henok-Enyew/Rick-and-Morty"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          class="site-footer__social"
        >
          <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C8.95536 0 0 9.1875 0 20.5089C0 29.5714 5.73214 37.25 13.6786 39.9643C13.79 39.9885 13.9038 40.0005 14.0179 40C14.7589 40 15.0446 39.4553 15.0446 38.9821C15.0446 38.4911 15.0268 37.2053 15.0179 35.4911C14.3563 35.6461 13.6795 35.727 13 35.7321C9.15179 35.7321 8.27679 32.7411 8.27679 32.7411C7.36607 30.375 6.05357 29.7411 6.05357 29.7411C4.3125 28.5178 6.04464 28.4821 6.17857 28.4821H6.1875C8.19643 28.6607 9.25 30.6071 9.25 30.6071C10.25 32.3571 11.5893 32.8482 12.7857 32.8482C13.5768 32.8324 14.3557 32.6498 15.0714 32.3125C15.25 30.9911 15.7679 30.0893 16.3393 29.5714C11.9018 29.0536 7.23214 27.2946 7.23214 19.4375C7.23214 17.1964 8.00893 15.3661 9.28571 13.9375C9.08036 13.4196 8.39286 11.3304 9.48214 8.50893C9.62825 8.47396 9.77843 8.45895 9.92857 8.46428C10.6518 8.46428 12.2857 8.74107 14.9821 10.6161C18.2585 9.69938 21.7236 9.69938 25 10.6161C27.6964 8.74107 29.3304 8.46428 30.0536 8.46428C30.2037 8.45895 30.3539 8.47396 30.5 8.50893C31.5893 11.3304 30.9018 13.4196 30.6964 13.9375C31.9732 15.375 32.75 17.2054 32.75 19.4375C32.75 27.3125 28.0714 29.0446 23.6161 29.5536C24.3304 30.1875 24.9732 31.4375 24.9732 33.3482C24.9732 36.0893 24.9464 38.3036 24.9464 38.9732C24.9464 39.4553 25.2232 40 25.9643 40C26.0842 40.0005 26.2039 39.9885 26.3214 39.9643C34.2768 37.25 40 29.5625 40 20.5089C40 9.1875 31.0446 0 20 0Z" />
          </svg>
        </a>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>
        Made with
        <span class="site-footer__heart" aria-hidden="true">♥</span>
        by
        <a href="https://t.me/enoch90s" target="_blank" rel="noopener noreferrer">
          Henok
        </a>
      </p>
      <p>&copy; {{ year }} Rick and Morty fan project</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(180deg, #121c0e 0%, #0d140a 100%);
  border-top: 1px solid rgba(81, 217, 40, 0.22);
  color: #e8ece4;
  padding: 2.25rem 5.5rem 1.35rem;
}

.site-footer__glow {
  position: absolute;
  width: 22rem;
  height: 22rem;
  left: 50%;
  top: -12rem;
  transform: translateX(-50%);
  border-radius: 9999px;
  background: rgba(81, 217, 40, 0.1);
  filter: blur(55px);
  pointer-events: none;
  z-index: 0;
}

.site-footer__inner {
  position: relative;
  z-index: 1;
  width: min(68rem, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding-bottom: 1.35rem;
  border-bottom: 1px solid rgba(45, 69, 35, 0.55);
}

.site-footer__brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.site-footer__logo {
  width: 3rem;
  height: 2.75rem;
  border-radius: 9999px;
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(81, 217, 40, 0.28);
}

.site-footer__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #9cff66;
}

.site-footer__tagline {
  margin: 0.2rem 0 0;
  max-width: 22rem;
  font-size: 0.82rem;
  line-height: 1.45;
  color: rgba(209, 213, 203, 0.7);
}

.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  justify-content: center;
}

.site-footer__nav a {
  color: rgba(229, 231, 235, 0.78);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 0.86rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.site-footer__nav a:hover {
  color: #9cff66;
}

.site-footer__socials {
  display: flex;
  gap: 0.55rem;
  justify-content: flex-end;
}

.site-footer__social {
  display: grid;
  place-items: center;
  width: 2.45rem;
  height: 2.45rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(45, 69, 35, 0.8);
  background: rgba(23, 35, 18, 0.55);
  color: #e8ece4;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;
}

.site-footer__social:hover {
  transform: translateY(-2px);
  border-color: rgba(81, 217, 40, 0.55);
  color: #9cff66;
  background: rgba(81, 217, 40, 0.1);
}

.site-footer__bottom {
  position: relative;
  z-index: 1;
  width: min(68rem, 100%);
  margin: 0 auto;
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  font-size: 0.82rem;
  color: rgba(209, 213, 203, 0.68);
}

.site-footer__bottom a {
  color: #9cff66;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.site-footer__bottom a:hover {
  border-bottom-color: rgba(156, 255, 102, 0.7);
}

.site-footer__heart {
  display: inline-block;
  color: #ef4444;
  margin: 0 0.15rem;
  animation: heartbeat 1.6s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.18);
  }
  60% {
    transform: scale(1);
  }
}

@media (max-width: 1023px) {
  .site-footer {
    padding: 2rem 1.75rem 1.25rem;
  }

  .site-footer__inner {
    grid-template-columns: 1fr;
    justify-items: start;
    gap: 1.15rem;
  }

  .site-footer__nav {
    justify-content: flex-start;
  }

  .site-footer__socials {
    justify-content: flex-start;
  }
}

@media (max-width: 767px) {
  .site-footer {
    padding: 1.75rem 0.85rem 1.15rem;
  }

  .site-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-footer__tagline {
    max-width: 18rem;
  }
}
</style>
