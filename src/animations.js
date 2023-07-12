import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

export function triggerSetUp(element) {
    return {
        trigger: element,
        start: "top 85%",
        end: "bottom 25%",
        /* scrub: 1, */
        toggleActions: "restart pause resume pause"
    }
}
export function slideInline(element, moveX, rotation = 0) {
  gsap.from(element, {
      duration: .8,
      x: moveX,
      opacity: 0,
      rotation,
      transformOrigin: "50% 50%",
      ease: "sine",
      scrollTrigger: triggerSetUp(element)
    });
}

export function slideInBlock(element, moveY, rotation = 0) {
  gsap.from(element, {
      duration: .8,
      y: moveY,
      opacity: 0,
      rotation,
      transformOrigin: "50% 50%",
      ease: "sine",
      scrollTrigger: triggerSetUp(element)
    });
}

export function scaleOnHover(selector){
    
  const elements = document.querySelectorAll(selector);

  function animateElement(e) {
    const el = e.currentTarget;
    const scale = e.type === "mouseenter" ? 1.2 : 1;
    gsap.to(el, {
        scale,
        ease: 'bounce.out'
    });
  }

  elements.forEach((el) => {
    el.addEventListener("mouseenter", animateElement);
    el.addEventListener("mouseleave", animateElement);
  });
}
