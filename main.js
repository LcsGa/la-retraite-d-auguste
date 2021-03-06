// Elements du DOM
const days = document.querySelector(".days-left");
const hours = document.querySelector(".hours-left");
const minutes = document.querySelector(".minutes-left");
const seconds = document.querySelector(".seconds-left");
const milliseconds = document.querySelector(".milliseconds-left");

const blocks = document.querySelectorAll(".counter-block"); // tous les blocks counter []

const img = document.querySelector("img");

const begining = new Date();

const head = document.querySelector(".head");

// Date de départ à la retraite
const retirementDate = new Date("2021-09-01T16:00:00");

// Initialize counter
window.onload = () => {
  counter();
  millisecondsCounter();
  movehead();
};

// Recharge la page au resize de celle-ci
window.addEventListener("resize", () => {
  window.location.reload();
});

// Recharge la page a la rotation du téléphone
window.addEventListener("orientationchange", () => {
  window.location.reload();
});

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
  setTimeout("counter()", 1000);
};

// Miliseconds counter
const millisecondsCounter = () => {
  const currentDate = new Date();
  const millisecondsLeft = retirementDate - currentDate;

  milliseconds.innerHTML = millisecondsLeft;

  setTimeout("millisecondsCounter()", 1);
};

// switch display mode : {Days + Hours + Minutes + Seconds} OR {Milliseconds} only
let ms = false;
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    displayMs();
  }
});

// Anti click droit + affiche ms
document.oncontextmenu = () => {
  displayMs();
  return false;
};

// Function show ms
const displayMs = () => {
  if (!ms) {
    blocks[0].style.display = "none";
    blocks[1].style.display = "none";
    blocks[2].style.display = "none";
    blocks[3].style.display = "none";
    blocks[4].style.display = "block";
    ms = true;
  } else if (ms) {
    blocks[0].style.display = "block";
    blocks[1].style.display = "block";
    blocks[2].style.display = "block";
    blocks[3].style.display = "block";
    blocks[4].style.display = "none";
    ms = false;
  }
};

//Auguste tête rebondissante
//--------------------------------------------------------------------
//Éléments à manipuler
let headHeight;
let headWidth;
let headVelocity;

//taille head
if (window.innerHeight <= 500 || window.innerWidth <= 500) {
  headHeight = 80;
  headWidth = 61.7;
  headVelocity = 50;
} else {
  headHeight = 200;
  headWidth = 154.3;
  headVelocity = 20;
}

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
  head.style.left = posX + "px";
  head.style.top = posY + "px";

  posX += x.pos * x.sign;
  posY += y.pos * y.sign;

  direction(posX, posY);

  setTimeout("movehead()", headVelocity);
};

//détection collision
const collision = (posX, posY) => {
  if (posY < 0 && posX < 0) {
    return "corner"; //topLeft
  }
  if (posY < 0 && posX > screenX - headWidth) {
    return "corner"; //topRight
  }
  if (posY > screenY - headHeight && posX > screenX - headWidth) {
    return "corner"; //bottomRight
  }
  if (posY > screenY - headHeight && posX < 0) {
    return "corner"; //bottomLeft
  }
  if (posY < 0) {
    return "top";
  }
  if (posX > screenX - headWidth) {
    return "right";
  }
  if (posY > screenY - headHeight) {
    return "bottom";
  }
  if (posX < 0) {
    return "left";
  }
};

// direction de la head
const direction = (posX, posY) => {
  switch (collision(posX, posY)) {
    case "corner": {
      x.sign *= -1;
      y.sign *= -1;
      changeImg();
      break;
    }
    case "top":
    case "bottom": {
      y.sign *= -1;
      changeImg();
      break;
    }
    case "left":
    case "right": {
      x.sign *= -1;
      changeImg();
      break;
    }
    default: {
      break;
    }
  }
};

//Timer rebond
let lastDate;
let currentDate = new Date();
const reboundTimer = () => {
  lastDate = currentDate;
  currentDate = new Date();

  if (currentDate - lastDate <= 40) {
    window.location.reload();
  }
};

// changer d'image
let picId;
let lastPicId = 0;
const changeImg = () => {
  do {
    picId = Math.ceil(Math.random() * 20);
  } while (picId === lastPicId);
  img.src = `./${picId}.jpg`;
  lastPicId = picId;
};

document.addEventListener("click", () => {
  let rotation = 0;

  const rotate = setInterval(() => {
    head.style.transform = `rotate(${rotation}deg)`;
    rotation += 10;
    if (rotation === 360) {
      head.style.transform = "rotate(0)";
      clearInterval(rotate);
    }
  }, 5);
});
