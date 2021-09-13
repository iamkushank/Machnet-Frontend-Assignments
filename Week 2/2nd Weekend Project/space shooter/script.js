const score = document.getElementById("score");
const space = document.getElementById("space");
const mainMenu = document.getElementById("main-menu");

mainMenu.addEventListener('click', start);

let player = { speed: 5, score: 0};
let isPause = false;

let keys = {
    ArrowLeft: false,
    ArrowRight: false,
    z: false,
    paused: false
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// const pause = document.getElementById('pause');
// const resume = document.getElementById('play');

// pause.addEventListener('click', gamePaused);
// resume.addEventListener('click', gameResume);

// let isPlaying = true;

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;

    if (e.key === 80){
        togglePause();
    }
    console.log(e.key)
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function togglePause(){
    if (!paused){
        paused = true;
        mainMenu.classList.remove('hide');
        mainMenu.innerHTML = "Game Paused";
    } else if (paused){
        paused= false;
    }
}

if(keys.z = true) {
    let laser = document.createElement('div');
    laser.setAttribute('class', 'laser');
    laser.style.left = player.x;
    space.appendChild(laser);
    console.log("shoot");
}

// function gamePaused(){
//     isPlaying = false;
//     mainMenu.classList.remove('hide');
//     mainMenu.innerHTML = "Game Paused";
//     console.log("paused");
// }
// function gameResume(){
//     isPlaying = true;
//     mainMenu.classList.add('hide');
//     console.log("resumed");
// }

function gamePlay() {
    let ship = document.querySelector('.ship');
    let spaceArea = space.getBoundingClientRect();

    console.log(spaceArea);

    function isCollide(a, b) {
        aRect = a.getBoundingClientRect();
        bRect = b.getBoundingClientRect();

        return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
    }

    function movesStars() {
        let shinny1 = document.querySelectorAll('.stars1');
        shinny1.forEach(function(item) {
            if(item.y >= 600) {
                item.y -= 650;
            }

            item.y += player.speed;
            item.style.top = item.y + "px";
        })

        let shinny2 = document.querySelectorAll('.stars2');
        shinny2.forEach(function(item) {
            if(item.y >= 600) {
                item.y -= 650;
            }

            item.y += player.speed;
            item.style.top = item.y + "px";
        })

        let shinny3 = document.querySelectorAll('.stars3');
        shinny3.forEach(function(item) {
            if(item.y >= 600) {
                item.y -= 650;
            }

            item.y += player.speed;
            item.style.top = item.y + "px";
        })
    }

    function endGame() {
        player.start = false;
        mainMenu.classList.remove('hide');
        mainMenu.innerHTML = "Game Over <br> Click here to restart the game";
    }

    function movesEnemies(ship) {
        let alien = document.querySelectorAll('.enemy');
        alien.forEach(function(item) {
            if(isCollide(ship, item)) {
                console.log("Boom hit");
                endGame();
            }

            if(item.y >= 630) {
                item.y = -200;
                item.style.left = Math.floor(Math.random() * 350) + "px";
            }

            item.y += player.speed;
            item.style.top = item.y + "px";
        })
    }

    if(player.start) {

        movesStars();
        movesEnemies(ship);

        if(keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if(keys.ArrowRight && player.x < (spaceArea.width - 60)) {
            player.x += player.speed;
        }

        ship.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
    }
}

function start() {
    mainMenu.classList.add('hide');
    space.innerHTML = "";
    
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(i=0; i<4; i++){
        let stars1 = document.createElement('div');
        stars1.setAttribute('class', 'stars1');
        stars1.y = (i*150);
        stars1.style.top = stars1.y + "px";
        space.appendChild(stars1);
    }

    for(j=0; j<4; j++){
        let stars2 = document.createElement('div');
        stars2.setAttribute('class', 'stars2');
        stars2.y = (j*150);
        stars2.style.top = stars2.y + "px";
        space.appendChild(stars2);
    }

    for(k=0; k<4; k++){
        let stars3 = document.createElement('div');
        stars3.setAttribute('class', 'stars3');
        stars3.y = (k*150);
        stars3.style.top = stars3.y + "px";
        space.appendChild(stars3);
    }

    let ship = document.createElement('div');
    ship.setAttribute('class', 'ship');
    space.appendChild(ship);

    player.x = ship.offsetLeft;

    console.log("top:" + ship.offsetTop);
    console.log("left:" + ship.offsetLeft);

    for(i=0; i<5; i++) {
        let enemyShip = document.createElement('div');
        enemyShip.setAttribute('class', 'enemy');
        enemyShip.y = ((i + 1) * 350) * -1;
        enemyShip.style.top = enemyShip.y + "px";
        enemyShip.style.backgroundColor = randomColor();
        enemyShip.style.left = Math.floor(Math.random() * 350) + "px";
        space.appendChild(enemyShip);
    }
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}