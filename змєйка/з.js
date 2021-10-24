const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "ground.png"; // оце ми нашли картінку
const foodImg = new Image;
foodImg.src = "food.png";

let box = 32; // отвічає за ширину і висоту одного квадратіка, одної клєточкі
let score = 0; // общій щот нащої ігри
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box, // оце рандомна коордіната їди появляється на холсті.. умножаєм на box, якій 32ширина-висота клєткі
    y: Math.floor((Math.random() * 15 + 3)) * box,    // +3 указали для того, шоб їжа на полотні зверху на рандомнулась
}

let snake = [];
snake[0] = {   // перший елемент змєйкі указуєм
 x: 9 * box,
 y: 10 * box, // це ми сказали шо вона по центру
}
document.addEventListener("keydown", direction); //зараз начінаєм писать за те, шоб при нажатії на клавіши змєйка двигалась
let dir;
function direction(event) {
    if(event.keyCode == 37 && dir != "right")    // keyCode == 37 - це клавіша влєво на клаві + перевірка.. якшо двіженіє влєво, вправо нельзя розвернуть
    dir = "left";
    else if(event.keyCode == 38 && dir != "down")
    dir = "up";
    else if(event.keyCode == 39 && dir != "left")
    dir = "right";
    else if(event.keyCode == 40 && dir != "up")
    dir = "down";
}
function eatTail(head, arr){ // тут пишем шоб сама у себе не врізалась
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0)  // це ми рисуєм ground (полотно) на канвасі, нулі то коордінати по x і y
    ctx.drawImage(foodImg, food.x, food.y); // оце ми нарисували їду на полотні, рандомно появляється, як ми више описали
    //ниже рисуєм змєйку, з нею важче, бо треба перебірать масів обьєктов.
    for(let i = 0; i < snake.length; i++){
        //ctx.fillStyle = "green";  // ми почали рисувать змєйку.. вона буде не картінкой, а нарисованой, тут ми указали, шо вона зелена
        ctx.fillStyle = i == 0 ? "green" : "red"; // це ми переписали: перший елемент зелений, остальні красні
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // тут сначала указали коордінати, ссилаємся на snake више (по центру ставили, далі указували ширину і висоту, які 32 (box))
    }

    ctx.fillStyle = "white"; // зараз ми хочємо щот виводить зверху.. це цвєт тєкста
    ctx.font = "50px Arial";
    ctx.fillText(score, box*2.5, box * 1.7); // щот і коордінати по іксі і ігрику



    let snakeX = snake[0].x; // почінаєм писать двіженіє
    let snakeY = snake[0].y;
    if(snakeX == food.x && snakeY == food.y) { // зараз пишем про їду, шоб жерло
        score++;
        food = {  // оце скопірували код више.. якшо схавали їду, їда заново гєнєрірується
            x: Math.floor((Math.random() * 17 + 1)) * box, 
            y: Math.floor((Math.random() * 15 + 3)) * box,   
        };
    } else {
        snake.pop(); // останній елемент в змєйці удалили, якшо не зьїли
    }

    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)  // зараз пишем, шоб за прєдєли полотна змєйка не виходила 
        clearInterval(game); // закончіли обновлєніє інтервала

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }  // ми перед цим pop удалил голову, а тут заново її добавляєм..
    eatTail(newHead, snake); // це перевірка чі не врізались
    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100); // це ми кажем шо функція drawGame має визивацця кожні 100мл сєкунд, без цього не отобраться
