let Elements;
let q;
let r;
let a;
let x;
let y;
let fB;
let sB;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let sketch = function (p) {
    p.setup = function () {
        let Elements = p.createElement('div');
        Elements.class('text-container');

        let q = p.createElement('div', "당신의 사랑은");
        q.class('question');
        

        let fB = p.createElement('button', '뱀의 송곳니와 같다');
        fB.class('buttons');
        fB.id('first')
        
        
        
        let sB = p.createElement('button', '꽃의 뿌리와 같다');
        sB.class('buttons');
        sB.id('second');

        Elements.child(q);
        Elements.child(fB);
        Elements.child(sB);

        
        let cnv=p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.position(0, 0);
        cnv.position('absolute');
        cnv.style('z-index', '-1');
        console.log("hi")
        p.r = 0.01 * p.width;
    }
    p.draw = function () {
        p.background(220);
        p.translate(p.windowWidth * 0.79, p.windowHeight / 2);
        p.beginShape();
        if (p.r < 0.02 * p.width) {
            p.r = p.r + 1;
        }
        for (p.a = 0; p.a < p.TWO_PI; p.a += 0.01) {
        p.x = p.r * 16 * p.pow(p.sin(p.a), 3);
        p.y = -p.r * (13 * p.cos(p.a) - 5 * p.cos(2 *p.a) - 3 * p.cos(3 * p.a) - p.cos(4 * p.a));
        p.vertex(p.x, p.y);   
        }
        p.endShape();
    }
}


var myp5 = new p5(sketch);

// function draw() {
//     background(255);
//     translate(width * 0.79, height / 2);

//     beginShape();
//     // fB.mouseClicked(bigR);
//     // sB.mouseClicked(smallR);
//     if (r < 0.02 * width) {
//         r = r + 1;
//     }
//         for (let a = 0; a < TWO_PI; a += 0.01) {
//         let x = r * 16 * pow(sin(a), 3);
//         let y = -r * (13 * cos(a) - 5 * cos(2 * a) - 3 * cos(3 * a) - cos(4 * a));
//         vertex(x, y);   
//     }
//     endShape();
// }


