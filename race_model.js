function RaceModel(playerCount, numSpaces) {
  this.resetPositions();
  this._playerCount = playerCount;
  this._numSpaces = numSpaces;
}

RaceModel.prototype = {
  resetPositions: function() {
    this._currentTurn = 0;
    this._positions = this.createPlayerArray();
    this._isComplete = false;
    this._diceSize = 4;
  },

  createPlayerArray: function() {
    var players = [];
    for (var iPlayer = 0; iPlayer < this.getPlayerCount(); iPlayer++) {
      players.push(0);
    }
    return players;
  },

  isTie: function() {
    return this.getWinningPlayerId() == -1;
  },

  getWinningPlayerId: function() {
    var currentWinner = -1;
    var currentWinningPos = -1;

    for (var iPlayer = 0; iPlayer < this.getPlayerCount(); iPlayer++) {
      if (this.getPlayerPosition(iPlayer) > currentWinningPos) {
        currentWinner = iPlayer;
        currentWinningPos = this.getPlayerPosition(iPlayer);
      } else if (this.getPlayerPosition(iPlayer) == currentWinningPos) {
        currentWinner = -1; // no clear winner
      }
    }
    return currentWinner;
  },

  getCurrentTurn: function() {
    return this._currentTurn;
  },

  getPlayerCount: function() {
    return this._playerCount;
  },

  getNumSpaces: function() {
    return this._numSpaces;
  },

  getPlayerPosition: function(playerId) {
    return this._positions[playerId];
  },

  takeTurn: function() {
    this.incrementPositions();
  },

  rollDice: function() {
    return Math.floor(Math.random() * this._diceSize) + 1
  },

  incrementPositions: function() {
    this._currentTurn++;
    for (var iPlayer = 0; iPlayer < this.getPlayerCount(); iPlayer++) {
      this.advancePlayer(iPlayer, this.rollDice());
    }
    if (this.isComplete()) {

    }
  },

  advancePlayer: function(playerId, score) {
    this._positions[playerId] += score;
    if (this._positions[playerId] >= this._numSpaces) {
      this._positions[playerId] = this._numSpaces;
      this._isComplete = true;
    }
    return this._isComplete;
  },

  isComplete: function() {
    return this._isComplete;
  }
};
