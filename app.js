function App(playerCount, numSpaces) {
  this._boardView = new BoardView('#board_container');
  this._historyView = new HistoryView('#history_container');
  this._graphView = new GraphView('#distribution_container');
  this._playerCount = playerCount;
  this._numSpaces = numSpaces;
  this._history = [];
}

App.prototype = {
  run: function() {
    this.bindStarterButton();
    //this.startNewRace();
  },

  getStarter: function() {
    return document.querySelector("#start_button");
  },

  bindStarterButton: function() {
    this.getStarter().addEventListener('click', this.startNewRace.bind(this));
  },

  startNewRace: function() {
    this.model = new RaceModel(this._playerCount, this._numSpaces);
    this._boardView.buildBoard(this.model);
    this.resetPositions();
    this.updateDisplay();
    this.setTurnTimeout();
  },

  setTurnTimeout: function() {
    setTimeout(this.takeTurn.bind(this), 300);
  },

  takeTurn: function() {
    this.model.incrementPositions();
    if (!this.isComplete()) {
      this.setTurnTimeout();
    } else {
      this.addToHistory(this.model);
      this._historyView.update(this._history);
      this._graphView.update(this._history);
    }
    this.updateDisplay();
  },
  updateDisplay: function() {
    this._boardView.updateDisplay(this.model);
  },
  isComplete: function() {
    return this.model.isComplete();
  },
  resetPositions: function() {
    this.model.resetPositions();
  },
  addToHistory: function(model) {
    this._history.push(model);
  }

};
