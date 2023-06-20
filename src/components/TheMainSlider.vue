<template>
  <div class="slider-container">
    <div class="slider-track-container">
      <ul class="slider-slides">
        <li class="slider-slide">
          <a href="#" class="slider-slide-link slider-slide-link-1"></a>
        </li>
        <li class="slider-slide">
          <a href="#" class="slider-slide-link slider-slide-link-2"></a>
        </li>
        <li class="slider-slide">
          <a href="#" class="slider-slide-link slider-slide-link-3"></a>
        </li>
        <li class="slider-slide">
          <a href="#" class="slider-slide-link slider-slide-link-4"></a>
        </li>
        <li class="slider-slide">
          <a href="#" class="slider-slide-link slider-slide-link-5"></a>
        </li>
      </ul>
    </div>
    <div class="slider-previous">
      <button class="slider-button slider-button-left"></button>
    </div>
    <div class="slider-next">
      <button class="slider-button slider-button-right"></button>
    </div>
    <div class="slider-nav">
      <div class="slider-nav-dots-container"></div>
      <div class="slider-stop-play"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

let firstClone;
let lastClone;

let slide;

let autoplayButton;
let slideWidth;

let index;

const changeResize = () => {
  slideWidth = slide[index].clientWidth;
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", changeResize);

  lastClone.remove();
  firstClone.remove();

  const currentSlide = document.querySelectorAll(".slider-slide");

  currentSlide.forEach((e, i) => e.classList.remove(`slider-slide-${i + 1}`));

  currentSlide.forEach((e) => e.classList.remove("slider-slide-active"));

  document.querySelectorAll(".slider-nav-dot").forEach((el) => el.remove());

  slide = "";

  autoplayButton.classList.remove("slider-auto-play");
  autoplayButton.classList.add("slider-stop-play");
});

