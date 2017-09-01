
let HangmanWordService = (function(){
    let WordService = {};
    WordService.getGuessWord = function(){
        let guessWordPromise = new Promise((resolve,reject)=>{
            let wordToGuess = document.querySelector("input[name='word']").value;
            resolve(wordToGuess);
        });
        return guessWordPromise;
    }
    return WordService;
}());


let Hangman = (function(){ //this part is the iife part (google iife)

    let Hangman = {};
                            // iife
   
   
   Hangman.init = function(config = {
       boardSelector : "#board"
   }){
       Hangman.board = document.querySelector(config.boardSelector);
       Hangman.startButton = Hangman.board.querySelector(".start-game-button");
       Hangman.startButton.addEventListener('click',()=>{
           HangmanWordService.getGuessWord().then((word)=>{
               console.log(word);
           });

        
       });
   }
   
   
    return Hangman;

}());