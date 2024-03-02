document.addEventListener("DOMContentLoaded", () => {

// PRODUCT CARD SLIDER
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

// PLUS MINUS INPUT
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

//
    const selectBtn = document.querySelector('.additional-options__select');
    const selectOptions = document.querySelector('.additional-options__opt');

    selectBtn.addEventListener('click', function (){
        this.classList.toggle('is-active');
        selectOptions.hidden = !selectOptions.hidden;
    })
})