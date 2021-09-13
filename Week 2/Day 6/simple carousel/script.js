let slidePosition = 0;
const slides = document.getElementsByClassName('carousel-image');
const totalSlides = slides.length;

document.getElementById('next-btn--next').addEventListener("click", function() {
    moveToNextSlide();
});

document.getElementById('prev-btn--prev').addEventListener("click", function() {
    moveToPrevSlide();
});

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel-image--visible');
        slide.classList.add('carousel-image--hidden');
    }

    slides[slidePosition].classList.add('carousel-image--visible');
}

function moveToNextSlide() {
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

    updateSlidePosition();
} 

function moveToPrevSlide() {
    if (slidePosition === 0) {
        slidePosition = 0;
    } else {
        slidePosition--;
    }

    updateSlidePosition();
}