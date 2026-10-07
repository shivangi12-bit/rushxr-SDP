import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Setup GSAP animations

// Vision Section (Intro)
gsap.fromTo("#vision-title", 
  { y: 50, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 1, delay: 0.2 }
);
gsap.fromTo("#vision-subtitle", 
  { y: 50, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 1, delay: 0.4 }
);
gsap.fromTo("#vision-text", 
  { y: 50, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 1, delay: 0.6 }
);


// Generic function to animate text blocks in each zone
const zones = document.querySelectorAll('.zone');

zones.forEach((zone, index) => {
  const blocks = zone.querySelectorAll('.info-block');
  const title = zone.querySelector('.section-title');
  const bgImg = zone.querySelector('.bg-image');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: zone,
      start: "top 70%",
      end: "bottom center",
      toggleActions: "play none none reverse"
    }
  });

  if (title) {
    tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
  }

  if (blocks.length > 0) {
    tl.fromTo(blocks, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
      "-=0.3"
    );
  }

  // Background Parallax
  if (bgImg) {
    gsap.fromTo(bgImg, 
      { scale: 1, y: -50 }, 
      { scale: 1.15, y: 50, ease: "none", scrollTrigger: { trigger: zone, start: "top bottom", end: "bottom top", scrub: true } }
    );
  }
});


// Special Effects per Zone (scrubbed to scroll)

// Zone 1 X-Ray effect
gsap.to(".x-ray-view", {
  opacity: 1,
  scrollTrigger: {
    trigger: "#zone1",
    start: "top center",
    end: "center center",
    scrub: true
  }
});

// Zone 3 Mirror Floor effect
gsap.to(".mirror-floor", {
  opacity: 1,
  rotateX: 20,
  scrollTrigger: {
    trigger: "#zone3",
    start: "top center",
    end: "center center",
    scrub: true
  }
});

// Finale Logo Pop
gsap.to(".sdp-logo", {
  scale: 1,
  opacity: 1,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: "#finale",
    start: "center 80%",
    end: "center center",
    scrub: false, // Make this pop instead of scrub
    toggleActions: "play none none reverse"
  }
});
