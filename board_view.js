function BoardView(board_selector) {
  this.board_selector = board_selector;
  this._colorFactory = d3.scale.category20(); //builtin range of colors

}

BoardView.prototype = {
  getBoard: function() {
    return document.querySelector(this.board_selector);
  },

  buildBoard: function(model) {
    var board = this.getBoard();

    var placeholder = board.querySelector('#board_placeholder');

    var playerCount = model.getPlayerCount();
    var numSpaces = model.getNumSpaces();

    placeholder.innerHTML = "";

    var table = document.createElement("table");
    table.setAttribute("id", "racer_table");

    for (var i = 0; i < playerCount; i++) {
      var tr = document.createElement("tr");
      tr.setAttribute("id", "player" + i + "_strip");

      for (var j = -1; j < numSpaces; j++) {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    placeholder.appendChild(table);
  },

  ensureBoard: function() {
    var board = this.getBoard();
    return board;
  },

  setStyleBasesOnToggle: function(node, toggle, className) {
    var list = node.classList;
    var hasStyleClass = list.contains(className);
    if (toggle && !hasStyleClass) {
      list.add(className);
    } else if (!toggle && hasStyleClass) {
      list.remove(className);
    }
  },

  displayTurnCounter: function(model) {
    var turnDisplay = document.querySelector("#turn_display");
    turnDisplay.innerHTML = "Turn #" + model.getCurrentTurn();
  },

  updateStatusBar: function(model) {
    var statusMessage = "Running...";
    var statusBar = document.querySelector("#status_bar");
    if (model.isComplete()) {
      if (model.isTie()) {
        statusMessage = "It's a draw!!";
      } else {
        statusMessage = "The winner is player " + model.getWinningPlayerId();
      }
    }
    statusBar.innerHTML = statusMessage;
  },

  getPlayerColor : function(playerIndex)
  {
    return this._colorFactory(playerIndex + 2).toString();
  },

  updateDisplay: function(model) {
    var board = this.ensureBoard();
    var playerCount = model.getPlayerCount();

    var tieColor = this.getPlayerColor(0);

    for (var iPlayer = 0; iPlayer < playerCount; iPlayer++) {
      var playerPosition = model.getPlayerPosition(iPlayer);
      var player_strip = board.querySelector("#player" + iPlayer + "_strip");
      var spaces = player_strip.querySelectorAll("td");
      for (var iSpace = 0; iSpace < spaces.length; iSpace++) {
        var space = spaces[iSpace];
        var active = (iSpace == playerPosition);
        if(iSpace <= playerPosition)
        {
           space.style.backgroundColor = this.getPlayerColor(iPlayer);
         }
          this.setStyleBasesOnToggle(space, active, 'active');
      }
    }

    this.setStyleBasesOnToggle(board, model.isComplete(), 'complete');
    this.setStyleBasesOnToggle(board, !model.isComplete(), 'running');

    this.displayTurnCounter(model);

    this.updateStatusBar(model);
  }
};
