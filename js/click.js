
let click = 0;
let mode;
let first = document.getElementById('first');
let second = document.getElementById('second');
let circle1 = document.getElementById('circle1');
let circle2 = document.getElementById('circle2');
let mainqContainer = document.querySelector(".question");

function hide(x) {
    x.classList.remove('Appear');
    x.classList.add('Disappear');
}
function show(x) {
    x.classList.remove('Disappear');
    x.classList.add('Appear');
}

//클릭 시 숨기기: underline, dot, first, second
function clickHide() {
    for (let i = 0; i < Main.length; i++) {
        hide(Main[i]);
    }
}
//다음질문에서 다시 나타나기: circles, first, second
function clickShow() {
    for (let i = 0; i < Main.length; i++) {
        show(Main[i]);
    }
}


function getAnswer1() {
    setTimeout(() => {
        mainQ.innerHTML = currentQuestion.answer1;
        show(mainqContainer);
    }, 500);  
}
function getAnswer2() {
    setTimeout(() => {
        mainQ.innerHTML = currentQuestion.answer2;
        show(mainqContainer);
    }, 500);  
}


function delayNew() {
    setTimeout(() => {
        hide(mainqContainer);
    }, 9000);  
    setTimeout(() => {
        getNewQuestion();
        show(mainqContainer);
    }, 10000);    
}


// let checkException = [];
let recordResult = [];
let answerResult = [];
let answers = document.querySelectorAll('.answer')

first.onclick = function () {
    click++;
    mode = 1;
    clickHide();    
    getAnswer1();
    delayNew();
    recordResult.push(1);
    answerResult.push({ keyword: currentQuestion.mainQ, answer: currentQuestion.answer1 });
    console.log("recordResult", recordResult);
    console.log("answerResult", answerResult);
    answers[questionCounter - 1].innerHTML = answerResult[questionCounter - 1].answer;
    // console.log("a",answerResult[questionCounter-1].answer)
    if (audioClicked) {
        clickAudio();
    }
};

second.onclick = function () {
    click++;
    mode = 2;
    clickHide();    
    getAnswer2();
    delayNew();
    recordResult.push(2);
    answerResult.push({ keyword: currentQuestion.mainQ, answer: currentQuestion.answer2 });
    console.log("recordResult", recordResult);
    console.log("answerResult", answerResult);
    answers[questionCounter - 1].innerHTML = answerResult[questionCounter - 1].answer;
    if (audioClicked) {
        clickAudio();
    }
};

first.addEventListener("mouseover", () => {
    circle1.classList.add('rotateCircle1');
});
first.addEventListener("mouseleave", () => {
    circle1.classList.remove('rotateCircle1');
});
second.addEventListener("mouseover", () => {
    circle2.classList.add('rotateCircle2');
});
second.addEventListener("mouseleave", () => {
    circle2.classList.remove('rotateCircle2');
});





