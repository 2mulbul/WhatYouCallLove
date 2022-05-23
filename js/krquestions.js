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
        mainQ: '그대에게',
        button1: "<span class='keyWord key1'></span>" + ' 속할 수 있다면 그의 환부라도 되고 싶었습니다.<br>종양 같은 것이 되어서 당신을 오래오래 아프게 하고 싶었습니다.',
        button2: "<span class='keyWord key1'></span>" + ' 줄 게 없었어요.<br>피도 눈물도 내것은 하나도 없는 몸뚱이를 그대가 가졌으면',
        answer1: '그대에게 속할 수 있다면 그의 환부라도 되고 싶었습니다. 종양 같은 것이 되어서 당신을 오래오래 아프게 하고 싶었습니다.',
        answer2: '그대에게 줄 게 없었어요.<br>피도 눈물도 내것은 하나도 없는 몸뚱이를 그대가 가졌으면'
    },
    {
        mainQ: '이별',
        button1: "<span class='keyWord key1'></span>" + '이란 함께했던 과거가 아닌, 함께하지 못할 미래의 상실이다.',
        button2: "<span class='keyWord key1'></span>" + '은 공평하지 않다.<br>한 사람이 가볍게 생각한 마음을 다른 사람은 선물처럼 끌어안고 있다.',
        answer1: '이별이란 함께했던 과거가 아닌, 함께하지 못할 미래의 상실이다',
        answer2: '이별은 공평하지 않다. 한 사람이 가볍게 생각한 마음을 다른 사람은 선물처럼 끌어안고 있다.'
    },
    {
        mainQ: '관계',
        button1: '멈춰 있는 ' + "<span class='keyWord key1'></span>" + '는 없다.<br>' + "<span class='keyWord key1'></span>" + '는 움직이려 하는 것이므로<br>더 가까워지든지 더 멀어지든지 방향을 정해야 한다.',
        button2: '쓱 썰어낸 무처럼 ' + "<span class='keyWord key1'></span>" + '는 동강 나고<br>이제 내가 감당해야 할 상처들만 덩그러니 남아 있는 것이라고,<br>나는 그렇게 생각했지만 입 밖으로 꺼내지 않았다.',
        answer1: '멈춰 있는 관계는 없다. 관계는 움직이려 하는 것이므로 더 가까워지든지 더 멀어지든지 방향을 정해야 한다.',
        answer2: '쓱 썰어낸 무처럼 관계는 동강 나고 이제 내가 감당해야 할 상처들만 덩그러니 남아 있는 것이라고, 나는 그렇게 생각했지만 입 밖으로 꺼내지 않았다.'
    },

    {
        mainQ: '나 자신',
        button1: '나는 누구도 사랑할 수 없는 종류의 사람이었다.<br>내가 사랑할 수 있는 것은 ' + "<span class='keyWord key1'></span>" + ' 뿐 이었다.',
        button2: '살면서 중요하다고 생각해왔던 것들이 실제로는 대단치도 않았다.<br>반면 내가 대단치 않게 여겼던 것들이 실제로는 중요했다.<br>예를 들면, ' + "<span class='keyWord key1'></span>",
        answer1: '나는 누구도 사랑할 수 없는 종류의 사람이었다. 내가 사랑할 수 있는 것은 나 자신 뿐 이었다.',
        answer2: '살면서 중요하다고 생각해왔던 것들이 실제로는 대단치도 않았다. 반면 내가 대단치 않게 여겼던 것들이 실제로는 중요했다. 예를 들면, 나 자신.'
    },
    {
        mainQ: '권력',
        button1: '사랑의 ' + "<span class='keyWord key1'></span>" + '은 아무것도 주지 않을 수 있는 능력에서 나온다.',
        button2: '어떤 사람이 나를 안 좋아하는 것 같으면 그 사람을 겁내게 돼.<br>나에 대한 무슨 ' + "<span class='keyWord key1'></span>" + '같은 게 그 사람한테 생기는 거야.',
        answer1: '사랑의 권력은 아무것도 주지 않을 수 있는 능력에서 나온다.',
        answer2: '어떤 사람이 나를 안 좋아하는 것 같으면 그 사람을 겁내게 돼. 나에 대한 무슨 권력같은 게 그 사람한테 생기는 거야.'
    },
    {
        mainQ: '시간',
        button1: '이 남아도는 나를 어찌해야 할까<br>더 이상 너의 ' + "<span class='keyWord key1'></span>" + ' 속에 살지 않게 된 나를 ',
        button2: "<span class='keyWord key1'></span>" + ' 속에 영원히 살아 있는 것은 없으며<br>낡고 때 묻고 시들지 않는 것은 없다',
        answer1: '이 남아도는 나를 어찌해야 할까 더 이상 너의 시간 속에 살지 않게 된 나를',
        answer2: '시간 속에 영원히 살아 있는 것은 없으며 낡고 때 묻고 시들지 않는 것은 없다'
    },
    {
        mainQ: '사랑해',
        button1: '“나도 너를 '+"<span class='keyWord key1'></span>”" + ' 라는 말의 속뜻은 바로 이것이다.<br>“나는 결여다”',
        button2: "“<span class='keyWord key1'></span>.”" + "<br>애인은 나의 눈을 가만히 쳐다보고는,<br>" + "“나도 <span class='keyWord key1'></span>.”" + " 라고 말했다. 똑바로, 성실하게.<br>나는 매일 조금씩 망가지고 있다.",
        answer1: '“나도 너를 사랑해” 라는 말의 속뜻은 바로 이것이다.<br>“나는 결여다”',
        answer2: '“사랑해.” 애인은 나의 눈을 가만히 쳐다보고는,<br>“나도 사랑해.” 라고 말했다. 똑바로, 성실하게.<br>나는 매일 조금씩 망가지고 있다.'
    }
];

//Glider 설정
let answer1 = document.querySelectorAll("#answer1")
let answer2 = document.querySelectorAll("#answer2")
let answer3 = document.querySelectorAll("#answer3")
let answer4 = document.querySelectorAll("#answer4")
let answer5 = document.querySelectorAll("#answer5")
let answer6 = document.querySelectorAll("#answer6")
let answer7 = document.querySelectorAll("#answer7")

const config = {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    gap: 120,
    peek: { before: 64, after: 100 },
    // bound: true,
    autoplay: 3000,
    animationDuration: 1000
}

function gliderAnswer() {
    answer1.innerHTML = answerResult[0].answer;
    answer2.innerHTML = answerResult[1].answer;
    answer3.innerHTML = answerResult[2].answer;
    answer4.innerHTML = answerResult[3].answer;
    answer5.innerHTML = answerResult[4].answer;
    answer6.innerHTML = answerResult[5].answer;
    answer7.innerHTML = answerResult[6].answer;
    console.log("gliderdone");
}

var glide = new Glide('.glide', config)

//질문 카운트, 마지막 Reveal

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
        mainQ.innerHTML = "이것이 당신의 소란한 사랑입니다";
        // progressballs.classList.add('hidden');
        // projectName.classList.add('hidden');
        glide.on('mount.before', gliderAnswer)
        glide.mount()       
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
