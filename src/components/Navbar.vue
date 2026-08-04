<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const links = [
  { label: "About", href: "#about" },
  { label: "Episodes", href: "#episodes" },
  { label: "Characters", href: "#characters" },
  { label: "Locations", href: "#locations" },
];

const open = ref(false);
const hidden = ref(false);
const scrolled = ref(false);
const revealing = ref(false);
const activeSection = ref("");

let lastY = 0;
let revealTimer = null;
let scrollRaf = 0;

const navClasses = computed(() => [
  "site-nav",
  scrolled.value && "site-nav--scrolled",
  hidden.value && !open.value && "site-nav--hidden",
  revealing.value && !hidden.value && "site-nav--reveal",
  open.value && "site-nav--open",
]);

function onScroll() {
  const y = window.scrollY;
  const delta = y - lastY;

  scrolled.value = y > 24;

  if (open.value) {
    lastY = y;
    return;
  }

  if (y < 64) {
    if (hidden.value) triggerReveal();
    hidden.value = false;
    lastY = y;
    return;
  }

  if (Math.abs(delta) < 6) return;

  if (delta > 0 && y > 100) {
    hidden.value = true;
    revealing.value = false;
  } else if (delta < 0) {
    if (hidden.value) triggerReveal();
    hidden.value = false;
  }

  lastY = y;
}

function triggerReveal() {
  revealing.value = true;
  clearTimeout(revealTimer);
  revealTimer = setTimeout(() => {
    revealing.value = false;
  }, 450);
}

function toggleMenu() {
  open.value = !open.value;
}

function closeMenu() {
  open.value = false;
}

function goHome() {
  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goTo(href) {
  closeMenu();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function onKeydown(e) {
  if (e.key === "Escape" && open.value) closeMenu();
}

function updateActiveSection() {
  const sections = links
    .map((l) => document.getElementById(l.href.slice(1)))
    .filter(Boolean);

  let current = "";
  const marker = window.scrollY + 120;

  for (const section of sections) {
    if (section.offsetTop <= marker) {
      current = `#${section.id}`;
    }
  }

  activeSection.value = current;
}

function handleScroll() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    onScroll();
    updateActiveSection();
  });
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";
  if (isOpen) document.body.style.overflowX = "hidden";
});

onMounted(() => {
  lastY = window.scrollY;
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
  document.body.style.overflowX = "";
  clearTimeout(revealTimer);
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
});
</script>

<template>
  <header :class="navClasses" role="banner">
    <div class="site-nav__shell">
      <a
        href="#"
        class="site-nav__brand"
        aria-label="Rick and Morty home"
        @click.prevent="goHome"
      >
        <img
          src="../assets/Images/Logo.png"
          alt="Rick and Morty"
          class="site-nav__logo"
        />
        <span class="site-nav__wordmark">Rick &amp; Morty</span>
      </a>

      <nav class="site-nav__links" aria-label="Primary">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="site-nav__link"
          :class="{ 'is-active': activeSection === link.href }"
          @click.prevent="goTo(link.href)"
        >
          {{ link.label }}
        </a>
      </nav>

      <a
        href="https://ww1.goojara.to/e0Mvx4"
        target="_blank"
        rel="noopener noreferrer"
        class="site-nav__cta"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
          <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
        </svg>
        Watch
      </a>

      <button
        class="site-nav__toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="toggleMenu"
      >
        <span class="site-nav__burger" :class="{ 'is-open': open }">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>

    <Teleport to="body">
      <div
        id="mobile-nav"
        class="site-nav__drawer"
        :class="{ 'is-open': open }"
        :aria-hidden="!open"
      >
        <div class="site-nav__drawer-top">
          <a
            href="#"
            class="site-nav__brand"
            aria-label="Rick and Morty home"
            @click.prevent="goHome"
          >
            <img
              src="../assets/Images/Logo.png"
              alt="Rick and Morty"
              class="site-nav__logo"
            />
            <span class="site-nav__wordmark">Rick &amp; Morty</span>
          </a>
          <button
            class="site-nav__toggle"
            type="button"
            :aria-expanded="open"
            aria-controls="mobile-nav"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            @click="toggleMenu"
          >
            <span class="site-nav__burger" :class="{ 'is-open': open }">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav class="site-nav__drawer-links" aria-label="Mobile">
          <a
            v-for="(link, i) in links"
            :key="link.href"
            :href="link.href"
            class="site-nav__drawer-link"
            :style="{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }"
            :class="{ 'is-active': activeSection === link.href }"
            @click.prevent="goTo(link.href)"
          >
            <span class="site-nav__drawer-index">0{{ i + 1 }}</span>
            {{ link.label }}
          </a>
        </nav>

        <a
          href="https://ww1.goojara.to/e0Mvx4"
          target="_blank"
          rel="noopener noreferrer"
          class="site-nav__drawer-cta"
          @click="closeMenu"
        >
          Watch now
        </a>
      </div>
    </Teleport>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100%;
  z-index: 100;
  overflow: hidden;
  transition:
    transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  background: transparent;
  border-bottom: 1px solid transparent;
}

.site-nav--scrolled {
  background: rgba(18, 28, 14, 0.72);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border-bottom-color: rgba(45, 69, 35, 0.55);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.28);
}

