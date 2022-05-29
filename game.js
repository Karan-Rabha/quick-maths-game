let digit = 10;
let score = 0;
let buttonIndex = [];
let ans = 0;
let started = false;
let buttons = document.querySelectorAll(".btn");

// generates random numbers takes one arguments
function randomNumber(num) {
    const number = Math.floor((Math.random() * num) + 1);
    return number;
}


function add(a, b) {
    return a + b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    let divi = a / b;
    return Number(divi.toFixed(2))
}
function subtract(a, b) {
    return a - b;
}

// generates random index numbers from [0-3] for the button.
// the the indexes gets assigned to the button and each unique operation funtions are called for each button.
// the funtion gets called from randomQuestions()
function randomAnswers(a, b) {
    let r_num = randomNumber(4) - 1;
    while (buttonIndex.length < 4) {
        if (buttonIndex.includes(r_num)) {
            randomAnswers(); b
        } else {
            buttonIndex.push(r_num);
        }
    }
    buttons[buttonIndex[0]].innerHTML = add(a, b);
    buttons[buttonIndex[1]].innerHTML = divide(a, b);
    buttons[buttonIndex[2]].innerHTML = multiply(a, b);
    buttons[buttonIndex[3]].innerHTML = subtract(a, b);
}

// clears the array buttonindex first.
// generates random question
// calls the randomAnswers function
// depending on the random operator selected performs the function and sets the global variable (ans=0)
// displays the question
function randomQuestion(digit) {
    buttonIndex = [];
    const operation = ["+", "x", "/", "-"];
    let num1 = randomNumber(digit);
    let num2 = randomNumber(digit);
    randomAnswers(num1, num2);

    let randOperation = operation[randomNumber(4) - 1];
    
    if (randOperation === "+") {
        ans = add(num1, num2);
    } else if (randOperation === "/") {
        ans = divide(num1, num2);
    } else if (randOperation === "x") {
        ans = multiply(num1, num2);
    } else {
        ans = subtract(num1, num2);
    }
    document.querySelector("h1").innerHTML = num1 + " " + randOperation + " " + num2;
}

// check the user selected answer.takes to arguments (useranswer, index of the button)
// updates the score
// applies css color property according to the users answer (right = green)<=>(wrong = red)
// after time out (1sec) removes the css applied
function checkAnswer(choosen, index) {
    if (choosen === ans) {
        score += 1;
        document.querySelector(".score").innerHTML = "score:" + score;
        buttons[index].classList.add("correct")
    } else {
        buttons[index].classList.add("wrong");
    }
    setTimeout(() => {
        buttons[index].classList.remove("correct", "wrong");
    }, 1000);
}


document.addEventListener('keypress', (e) => {
    if (started !== true) {
        randomQuestion(digit);
        started = true;
    }
    setInterval(() => {
        randomQuestion(digit);
        console.log(ans)
    }, 3000);
});


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var choosen = Number(this.textContent);
        if (choosen) {
            checkAnswer(choosen, i);
        }
    });
}

