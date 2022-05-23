const mainQ = document.querySelector('#mainq');
const buttonsArray = Array.from(document.querySelectorAll('.button'));
const progressballs = document.querySelectorAll('.balls');
const projectName = document.querySelector('#projectName');
const finalBt = document.querySelector('#finalBt-container');


let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        mainQ: 'HURT',
        button1: 'Despite your best efforts, people are going to be ' + "<span class='keyWord key2'></span>"+ '<br>when it’s time for them to be ' + "<span class='keyWord key2'></span>"+ '.',
        button2: 'You don’t get to choose if you get ' + "<span class='keyWord key1'></span>"+ ' in this world,<br>but you do have some say in who ' + "<span class='keyWord key1'></span>"+ 's you.',
        answer1: 'Despite your best efforts, people are going to be hurt when it’s time for them to be hurt.',
        answer2: 'You don’t get to choose if you get hurt in this world, but you do have some say in who hurts you.'
    },
    {
        mainQ: 'LOSS',
        button1: 'My head and shoulders melted first, followed by my hips and knees.<br>I was pure liquid ' + "<span class='keyWord key1'></span>"+ ', then, for an hour or two.',
        button2: 'At the temple there is a poem called “' + "<span class='keyWord key2'></span>"+ '” carved into the stone.<br>It has three words, but the poet has scratched them out.<br>You cannot read ' + "<span class='keyWord key2'></span>"+ ', only feel it.',
        answer1: 'My head and shoulders melted first, followed by my hips and knees.<br>I was pure liquid loss, then, for an hour or two.',
        answer2: 'At the temple there is a poem called “Loss” carved into the stone. It has three words, but the poet has scratched them out. You cannot read loss, only feel it.'
    },
    {
        mainQ: 'PITY',
        button1:  "<span class='keyWord key1'></span>"+ ' me that the heart is slow to learn<br>What the heart is slow to learn',
        button2: 'Neither love me for<br>Thine own dear ' + "<span class='keyWord key2'></span>"+ '’s wiping my cheeks dry',
        answer1: 'Pity me that the heart is slow to learn<br>What the heart is slow to learn',
        answer2: 'Neither love me for<br>Thine own dear pity’s wiping my cheeks dry'
    },
    {
        mainQ: 'HEART',
        button1: 'The ' + "<span class='keyWord key1'></span>"+ ' is ageless.',
        button2: 'Time parts the ' + "<span class='keyWord key2'></span>"+ 's of men—',
        answer1: 'The heart is ageless.',
        answer2: 'Time parts the hearts of men—'
    },
    

    {
        mainQ: 'LIGHT',
        button1: 'Love, leave me like the ' + "<span class='keyWord key1'></span>"+ ',<br>The gently passing day',
        button2: 'Yet the ' + "<span class='keyWord key2'></span>"+ ' of a whole life dies<br>When its love is done.',
        answer1: 'Love, leave me like the light,<br>The gently passing day',
        answer2: 'Yet the light of a whole life dies<br>When its love is done.'
    },
    {
        mainQ: 'LIFE',
        button1: 'So the chase takes up one’s ' + "<span class='keyWord key1'></span>"+ ', that’s all....',
        button2: 'That love is ' + "<span class='keyWord key2'></span>"+ ',<br>And ' + "<span class='keyWord key2'></span>"+ ' hath immortality.',
        answer1: 'So the chase takes up one’s life, that’s all....',
        answer2: 'That love is life,<br>And life hath immortality.'
    },

    {
        mainQ: 'LOVE',
        button1: 'It was ' + "<span class='keyWord key1'></span>"+', and it hit me so hard<br>I leaned against the screen door that still stood between us,<br>just to stay vertical.',
        button2: "<span class='keyWord key2'></span>"+' is heavy and light, bright and dark,<br>hot and cold,sick and healthy, asleep and awake<br>— it’s everything except what it is!',
        answer1: 'It was love, and it hit me so hard<br>I leaned against the screen door that still stood between us, just to stay vertical.',
        answer2: 'Love is heavy and light, bright and dark, hot and cold, sick and healthy, asleep and awake<br>- it’s everything except what it is!'
    }
];

const MAX_QUESTIONS = 7;
function finalReveal() {

    setTimeout(() => {
        show(mainqContainer);
        setTimeout(() => {
            hide(progress);
            setTimeout(() => {
                progress.classList.add('displayNone');
                finalBt.classList.remove('displayNone');
                document.querySelector(".glide-container").classList.remove("hideVis");
            }, 600); 
        }, 2000); 
    }, 3000);
}

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    //질문이 끝나면 endpage로 이동  
    var questionNumber = questionCounter + 1;
    if (questionNumber > MAX_QUESTIONS) {
        console.log("questionNumber> MAX_QUESTIONS");
        clickHide();
        mainQ.innerHTML = "This is What You Call Love";
        // progressballs.classList.add('hidden');
        // projectName.classList.add('hidden');
        finalReveal();
        
        // setTimeout(() => {
        //     window.location.href='/endpage.html';
        // },5000);
        // return window.location.assign('/endpage.html');
    } else {
        //hidden 요소 다시 불러오기
        clickShow();
        //진행정도표시
        // progressballs.innerText = Math.floor(questionCounter/ (MAX_QUESTIONS-1) * 100) + "%";
        // progressballs.innerText = (questionCounter+1)+" / "+MAX_QUESTIONS+" beat";
        // let ballsize = progressballs.getBoundingClientRect().width;
        // progressballs.style.left = ((questionCounter/ (MAX_QUESTIONS-1)) * 180 + ballsize/2) + "px";

        progressballs[questionCounter].style.backgroundColor = "white";
        //다음 질문 불러오기
        currentQuestion = availableQuestions[questionCounter];
        mainQ.innerHTML = currentQuestion.mainQ;
        //다음 버튼 불러오기
        buttonsArray.forEach(button => {
            const number = button.dataset['number'];
            button.innerHTML = currentQuestion['button' + number];
        });
        //횟수 더하기
        questionCounter++;
    }


    // availableQuestions.splice(questionCounter, 1);
    console.log("questionCounter", questionCounter);
};


startGame();
