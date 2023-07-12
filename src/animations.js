import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

export function triggerSetUp(element) {
    return {
        trigger: element,
        start: "top 85%",
        end: "bottom 55%",
        
        /* toggleActions: "play none resume reset", */
       /*  markers: {startColor: "blue", endColor: "orange", fontSize: "20px"} */
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
export function slideInlineHighlight(element, moveX, rotation = 0) {
  gsap.from(element, {
      duration: 2,
      x: moveX,
      opacity: 0,
      color: '#009FB7',
      rotation,
      transformOrigin: "50% 50%",
      ease: "sine",
      scrollTrigger: triggerSetUp(element)
    });
}

export function slideInStagger(elements,moveY=400,rotation='-5deg') {
  gsap.from(elements, {
      duration: .8,
      y: moveY,
      opacity: 0,
      rotation,
      transformOrigin: "50% 50%",
     
      stagger: {
        from: "center",
        amount: 1,
      },
      scrollTrigger: triggerSetUp(elements)
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
