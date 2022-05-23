const arrowText_L = document.querySelectorAll(".arrow-textL");
const langContainer = document.querySelectorAll(".lang-main-container");

const engText_L = document.querySelector("#eng-textL");
const krText_L = document.querySelector("#kr-textL");

const engWrap = document.querySelector("#engWrap");
const krWrap = document.querySelector("#krWrap");

arrowText_L.forEach((l) =>
  l.addEventListener("click", function () {
    for (i = 0; i < langContainer.length; i++) {
      langContainer[i].classList.remove("slowAppear");
      langContainer[i].classList.add("hurryDisappear");
    }

    setTimeout(function () {
      pageHref(l);
    }, 3000);
  })
);

engText_L.addEventListener("mouseover", () => {
  krWrap.classList.add("not-hovered");
});
engText_L.addEventListener("mouseleave", () => {
  krWrap.classList.remove("not-hovered");
});
krText_L.addEventListener("mouseover", () => {
  engWrap.classList.add("not-hovered");
});
krText_L.addEventListener("mouseleave", () => {
  engWrap.classList.remove("not-hovered");
});

function transition() {
  pageContainer.classList.add("page-transition");
}
function pageHref(t) {
  if (t == engText_L) {
    location.href = "https://mulbul2.cafe24.com/WhatYouCallLove/enmain.html";
  } else if (t == krText_L) {
    location.href = "https://mulbul2.cafe24.com/WhatYouCallLove/krmain.html";
  }
}

function getCenter(element) {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { x: left + width / 2, y: top + height / 2 };
}
const arrow = document.querySelector(".arrow-figure");
const arrowCenter = getCenter(arrow);
console.log(arrowCenter);
document.addEventListener("mousemove", (e) => {
  let ang =
    (Math.atan2(e.clientY - arrowCenter.y, e.clientX - arrowCenter.x) * 180) /
      Math.PI +
    45;
  arrow.style.webkitTransform = "rotate(" + ang + "deg)";
  arrow.style.mozTransform = "rotate(" + ang + "deg)";
  arrow.style.msTransform = "rotate(" + ang + "deg)";
  arrow.style.oTransform = "rotate(" + ang + "deg)";
  arrow.style.transform = "rotate(" + ang + "deg)";
});
