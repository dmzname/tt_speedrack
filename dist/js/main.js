document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".preview__thumbnail", {
        spaceBetween: 8,
        slidesPerView: 4,
    });
    new Swiper(".preview__main-photo", {
        spaceBetween: 0,
        thumbs: {
            swiper: swiper,
        },
    });
})