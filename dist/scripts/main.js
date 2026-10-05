(function() {

    "use strict";

    const root = document.documentElement;
    const navToggle = document.querySelector("#js-navToggle");

    if (navToggle) navToggle.addEventListener("click", function() {
        root.classList.toggle("show-nav");
    });

    const eventPP = document.querySelector("#js-eventPP");

    if (eventPP) {
        const eventOpenBtn = document.querySelector("#js-eventOpenBtn");

        const closeEventPP = function (event) {

            function close() {
                document.removeEventListener("keyup", closeEventPP);
                eventPP.removeEventListener("click", closeEventPP);

                root.classList.remove("show-event-popup");
            };

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

        eventOpenBtn?.addEventListener("click", function() {
            root.classList.add("show-event-popup");
            document.addEventListener("keyup", closeEventPP);
            eventPP.addEventListener("click", closeEventPP);
        });

    }
    const sliders = document.querySelectorAll(".js-swiper");

    sliders.forEach(function (slider) {
        new Swiper(slider, {
            slidesPerView: "auto",
            freeMode: true,
            speed: 500,
            navigation: {
                nextEl: slider.querySelector(".swiper-arrow-next"),
                prevEl: slider.querySelector(".swiper-arrow-prev"),
                disabledClass: "arrow--disabled"
            },
            pagination: {
                el: slider.querySelector(".swiper-pagination"),
                clickable: true
            },
            a11y: {
                prevSlideMessage: "Предыдущее мероприятие",
                nextSlideMessage: "Следующее мероприятие",
                paginationBulletMessage: "Перейти к слайду {{index}}"
            }
        });
    });

    const contactsMap = document.querySelector("#js-contactsMap");

    if (contactsMap && typeof google !== "undefined" && google.maps) {

        const mapStyles = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ];

        const mapCenter = new google.maps.LatLng(56.47461, 84.94963);


        const mapOptions = {
            center: mapCenter,
            disableDefaultUI: true,
            draggable: true,
            gestureHandling: "cooperative",
            scrollwheel: false,
            styles: mapStyles,
            zoom: 15,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        };

        new google.maps.Map(contactsMap, mapOptions);
    }    
})();
