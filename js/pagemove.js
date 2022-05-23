let heart = document.querySelector(".heart");
let linkText = document.querySelector("#linkText");
let arrowInfo = document.querySelector(".arrow-info");
let beforeMain = document.querySelectorAll(".beforeMain");
let Main = document.querySelectorAll(".Main");
let arrowinfoKey = document.querySelector("#arrowinfoKey");
let progress = document.querySelector("#progress");

linkText.addEventListener("click", clickFunction);
// linkText.addEventListener("mouseover", () => {
//     arrowinfoKey.style.backgroundColor  = "rgba(255,255,255,1)";
// });
// linkText.addEventListener("mouseleave", () => {
//     arrowinfoKey.style.backgroundColor  = "rgba(255,255,255,0)";
// });
// window.onload = function() {
//     mainAudio();
// }

function clickFunction() {
    linkText.classList.remove('slowAppear');
    linkText.classList.add('hurryDisappear');
    arrowInfo.classList.remove('slowAppear');
    arrowInfo.classList.add('hurryDisappear');
    // //linkText를 누르면 어떤 상황에서나 반드시 오디오가 재생되도록 하기
    audioClicked = false;
    mainAudio();
    setTimeout(() => {
        // heart.classList.add('hidden');
        linkText.innerHTML = "Choose the Phrase You Prefer";
        linkText.classList.remove('hurryDisappear');
        linkText.classList.add('slowAppear');
            setTimeout(() => {
                linkText.classList.remove('slowAppear');
                linkText.classList.add('hurryDisappear');
                waveBefore = false;
                console.log(waveBefore);
                if (!waveBefore) {
                    if (audioClicked) {
                    introBeat.play();
                    }
                }
                setTimeout(() => {
                    for (let i = 0; i < beforeMain.length; i++) {
                        beforeMain[i].remove();
                    }
                    progress.classList.add('Appear');
                    progress.classList.remove('displayNone');
                    for (let i = 0; i < Main.length; i++) {
                        Main[i].classList.add('Appear');
                        Main[i].classList.remove('displayNone');
                    }
                },1500);
            },4000);        
    }, 1500);
    console.log(audioClicked);

    linkText.removeEventListener("click", clickFunction);
}


function finalRestart() {
    allRound.classList.add('hurryDisappear');
    canvas1.classList.add('hurryDisappear');
    // for (let i = 0; i < Main.length; i++) {
    //     Main[i].classList.add('Disappear');
    // }
    setTimeout(() => {
        location.reload();
    }, 2000);
}

// const imgConverted = document.querySelector("#imgConverted");

//     function bodyShot() {html2canvas(document.body).then(canvas1 => {
//         drawImg(canvas1.toDataURL('image/png'));
//     });}
//     function drawImg(imgData) {
//         console.log(imgData);
//         return new Promise(
//             function reslove() {
//                 // var canvas3 = document.getElementById('canvas3');
//                 // var ctx3 = canvas3.getContext('2d');
//                 // ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
//                 // var imageObj = new Image();
//                 // imageObj.onload = function () {
//                 //     ctx3.drawImage(imageObj, 10, 10);
//                 // };
//                 imgConverted.src = imgData;
//             },
//             function reject() { }
//         );            
//     }
