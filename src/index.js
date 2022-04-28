import { Ball } from "./ball";
import Game from "./game_view";
import  Net  from "./net";
import { Player } from "./player";

let scoreCounter = 0;
let speed = 1;
export const lineSpeed = function (){
    if (scoreCounter < 3) {
        return speed;
    } else if (scoreCounter < 6) {
        return speed + 3;
    } else if (scoreCounter < 9) {
        return speed + 6;
    } else if (scoreCounter < 12) {
        return speed + 9;
    } else if (scoreCounter < 15) {
        return speed + 12;
    } else if (scoreCounter < 18) {
        return speed + 15;
    } else if (scoreCounter < 21) {
        return speed + 18;
    } else {
        return speed + 21;
    }
}
const tallyScore = function(scoreCounter, highScore){
    const score = document.getElementById("currentScore");
    const record = document.getElementById("highScore");
    score.innerHTML = scoreCounter;
    record.innerHTML = highScore;
}

const coverPage = function(bool = true){
    const coverPage = document.getElementById("coverPageDiv");
    // coverPage.parentNode.removeChild(coverPage);
    if (bool) coverPage.style.display = 'none';
    else coverPage.style.display = 'block';
}



document.addEventListener("DOMContentLoaded", function () {
    const myCanvas = document.getElementsByTagName("canvas")[0];
    myCanvas.width = 576; //'100%';
    myCanvas.height = 576;//'100%';
    // console.log("TESTING Pushed 11:21")
    // Make it visually fill the positioned parent
//   myCanvas.style.width ='100%';
//   myCanvas.style.height='100%';
//   // ...then set the internal size to match
//   myCanvas.width  = myCanvas.offsetWidth;
//   myCanvas.height = myCanvas.offsetHeight;
    const c = myCanvas.getContext("2d");
    // TODO add title page?? 'press space to play'??
    
    const newGame = new Game(c);

    let count = 200;
    let stopCount = false;
    let highScore = 0;
    function animate(){
        if (stopCount) return count;
        requestAnimationFrame(animate);
        if (count < 500){
            newGame.updateX();
            count += lineSpeed();
        } else if (count >= 500){
            newGame.updateXLeft();
            count += lineSpeed();
        } if (count >= 800){
            count = 200;
        } 

        newGame.movingXLine();  
    }
    let userXAttempt = 0;
    
    function stopAnimate(){
        stopCount = true;
        userXAttempt = newGame.movingLineXPos.x;
    }

    
    
let userClick = 0
// TODO add cd to wait for animation to finish?
    document.addEventListener("keydown", function(event){
        if (event.key !== ' ') {
            // console.log('PRESS SPACE TO PLAY');
            return;
        }; 
        // TODO Add events for when user gets on 'fire'??
        if (userClick === 0) coverPage();
        // setTimeout(()=>userClick += 1, 1000);
        userClick += 1;
        if (userClick % 2 === 0){
            stopAnimate();
            newGame.player.status = 'shooting';
            newGame.renderShot();
            setTimeout(function(){
                newGame.player.status = 'release';
                newGame.renderShot();
                // console.log(newGame.player.status);
                // TODO ball animation
                if (newGame.xMakeArr().includes(userXAttempt)) {
                    // count = 200;
                    //     newGame.movingLineXPos.x = 200;
                    scoreCounter += 1;
                    setTimeout(function(){
                        newGame.net.status = 'made1'
                        newGame.renderShot();
                    }, 200);
                    setTimeout( function(){
                        newGame.net.status = 'made2'
                        newGame.renderShot();
                    },400);
                    setTimeout(function(){
                        newGame.net.status = 'made3'
                        newGame.renderShot();
                    },600);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'rebound';
                        newGame.renderShot();
                    },700);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'pass';
                        newGame.renderShot();
                    },800);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'idle';
                        newGame.renderShot();
                    },900);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'idle';
                        newGame.player.status = 'idle';
                        newGame.renderShot();
                    },1000);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.renderShot();
                        if (scoreCounter > highScore){
                            highScore = scoreCounter;
                        } 
                        tallyScore(scoreCounter, highScore);
                        // count = 200;
                        // newGame.movingLineXPos.x = 200;
                    },800);
                } else {
                    // console.log(scoreCounter);
                    // console.log(highScore);
                        // count = 200;
                        // newGame.movingLineXPos.x = 200;
                        scoreCounter = 0;
                    setTimeout(function(){
                        newGame.net.status = 'miss'
                        newGame.renderShot();
                        tallyScore(scoreCounter, highScore);
                    },600);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'rebound';
                        newGame.renderShot();
                    },700);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'pass';
                        newGame.renderShot();
                    },800);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'idle';
                        newGame.renderShot();
                    },900);
                    setTimeout(function(){
                        newGame.net.status = 'idle'
                        newGame.extraPlayer.status = 'idle';
                        newGame.player.status = 'idle';
                        newGame.renderShot();
                    },1000);
                    // if (highScore === scoreCounter && scoreCounter !== 0) {
                        // console.log("NEW HIGH SCORE");
                        // TODO new HIGH SCORE animation;
                    // } 
                    // count = 200;
                    // newGame.movingLineXPos.x = 200;
                }
            }, 100)
        }   else {
            count = 200;
            newGame.movingLineXPos.x = 200;
            stopCount = false;
            newGame.player.status = 'idle';
            // console.log(newGame.player.status);
            animate();
        }
        // tallyScore(scoreCounter);
    });
    // setTimeout( gamePlay() , 1000);

});






