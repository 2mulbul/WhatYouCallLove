import screenshot, {download} from './screenshot.js'


let shareB = document.querySelector("#share");
let captureImg = document.querySelector("#captureImg") 
let btDownload = document.querySelector('#bt-download');
let btFacebook = document.querySelector('#bt-facebook');
let btTwitter = document.querySelector('#bt-twitter');

const w = 500;
const h = 500;
const left = (window.innerWidth/2)-(w/2);
const top = (window.innerHeight/2)-(h/2);
const mainURL = 'https://mulbul2.cafe24.com/WhatYouCallLoveEN/'


// shareB.onclick= function() {
// 	screenshot(heart)
// 		.then((url) => {
// 			// console.log('the base64 data url of the image is:', url)
// 			captureImg.src = url;
// 		})
// }
// btDownload.onclick = function () { download(captureImg.src, 'whatyoucall.png'); }
// btFacebook.onclick = function () {
// 	window.open('https://www.facebook.com/sharer.php?u=' + mainURL, '_blank', 'width='+w+'px, height='+h+'px, top='+top+', left='+left+',location=no,toolbars=no,status=no,scrollbars=no')
// }
// btTwitter.onclick = function () {
// 	window.open('https://twitter.com/intent/tweet?url=' + mainURL, '_blank', 'width='+w+'px, height='+h+'px, top='+top+', left='+left+',location=no,toolbars=no,status=no,scrollbars=no')
// }

