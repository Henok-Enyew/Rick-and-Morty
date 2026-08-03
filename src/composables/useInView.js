import { onMounted, onUnmounted, ref, unref, watch } from "vue";

/**
 * Observe an element and track viewport visibility.
 * @param {import('vue').Ref|HTMLElement|null} targetRef
 * @param {{
 *   once?: boolean,
 *   threshold?: number|number[],
 *   rootMargin?: string,
 *   initial?: boolean,
 * }} [options]
 */
export function useInView(targetRef, options = {}) {
  const {
    once = false,
    threshold = 0.12,
    rootMargin = "80px 0px",
    initial = false,
  } = options;

  const inView = ref(initial);
  let observer;

  function cleanup() {
    observer?.disconnect();
    observer = undefined;
  }

  function observe() {
    cleanup();
    const el = unref(targetRef);
    if (!el || typeof IntersectionObserver === "undefined") {
      inView.value = true;
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        inView.value = visible;
        if (once && visible) cleanup();
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
  }

  onMounted(() => {
    observe();
    watch(
      () => unref(targetRef),
      () => observe()
    );
  });

  onUnmounted(cleanup);

  return { inView };
}
