let slideImages1 = document.querySelectorAll('.bg-img-e');
let next1 = document.querySelector('.next-e');
let prev1 = document.querySelector('.prev-e');
let dots1 = document.querySelectorAll('.dot-e');

var counter1 = 0;
var pause1 = false;

next1.addEventListener('click', slideNext1);

function slideNext1() {
    slideImages1[counter1].style.animation = 'next1 1s ease forwards';
    if (counter1 >= slideImages1.length - 1) {
        counter1 = 0;
    } else {
        counter1++;
    }
    slideImages1[counter1].style.animation = 'next2 1s ease forwards';
    indicators1();
}

prev1.addEventListener('click', slidePrev1);

function slidePrev1() {
    slideImages1[counter1].style.animation = 'prev1 1s ease forwards';
    if (counter1 == 0) {
        counter1 = slideImages1.length - 1;
    } else {
        counter1--;
    }
    slideImages1[counter1].style.animation = 'prev2 1s ease forwards';
    indicators1();
}

var interval1;

function autoSliding1() {
    interval1 = setInterval(timer1, 5000);

    function timer1() {
        if (!pause1) {
            slideNext1();
            indicators1();
        }
    }
}

autoSliding1();

const container1 = document.querySelector('.slide-container-e');
container1.addEventListener('mouseover', function () {
    clearInterval(interval1);
});

container1.addEventListener('mouseout', function () {
    autoSliding1();
});

function indicators1() {
    for (i = 0; i < dots1.length; i++) {
        dots1[i].className = dots1[i].className.replace(' active1', '');
    }
    dots1[counter1].className += ' active1';
}

const playPauseBtn1 = document.querySelector('.slide-btn-e');
playPauseBtn1.addEventListener('click', playPause1);

function playPause1() {
    let state1 = document.querySelector(".icon-e");
    if (state1.innerHTML === "pause") {
        state1.innerHTML = "play_arrow";
        pause1 = true;
    } else {
        state1.innerHTML = "pause";
        pause1 = false;
    }
}