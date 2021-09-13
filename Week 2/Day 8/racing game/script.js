const score = document.getElementById('score');
const mainMenu = document.getElementById('main-menu');
const gameArea = document.getElementById('game-area');

// controls
let keys = {ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

mainMenu.addEventListener('click', start);

let player = { speed : 5, score : 0};

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
} 

function isCollide(a,b) {
        aRect = a.getBoundingClientRect();
        bRect = b.getBoundingClientRect();

        return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom ) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}
    
// road movement
function moveLines(){
    let lines = document.querySelectorAll(".lines");

    lines.forEach(function(item){
        if(item.y >= 700){
            item.y = -50; 
        }

        item.y += player.speed;
        item.style.top= item.y + "px";
    })
}

// Game Over
function endGame(){
    player.start=false;
    mainMenu.classList.remove("hide");

    mainMenu.innerHTML = 'Game Over<br> final score:' + player.score + '<br><br>click here to restart the game';
}

// moving other racers
function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(isCollide(car, item)){
            endGame();
        }
        if(item.y >= 700){
            item.y = -300; 
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }

        item.y += player.speed;
        item.style.top= item.y + "px";
    })
}

 // game play function
function gamePlay(){
    let road = gameArea.getBoundingClientRect();
    let car = document.querySelector('.car');

    if(player.start){
        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > (road.top + 70))
        {
            player.y -= player.speed
        }
        if(keys.ArrowDown && player.y < (road.bottom - 300))
        { 
            player.y += player.speed
        }
        if(keys.ArrowLeft && player.x > 4)
        {
            player.x -= player.speed
        }
        if(keys.ArrowRight && player.x < (road.width - 50))
        {
            player.x += player.speed
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px'; 

        window.requestAnimationFrame(gamePlay);

        score.innerText=" score:   " + player.score;
        player.score++;
    }
}

// main menu
function start(){
    // mainMenu.style.visibility = "hidden";
    mainMenu.classList.add('hide');
    
    gameArea.innerHTML='';

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

    // road lines creation
    for(x=0; x<5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + 'px';
        gameArea.appendChild(roadLine);
    }

    // new car
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // enemy cars
    for(x=0; x<3; x++){
        let enemyCar = document.createElement('div');

        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + 'px';
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
        gameArea.appendChild(enemyCar);
    }
}

// chooses random colors
function randomColor(){
    function c(){
        let hex= Math.floor(Math.random()*256).toString(16);
        return ("0" + String(hex)).substr(-2);  
    }

    return "#" + c() +c() +c();
}

