import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const scrollReveal = (container, options = {}) => {
  const {
    y = 60,
    duration = 1,
    stagger = 0.15,
    start = "top 80%",
  } = options

  const elements = container.querySelectorAll("[data-animate]")

  gsap.from(elements, {
    scrollTrigger: {
      trigger: container,
      start,
    },
    y,
    opacity: 0,
    stagger,
    duration,
    ease: "power3.out",
    clearProps: "all",
  })
}
