import { onMounted, onUnmounted, ref } from "vue";

/**
 * Track which full-page section currently owns the viewport background.
 * Uses IntersectionObserver ratios — only one section is "active" at rest;
 * the BackgroundLayer crossfades when this value changes.
 *
 * @param {string[]} sectionIds  DOM ids in document order
 * @param {{ initial?: string, rootMargin?: string }} [options]
 */
export function useSectionBackgrounds(sectionIds, options = {}) {
  const {
    initial = sectionIds[0] ?? "",
    rootMargin = "-12% 0px -12% 0px",
  } = options;

  const activeSection = ref(initial);
  const ratios = Object.create(null);

  let observer;
  let mutationObserver;
  let raf = 0;
  const observed = new Set();

  function pickActive() {
    let bestId = activeSection.value || sectionIds[0];
    let bestRatio = -1;

    for (const id of sectionIds) {
      const ratio = ratios[id] ?? 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    }

    // If nothing intersects the observation band (fast fling / edge cases),
    // fall back to whichever section contains the viewport midpoint.
    if (bestRatio <= 0) {
      const mid = window.scrollY + window.innerHeight * 0.5;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (mid >= top && mid < bottom) {
          bestId = id;
          break;
        }
      }
    }

    if (bestId && bestId !== activeSection.value) {
      activeSection.value = bestId;
    }
  }

  function schedulePick() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      pickActive();
    });
  }

  function observeAvailable() {
    if (!observer) return;
    for (const id of sectionIds) {
      if (observed.has(id)) continue;
      const el = document.getElementById(id);
      if (!el) continue;
      observer.observe(el);
      observed.add(id);
    }
  }

  onMounted(() => {
    for (const id of sectionIds) ratios[id] = 0;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    if (typeof IntersectionObserver === "undefined") {
      activeSection.value = initial;
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id || !(id in ratios)) continue;
          ratios[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        schedulePick();
      },
      { threshold: thresholds, rootMargin }
    );

    observeAvailable();

    // Async sections (About / Episodes / …) may mount after this composable.
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        const before = observed.size;
        observeAvailable();
        if (observed.size !== before) schedulePick();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    pickActive();
    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick, { passive: true });
  });

  onUnmounted(() => {
    observer?.disconnect();
    observer = undefined;
    mutationObserver?.disconnect();
    mutationObserver = undefined;
    observed.clear();
    window.removeEventListener("scroll", schedulePick);
    window.removeEventListener("resize", schedulePick);
    if (raf) cancelAnimationFrame(raf);
  });

  return { activeSection };
}
