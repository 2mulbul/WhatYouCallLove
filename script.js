const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 100
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function drawNew() {
    let imageWidth = png.width * 1.2;
    let imageHeight = png.height * 1.2;
    const heartCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const MOVE_SPEED = 0.2;
    const FRICTION = 0.8;
    const SCATTER = 2;

    class Particle {
        constructor(x, y) {
            this.x = x + (canvas.width- imageWidth)/2;
            this.y = y + (canvas.height- imageHeight)/2;
            
            this.size = 4;
            this.baseX = this.x;
            this.baseY = this.y;
            //density를 조정해서 particle 속도 조정 ex)30
            this.density = (Math.random() * 30) + 10;
        }
        draw() {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            if (distance < mouse.radius) {
                this.x -= directionX*SCATTER;
                this.y -= directionY*SCATTER;
        
            } else {
                if (this.x !== this.baseX) {
                    let vx = (this.x - this.baseX)*MOVE_SPEED;
                    vx *= FRICTION;
                    this.x -= vx;
                }
                if (this.y !== this.baseY) {
                    let vy = (this.y - this.baseY)*MOVE_SPEED;
                    vy *= FRICTION;
                    this.y -= vy;
                }
            }
        }
    }
    // console.log(heartCoordinates.data);
    function init() {
        particleArray = [];
        for (let y = 0, y2 = heartCoordinates.height; y < y2; y += 4 ) {
            for (let x = 0, x2 = heartCoordinates.width; x < x2; x += 4) {
                if (heartCoordinates.data[(y * 4 * heartCoordinates.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    particleArray.push(new Particle(positionX, positionY));
                }
            }
        }
    }
    init();
    // console.log(particleArray);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw();
            particleArray[i].update();
        }
        requestAnimationFrame(animate);
    
    }
    animate();
    
    window.addEventListener('resize', function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
        console.log("resized");
    });
}

const png = new Image();
png.src = "data:image/png;base64,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";

window.addEventListener('load', (event) => {
    ctx.drawImage(png, 0,0, png.width * 1.2, png.height * 1.23);
    drawNew();
});
