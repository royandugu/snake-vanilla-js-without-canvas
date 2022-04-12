const sfx=new Audio('perCSS/Audio/hiss.mp3');
const scoreDisplay=document.querySelector(".score");

//Arena creation 
for(let i=0;i<625;i++){
	let newDivs=document.createElement("div");
	document.querySelector("#crawlableArena").appendChild(newDivs);
}
const squares=document.querySelectorAll("#crawlableArena div");

let snake=[2,1,0];
let direction=1;
let width=25;
let score=0;
let flag=0;
let snakeColor=document.querySelectorAll(".snakeColor");


snake.forEach(item=>squares[item].classList.add("snake"));
//Toggler to toggle snake color
snakeColor.forEach(index=>{
	index.addEventListener("change",()=>{
		flag++;
		if(flag%2===0){
			snake.forEach(index=>{
				snakeClassOperation(index,"snakeRed",2);
				snakeClassOperation(index,"snake",1);
			});
			flag=0;
		}
		else {
			snake.forEach(index=>{
				snakeClassOperation(index,"snake",2);
				snakeClassOperation(index,"snakeRed",1);
			});
			flag=1;
		}
		headAssigment();
	})
})

//Main function called when to remove or add a certain class
function snakeClassOperation(position,className,condition){
	if(typeof(position)==="object"){
		if(typeof(className==="object")) {
			position.forEach(index=>className.forEach(index2=>squares[index].classList.remove(index2)));
		}
	}
	else{
		(condition===1)?squares[position].classList.add(className):squares[position].classList.remove(className);
	}
}

//Starting game
document.querySelector(".startGame").addEventListener("click",()=>{
	document.querySelectorAll(".disable").forEach(index=>index.classList.add("toBeDisabled"));
	const level=document.querySelector(".level");
	if(level.value==="levelOne") interval=setInterval(snakeMovement,250);
	else if(level.value==="levelTwo") interval=setInterval(snakeMovement,150);
	else if(level.value==="levelThree") interval=setInterval(snakeMovement,50);
})

//Decides the movement of snake
function snakeMovement(){
	if(((snake[0]+width)>=(width*width) && direction===width)||((snake[0]-width)<0 && direction===-width)||(snake[0]%width===0 && direction===-1)||(snake[0]%width===width-1 && direction===1)||(squares[snake[0]+direction].classList.contains("snake"))||(squares[snake[0]+direction].classList.contains("snakeRed"))){
		alert(`Your snake died
			Your final score is`+score);
		clearInterval(interval);
	}
	let tail=snake.pop();
	snake.unshift(snake[0]+direction);
	if(flag%2===0){
		snakeClassOperation(snake[0],"snake",1);
		snakeClassOperation(tail,"snake",2);
		snake.forEach(index=>squares[index].classList.remove("head","headUp","headDown","headLeft"));
	}
	else{
		snakeClassOperation(snake[0],"snakeRed",1)
		snakeClassOperation(tail,"snakeRed",2)
		snake.forEach(index=>squares[index].classList.remove("headRed","headLeftRed","headUpRed","headDownRed"));	
	}

	
	//When the snake eats the apple
	if(squares[snake[0]].classList.contains("apple")){
		if(document.querySelector("#sfxOn").checked){
			sfx.play();
		}
		scoreIncAndDisp();
		snake.push(tail);
		snake.forEach(index=>{
			if(flag%2===0){
				snakeClassOperation(index,"snake",1);
			}
			else{
				snakeClassOperation(index,"snakeRed",1)	
			}
		})
		snakeClassOperation(snake[0],"apple",2);
		appleGenerator();
	}
	headAssigment();
}



//Move the snake as per the keys clicked by the user
document.addEventListener("keyup",keyCodeAssignment);
function keyCodeAssignment(e){
	if(e.keyCode===39) direction=1;//Right arrow key
	else if(e.keyCode===40) direction=width;//Down arrow key
	else if(e.keyCode===38) direction=-width;//Up arrow key
	else if(e.keyCode===37) direction=-1;//Left arrow key
	headAssigment();
}



//Assign the position of the head as per the direction the snake moves
function headAssigment(){
	if(flag%2===0){
		squares[snake[0]].classList.remove("headRed"); //There is no list but the class is 
		if(direction===1) snakeClassOperation(snake[0],"head",1);
		else if(direction===-1) snakeClassOperation(snake[0],"headLeft",1);
		else if(direction===width) snakeClassOperation(snake[0],"headDown",1);
		else if(direction===-width) snakeClassOperation(snake[0],"headUp",1);
	}
	else{
		squares[snake[0]].classList.remove("head","headLeft","headDown","headUp");
		if(direction===1) snakeClassOperation(snake[0],"headRed",1);
		else if(direction===-1) snakeClassOperation(snake[0],"headLeftRed",1);
		else if(direction===width) snakeClassOperation(snake[0],"headDownRed",1);
		else if(direction===-width) snakeClassOperation(snake[0],"headUpRed",1);
	}
}
headAssigment();

//Now must generate apple on the random position on the canvas. The position should not overlap with the position of snake 
function appleGenerator(){
	let position=Math.floor(Math.random()*width*width);
	do{
		snakeClassOperation(position,"apple",1);
		return;
	}while(squares[position].classList.contains("snake"));
}
appleGenerator();



//Everytime the snake eats the apple, the score increases and the score is diplayed
function scoreIncAndDisp(){
	score++;
	scoreDisplay.textContent=score;
}



//gameRestart 
document.querySelector(".restart").addEventListener("click",()=>location.reload());