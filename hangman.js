let hangman = (function(){ //this part is the iife part (google iife)
    let Hangman = {};
                            // iife
   
   
   Hangman.init = function(config = {
       boardSelector : "#board"
   }){
       Hangman.board = document.querySelector(config.boardSelector);
       Hangman.startButton = Hangman.board.querySelector(".start-game-button");
       Hangman.startButton.addEventListener('click',()=>{
           console.log("click called");
       })
   }
   
   
    return Hangman;

}());