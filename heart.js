let click;
let mode;
let cnv;
let r;
let theta = 0;
// let mainq = document.getElementById('mainq');
let first = document.getElementById('first');
let second = document.getElementById('second');
let underline = document.getElementById('underline');
let dot = document.getElementById('dot');

//클릭 시 숨기기: underline, dot, first, second
function clickHide() {
    first.classList.add('hidden');
    second.classList.add('hidden');
    underline.classList.add('hidden');
    dot.classList.add('hidden');
}


function delayNew() {
    setTimeout(() => {
        getNewQuestion();
    }, 3000);    
}

first.onclick = function () {
    click++;
    mode = 1;
    mainQ.innerText = mainQ.innerText + " " + first.innerText + ".";
    clickHide();
    delayNew();
    // mainq.style(blendMode(DIFFERENCE););
};

second.onclick = function () {
    click++;
    mode = 2;
    mainQ.innerText = mainQ.innerText + " " + second.innerText + ".";
    clickHide();
    delayNew();
};






function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index', '-1');
    r = 0.01 * width;
    click = 0;
}

function draw() {

    background(255);
    translate(width * 0.79, height * 0.5);
    let x;
    let y;

    fill(0);
    stroke(0);

    if (click === 0) {
        let amt = sin(theta) /16;
        theta += 0.1;
        r = r + amt;
        
    } else if (mode===1 && click === 1) {
        if (r < 0.018 * width) {
            amt = (sin(theta) + 0.5) / 4;
            theta += 0.1;
            r = r + amt;

        } else if (r >= 0.018 * width) {
            let amt = sin(theta) /8;
            theta += 0.08;
            r = r + amt;
        }
        
    } else if (mode ===2 && click === 1) {     
        if (r > 0.005 * width) {
            amt = (sin(theta) - 0.5) / 8;
            theta += 0.1;
            r = r + amt;
        } else if (r <= 0.005 * width) {
            let amt = sin(theta) /16;
            theta += 0.2;
            r = r + amt;
        }
    }
    
    beginShape();
    
    for (let a = 0; a < TWO_PI; a += 0.01) {
        x = r * 16 * pow(sin(a), 3);
        y = -r * (13 * cos(a) - 5 * cos(2 * a) - 3 * cos(3 * a) - cos(4 * a));
        vertex(x, y);
    }
    endShape();
    
    if (click === 2) {

        
        
    }
    console.log("click", click);
    console.log("mode",mode);

}