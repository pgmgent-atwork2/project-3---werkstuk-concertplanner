import { renderSlideShow } from "./animations/slideshow.js";
import { smoothScroll } from "./animations/smooth-scroll.js";
import { dragging } from "./dragging.js";
import { loadDetails } from "./extra/load-details.js";
import { getActiveNavItem } from "./extra/active.js";
// import { SVG } from "../../pixi-svg";
import { SortByDate } from "./extra/sort-date.js";

getActiveNavItem();
renderSlideShow();
smoothScroll();
dragging();
loadDetails();
SortByDate();
