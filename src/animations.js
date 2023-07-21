import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";
gsap.registerPlugin(ScrollTrigger);
const fullConfig = resolveConfig(tailwindConfig);

export function triggerSetUp(element) {
    return {
        trigger: element,
        start: "top 75%",
        end: "bottom 25%",
        
        /* toggleActions: "play none resume reset", */
        /* markers: {startColor: "blue", endColor: "orange", fontSize: "20px"} */
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

export function slideInStagger(elements,moveY=400,rotation='-5deg',trigger) {
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
      scrollTrigger: triggerSetUp(trigger)
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

export function bioIllustrationAnimation() {
  
  const tl = gsap.timeline();
  const path = document.querySelector(".editor-lines");
  const pathLength = path.getTotalLength();

  const strokeColor = fullConfig.theme.colors.accent;
  const initialFill = fullConfig.theme.colors.gray.lighter;

  gsap.set(".editor-lines", {
    strokeDasharray: `${pathLength}`,
    strokeDashoffset: pathLength,
    stroke: strokeColor,
    strokeOpacity: 0.5,
  });
  tl.from(
    ".editor-lines",
    {
      delay: 0.3,
      duration: 4,
      strokeDashoffset: -pathLength / 2,
      ease: "sine",
      fill: initialFill,
      fillOpacity: 0.4,
      opacity: gsap.utils.distribute({ base: 0.2, amount: 0.8 }),
    },
    "dashoffset-animation"
  )
    .to(".editor-lines", {
      strokeDasharray: `${pathLength} 0`,
      strokeDashoffset: 0,
      stroke: "none",
    })
    .from(
      ".editor-code",
      {
        x: -220,
        ease: "elastic",
        stagger: {
          from: "center",
          amount: 0.8,
        },
      },
      "dashoffset-animation+=1"
    );
}
