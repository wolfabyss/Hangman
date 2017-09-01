
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
       Hangman.startButton.addEventListener('click', Hangman.startGameButtonClicked);
   }
   Hangman.startGameButtonClicked = function(){
    HangmanWordService.getGuessWord().then(Hangman.start);

   }
   Hangman.start = function(wordToGuess){
       Hangman.wordToGuess = wordToGuess.split("");
       Hangman.mask = Hangman.wordToGuess.map(()=>"*");
       Hangman.guesses = 0;
       Hangman.setupBoard();
   
   }
   Hangman.setupBoard = function(){
       Hangman.board.innerHTML = Hangman.boardTemplate();
      let guessButtons = Hangman.board.querySelectorAll(".guess-button");
   for(let i = 0; i < guessButtons.length; i++){
       let guessButton = guessButtons[i];
       guessButton.addEventListener("click", Hangman.guessButtonCallback);
   }
}

Hangman.guessButtonCallback = function(event){
    let button = event.target;
    let guess = button.dataset.value;
    button.disabled = true;
    button.classList.add('guessed');
    console.log(guess);
}   
    
   Hangman.boardTemplate = function(){
       return `
       <div id="guesses">${Hangman.guesses}</div>
       <div id="mask">${Hangman.mask.join('')}</div>
       <div id=input">${Hangman.buttonTemplate()}</div>
       `;
   }
   Hangman.buttonTemplate = function(){
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");   
    let alphabetButton = alphabet.map(letter=>`<button class="guess-button" data-value="${letter}">${letter}</button>`);
return alphabetButton.join('');
    return "";
   }
    return Hangman;

}());