onMounted(() => {
  const slides = document.querySelector(".slider-slides");
  const nextBtn = document.querySelector(".slider-next");
  const prevBtn = document.querySelector(".slider-previous");
  const dotContainer = document.querySelector(".slider-nav-dots-container");
  autoplayButton = document.querySelector(".slider-stop-play");

  slide = document.querySelectorAll(".slider-slide");
  index = 1;
  let interval = 4000;
  let slideId;

  /** Cloning slide **/
  firstClone = slide[0].cloneNode(true);
  lastClone = slide[slide.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  slides.append(firstClone);
  slides.prepend(lastClone);

  slideWidth = slide[index].clientWidth;

  slides.style.transform = `translateX(${-slideWidth * index}px)`;

  let getSlides = () => document.querySelectorAll(".slider-slide");

  window.addEventListener("resize", changeResize);

  slides.addEventListener("transitionend", () => {
    slide = getSlides();
    if (slide[index].id === firstClone.id) {
      slides.style.transition = "none";
      index = 1;
      slides.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    if (slide[index].id === lastClone.id) {
      slides.style.transition = "none";
      index = slide.length - 2;
      slides.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  });

  /** Functions **/
  function getDataSlide() {
    slide.forEach((e, i) => e.classList.add(`slider-slide-${i + 1}`));
  }

  const activateSlide = (slide) => {
    document
      .querySelectorAll(".slider-slide")
      .forEach((e) => e.classList.remove("slider-slide-active"));

    document
      .querySelector(`.slider-slide-${slide}`)
      .classList.add("slider-slide-active");
  };

  const createDots = () => {
    slide.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="slider-nav-dot" data-slide="${i + 1}" role="button"
        aria-label="slider-button-dot"></button>`
      );
    });
    document.querySelectorAll(".slider-nav-dot").forEach((dot) => {
      dot.style.height = "0.8rem";
      dot.style.width = "0.8rem";
      dot.style.borderRadius = "50%";
      dot.style.border = "none";
      dot.style.margin = "0 0.7rem";
      dot.style.backgroundColor = "#1d1d1f";
      dot.style.opacity = "0.2";
    });
  };

  const activateDot = (slide) => {
    document.querySelectorAll(".slider-nav-dot").forEach((dot) => {
      dot.classList.remove("slider-nav-dot-active");
      dot.style.opacity = "0.2";
    });

    document
      .querySelector(`.slider-nav-dot[data-slide="${slide}"]`)
      .classList.add("slider-nav-dot-active");
    document.querySelector(".slider-nav-dot-active").style.opacity = "0.8";
  };

  const goToSLide = (slide) => {
    slides.style.transform = `translate(${-slideWidth * slide}px)`;
  };

  const startSlide = (slide) => {
    slideId = setInterval(() => {
      moveToNextSlide(slide);
    }, interval);
  };

  const init = () => {
    getDataSlide();
    activateSlide(1);
    createDots();
    goToSLide(1);
    activateDot(1);
    startSlide();
  };

  /** Next Slide **/
  const moveToNextSlide = () => {
    if (index >= slide.length - 1) {
      return;
    } else {
      index++;
    }
    slides.style.transition = "transform 1s";
    slides.style.transform = `translateX(${-slideWidth * index}px)`;

    if (index >= slide.length - 1) {
      activateDot(1);
      activateSlide(1);
    } else {
      activateDot(index);
      activateSlide(index);
    }
  };

  /** Prev slide **/
  const moveToPreviousSlide = () => {
    if (index <= 0) return;
    index--;
    slides.style.transition = "transform 1s";
    slides.style.transform = `translateX(${-slideWidth * index}px)`;

    if (index <= 0) {
      activateDot(slide.length - 2);
      activateSlide(slide.length - 2);
    } else {
      activateDot(index);
      activateSlide(index);
    }
  };

  /** Start stop autoplay **/
  const startStop = () => {
    autoplayButton.classList.toggle("slider-stop-play");
    autoplayButton.classList.toggle("slider-auto-play");

    if (autoplayButton.classList.contains("slider-stop-play")) {
      moveToNextSlide();
      startSlide();
    } else {
      clearInterval(slideId);
    }
  };

  const onlyStop = () => {
    clearInterval(slideId);
    if (autoplayButton.classList.contains("slider-stop-play")) {
      autoplayButton.classList.remove("slider-stop-play");
      autoplayButton.classList.add("slider-auto-play");
    }
  };

  init();

  /** Event handlers **/
  autoplayButton.addEventListener("click", startStop);

  nextBtn.addEventListener("click", moveToNextSlide);
  prevBtn.addEventListener("click", moveToPreviousSlide);

  document.addEventListener("keydown", (e) => {
    e.key === "ArrowLeft" && moveToPreviousSlide();
    e.key === "ArrowRight" && moveToNextSlide();
  });

  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("slider-nav-dot")) {
      const { slide } = e.target.dataset;
      goToSLide(slide);
      activateDot(slide);
      activateSlide(slide);
      onlyStop();

      index = slide;
    }
  });
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: #f5f5f7;
  cursor: pointer;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

button {
  cursor: pointer;
}
.slider-container {
  position: relative;
  height: 54rem;
  width: 100%;
  overflow: hidden;
}
.slider-track-container {
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 28.2rem;
  height: 50rem;
}
.slider-slides {
  display: flex;
  height: 100%;
}
.slider-slide {
  min-width: 28.2rem;
  height: 100%;
  padding: 0 0.6rem;
  opacity: 0.2;
  transition: opacity 1s;
}
.slider-slide-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-repeat: no-repeat;
}
.slider-slide-link-1 {
  background-image: url("../assets/slider-image/phone-small.jpg");
}
.slider-slide-link-2 {
  background-image: url("../assets/slider-image/monitor-small.jpg");
}
.slider-slide-link-3 {
  background-image: url("../assets/slider-image/smartwatch-small.jpg");
}
.slider-slide-link-4 {
  background-image: url("../assets/slider-image/accessories-small.jpg");
}
.slider-slide-link-5 {
  background-image: url("../assets/slider-image/keyboard-small.jpg");
}

.slider-slide-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1s, transform 1s;
}
.slider-previous,
.slider-next {
  position: absolute;
  top: 0;
  bottom: 0;
  cursor: pointer;
}
.slider-previous {
  left: 0rem;
  right: calc(50% + 146px);
}
.slider-next {
  right: 0rem;
  left: calc(50% + 145px);
}
.slider-button {
  position: absolute;
  top: calc(50% - 40px);
  width: 4rem;
  height: 4rem;
  border: none;
  background-color: transparent;
  background-size: contain;
  opacity: 0.7;
}
.slider-button-left {
  background-image: url("../assets/slider-image/left.png");
  left: calc(40% - 15px);
}
.slider-button-right {
  background-image: url("../assets/slider-image/right.png");
  right: calc(40% - 15px);
}
.active-dot {
  opacity: 0.8;
}
.slider-nav {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 100%;
  background-color: #fff;
}
.slider-nav-dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider-nav-dot {
  width: 1.8rem;
  height: 0.8rem;
  margin: 0 0.7rem;
  border: none;
  border-radius: 50%;
  background-color: #0404f0;
  opacity: 0.2;
}
.slider-nav-dot-active {
  opacity: 0.8;
}
.slider-auto-play,
.slider-stop-play {
  position: absolute;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: inherit;
  background-size: contain;
}
.slider-auto-play {
  background-image: url("../assets/slider-image/play-button.png");
}
.slider-stop-play {
  background-image: url("../assets/slider-image/pause-button.png");
}

@media only screen and (min-width: 734px) {
  .slider-container {
    height: 41rem;
  }
  .slider-track-container {
    width: 70rem;
    height: 37rem;
  }
  .slider-slide {
    min-width: 70rem;
  }
  .slider-slide-link-1 {
    background-image: url("../assets/slider-image/phone-medium.jpg");
  }
  .slider-slide-link-2 {
    background-image: url("../assets/slider-image/monitor-medium.jpg");
  }
  .slider-slide-link-3 {
    background-image: url("../assets/slider-image/smartwatch-medium.jpg");
  }
  .slider-slide-link-4 {
    background-image: url("../assets/slider-image/accessories-medium.jpg");
  }
  .slider-slide-link-5 {
    background-image: url("../assets/slider-image/keyboard-medium.jpg");
  }
  .slider-autoplay {
    right: 3.5rem;
  }
  .slider-button {
    display: none;
  }
  .slider-previous {
    right: calc(50% + 356px);
  }
  .slider-next {
    left: calc(50% + 356px);
  }
  @media only screen and (min-width: 1024px) {
    .slider-container {
      height: 56rem;
    }
    .slider-track-container {
      height: 52rem;
      width: 98rem;
    }
    .slider-slide {
      min-width: 98rem;
    }
    .slider-slide-link-1 {
      background-image: url("../assets/slider-image/phone-large.jpg");
    }
    .slider-slide-link-2 {
      background-image: url("../assets/slider-image/monitor-large.jpg");
    }
    .slider-slide-link-3 {
      background-image: url("../assets/slider-image/smartwatch-large.jpg");
    }
    .slider-slide-link-4 {
      background-image: url("../assets/slider-image/accessories-large.jpg");
    }
    .slider-slide-link-5 {
      background-image: url("../assets/slider-image/keyboard-large.jpg");
    }
    .slider-previous {
      right: calc(50% + 495px);
    }
    .slider-next {
      left: calc(50% + 495px);
    }
  }
  @media only screen and (min-width: 1440px) {
    .slider-container {
      height: 56rem;
    }
    .slider-track-container {
      height: 52rem;
      width: 125rem;
    }
    .slider-slide {
      min-width: 125rem;
    }

    .slider-slide-link-1 {
      background-image: url("../assets/slider-image/phone-xlarge.jpg");
    }
    .slider-slide-link-2 {
      background-image: url("../assets/slider-image/monitor-xlarge.jpg");
    }
    .slider-slide-link-3 {
      background-image: url("../assets/slider-image/smartwatch-xlarge.jpg");
    }
    .slider-slide-link-4 {
      background-image: url("../assets/slider-image/accessories-xlarge.jpg");
    }
    .slider-slide-link-5 {
      background-image: url("../assets/slider-image/keyboard-xlarge.jpg");
    }
    .slider-previous {
      right: calc(50% + 630px);
    }
    .slider-next {
      left: calc(50% + 630px);
    }
  }
}
</style>
