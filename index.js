const game = (function () {
  const gameBoard = (function () {
    // 2d list
    let _fieldList = [[], [], []];
    const getFieldList = () => {
      return _fieldList;
    };
    const _createField = (x, y) => {
      const fieldObj = {};
      fieldObj.isSelectable = true;
      fieldObj.mark;

      fieldObj.htmlElement = document.createElement("div");
      fieldObj.htmlElement.className = "field";
      fieldObj.htmlElement.addEventListener("click", () =>
        stateManager.getCurrentPlayer().makeMove(_fieldList[y][x])
      );

      return fieldObj;
    };
    const initFieldList = () => {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          _fieldList[y].push(_createField(x, y));
          document
            .getElementById("board")
            .appendChild(_fieldList[y][x].htmlElement);
        }
      }
    };
    const selectableFields = () => {
      const fields = [];
      getFieldList().forEach((list) => {
        list.forEach((field) => {
          fields.push(field);
        });
      });
      return fields.filter((field) => {
        return field.isSelectable;
      });
    };
    const resetBoard = () => {
      _fieldList = [[], [], []];
      document.getElementById("board").innerHTML = "";
      initFieldList();
    };

    return {
      getFieldList,
      initFieldList,
      selectableFields,
      resetBoard,
    };
  })();
  const createPlayer = (playerMark , playerName , scoreHtmlElement) => {
    const playerObj = {};

    playerObj.name = playerName;
    playerObj.mark = playerMark;
    playerObj.makeMove = (field) => {
      if (field.isSelectable) {
        field.htmlElement.innerHTML = playerObj.mark;
        field.mark = playerObj.mark;
        field.isSelectable = false;
        if (checkWinner()) {
          playerObj.increasePoint()
          return;
        }
        
        stateManager.changeTurn();
      }
    };
    playerObj.scoreHtml = scoreHtmlElement
    playerObj.score = 0;

    playerObj.increasePoint = () => {playerObj.score++ ;
    playerObj.scoreHtml.innerHTML = `score: ${playerObj.score}`}
    return playerObj;
  };
  const createAı = (playerMark) => {};
  const views = (function() {
    const mainScreen = function(){
      const mainMenu = document.createElement("div");
      const playBtn = document.createElement("button")
      const ticTacToe = document.createElement("p")
      ticTacToe.innerHTML = "Tic Tac Toe"
      playBtn.addEventListener("click" , () => {
        const cards = document.getElementsByClassName("side-card")
        Array.prototype.forEach.call(cards ,card => {
          card.classList.add("side-card-ingame")
        })
        start()
      })
      mainMenu.className = "main-menu"
      playBtn.className = "play-button"
      playBtn.innerHTML = "Play"
      mainMenu.appendChild(ticTacToe)
      mainMenu.appendChild(playBtn);
      

      document.getElementById("content").appendChild(mainMenu)
    }
    const gameScreen = function(){

      const board = document.createElement("div")
      board.className = "board";
      board.id = "board"
      document.getElementById("content").innerHTML = ""
      document.getElementById("content").appendChild(board)
      stateManager.createPlayers();
      gameBoard.initFieldList();

     
    }
    const winRaundScreen =  async function(){
      const blocker = document.createElement("div");
      const winMsg = document.createElement("p")
      winMsg.innerHTML = `${stateManager.getCurrentPlayer().name} wins the round`

      blocker.appendChild(winMsg)
      document.getElementById("content").appendChild(blocker)
    
      blocker.className = "blocker"
      winMsg.className = "win-message"
      await new Promise(r => setTimeout(r, 300));

      blocker.classList.add("active")
      winMsg.classList.add("active")
      await new Promise(r => setTimeout(r, 2000));
      blocker.classList.remove("active")
      winMsg.classList.remove("active")
      await new Promise(r => setTimeout(r , 300))
      blocker.remove()
      stateManager.newTurn()
      

      
    }


    return {
      mainScreen
      ,gameScreen,
      winRaundScreen,
    }
  })()
  const stateManager = (function () {
    let player1;
    let player2;
    let _currentPlayer;
    const getCurrentPlayer = () => {
      return _currentPlayer;
    };
    const createPlayers = () => {
      const leftScore = document.createElement("p")
      const rightScore = document.createElement("p")
      leftScore.className = "card-score"
      rightScore.className = "card-score"
      leftScore.innerHTML = `score: 0`
      rightScore.innerHTML = `score: 0`
      document.getElementById("left-card").appendChild(leftScore)
      document.getElementById("right-card").appendChild(rightScore)
      player1 = createPlayer(document.getElementById("left-mark").innerHTML , document.getElementById("left-name").value , leftScore);
      player2 = createPlayer(document.getElementById("right-mark").innerHTML , document.getElementById("right-name").value , rightScore);
      _currentPlayer = player1;
    };
    const changeTurn = () => {
      if (_currentPlayer == player1) {
        _currentPlayer = player2;
      } else {
        _currentPlayer = player1;
      }
    };
    const newTurn = () => {
      gameBoard.resetBoard()
      
    }

    return {
      getCurrentPlayer,
      changeTurn,
      createPlayers,
      newTurn,
    };
  })();
  const start = function () {
    views.gameScreen()
  };
  const checkWinner = () => {
    const _highlightMarks = (list) => {
      list.forEach((field) => {
        field.htmlElement.classList.add("highlighted");
      });
    };
    const board = gameBoard.getFieldList();
    if (
      board[0][0].mark == board[0][1].mark &&
      board[0][1].mark == board[0][2].mark &&
      board[0][0].mark != null
    ) {
      _highlightMarks([board[0][0],board[0][1],board[0][2]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      board[1][0].mark == board[1][1].mark &&
      board[1][1].mark == board[1][2].mark &&
      board[1][0].mark != null
    ) {
      _highlightMarks([board[1][0],board[1][1],board[1][2]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      board[2][0].mark == board[2][1].mark &&
      board[2][1].mark == board[2][2].mark &&
      board[2][0].mark != null
    ) {
      _highlightMarks([board[2][0],board[2][1],board[2][2]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][0].mark == board[1][0].mark &&
      board[1][0].mark == board[2][0].mark &&
      board[0][0].mark != null
    ) {
      _highlightMarks([board[0][0],board[1][0],board[2][0]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][1].mark == board[1][1].mark &&
      board[1][1].mark == board[2][1].mark &&
      board[0][1].mark != null
    ) {
      _highlightMarks([board[0][1],board[1][1],board[2][1]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][2].mark == board[1][2].mark &&
      board[1][2].mark == board[2][2].mark &&
      board[0][2].mark != null
    ) {
      _highlightMarks([board[0][2],board[1][2],board[2][2]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][0].mark == board[1][1].mark &&
      board[1][1].mark == board[2][2].mark &&
      board[0][0].mark != null
    ) {
      _highlightMarks([board[0][0],board[1][1],board[2][2]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      board[2][0].mark == board[1][1].mark &&
      board[1][1].mark == board[0][2].mark &&
      board[2][0].mark != null
    ) {
      _highlightMarks([board[2][0],board[1][1],board[0][2]]);
      views.winRaundScreen()
      return stateManager.getCurrentPlayer();
    } else if (
      gameBoard.selectableFields().length == 0
    ) {
      gameBoard.resetBoard()
    } else {
      return null
    }
  };

  return {
    start,
    mainScreen : views.mainScreen,
  };
})();

game.mainScreen()
