let mouseCursor = document.querySelector(".cursor");
let headerItems = document.querySelectorAll(".header-item");
let choices = document.querySelectorAll(".choices");
let circle = document.querySelectorAll(".circle");
let jellys = document.querySelectorAll(".jellys");


window.addEventListener('mousemove', cursor);

function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';    
}

choices.forEach(choice => {

    choice.addEventListener('mouseover', () => {
        mouseCursor.classList.add('highlight');
    });
});
// circle.forEach(cir => {
//     cir.addEventListener('mouseover', () => {
//         // cir.style.backgroundColor = 'white';
//         jellys.forEach(jel => {
//             jel.classList.add('highlight');
//             // TweenLite.to(cir, 0.1, { backgroundColor: "white" });
//         });
//     });
//     cir.addEventListener('mouseleave', () => {
//         jellys.forEach(jel => {
//             jel.classList.add('highlight');
//         // cir.classList.add('highlight');
//         // TweenLite.to(cir, 0.1, { backgroundColor: "black" });
//         });
//     });
// });
// console.log(choices);



