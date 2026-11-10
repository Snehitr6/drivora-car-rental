
import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const selectors = [
      "main section",
      "section",
      ".car-card",
      ".testimonial-card",
      ".feature-card",
      ".service-card",
      ".destination-card",
      ".offer-card",
      ".booking-card",
      ".about-content",
      ".section-heading",
      ".featured-cars-heading",
      ".testimonials-heading",
      ".testimonials-bottom",
    ];

    const elements = new Set();
    let observer;

    const revealElement = (element) => {
      if (elements.has(element)) return;

      elements.add(element);

      if (reduceMotion) {
        element.classList.add("is-visible");
        return;
      }

      element.setAttribute(
        "data-reveal",
        element.getAttribute("data-reveal") || "up"
      );

      observer.observe(element);
    };

    if (!reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -35px 0px",
        }
      );
    }

    const scanElements = (root = document) => {
      if (root.nodeType !== 1 && root !== document) return;

      if (root.matches) {
        if (selectors.some((selector) => root.matches(selector))) {
          revealElement(root);
        }
      }

      root.querySelectorAll?.(selectors.join(",")).forEach(revealElement);
    };

    // Initial page elements
    scanElements();

    // Detect elements added during navigation or rendering
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          scanElements(node);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      elements.clear();
    };
  }, []);
}
