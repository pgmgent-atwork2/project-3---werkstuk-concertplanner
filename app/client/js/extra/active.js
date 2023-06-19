export const getActiveNavItem = () => {
  const $navItems = document.querySelectorAll(".nav-item");

  console.log($navItems);

  $navItems.forEach(($navItem) => {
    $navItem.addEventListener("click", () => {
      $navItems.forEach(($navItem) => {
        $navItem.classList.remove("active");
      });

      $navItem.classList.add("active--nav");
    });
  });
};
