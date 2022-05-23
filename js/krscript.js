//canvas2는 하트png보관함-재사용금지
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
//canvas1은 draw
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

let particleArray = [];
let dirtArray = [];
let dirtArray2 = [];
let watcherArray = [];
let rainArray = [];


//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 100
};

//beforeMain: 로드 후 몇 초 뒤/ 마우스 움직임 없을 시 몇 초 뒤 하트 웨이브
let waveBefore = true;
let waveCenter = {
    x: 300,
    y: 200,
    radius: 100,
    state: false
};
function waveCountStart() {
    waveCenter.state= true;
}
var timeout;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    if (waveBefore) {
        clearTimeout(timeout);
        timeout = setTimeout(waveCountStart, 20000);
    } else { };
});

function Restart() {
    progress.classList.add('displayNone');
    setTimeout(function () {
        finalBt.classList.remove('displayNone'); 
    },1000)
}
var restartTimer;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    
    clearTimeout(restartTimer);
    restartTimer = setTimeout(Restart, 60000);
    
});

function drawParticle() {
    let heartWidth = png.width * 1.2;
    let heartHeight = png.height * 1.23;
    const heartCoordinates = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    let MOVE_SPEED_P = 0.2;
    let MOVE_SPEED_D = 0.007;
    let SCATTER_P = 2;
    let FRICTION_P = 0.8;
    const FRICTION_D = 0.6;
    let MOVE_SPEED_W1 = 0.2;
    let SCATTER_W1 = 2;
    let FRICTION_W1 = 0.8;

    //기본하트 파티클
    class Particle {
        constructor(x, y) {
            this.x = x + (canvas2.width- heartWidth)/2;
            this.y = y + (canvas2.height- heartHeight)/2;
            this.size = 4;
            this.baseX = this.x;
            this.baseY = this.y;
            //density를 조정해서 particle 속도 조정 ex)30
            this.density = (Math.random() * 30) + 10;
            //떨어지는 속도 or 화면에 튕기는 속도 
            this.bounceY = 0.1 * this.y * Math.random() + 2;
            this.bounceX = (Math.random() - 0.5) * 10;
            //쪼개지기 속도
            this.splitSpeed = Math.random() * 1000 / this.baseY;
            
        }
        draw() {
            // this.bounceWindow(); 
            ctx1.fillStyle = 'white';
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.fill();
        }
        //화면에 튕기기
        bounceWindow() {
            if (this.x - this.size < 0 || this.x + this.size > canvas1.width) {
                this.bounceX *= -0.3;
            } else if (this.y - this.size < 0 || this.y + this.size > canvas1.height) {
                this.bounceY *= -0.3;
            }
        }
        //beforeMain 웨이브
        waitingWave() {
            MOVE_SPEED_P = 0.0003;
            SCATTER_P = 5;
            FRICTION_P = 10;
            if (waveCenter.radius < 1000 && waveCenter.state) {
                const Fr = 0.6;
                let vx = 0.004;
                vx *= Fr;
                waveCenter.radius += vx;   
            } else if (waveCenter.radius > 1000 && waveCenter.radius < 1030) {
                const Fr = 0.01;
                let vx = 0.001;
                vx *= Fr;
                waveCenter.radius += vx;
            } else if (waveCenter.radius >= 1030 && waveCenter.state) {
                return waveCenter.state == false;
            }
            let dx = waveCenter.x - this.x;
            let dy = waveCenter.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = waveCenter.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            if (distance < waveCenter.radius) {
                this.x -= directionX*SCATTER_P;
                this.y -= directionY*SCATTER_P;
            } else {
                if (this.x !== this.baseX) {
                    let vx = (this.x - this.baseX)*MOVE_SPEED_P;
                    vx *= FRICTION_P;
                    this.x -= vx;
                }
                if (this.y !== this.baseY) {
                    let vy = (this.y - this.baseY)*MOVE_SPEED_P;
                    vy *= FRICTION_P;
                    this.y -= vy;
                }
            }


        }
        //마우스 피하기
        basicMouse() {
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
                this.x -= directionX*SCATTER_P;
                this.y -= directionY*SCATTER_P;
            } else {
                if (this.x !== this.baseX) {
                    let vx = (this.x - this.baseX)*MOVE_SPEED_P;
                    vx *= FRICTION_P;
                    this.x -= vx;
                }
                if (this.y !== this.baseY) {
                    let vy = (this.y - this.baseY)*MOVE_SPEED_P;
                    vy *= FRICTION_P;
                    this.y -= vy;
                }
            }
        }
        defaultMouse() {
            MOVE_SPEED_P = 0.2;
            SCATTER_P = 2;
            FRICTION_P = 0.8;
            this.basicMouse();
        }
        //마우스 피하는 정도 더 작게
        smallMouse() {
            MOVE_SPEED_P = 0.008;
            SCATTER_P = 10;
            FRICTION_P = 0.1;
            mouse.radius = 80;
            this.basicMouse();
        }
        //마우스 피하는 정도 크게
        mediumMouse() {
            MOVE_SPEED_P = 0.05;
            SCATTER_P = 4;
            FRICTION_P = 0.6;
            mouse.radius = 300;
            this.basicMouse(); 
        }
        //마우스 피하는 정도 더 크게
        wideMouse() {
            MOVE_SPEED_P = 0.01;
            SCATTER_P = 5;
            FRICTION_P = 0.6;
            mouse.radius = 600;
            this.basicMouse(); 
        }
        
        //반으로 쪼개지기-수직
        splitVert() {
            MOVE_SPEED_P = 0.2;
            SCATTER_P = 2;
            FRICTION_P = 0.2;
            mouse.radius = 120;
            this.basicMouse();
            if (this.baseX >= canvas1.width / 2) { 
                this.splitSpeed *= 1.05;
                this.x += this.splitSpeed * 0.5;
                if (this.x> this.baseX +200) {
                    this.splitSpeed *= 0.85 ;
                }
            } else if (this.baseX < canvas1.width / 2) {
                this.splitSpeed *= 1.05;
                this.x -= this.splitSpeed * 0.5;
                if (this.x < this.baseX - 200) {
                    this.splitSpeed *= 0.85 ;
                }
            }
            let vx = 0.3;
            vx *= 1.2;
            if (this.size > 4) {
                this.size -= vx;
            }
        }
        //반으로 쪼개지기-수평
        splitHori() {
            MOVE_SPEED_P = 0.1;
            SCATTER_P = 5;
            FRICTION_P = 0.001;
            mouse.radius = 120;
            this.basicMouse();
            if (this.baseY >= canvas1.height / 2) { 
                this.splitSpeed *= 1.05;
                this.y += this.splitSpeed * 0.5;
                if (this.y> this.baseY +100) {
                    this.splitSpeed *= 0.85 ;
                }
            } else if (this.baseY < canvas1.height / 2) {
                this.splitSpeed *= 1.05;
                this.y -= this.splitSpeed * 0.5;
                if (this.y < this.baseY - 100) {
                    this.splitSpeed *= 0.85 ;
                }
            }
        }
        //퍼져서 질문 숨기기
        hiding() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            let vx;
            vx = this.bounceX * 3;
            this.x += vx;
            if (this.x < -100 || this.x > canvas1.width+100) {
                this.x = Math.random() * canvas1.width;
            }
            if (distance < mouse.radius) {
                this.x -= directionX * SCATTER_P;
                this.y -= directionY * SCATTER_P;
            }
        }
        //배열부분삭제
        shrinkHeart() {
            MOVE_SPEED_P = 0.01;
            FRICTION_P = 0.01;
            mouse.radius = 100;
            this.basicMouse();
            if (this.size > 3) {
                this.size -= 0.001;
            }
            if (particleArray.length > 1000) {
                particleArray.splice(Math.floor(Math.random() * particleArray.length), 1);
            }
            let vx = 0.3;
            vx *= 1.2;
            if (this.size > 4) {
                this.size -= vx;
            }
        }
        //녹아 흐르기
        meltDown() {
            MOVE_SPEED_P = 0;
            FRICTION_P = 0.97;
            mouse.radius = 100;
            this.bounceY *= FRICTION_P;
            this.y += this.bounceY;
            this.basicMouse();
        }
        //요소뚱뚱해지기
        getFat() {
            const Fr = 0.3;
            let vx = 0.5;
            vx *= Fr;
            if (this.size < 70) {
                this.size += vx;
                
            }
            
            MOVE_SPEED_P = 0.003;
            SCATTER_P = 5;
            mouse.radius = 130;
            FRICTION_P = 0.05;
            this.basicMouse();
            if (particleArray.length > 5000) {
                particleArray.splice(Math.floor(Math.random() * particleArray.length), 1);
            }
        }
        //쏟아져 흐르기
        waterFall() {         
            this.bounceY += 0.1;
            this.y += this.bounceY;
            this.x += this.bounceX;
        }
        //불순물세트
        dirtSet() {
            MOVE_SPEED_P = 0.2;
            mouse.radius = 100;
            SCATTER_P = 2;
            FRICTION_P = 0.1;
            this.basicMouse();
            dirtArray.forEach(dirt => {
                let dx = dirt.x - this.x;
                let dy = dirt.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = dirt.randomSize*1.5;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;
                if (distance <  maxDistance) {
                    this.x -= directionX *SCATTER_P ;
                    this.y -= directionY *SCATTER_P ;
                }
            });
        }
        dirt2Set() {
            MOVE_SPEED_P = 0.2;
            mouse.radius = 100;
            SCATTER_P = 2;
            FRICTION_P = 0.1;
            this.basicMouse();
            dirtArray2.forEach(dirt => {
                let dx = dirt.x - this.x;
                let dy = dirt.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = dirt.randomSize*1.5;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;
                if (distance <  maxDistance) {
                    this.x -= directionX *SCATTER_P ;
                    this.y -= directionY *SCATTER_P ;
                }
            });
        }
        boomBomb() {
            MOVE_SPEED_P = 0.2;
            mouse.radius = 100;
            SCATTER_P = 2;
            FRICTION_P = 0.8;
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
                this.x -= directionX * SCATTER_P;
                this.y -= directionY * SCATTER_P;
            } else {
                if (this.x !== this.baseX) {
                    let vx = (this.x - this.baseX) * MOVE_SPEED_P;
                    vx *= FRICTION_P;
                    this.x += vx;
                }
                if (this.y !== this.baseY) {
                    let vy = (this.y - this.baseY) * MOVE_SPEED_P;
                    vy *= FRICTION_P;
                    this.y += vy;
                }
            }
        }
    }

    class Dirtpart {
        constructor() {
            this.x = Math.random() * (canvas1.width-400)+200;
            this.y = Math.random() * (canvas1.height-200)+100;
            if (this.x > canvas1.width/2-heartWidth/2 && this.x < canvas1.width/2+heartWidth/2) {
                this.y=Math.random() * (canvas1.height - heartHeight)+heartHeight;
            }
            this.bounceY = 0.1 * this.y * Math.random() + 2;
            this.bounceX = (Math.random() - 0.5) * 10;
            this.randomSize=Math.random()*60+5;
            this.size = 0;
            this.baseX = this.x;
            this.baseY = this.y;
            this.randomSpeed = Math.random() * 5;
        }
        draw() {
            // ctx1.fillStyle = 'rgb(86, 196, 195)';
            ctx1.fillStyle = 'rgb(255,255,255)';
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.fill();
        }
        update() {
            if (this.size < this.randomSize) {
                let vx = 0.5;
                vx *= 1.2;
                this.size += vx;
            }
            if (!((this.x > canvas1.width / 2 - heartWidth / 2 + 40 && this.x < canvas1.width / 2 + heartWidth / 2 - 40) &&
            (this.y > canvas1.height / 2 - heartHeight / 2 + 60 && this.y < canvas1.height / 2 + heartHeight / 2 - 60))) {
                let vx = (this.x-canvas1.width / 2) * MOVE_SPEED_D;
                let vy = (this.y-canvas1.height / 2) * MOVE_SPEED_D;
                vx *= FRICTION_D;
                vy *= FRICTION_D;
                this.x -= vx;
                this.y -= vy;
            }
            
        }
        waterFall() {
            this.bounceY += 0.05;
            this.y += this.bounceY;
            this.x += this.bounceX;
        }
        bounceWindow() {
            if (this.x - this.size < 0 || this.x + this.size > canvas1.width) {
                this.bounceX *= -0.3;
            } else if (this.y - this.size < 0 || this.y + this.size > canvas1.height) {
                this.bounceY *= -0.3;
            }
        }
        flowRight() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            let vx;
            let vy;
            if (distance < mouse.radius) {
                this.x -= directionX * SCATTER_P;
                this.y -= directionY * SCATTER_P;
            }
            vx = (canvas1.width - this.baseX) * 0.5;
            vx *= 1 / this.baseY * 10;
            this.x += vx;
            if (this.x > canvas1.width) {
                this.x = Math.random() * canvas1.width;
                this.y = Math.random() * canvas1.height;
            }
        }
            
            

            
        
    }
    class Watcher {
        constructor() {
            this.x = Math.random() * canvas1.width;
            this.y = Math.random() * canvas1.height*0.9;
            this.bounceY = 0.1 * this.y * Math.random() + 2;
            this.randomSize=Math.random()*10+5;
            this.size = 0;
            this.baseX = this.x;
            this.baseY = this.y;
            this.randomSpeed = Math.random() * 5;
        }
        draw() {
            // ctx1.fillStyle = 'rgb(86, 196, 195)';
            ctx1.fillStyle = 'rgb(255,255,255)';
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.fill();
        }
        // basicMouse() {
        //     MOVE_SPEED_W1 = 0.2;
        //     SCATTER_W1 = 2;
        //     FRICTION_W1 = 0.8;
        //     let dx = mouse.x - this.x;
        //     let dy = mouse.y - this.y;
        //     let distance = Math.sqrt(dx * dx + dy * dy);
        //     let forceDirectionX = dx / distance;
        //     let forceDirectionY = dy / distance;
        //     let maxDistance = mouse.radius;
        //     let force = (maxDistance - distance) / maxDistance;
        //     let directionX = forceDirectionX * force *10;
        //     let directionY = forceDirectionY * force *10;
        //     if (distance < mouse.radius) {
        //         this.x += directionX;
        //         this.y += directionY;
        //     } else {
        //         if (this.x !== this.baseX) {
        //             let vx = (this.x - this.baseX)*MOVE_SPEED_P;
        //             vx *= FRICTION_P;
        //             this.x -= vx;
        //         }
        //         if (this.y !== this.baseY) {
        //             let vy = (this.y - this.baseY)*MOVE_SPEED_P;
        //             vy *= FRICTION_P;
        //             this.y -= vy;
        //         }
        //     }  
        // }
        getFat() {
            MOVE_SPEED_W1 = 0.2;
            FRICTION_W1 = 0.8;
            let fx = 3;
            fx *= 1.2;
            mouse.radius = 200;
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force *10;
            let directionY = forceDirectionY * force *10;
            if (distance < mouse.radius) {
                this.x += directionX;
                this.y += directionY;
                if (distance < 100) {
                    if (this.size < 100) {
                        this.size += fx;
                    }
                }
            } else {
                if (this.x !== this.baseX) {
                    let vx = (this.x - this.baseX)*MOVE_SPEED_W1;
                    vx *= FRICTION_W1;
                    this.x -= vx;
                }
                if (this.y !== this.baseY) {
                    let vy = (this.y - this.baseY)*MOVE_SPEED_W1;
                    vy *= FRICTION_W1;
                    this.y -= vy;
                }
                if (this.size > this.randomSize) {
                    this.size -= fx;
                }
            }     
        }
        // update() {
        //     let fx = 0.5;
        //     if (this.size < this.randomSize) {
        //         fx *= 1.2;
        //         this.size += fx;
        //     }
        //     mouse.radius = 200;
        //     let dx = mouse.x - this.x;
        //     let dy = mouse.y - this.y;
        //     let distance = Math.sqrt(dx * dx + dy * dy);
        //     let forceDirectionX = dx / distance;
        //     let forceDirectionY = dy / distance;
        //     let maxDistance = mouse.radius;
        //     let force = (maxDistance - distance) / maxDistance;
        //     let directionX = forceDirectionX * force *10;
        //     let directionY = forceDirectionY * force *10;
        //     if (distance < mouse.radius) {
        //         this.x += directionX;
        //         this.y += directionY;
        //         if (distance < 100) {
        //             if (this.size < 90) {
        //                 fx *= 1.9;
        //                 this.size += fx;
        //             }
        //         }
        //     } else {
        //         if (this.x !== this.baseX) {
        //             let vx = (this.x - this.baseX)*MOVE_SPEED_P;
        //             vx *= FRICTION_W1;
        //             this.x -= vx;
        //         }
        //         if (this.y !== this.baseY) {
        //             let vy = (this.y - this.baseY)*MOVE_SPEED_P;
        //             vy *= FRICTION_W1;
        //             this.y -= vy;
        //         }
        //     }     
        // }
        waterFall() {
            MOVE_SPEED_P = 0;
            FRICTION_P = 0.97;
            this.bounceY *= FRICTION_P;
            this.y += this.bounceY;
            this.update();
        }
    }
    class Rain {
        constructor() {
            this.size = Math.random() * 30 + 1;
            this.x = (Math.random()-0.5) * canvas1.width*0.2+canvas1.width*0.5;
            this.y = -Math.random()*300-100;
            this.bounceY = (Math.random() * 5) + 2;
        }
        draw() {
            ctx1.fillStyle = 'rgb(255,255,255)';
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.fill();
        }
        waterFall() {
            if (this.y > canvas1.height) {
                this.x = (Math.random()-0.5) * canvas1.width*0.2+canvas1.width*0.5;
                this.y = -1000/this.size-200;
                this.bounceY = (Math.random()*5)+2;                
            }
            this.y += this.bounceY;
            // this.x += this.bounceX;
        }
        bounceWindow() {
            if (this.y < 0 || this.y > canvas1.height) {
                this.bounceY *= -0.5;
            }
            this.y += this.bounceY;
        }
    }
    // 파티클 생성
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
        dirtArray = [];
        for (let i = 0; i < 20; i++) {
            dirtArray[i]=new Dirtpart();
        }
        dirtArray2 = [];
        for (let i = 0; i < 50; i++) {
            dirtArray2[i]=new Dirtpart();
        }
        watcherArray = [];
        for (let i = 0; i < 150; i++) {
            watcherArray[i]=new Watcher();
        }

        rainArray = [];
        for (let i = 0; i < 50; i++) {
            rainArray[i] = new Rain();
            
        }
    }
    init();
    // 애니메이션프레임 
    function animate() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        var arraysMatch = function (arr1, arr2) {
            // Check if the arrays are the same length
            if (arr1.length !== arr2.length) return false;
            // Check if all items exist and are in the same order
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            // Otherwise, return true
            return true;
        };
        var waterFallArray = [2, 2, 2, 2, 2, 2, 2, 2];
        var bombArray = [1, 1, 1, 1, 1, 1, 1, 1];

        // var dirtWaterfall = [1, 1, 1];

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw();
            

            if (click === 0) {
                // particleArray[i].meltDown();
                if (waveBefore) {
                    particleArray[i].waitingWave();
                    particleArray[i].basicMouse();
                    // particleArray[i].getFat();

                } else {
                    particleArray[i].defaultMouse();

                };
                

                // particleArray[i].splitHori();
                // particleArray[i].smallMouse();

                // particleArray[i].wideMouse();
                // particleArray[i].hiding();
                // particleArray[i].shrinkHeart();
                // particleArray[i].splitVert();
                // particleArray[i].bounceWindow();
                // particleArray[i].dirtSet();
            } else if (click === 1 && mode === 1) {
                particleArray[i].dirtSet();
            } else if (click === 1 && mode === 2) {
                particleArray[i].dirt2Set();
            } else if (click === 2 && mode === 1) {
                particleArray[i].shrinkHeart();
            } else if (click === 2 && mode === 2) {
                particleArray[i].getFat();
            } else if (click === 3 && mode === 1) {
                particleArray[i].splitVert();
            } else if (click === 3 && mode === 2) {
                particleArray[i].splitHori();
            } else if (click === 4 && mode === 1) {
                particleArray[i].basicMouse();
            } else if (click === 4 && mode === 2) {
                particleArray[i].hiding();
            } else if (click === 5 && mode === 1) {
                particleArray[i].meltDown(); 
            } else if (click === 5 && mode === 2) {
                particleArray[i].wideMouse();
            } else if (click === 6 && mode === 1) {
                particleArray[i].basicMouse();
            } else if (click === 6 && mode === 2) {
                particleArray[i].wideMouse();
            } else if (click === 7 && mode === 1) {
                particleArray[i].waterFall();
                particleArray[i].bounceWindow();
            } else if (click === 7 && mode === 2) {
                // particleArray[i].basicMouse();
            } 
        }

        //7번째 질문에서 2번선택을 하면 dirtPart, watcher, watcher2, rain이 waterFall
        for (let i = 0; i < dirtArray.length; i++) {
            dirtArray[i].draw();
            if (click === 1 && mode === 1) {
                dirtArray[i].update();
            } else if (click === 2 && mode === 1) {
                if (recordResult[1] == 1) {
                    dirtArray[i].waterFall();
                } 
            }
        }

        for (let i = 0; i < dirtArray2.length; i++) {
            dirtArray2[i].draw();
            if (click === 1 && mode === 2) {
                dirtArray2[i].flowRight();
            }
        }

        for (let i = 0; i < watcherArray.length; i++) {
            watcherArray[i].draw();
            if (click === 6 && mode === 1) {
                watcherArray[i].getFat();
                // watcherArray[i].basicMouse(); 
            } else if (click === 7 && mode === 2) {
                if (recordResult[5] == 1) {
                    watcherArray[i].waterFall();
                }
            }
            // if (recordResult[3] == 2) {
            //     watcherArray[i].basicMouse(); 
            // }
        }

        for (let i = 0; i < rainArray.length; i++) {
            rainArray[i].draw();
            if (click === 4 && mode === 1) {
                rainArray[i].waterFall();
            } else {
                if (recordResult[3] == 1) {
                    rainArray[i].bounceWindow();
                }
            }
        }

        if (arraysMatch(waterFallArray, recordResult)) {
            for (let i = 0; i < particleArray.length; i++) {
                particleArray[i].bounceWindow();
                particleArray[i].waterFall();
            }
        }
        // if (arraysMatch(bombArray, recordResult)) {
        //     for (let i = 0; i < particleArray.length; i++) {
        //         particleArray[i].bounceWindow();
        //         particleArray[i].boomBomb();
        //     }
        // }
        requestAnimationFrame(animate);
    }
    animate();
    //리사이즈하면 이미지크기에 맞게 파티클 새로생성
    window.addEventListener('resize', function () {
        canvas2.width = innerWidth;
        canvas2.height = innerHeight;
        canvas1.width = innerWidth;
        canvas1.height = innerHeight;
        init();
        console.log("resized");
    });
}


//하트 이미지 사이즈
const png = new Image();
png.src = "data:image/png;base64,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";

//페이지 로드 시 이미지 불러오기, 파티클생성하고 애니메이션 요청하기
window.addEventListener('load', () => {
    ctx2.drawImage(png, 0,0, png.width * 1.2, png.height * 1.23);
    drawParticle();
    clearTimeout(timeout);
    timeout = setTimeout(waveCountStart, 30000);
    // timeout = setTimeout(waveCountStart, 30000);

});
