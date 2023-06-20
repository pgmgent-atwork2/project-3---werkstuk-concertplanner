export const getActiveNavItem = () => {
  const $navItems = document.querySelectorAll(".nav-item");
  $navItems.forEach(($navItem) => {
    $navItem.addEventListener("click", () => {
      $navItems.forEach(($navItem) => {
        $navItem.classList.remove("active--nav");
      });

      $navItem.classList.add("active--nav");
    });
  });
};
