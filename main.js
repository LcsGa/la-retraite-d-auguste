// Elements du DOM
const days = document.querySelector('.days-left');
const hours = document.querySelector('.hours-left');
const minutes = document.querySelector('.minutes-left');
const seconds = document.querySelector('.seconds-left');
const milliseconds = document.querySelector('.milliseconds-left');

const blocks = document.querySelectorAll('.counter-block'); // tous les blocks counter []

const img = document.querySelector('img');

// Date de départ à la retraite
const retirementDate = new Date('2021-09-01T16:00:00');

// Initialize counter
window.onload = () => {
    counter();
    millisecondsCounter();
    movehead();
};

const counter = () => {
    // initialize variables
    const currentDate = new Date();
    const daysLeft = (retirementDate - currentDate) / 8.64e7;
    const hoursLeft = (daysLeft - Math.floor(daysLeft)) * 24;
    const minutesLeft = (hoursLeft - Math.floor(hoursLeft)) * 60;
    const secondsLeft = (minutesLeft - Math.floor(minutesLeft)) * 60;
    // const millisecondsLeft = (secondsLeft - Math.floor(secondsLeft)) * 100;

    // Actualize DOM with variables settled
    days.innerHTML = Math.floor(daysLeft);
    hours.innerHTML = Math.floor(hoursLeft);
    minutes.innerHTML = Math.floor(minutesLeft);
    seconds.innerHTML = Math.floor(secondsLeft);
    // milliseconds.innerHTML = Math.floor(millisecondsLeft);

    // Recall counter every seconds -> By doing this, every variables are also actualized
    setTimeout('counter()', 1000);
};

// Miliseconds counter
const millisecondsCounter = () => {
    const currentDate = new Date();
    const millisecondsLeft = retirementDate - currentDate;

    milliseconds.innerHTML = millisecondsLeft;

    setTimeout('millisecondsCounter()', 1);
};

// switch display mode : {Days + Hours + Minutes + Seconds} OR {Milliseconds} only
let ms = false;
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32 && !ms) {
        console.log(blocks);
        blocks[0].style.display = 'none';
        blocks[1].style.display = 'none';
        blocks[2].style.display = 'none';
        blocks[3].style.display = 'none';
        blocks[4].style.display = 'block';
        ms = true;
    } else if (e.keyCode === 32 && ms) {
        blocks[0].style.display = 'block';
        blocks[1].style.display = 'block';
        blocks[2].style.display = 'block';
        blocks[3].style.display = 'block';
        blocks[4].style.display = 'none';
        ms = false;
    }
});

//Auguste tête rebondissante
//--------------------------------------------------------------------
//Éléments du DOM
const head = document.querySelector('.head');
const headHeightCenter = 102;
const headWidthCenter = 78;

const screenX = window.innerWidth;
const screenY = window.innerHeight;

//variables
const x = {
    pos: 5,
    sign: 1,
};
const y = {
    pos: 5,
    sign: 1,
};
let posX = x.pos * x.sign;
let posY = y.pos * y.sign;

//Déplacement de la head
const movehead = () => {
    head.style.left = posX + 'px';
    head.style.top = posY + 'px';

    posX += x.pos * x.sign;
    posY += y.pos * y.sign;

    direction(posX, posY);

    setTimeout('movehead()', 20);
};

//détection collision
const collision = (posX, posY) => {
    if (posX <= 0) {
        return 'top';
    }
    if (posX >= screenX - 2 * headWidthCenter) {
        return 'bottom';
    }

    if (posY <= 0) {
        return 'left';
    }
    if (posY >= screenY - 2 * headHeightCenter) {
        return 'right';
    }
};

// direction de la heade
const direction = (posX, posY) => {
    switch (collision(posX, posY)) {
        case 'top':
        case 'bottom': {
            x.sign *= -1;
            changeImg();
            break;
        }
        case 'left':
        case 'right': {
            y.sign *= -1;
            changeImg();
            break;
        }
        default: {
            break;
        }
    }
};

//changer d'image
let picId;
let lastPicId = 0;
const changeImg = () => {
    do {
        picId = Math.ceil(Math.random() * 20);
    } while (picId === lastPicId);
    img.src = `./${picId}.jpg`;
    lastPicId = picId;
};
