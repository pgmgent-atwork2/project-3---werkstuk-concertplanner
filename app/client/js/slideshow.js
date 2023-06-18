export const renderSlideShow = () => {
  const $slideImgs = document.querySelectorAll("[data-image='slide-img']");
  let currentIndex = 0;

  const showSlideImg = (i) => {
    $slideImgs.forEach((image) => {
      image.classList.remove("active-img");
      console.log(image);
    });

    $slideImgs[i].classList.add("active-img");
  };

  const nextSlideImg = () => {
    currentIndex = (currentIndex + 1) % $slideImgs.length;
    showSlideImg(currentIndex);
  };

  setInterval(nextSlideImg, 6000);
};
