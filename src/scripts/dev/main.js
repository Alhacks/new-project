(function () {
  "use strict";

  const root = document.documentElement;
  const navToggle = document.querySelector("#js-navToggle");

  if (navToggle)
    navToggle.addEventListener("click", function () {
      root.classList.toggle("show-nav");
      navToggle.setAttribute("aria-expanded", root.classList.contains("show-nav"));
    });

  document.querySelectorAll(".js-navLink").forEach(function (link) {
    link.addEventListener("click", function () {
      root.classList.remove("show-nav");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    });
  });
  const eventPP = document.querySelector("#js-eventPP");

  if (eventPP) {
    const eventOpenBtns = document.querySelectorAll(".js-eventOpenBtn");

    const closeEventPP = function (event) {
      function close() {
        document.removeEventListener("keyup", closeEventPP);
        eventPP.removeEventListener("click", closeEventPP);

        root.classList.remove("show-event-popup");
      }

      switch (event.type) {
        case "keyup":
          if (event.key === "Escape") close();
          break;
        case "click":
          if (event.target === eventPP || event.target.closest(".js-ppCloseBtn")) {
            close();
            break;
          }
      }
    };

    eventOpenBtns.forEach(function (button) {
      button.addEventListener("click", function () {
        root.classList.add("show-event-popup");
        document.addEventListener("keyup", closeEventPP);
        eventPP.addEventListener("click", closeEventPP);
      });
    });
  }
  const sliders = document.querySelectorAll(".js-swiper");

  sliders.forEach(function (slider) {
    new Swiper(slider, {
      slidesPerView: "auto",
      freeMode: true,
      speed: 500,
      spaceBetween: 20,
      breakpoints: {
        768: { slidesPerView: "auto", spaceBetween: 30 },
        1020: { slidesPerView: 3, spaceBetween: 30 },
        1340: { slidesPerView: 3, spaceBetween: 40 },
        1660: { slidesPerView: 3, spaceBetween: 58 },
      },
      navigation: {
        nextEl: slider.querySelector(".swiper-arrow-next"),
        prevEl: slider.querySelector(".swiper-arrow-prev"),
        disabledClass: "arrow--disabled",
      },
      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true,
      },
      a11y: {
        prevSlideMessage: "Предыдущее мероприятие",
        nextSlideMessage: "Следующее мероприятие",
        paginationBulletMessage: "Перейти к слайду {{index}}",
      },
    });
  });

  const contactsMap = document.querySelector("#js-contactsMap");
  if (contactsMap && typeof ol !== "undefined") {
    const center = ol.proj.fromLonLat([84.978389, 56.454001]);
    const tileLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
    const marker = new ol.Feature({ geometry: new ol.geom.Point(center) });
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({ features: [marker] }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: "assets/icons/logo.svg",
          anchor: [0.5, 0.5],
          size: [80, 58],
        }),
      }),
    });
    new ol.Map({
      target: contactsMap,
      layers: [tileLayer, vectorLayer],
      view: new ol.View({ center: center, zoom: 15, enableRotation: false }),
    });
  }
})();
