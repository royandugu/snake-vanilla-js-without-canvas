# snake-vanilla-js-without-canvas
Snake game using vanilla-JS, without the use of HTML Canvas

### Concept
The position of the snake in the gridboxes is an array. 
As it moves forward, the forward grid positions are pushed in front of that array 
and it's tail positions are constantly popped. This makes it look like the snake is moving forward.

As snake eats the apple, the number of elements on the array that represents the snake position increases
making the snake look longer than before.

### Collison detection is done using the concept of classes. 
If any div contains both the classes representing the apple and the snake's head then the snake has eaten. 
If any div contains both the classes representing the snake's head as well as snake's body then the snake has eaten itself.

### Snake movement
The snake moves on the grid with respect to the direction variable which is changed as per the keys 
pressed in the keyboard. 

### Extra features
SFX && Snake Color Change (Red and Blue)
<br>

### View
<br>

![](ForReadMe%5C1.JPG)

<br>