var doc = window.document;
var docV = document.documentElement;
let fullscreen = document.querySelector("#fullscreen");



// 전체화면 설정
function openFullScreenMode() {
    if (docV.requestFullscreen)
        docV.requestFullscreen();
    else if (docV.webkitRequestFullscreen) // Chrome, Safari (webkit)
        docV.webkitRequestFullscreen();
    else if (docV.mozRequestFullScreen) // Firefox
        docV.mozRequestFullScreen();
    else if (docV.msRequestFullscreen) // IE or Edge
        docV.msRequestFullscreen();
}

// 전체화면 해제
function closeFullScreenMode() {
    if (doc.exitFullscreen)
        doc.exitFullscreen();
    else if (doc.webkitExitFullscreen) // Chrome, Safari (webkit)
        doc.webkitExitFullscreen();
    else if (doc.mozCancelFullScreen) // Firefox
        doc.mozCancelFullScreen();
    else if (doc.msExitFullscreen) // IE or Edge
        doc.msExitFullscreen();
}

function toggleFullScreen() {
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        openFullScreenMode.call(docV);
        fullscreen.classList.add("onclick");  
    }
    else {
        closeFullScreenMode.call(doc);
        fullscreen.classList.remove("onclick");
    }
}

fullscreen.addEventListener("click", () => {
    console.log("fullscreen");
    toggleFullScreen();
});