.site-nav--hidden {
  transform: translate3d(0, -110%, 0);
  pointer-events: none;
}

.site-nav--reveal {
  animation: nav-pop 0.45s cubic-bezier(0.22, 1.4, 0.36, 1) both;
}

.site-nav--open {
  background: rgba(18, 28, 14, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: rgba(45, 69, 35, 0.55);
}

.site-nav__shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin: 0;
  padding: 0.7rem 1.75rem;
}

.site-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: #f3f4f6;
  z-index: 2;
  transition: transform 0.25s ease;
}

.site-nav__brand:hover {
  transform: translateY(-1px);
}

.site-nav__logo {
  height: 2.6rem;
  width: 2.85rem;
  border-radius: 9999px;
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(81, 217, 40, 0.25);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.site-nav__brand:hover .site-nav__logo {
  transform: scale(1.04);
  box-shadow: 0 0 0 2px rgba(81, 217, 40, 0.45);
}

.site-nav__wordmark {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #e5e7eb;
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.site-nav__link {
  position: relative;
  padding: 0.45rem 0.85rem;
  color: rgba(229, 231, 235, 0.78);
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.55rem;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.site-nav__link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0.2rem;
  width: 0;
  height: 2px;
  border-radius: 9999px;
  background: #51d928;
  transform: translateX(-50%);
  transition: width 0.25s ease;
}

.site-nav__link:hover {
  color: #fff;
  background: rgba(81, 217, 40, 0.08);
}

.site-nav__link:hover::after,
.site-nav__link.is-active::after {
  width: 1.1rem;
}

.site-nav__link.is-active {
  color: #9cff66;
}

.site-nav__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.95rem;
  border-radius: 0.55rem;
  background: #51d928;
  color: #0b1408;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 0 0 0 rgba(81, 217, 40, 0.35);
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.site-nav__cta:hover {
  background: #41ae20;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(81, 217, 40, 0.25);
}

.site-nav__toggle {
  display: none;
  z-index: 2;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(45, 69, 35, 0.7);
  border-radius: 0.75rem;
  background: rgba(23, 35, 18, 0.55);
  cursor: pointer;
}

.site-nav__burger {
  position: relative;
  width: 1.15rem;
  height: 0.85rem;
}

.site-nav__burger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 9999px;
  background: #f3f4f6;
  transition: transform 0.3s ease, top 0.3s ease, opacity 0.2s ease;
}

.site-nav__burger span:nth-child(1) {
  top: 0;
}

.site-nav__burger span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.site-nav__burger span:nth-child(3) {
  bottom: 0;
}

.site-nav__burger.is-open span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.site-nav__burger.is-open span:nth-child(2) {
  opacity: 0;
}

.site-nav__burger.is-open span:nth-child(3) {
  bottom: auto;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
}

.site-nav__drawer {
  display: none;
}

.site-nav__drawer-top {
  display: none;
}

@keyframes nav-pop {
  0% {
    transform: translate3d(0, -110%, 0);
  }
  65% {
    transform: translate3d(0, 6px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

/* Project uses max-width md breakpoint (<=767px) for mobile */
@media (max-width: 767px) {
  .site-nav--scrolled,
  .site-nav--open {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(18, 28, 14, 0.94);
  }

  .site-nav__shell {
    padding: 0.7rem 1rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .site-nav__links,
  .site-nav__cta {
    display: none;
  }

  .site-nav__toggle {
    display: inline-flex;
  }

  .site-nav__wordmark {
    font-size: 0.88rem;
  }

  .site-nav__drawer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    inset: 0;
    z-index: 120;
    padding: 0 1.5rem 2rem;
    background:
      radial-gradient(ellipse at top right, rgba(81, 217, 40, 0.12), transparent 45%),
      rgba(18, 28, 14, 0.98);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .site-nav__drawer.is-open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .site-nav__drawer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem 0;
    margin-bottom: 1.25rem;
  }

  .site-nav__drawer-links {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 1;
  }

  .site-nav__drawer-link {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 0.95rem 0.25rem;
    color: rgba(243, 244, 246, 0.88);
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 1px solid rgba(45, 69, 35, 0.45);
    transform: translateY(18px);
    opacity: 0;
    transition:
      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.35s ease,
      color 0.2s ease;
  }

  .site-nav__drawer.is-open .site-nav__drawer-link {
    transform: translateY(0);
    opacity: 1;
  }

  .site-nav__drawer-link.is-active,
  .site-nav__drawer-link:hover {
    color: #9cff66;
  }

  .site-nav__drawer-index {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(156, 255, 102, 0.55);
  }

  .site-nav__drawer-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.95rem 1rem;
    border-radius: 0.9rem;
    background: #51d928;
    color: #0b1408;
    font-weight: 700;
    text-decoration: none;
    transform: translateY(16px);
    opacity: 0;
    transition:
      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.28s,
      opacity 0.35s ease 0.28s,
      background-color 0.2s ease;
  }

  .site-nav__drawer.is-open .site-nav__drawer-cta {
    transform: translateY(0);
    opacity: 1;
  }

  .site-nav__drawer-cta:hover {
    background: #41ae20;
  }
}
</style>
