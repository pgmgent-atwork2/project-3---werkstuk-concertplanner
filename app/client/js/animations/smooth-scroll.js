export const smoothScroll = () => {
  const smoothScrollLinks = document.querySelectorAll(
    "[data-scroll='smooth-scroll']"
  );

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const takeTargetsId = link.getAttribute("href");
      const finalTarget = document.querySelector(takeTargetsId).offsetTop;

      finalTarget.scrollIntoView({ behavior: "smooth" });
    });
  });
};
