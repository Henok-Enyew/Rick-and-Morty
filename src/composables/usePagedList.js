import { computed, onMounted, onUnmounted, ref, unref, watch } from "vue";

/**
 * Client-side paging with optional auto-advance.
 * @param {import('vue').Ref|import('vue').ComputedRef} itemsRef
 * @param {{
 *   pageSize?: number|import('vue').Ref<number>|import('vue').ComputedRef<number>,
 *   autoMs?: number|import('vue').Ref<number>|import('vue').ComputedRef<number>,
 *   enabled?: import('vue').Ref<boolean>|boolean
 * }} options
 */
export function usePagedList(
  itemsRef,
  { pageSize = 10, autoMs = 3000, enabled = true } = {}
) {
  const page = ref(0);
  const paused = ref(false);
  const animTick = ref(0);
  const progress = ref(0);

  let autoTimer = null;
  let progressTimer = null;
  let progressStartedAt = 0;

  const isEnabled = () => unref(enabled) !== false;
  const size = () => Math.max(1, Number(unref(pageSize)) || 1);
  const delay = () => Math.max(0, Number(unref(autoMs)) || 0);

  const totalPages = computed(() =>
    Math.max(1, Math.ceil((itemsRef.value?.length || 0) / size()))
  );

  const pageItems = computed(() => {
    const list = itemsRef.value || [];
    const start = page.value * size();
    return list.slice(start, start + size());
  });

  const rangeLabel = computed(() => {
    const total = itemsRef.value?.length || 0;
    if (!total) return "0 of 0";
    const start = page.value * size() + 1;
    const end = Math.min(total, start + pageItems.value.length - 1);
    return `${start}–${end} of ${total}`;
  });

  function clampPage(value) {
    const max = totalPages.value;
    return ((value % max) + max) % max;
  }

  function goTo(nextPage, { resetProgress = true } = {}) {
    page.value = clampPage(nextPage);
    animTick.value += 1;
    if (resetProgress) restartAuto();
  }

  function next() {
    goTo(page.value + 1);
  }

  function prev() {
    goTo(page.value - 1);
  }

  function clearTimers() {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
    if (progressTimer) {
      cancelAnimationFrame(progressTimer);
      progressTimer = null;
    }
  }

  function tickProgress() {
    if (paused.value || !isEnabled() || totalPages.value <= 1) {
      progress.value = 0;
      return;
    }
    const d = delay();
    if (!d) {
      progress.value = 0;
      return;
    }
    const elapsed = performance.now() - progressStartedAt;
    progress.value = Math.min(1, elapsed / d);
    if (progress.value < 1) {
      progressTimer = requestAnimationFrame(tickProgress);
    }
  }

  function restartAuto() {
    clearTimers();
    progress.value = 0;
    const d = delay();
    if (paused.value || !isEnabled() || totalPages.value <= 1 || !d) return;

    progressStartedAt = performance.now();
    progressTimer = requestAnimationFrame(tickProgress);
    autoTimer = setTimeout(() => {
      goTo(page.value + 1);
    }, d);
  }

  function pause() {
    paused.value = true;
    clearTimers();
    progress.value = 0;
  }

  function resume() {
    paused.value = false;
    restartAuto();
  }

  watch(
    () => {
      const list = itemsRef.value || [];
      return `${list.length}:${list[0]?.id ?? ""}:${list[list.length - 1]?.id ?? ""}`;
    },
    () => {
      page.value = 0;
      animTick.value += 1;
      restartAuto();
    }
  );

  watch(totalPages, (pages) => {
    if (page.value > pages - 1) page.value = 0;
  });

  watch(
    () => size(),
    () => {
      page.value = 0;
      animTick.value += 1;
      restartAuto();
    }
  );

  watch(
    () => unref(enabled),
    (on) => {
      if (on) restartAuto();
      else {
        clearTimers();
        progress.value = 0;
      }
    }
  );

  onMounted(() => restartAuto());
  onUnmounted(() => clearTimers());

  return {
    page,
    totalPages,
    pageItems,
    rangeLabel,
    animTick,
    progress,
    paused,
    next,
    prev,
    goTo,
    pause,
    resume,
  };
}
