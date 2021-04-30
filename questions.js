const mainQ = document.querySelector('#mainq');
const buttons = Array.from(document.querySelectorAll('.button'));
const progressText = document.querySelector('#progressText');

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        mainQ: '사랑해, 이게 온전히 내 잘못이야?',
        button1: '그것만은 나의 잘못이었지',
        button2:'라고 말했다.\n똑바로, 성실하게'
    },
    {
        mainQ: '이별은',
        button1: '“아 그게 마지막이었구나” 하고 생각하는 것이다',
        button2:'얼마나 사랑하는지 가늠할 수 있는 유일한 방법이다'
    },
    {
        mainQ: '그대에게',
        button1: '속할 수 있다면 그의 환부라도 되고 싶다',
        button2:'수수한 안개꽃이 되고 싶다'
    }
];

const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    // availableQuestions.forEach(element => console.log(element));
    getNewQuestion();
};
   //다음질문에서 다시 나타나기: underline, dot, first, second
function clickShow() {
    first.classList.remove('hidden');
    second.classList.remove('hidden');
    underline.classList.remove('hidden');
    dot.classList.remove('hidden');
}

getNewQuestion = () => {
    

    //질문이 끝나면 endpage로 이동  
    var questionNumber = questionCounter + 1;
    if (questionNumber> MAX_QUESTIONS) {
        console.log("fin");
        return window.location.assign('/endpage.html');
    }
    //hidden 요소 다시 불러오기
    if (first.classList.contains('hidden')) {
        clickShow();
    }
    //진행정도표시
    progressText.innerText = Math.floor(questionCounter/ MAX_QUESTIONS * 100) + "%";
    //다음 질문 불러오기
    currentQuestion = availableQuestions[questionCounter];
    mainQ.innerText = currentQuestion.mainQ;
    //다음 버튼 불러오기
    buttons.forEach(button => {
        const number = button.dataset['number'];
        button.innerText = currentQuestion['button' + number];
    });
    //횟수 더하기
    questionCounter++;

    // availableQuestions.splice(questionCounter, 1);
    console.log("questionCounter",questionCounter);


};

// buttons.forEach(button => {
//     button.addEventListener('click', e => {
//         setTimeout(() => {
//             getNewQuestion();
//         }, 50);
//     });
// });

startGame();