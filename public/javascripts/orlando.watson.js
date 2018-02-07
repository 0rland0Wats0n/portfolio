((window, document) => {

  document.onreadystatechange = (event) => {
    if (document.readyState === 'complete') {
      setTimeout(() => {
        document.querySelector('.loader').classList.add('loaded');
        document.querySelector('.landing__logo').classList.add('loaded');
        document.querySelector('body').classList.add('loaded');
      }, 2000);
    }
  };

  let lST = window.pageYOffset || document.documentElement.scrollTop;

  const introContainer = document.querySelector('.landing__container_intro');
  const aboutContainer = document.querySelector('.landing__container_about');
  const skillsContainer = document.querySelector('.landing__container_skills');

  const leftH1 = document.querySelector('.landing__container_intro .landing__left_container h1');
  const rightH1 = document.querySelector('.landing__container_intro .landing__right_container h1');
  const leftAbout = document.querySelector('.landing__container_about .landing__left_container .landing__about_section');
  const rightAbout = document.querySelector('.landing__container_about .landing__right_container .landing__about_section');
  const skillBars = document.querySelectorAll('.landing__container_skills .skill__level > span');

  // inView : Function
  // args : dom element
  // Returns true if dom element is in viewport and false if not
  const inView = (el) => {
    const elRect = el.getBoundingClientRect();

    return (
      (elRect.top >= -(elRect.height) || -(elRect.top) <= elRect.height) &&
      (elRect.bottom <= elRect.height * 2)
    );
  };

  // scrollDirection : Function
  // args : none
  // Returns a string telli:ng the scroll direction 'up' | 'down'
  const scrollDirection = () => {
    const cST = window.pageYOffset || document.documentElement.scrollTop;

    if (lST > cST) {
      lST = cST;
      return 'up';
    }

    lST = cST;
    return 'down';
  };

  // scrollPercentage : Function
  // args : dom element
  // Returns the percentage of the dom element that has been scrolled
  const scrollPercentage = (el) => {
    const elRect = el.getBoundingClientRect();

    if (inView(el)) {
      return Math.round((-elRect.top / elRect.height) * 100);
    }

    return 'out of view';
  };

  const scrollToTop = (scrollDuration) => {
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  window.onbeforeunload = scrollToTop(200);

  const revealSections = () => {
    // show intro as scroll
    if (inView(introContainer)) {
      let scrollP = scrollPercentage(introContainer);

      if (scrollP <= 50) {
        leftH1.style.transform = `translateX(${50 - scrollP}%)`;
        rightH1.style.transform = `translateX(${-50 + scrollP}%)`;
      }
    }

    // show about as scroll
    if (inView(aboutContainer)) {
      let scrollP = scrollPercentage(aboutContainer);

      if (scrollP <= 0) {
        leftAbout.style.transform = `translateX(${-scrollP}%)`;
        rightAbout.style.transform = `translateX(${scrollP}%)`;
      }
    }

    // show skill bars as scroll
    if (inView(skillsContainer)) {
      let scrollP = scrollPercentage(skillsContainer);

      if (scrollP <= 0) {
        skillBars.forEach((skillBar) => {
          skillBar.style.transform = `translateX(${scrollP}%)`;
        });
      }
    }
  };

  window.addEventListener('scroll', revealSections);
  window.addEventListener('load', revealSections);
})(window, document);
