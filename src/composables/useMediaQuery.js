import { onMounted, onUnmounted, ref } from "vue";

/**
 * Track a CSS media query.
 * @param {string} query
 * @param {boolean} [initial=false]
 */
export function useMediaQuery(query, initial = false) {
  const matches = ref(initial);
  let mql;

  function onChange() {
    matches.value = !!mql?.matches;
  }

  onMounted(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      matches.value = initial;
      return;
    }
    mql = window.matchMedia(query);
    matches.value = mql.matches;
    mql.addEventListener("change", onChange);
  });

  onUnmounted(() => {
    mql?.removeEventListener("change", onChange);
  });

  return matches;
}
