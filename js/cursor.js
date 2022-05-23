let allRound = document.querySelector(".allRound");

allRound.addEventListener("mousedown", () => {
    allRound.classList.add('allRound-mousedown');
});
allRound.addEventListener("mouseup", () => {
    allRound.classList.remove('allRound-mousedown');
});

//progress.addEventListener("mouseenter", () => {
//    progress.classList.add('displayNone');
//    setTimeout(function () {
//        finalBt.classList.remove('displayNone'); 
//    },1500)
//})

//progress.addEventListener("mouseleave", () => {
//    finalBt.classList.add('displayNone');
//    setTimeout(function () {
//        progress.classList.remove('displayNone'); 
//    },1500)
//})
