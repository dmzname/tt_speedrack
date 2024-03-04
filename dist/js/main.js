// Swiper initialization for thumbnails
    const thumbnailSwiper = new Swiper(".preview__thumbnail", {
        spaceBetween: 8,
        slidesPerView: 5,
        slidesPerGroup: 1,
        breakpoints: {
            // when window width is >= 1400px
            1400: {
                navigation: {
                    nextEl: ".thumb_next",
                    prevEl: ".thumb_prev",
                },
            },
        },
    });

// Swiper initialization for main images
const swiperMain = new Swiper(".preview__main-photo", {
        spaceBetween: 0,
        thumbs: {
            swiper: thumbnailSwiper,
        },
        breakpoints: {
            // when window width is >= 1400px
            1400: {
                navigation: {
                    nextEl: ".next",
                    prevEl: ".prev",
                },
                pagination: {
                    el: ".pagination",
                    type: "custom",
                    renderCustom: function (swiper, current, total) {
                        return current + '/' + (total);
                    }
                },
            },
        },
        on: {
            // Event handler when the active index changes
            activeIndexChange: (e) => {
                const linkElement = swiperMain.el.querySelector('.preview__zoom');
                const imageWrapper = swiperMain.slides[swiperMain.activeIndex];
                if (linkElement && imageWrapper) {
                    linkElement.href = imageWrapper.dataset.imgBig;
                }
            }
        }
    });

// Fancybox initialization for zoom image
    Fancybox.bind("[data-fancybox]", {
        Images: {
            initialSize: "fit",
        }
    });

// Plus/Minus input
    document.querySelectorAll('[data-quantity]').forEach(button => {
        button.addEventListener('click', incDecHandler);
    });

    function incDecHandler(e) {
        e.preventDefault();
        const btn = e.target.closest('button');
        const quantityType = btn.dataset.quantity;
        const fieldName = btn.getAttribute('data-field');
        const input = document.querySelector(`input[name="${fieldName}"]`);
        const step = input.dataset.step;
        const currentVal = parseInt(input.value);
        const inch = !fieldName.includes('price') ? '″' : '';

        if (!isNaN(currentVal)) {
            input.value = (quantityType === 'plus')
                ? (currentVal + (1*step)) + inch
                : Math.max(currentVal - (1*step), 0) + inch;
        } else {
            input.value = step ? (1*step) + inch : 0  + inch;
        }
    }

// CustomConveyor Belt Width is visible or not
    const inputContainers = document.querySelectorAll('.conveyor-belt__width');
    const custom = document.querySelector('.conveyor-belt .plus-minus');

    inputContainers.forEach(container => {
        const input = container.querySelector('input');

        if (input) {
            input.addEventListener('change', () => {
                custom.hidden = !(container.classList.contains('conveyor-belt__width_custom') && input.checked);
            });
        }
    });

// Select additional options
    const selectBtn = document.querySelector('.additional-options__select');
    const selectOptions = document.querySelector('.additional-options__opt');
    selectOptions.hidden = window.innerWidth < 1400;

    // if you need control resize
    /* window.addEventListener('resize', () => {
        selectOptions.hidden = window.innerWidth < 1400;
    }); */

    selectBtn.addEventListener('click', function (){
        this.classList.toggle('is-active');
        selectOptions.hidden = !selectOptions.hidden;
    });

// Tooltip
const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('click', (e) => {
        const tooltipBox = e.currentTarget.closest('.tooltip');
        console.log(tooltipBox.getBoundingClientRect());
        if (tooltipBox) {
            e.preventDefault();
            tooltipBox.classList.toggle('is-active');
        }
    });
});