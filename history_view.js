function HistoryView(history_selector) {
  this._history_selector = history_selector;
}

HistoryView.prototype = {
  update: function(historyArray) {
    var historyList = document.querySelector(this._history_selector);
    historyList.innerHTML = "";

    if (historyArray.length > 0) {
      for (var i = historyArray.length - 1; i >= 0; i--) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(this.gameSummary(historyArray[i])));
        historyList.appendChild(div);
      }
    }
  },
  gameSummary: function(model) {
    var message = "";
    if (model.isComplete()) {
      if (model.isTie()) {
        message = "Tie after";
      } else {
        message = "Won by Player " + model.getWinningPlayerId() + " after";
      }
    } else {
      message = "In Progress... at";
    }

    return message + " turn #" + model.getCurrentTurn();
  }
}
