let audioIcon = document.querySelector("#audio");
let Abar1 = document.querySelector("#Abar-1");
let Abar2 = document.querySelector("#Abar-2");
let Abar3 = document.querySelector("#Abar-3");
let Abar4 = document.querySelector("#Abar-4");
let Abar5 = document.querySelector("#Abar-5");
let Abar6 = document.querySelector("#Abar-6");

// let buttons = document.querySelectorAll(".button");
let audio1 = new Audio('./music/quiescent-in-time.mp3');
let audio2 = new Audio('./music/underwater.mp3');

audio1.volume = 0.2;
audio2.volume = 0.7;

audio1.loop = true;
audio2.loop = true;


let introBeat = new Audio('./music/introBeat.wav');
introBeat.loop = false;

let clickSound = new Audio('./music/zapsplat_human_heartbeat_single_26493.mp3');
clickSound.loop = false;


let audioClicked = false;
audioIcon.addEventListener("click", mainAudio);

function clickAudio() {
    console.log("clickAudio");
    clickSound.play();
}

function mainAudio() {
    if (audioClicked) {
        Abar1.classList.add("stopAnim");
        Abar2.classList.add("stopAnim");
        Abar3.classList.add("stopAnim");
        Abar4.classList.add("stopAnim");
        Abar5.classList.add("stopAnim");
        Abar6.classList.add("stopAnim");
        audioIcon.classList.remove("onclick");
        audio1.pause();
        audio2.pause();

        audioClicked = false;

    } else {
        Abar1.classList.remove("stopAnim");
        Abar2.classList.remove("stopAnim");
        Abar3.classList.remove("stopAnim");
        Abar4.classList.remove("stopAnim");
        Abar5.classList.remove("stopAnim");
        Abar6.classList.remove("stopAnim");
        audioIcon.classList.add("onclick");
        audio1.play();
        audio2.play();


        audioClicked = true;
    }
    console.log(audioClicked);
    console.log("mainAudio");
}










