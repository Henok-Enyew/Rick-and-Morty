import { isRef, onUnmounted, unref, watchEffect } from "vue";
import {
  DEFAULT_IMAGE,
  DEFAULT_SEO,
  SITE_NAME,
  SITE_URL,
} from "../seo/defaults";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Apply document SEO tags. Pass a plain object or a computed/ref.
 */
export function useSeo(input) {
  const stop = watchEffect(() => {
    const value = isRef(input) ? unref(input) : input;
    if (!value) return;

    const title = value.title || DEFAULT_SEO.title;
    const description = value.description || DEFAULT_SEO.description;
    const image = value.image || DEFAULT_IMAGE;
    const type = value.type || "website";
    const path = value.path || "/";
    const url = path.startsWith("http") ? path : `${SITE_URL}${path}`;
    const robots = value.robots || "index,follow";

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "author", "Henok");
    upsertMeta("name", "theme-color", "#121C0E");
    upsertMeta("name", "application-name", SITE_NAME);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", url);

    if (value.jsonLd) {
      upsertJsonLd("page-jsonld", value.jsonLd);
    } else {
      upsertJsonLd("page-jsonld", null);
    }
  });

  onUnmounted(() => {
    stop();
  });
}

export function buildTitle(pageTitle) {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : DEFAULT_SEO.title;
}
