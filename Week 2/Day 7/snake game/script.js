const board_border = 'black';
const board_background = "black";
const snake_col = 'green';
const snake_border = 'orange';

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

let score = 0;
let changing_direction = false;


let food_x;
let food_y;

let dx = 10;
let dy = 0;

const snakeboard = document.getElementById("game");
const ctx = snakeboard.getContext("2d");

gen_food();

document.addEventListener("keydown", change_direction);

const start_game = document.getElementById('start-game');
const quit_game = document.getElementById('quit-game');
const game_over = document.getElementById('game-over');
const score_no = document.getElementById('score');

start_game.style.visibility = "visible";
game_over.style.visibility = "hidden";
score_no.style.visibility = "hidden";

start_game.addEventListener('click', () => {
    start_game.style.visibility= "hidden";
    score_no.style.visibility = "visible";          
    main();
});

quit_game.addEventListener('click', () => {
    window.location.reload();
});

// game runs on loop
function main() {
    if (has_game_ended())
        return;
    
    changing_direction = false;
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();

        main();
    }, 100)
}

function clear_board() {
    ctx.fillStyle = board_background;
    ctx.strokestyle = board_border;
    ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw each parts of the snake in the canvas
function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(food_x, food_y, 10, 10);
    ctx.strokeRect(food_x, food_y, 10, 10);
}

// Draw one snake part at a time
function drawSnakePart(snakePart) {
    ctx.fillStyle = snake_col;
    ctx.strokestyle = snake_border;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            game_over.style.visibility = "visible";
            return true
        }
    }
    
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    
    if (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) {
        game_over.style.visibility = "visible";
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }
}

function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        
        if (has_eaten) gen_food();
    });
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    
    if (changing_direction) return;
    changing_direction = true;
    
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function move_snake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    
    if (has_eaten_food) {
        score += 5;
        document.getElementById('score').innerHTML = score;
        
        gen_food();
    } else {
        snake.pop();
    }
}