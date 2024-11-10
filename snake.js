 const board=document.getElementById('gameboard')
const curScore=document.getElementById('currentScore')
// const instructSet=document.getElementById('instructionset');
const hiscore=document.getElementById('HighestScore')
const startg=document.querySelector('.start');
const img=document.getElementById('img');

const snakehide=document.getElementsByClassName('snake');
console.log(startg)
let snake=[{x:7,y:8}];
let delay=300;
let score=0;
let hscore=0
let start=0;
console.log(curScore)
let FoodPos=GeneratePos();
// console.log(FoodPos)
// console.log(board);

let direction='right';
function Draw(){ 
    board.innerHTML='';
    DrawSnake();
    DrawFood();
    
}
function DrawSnake(){
    snake.forEach((segment)=>{
       
        let snakeEle=CreateGameElement("div","snake"); 
        SetPosition(snakeEle,segment);
        board.appendChild(snakeEle)
    })
   
}
function DrawFood(){
  
    let Food=CreateGameElement("div","Food")
    board.appendChild(Food);
    SetPosition(Food,FoodPos);
}
function GeneratePos(){
    const x=Math.floor(Math.random()*20)+1;
    const y=Math.floor(Math.random()*20)+1;
    return {x,y};
}
function CreateGameElement(tag,clas){
  
        const element=document.createElement(tag);
        element.className=clas;
        return element;
}
function SetPosition(element,position){
    
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}
document.addEventListener('keydown',(event)=>{
    
     switch (event.code) {
        case 'ArrowUp':
            direction='up'
            break;
        case 'ArrowDown':
            direction='down'
            break;
        case 'ArrowRight':
            direction='right'
            break;
        case 'ArrowLeft':
            direction='left'
            break;
        
            
     }
})

function startGame(){
    start=1;
    console.log(start);
    delay=300;
}
function Move()
{  
    head={...snake[0]};
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'down':
            head.y++;
            break;
        case 'up':
            head.y--;
            break;
        
    }
    snake.unshift(head);
    snake.pop();
    if(head.x===FoodPos.x && head.y===FoodPos.y)
    { 
        delay=delay-100;
        console.log(score);
        snake=[...snake,{head}]
        FoodPos=GeneratePos();
        // console.log(FoodPos);
       updateScore()
       
    }
   if(head.x>20||head.x<0||head.y>20||head.y<0){
          resetGame()
          delay=0;
   }

 }
function updateScore(){
    score=snake.length-1;
    curScore.textContent=score.toString().padStart(3,'0');
}
function updateHighScore(){
    if (score>hscore){
        hscore=score
    }
    hiscore.textContent=hscore.toString().padStart(3,'0');
}
function resetGame(){
  
    updateHighScore()
    score=0;
    updateScore();
  
    img.style.display='flex';
    board.style.display='none';
    start=0;
    snake=[{x:10,y:10}];
    FoodPos=GeneratePos();
    direction='right';
}

    setInterval(()=>{
        if(start==0){
           
                // board.style.backgroundImage = "url('snake.jpg')"; 
                img.style.display='flex';
                board.style.display='none';
        }
        if(start==1)
        {
         Move();
         Draw(); 
         img.style.display='none';
         board.style.display='grid';
        //  board.style.backgroundImage="none";
        }
        
     },delay);
