let cirPath = [];
let triPath = [];
let spacing = 10;
let theta = 0;
function polarToCartesian(r,angle) {
    return createVector(r * cos(angle), r * sin(angle));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index','-1')
    
    angleMode(DEGREES);
    let radius = 100;
    let startA = 0;
    let endA = 120;
    let start = polarToCartesian(radius, startA);
    let end = polarToCartesian(radius, endA);

    for (let a = startA; a < 360; a += spacing) {
        let cv = polarToCartesian(radius, a)
        cirPath.push(cv);
        
        let amt = (a % 120) / (endA - startA);
        let tv = p5.Vector.lerp(start, end, amt);
        triPath.push(tv);
        
        if ((a + spacing) % 120 === 0) {
            startA = startA + 120;
            endA = endA + 120;
            start = polarToCartesian(radius,startA);
            end = polarToCartesian(radius,endA);
        }
    }

    

    console.log(startA,endA);
}


function draw() {
    background(255);
    translate(width * ( 3/ 4), height / 2);
    rotate(30);
    noStroke();
    fill(0);
    let amt = (sin(theta) + 1) / 2;
    theta += 3;
    beginShape();
    for (let i = 0; i < cirPath.length; i++) {
        let cv = cirPath[i];
        let tv = triPath[i];
        let x = lerp(cv.x, tv.x, amt);
        let y = lerp(cv.y, tv.y, amt);
        vertex(x,y);
    }
    endShape(CLOSE);
    
}
