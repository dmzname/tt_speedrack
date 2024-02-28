document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".preview__thumbnail", {
        spaceBetween: 10,
        slidesPerView: 4,
    });
    new Swiper(".preview__main-photo", {
        spaceBetween: 0,
        thumbs: {
            swiper: swiper,
        },
    });
})