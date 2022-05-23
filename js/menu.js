// let menu = document.querySelector("#menu-icon");
let menuIcon = document.querySelector("#menu-icon");

let Mbar1 = document.querySelector("#Mbar-1");
let Mbar2 = document.querySelector("#Mbar-2");
let rotateMenu1 = document.querySelector(".rotateMenu1");
let rotateMenu2 = document.querySelector(".rotateMenu2");

let menuItem = document.querySelector(".menu-item");
let menuList = document.querySelector("#menu-list");
let listItems = document.querySelectorAll("#menu-list li");
let menuBackground = document.querySelector("#menu-background");
let shareButtons = document.querySelectorAll('.share-bts');
let textContainer = document.querySelector(".main-container");

let overlay = document.querySelector("#overlay");

let showMenu = document.querySelector(".showMenu");




// menuIcon.addEventListener("click", () => {
//     if (overlay.classList.contains('hiddenMenu')) {
//         Mbar1.classList.add('rotateMenu1');
//         Mbar2.classList.add('rotateMenu2');
//         overlay.classList.remove('hiddenMenu');


//     } else {
//         Mbar1.classList.remove('rotateMenu1');
//         Mbar2.classList.remove('rotateMenu2');

//         overlay.classList.remove('showMenu');
//         setTimeout(500, () => {
//             overlay.classList.add('hiddenMenu');
        
//         })




//     }
// })


// listItems.forEach((menuItem) => {
//     menuItem.addEventListener("mouseover", () => {
//         let container = menuList.getBoundingClientRect();
//         let text = menuItem.getBoundingClientRect();
//         menuBackground.classList.add('active');
//         menuBackground.style.left = (text.x - container.x)+ 'px';
//         menuBackground.style.width = text.width+'px';
//     });
//     menuItem.addEventListener("mouseleave", () => {
//         menuBackground.classList.remove('active');
//     });
// })

// $(function () {
//     let listItems = $('#menu-list li')
//     let menu = $('#menu-icon')
//     let menuItem = $(".menu-item")
//     let overlay = $('#overlay')
//     let overlayContents = $(".overlay-contents")

//     menu.on("click", function () {
//         Mbar1.classList.toggle('rotateMenu1');
//         Mbar2.classList.toggle('rotateMenu2');
//         console.log(overlay);
//         overlay.classList.toggle('displayNone');
//         setTimeout(function () {
//             overlay.toggle('hidden');
//             // overlayContents.removeClass('hidden');
//         }, 20);
//     })

//     // listItems.on("click" , function(){
//     //     var $this = $(this);
//     //     listItems.removeClass("onclick");
//     //     $this.addClass("onclick");


//     //     overlay.removeClass('displayNone');
//     //     setTimeout(function () {
//     //         overlay.removeClass('hidden');
//     //         // overlayContents.removeClass('hidden');
//     //     }, 20);
//     //     // if (!overlayContents.hasClass("hidden") && !overlay.hasClass("hidden")) {
//     //     //     overlayContents.addClass('hidden');
//     //     // }

//     //     // if (!overlay.hasClass("hidden")) { 
//     //     //     overlayContents.addClass('hidden');
//     //     //     setTimeout(function () {
//     //     //         overlayContents.removeClass('hidden');
//     //     //         fetchMenu($this.attr("id"));
//     //     //     }, 2000);
//     //     // }

//     //     overlayContents.addClass('hidden');
//     //     setTimeout(function () {
//     //         fetchMenu($this.attr("id"));
//     //     }, 600);
//     //         setTimeout(function () {
//     //             overlayContents.removeClass('hidden');
//     //         }, 900);

//     //     // if ($this.attr("id") == "about") {
//     //     //     fetchMenu(about)
//     //     // }
//     //     // fetchMenu($this.attr("id"));
//     // })
//     // menu.on("click", function () {
//     //     listItems.removeClass("onclick");
//     //     Mbar1.classList.toggle('rotateMenu1');
//     //     Mbar2.classList.toggle('rotateMenu2');

//     //     if (menuItem.hasClass("displayNone")) {
//     //         console.log("show")
//     //         menuItem.removeClass('displayNone');
//     //         setTimeout(function () {
//     //             menuItem.removeClass('hidden');
//     //         }, 20);
//     //     } else {
//     //         console.log("hide")
//     //         overlay.addClass('hidden');
//     //         menuItem.addClass('hidden');
//     //         setTimeout(function () {
//     //             menuItem.addClass('displayNone');
//     //         }, 1000);
//     //         setTimeout(function () {
//     //             overlay.addClass('displayNone');
//     //         }, 2000);
//     //     }
        
//     // })
    



// })

let captureNshare = document.querySelector("#captureNshare");



function fetchMenu(name) {
    fetch(name)
        .then(function (response) {
            response.text()
                .then(function (text) {
                    document.querySelector('.main-container').innerHTML = text;
                })
        });
    if (name == 'share') {
        console.log("share clicked")
        if (captureNshare.classList.contains('displayNone')) {
            captureNshare.classList.remove('displayNone');
        }
        // if (captureImg.classList.contains('displayNone')) {
        //     captureImg.classList.remove('displayNone');
        //     shareButtons.forEach((bt) => {
        //         bt.classList.remove('displayNone');
        //     })
        //     console.log("whatswrong")
        // }
    } else {
        console.log("else menu clicked")
        if (!captureNshare.classList.contains('displayNone')) {
            captureNshare.classList.add('displayNone');
        }
        // if (!captureImg.classList.contains('displayNone')) {
        //     captureImg.classList.add('displayNone');
        //     shareButtons.forEach((bt) => {
        //         bt.classList.add('displayNone');
        //     })
        // }
    }
}
