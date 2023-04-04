let allRound = document.querySelector(".allRound");

allRound.addEventListener("mousedown", () => {
    allRound.classList.add('allRound-mousedown');
});
allRound.addEventListener("mouseup", () => {
    allRound.classList.remove('allRound-mousedown');
});

progress.addEventListener("mouseenter", () => {
    hide(progress);
    show(finalBt);
    finalBt.classList.remove('displayNone');

    setTimeout(() => {
        progress.classList.add('displayNone');
    }, 600); 
})

finalBt.addEventListener("mouseleave", () => {
    progress.classList.remove('displayNone');
    show(progress);
    hide(finalBt);
    
    finalBt.classList.add('displayNone');
})
