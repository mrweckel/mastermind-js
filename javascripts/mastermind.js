document.addEventListener('DOMContentLoaded', function(){

  window.controller = new Mastermind.Controller();

  window.view = new Mastermind.View();

  window.colorSet = new Mastermind.PegColors();

  //creates the pegs from color string
  window.colorSetObjects = window.colorSet.createObjects();

  //creates the first row
  window.view.createRow("tr", 0);

  document.getElementById("new-game").onclick = function(){

    window.game  = new Mastermind.Game;

//GUESS functionality
    window.guess = new Mastermind.Guess;

    //need to find a new place for this eventually
    window.makeGuess = function(){
      var new_peg = new Mastermind.Peg(this.id);
      var board_body = document.getElementById("board-body");

      //this needs to change when I get internet
      var curr_row = parseInt(board_body.lastChild.id);

      //check for end of game
      window.game.endOfGame(curr_row, 12)

      if (window.guess.guess.length < 4) {
        window.guess.guess.push(new_peg);
        window.view.appendPegToGuess(new_peg, curr_row);
        //not working!!!!!!!!!!!!
        window.game.checkForWin(window.guess.guess, window.answer.current_ans, "color", window.game.won)

      } else if (window.guess.guess.length == 4){

        window.guess.clearGuess(window.guess.guess);
        window.guess.guess.push(new_peg);

        var new_row_num = curr_row + 1
        window.view.createRow("tr", new_row_num);
        window.view.appendPegToGuess(new_peg, new_row_num);
      };
    }

    //second argument is the function that will run onclick of the td node
    window.options = window.view.showObjects(window.colorSet.colorObjects, window.makeGuess);

//ANSWER functionality
    window.view.clearAnswer("answer-tr");

    window.answer = new Mastermind.Answer(window.colorSet.colorObjects);

    window.answer.setAnswer();

    window.view.showAnswer(window.answer.current_ans);


      // window.controller.choosePeg(this, window.guess.guess);
  }


});