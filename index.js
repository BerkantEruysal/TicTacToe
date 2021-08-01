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
  const createPlayer = (playerMark) => {
    const playerObj = {};
    playerObj.mark = playerMark;
    playerObj.makeMove = (field) => {
      if (field.isSelectable) {
        field.htmlElement.innerHTML = playerObj.mark;
        field.mark = playerObj.mark;
        field.isSelectable = false;
        if (checkWinner()) {
          console.log(stateManager.getCurrentPlayer().mark + " wins");
          return;
        }
        
        stateManager.changeTurn();
      }
    };
    playerObj.point = 0;
    return playerObj;
  };
  const createAı = (playerMark) => {};
  const domManager = (function () {})();
  const stateManager = (function () {
    let player1;
    let player2;
    let _currentPlayer;
    const getCurrentPlayer = () => {
      return _currentPlayer;
    };
    const createPlayers = () => {
      player1 = createPlayer("X");
      player2 = createPlayer("O");
      _currentPlayer = player1;
    };
    const changeTurn = () => {
      if (_currentPlayer == player1) {
        _currentPlayer = player2;
      } else {
        _currentPlayer = player1;
      }
    };

    return {
      getCurrentPlayer,
      changeTurn,
      createPlayers,
    };
  })();
  const start = function () {
    stateManager.createPlayers();
    gameBoard.initFieldList();
  };
  const checkWinner = () => {
    const _highlightMarks = (list) => {
      list.forEach((field) => {
        console.log(field);
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
      return stateManager.getCurrentPlayer();
    } else if (
      board[1][0].mark == board[1][1].mark &&
      board[1][1].mark == board[1][2].mark &&
      board[1][0].mark != null
    ) {
      _highlightMarks([board[1][0],board[1][1],board[1][2]]);
      return stateManager.getCurrentPlayer();
    } else if (
      board[2][0].mark == board[2][1].mark &&
      board[2][1].mark == board[2][2].mark &&
      board[2][0].mark != null
    ) {
      _highlightMarks([board[2][0],board[2][1],board[2][2]]);
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][0].mark == board[1][0].mark &&
      board[1][0].mark == board[2][0].mark &&
      board[0][0].mark != null
    ) {
      _highlightMarks([board[0][0],board[1][0],board[2][0]]);
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][1].mark == board[1][1].mark &&
      board[1][1].mark == board[2][1].mark &&
      board[0][1].mark != null
    ) {
      _highlightMarks([board[0][1],board[1][1],board[2][1]]);
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][2].mark == board[1][2].mark &&
      board[1][2].mark == board[2][2].mark &&
      board[0][2].mark != null
    ) {
      _highlightMarks([board[0][2],board[1][2],board[2][2]]);
      return stateManager.getCurrentPlayer();
    } else if (
      board[0][0].mark == board[1][1].mark &&
      board[1][1].mark == board[2][2].mark &&
      board[0][0].mark != null
    ) {
      _highlightMarks([board[0][0],board[1][1],board[2][2]]);
      return stateManager.getCurrentPlayer();
    } else if (
      board[2][0].mark == board[1][1].mark &&
      board[1][1].mark == board[0][2].mark &&
      board[2][0].mark != null
    ) {
      _highlightMarks([board[2][0],board[1][1],board[0][2]]);
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
  };
})();

game.start();
