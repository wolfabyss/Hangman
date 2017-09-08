
let HangmanWordService = (function(){
    let WordService = {};
    WordService.url = "http://setgetgo.com/randomword/get.php";
    WordService.getGuessWord = function(){
        let guessWordPromise = new Promise(WordService.guessWordPromiseResolver);
        return guessWordPromise;
    }
    WordService.guessWordPromiseResolver = function(resolve,reject){
        let request = new XMLHttpRequest();
        request.addEventListener("load",()=>{
            console.log(request.responseText);
            resolve(request.responseText);
        });
        request.open("GET",WordService.url);
        request.send();

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
       Hangman.startButton.addEventListener("click", Hangman.startGameButtonClicked);
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
      let inputArea = Hangman.board.querySelector("#input");
      inputArea.addEventListener("click", Hangman.guessButtonCallback);
 
}

Hangman.guessButtonCallback = function(event){
    let button = event.target;
    let guess = button.dataset.value;
    if(!guess){return};
    button.disabled = true;
    button.classList.add('guessed');
    console.log(guess);
}   
    
   Hangman.boardTemplate = function(){
       return `
       <div id="guesses">${Hangman.guesses}</div>
       <div id="mask">${Hangman.mask.join('')}</div>
       <div id="input">${Hangman.buttonTemplate()}</div>
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