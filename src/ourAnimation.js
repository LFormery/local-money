import gsap from 'gsap';

class Anime {
  constructor() {
    this.gsap = gsap;
  }

  openMenu() {
    gsap.to('.navBar', 1.0, { transform: 'translateY( -441px )' });
  }

  closeMenu() {
    gsap.to('.navBar', 1.0, { transform: 'translateY( 0px )' });
  }

  animationOnMounted(target) {
    this.gsap.timeline().set(target, { y: '20px', opacity: 0.5 })
      .staggerTo(target, 1, { y: '0px', opacity: 1 }, 0.2);
  }

  heartAnimation(heart, newPathVal) {
    this.gsap.timeline().to(heart, 0.3, { scale: '0.8' })
      .to(heart, 0.6, { scale: '1.2', ease: 'elastic.out(1, 0.3)' }, 'stepOne')
      .to(heart.querySelector('path'), 0.6, newPathVal, 'stepOne');
  }
}

export default {
  install(Vue) {
    const anime = new Anime();
    Vue.prototype.$anime = anime;
  },
};
