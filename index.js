const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let canjump = true;
let canjump2 = true;
canvas.width = 1456;
canvas.height = 816;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },

    imageSrc: 'img/BG_11.png'
});

const player = new Fighter({
    position: {
        x: 0, 
        y: 0
    },
    
    velocity: {
        x: 0, 
        y: 10
    },

    offset:{
        x: 0,
        y: 0
    },
    colour: 'green'
});
player.draw();
const enemy = new Fighter({
    position: {
        x: 400, 
        y: 100
    },
    
    velocity: {
        x: 0, 
        y: 0
    },
    offset:{
        x: -50,
        y: 0
    },

    colour: 'blue'
});

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },

    w:{
        pressed: false
    },

    space:{
        pressed: false
    },
    //Player 2 Controls
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },

    ArrowUp:{
        pressed: false
    }
}

enemy.draw();
console.log(player);

function collisionDetection({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
        rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y 
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}
function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#winner').style.display = 'flex'
    if(player.health === enemy.health)
    {
        document.querySelector('#winner').innerHTML = 'Draw'
    } else if( player.health > enemy.health){
        document.querySelector('#winner').innerHTML = 'Player 1 Wins'
    } else {
        document.querySelector('#winner').innerHTML = 'Player 2 Wins'
    }
}

let timer = 60
let timerId = null
function countdown(){
    timerId = setTimeout(countdown, 1000)
    if(timer > 0){
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if(timer === 0){
        document.querySelector('#winner').style.display = 'flex'
    if(player.health === enemy.health)
    {
        document.querySelector('#winner').innerHTML = 'Draw'
    } else if( player.health > enemy.health){
        document.querySelector('#winner').innerHTML = 'Player 1 Wins'
    } else {
        document.querySelector('#winner').innerHTML = 'Player 2 Wins'
    }
}   
}

countdown()

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player.update();
    enemy.update();
    // Player 1 Controls
    if (keys.a.pressed && player.last_key == 'a'){
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.last_key == 'd'){
        player.velocity.x = 5;
    }
    else{
        player.velocity.x = 0;
    }

    if (keys.w.pressed && canjump){
        player.velocity.y = -10;
        canjump = false;
    }

    if(player.velocity.y == 0){canjump = true;}

    // Player 2 Controls

    if (keys.ArrowLeft.pressed && enemy.last_key == 'ArrowLeft'){
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.last_key == 'ArrowRight'){
        enemy.velocity.x = 5;
    }
    else{
        enemy.velocity.x = 0;
    }

    if (keys.ArrowUp.pressed && canjump2){
        enemy.velocity.y = -10;
        canjump2 = false;
    }

    if(enemy.velocity.y == 0){canjump2 = true;}

    // Collision Detection
    if(collisionDetection({
        rectangle1: player, 
        rectangle2: enemy
    }) && 
    player.isAttacking
    ){      player.isAttacking = false;
            console.log('player 1 hit success');
            enemy.health -= 10;
            document.querySelector('#enemyHealth').style.width = enemy.health + '%';
            
        }

        if(collisionDetection({
            rectangle1: enemy, 
            rectangle2: player
        }) && 
        enemy.isAttacking
        ){      enemy.isAttacking = false;
                console.log('enemy hit success');
                player.health -= 10;
            document.querySelector('#playerHealth').style.width = player.health + '%';
                
        }

    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId})
    }
}
    


animate();

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'a':
            keys.a.pressed = true;
            player.last_key = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            player.last_key = 'd';
            break;

        case 'w':
            keys.w.pressed = true;
            player.last_key = 'w';
            player.velocity.y = -10;
            
            
            break;
        
        case ' ':
            player.attack();
            
            
            
            break;
        //Player 2 Controls
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.last_key = 'ArrowLeft';
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.last_key = 'ArrowRight';
                break;
                
            case "ArrowUp":
                keys.ArrowUp.pressed = true;
                enemy.last_key = 'ArrowUp';
                break;
            
            case 'ArrowDown':
                enemy.attack();
                break;
    }   
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;

        case 'w':
            keys.w.pressed = false;
            break;

                //Player 2 Controls
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false;
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = false;
                break;
    
            case 'ArrowUp':
                keys.ArrowUp.pressed = false;
                break;
    }
});

