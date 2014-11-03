function GraphView(graph_selector) {
  this._graph_selector = graph_selector;
}

GraphView.prototype = {

  graphData: function(historyArray) {
    var model = null,
      hasData = false,
      i = 0;
    var summary = [];

    if (historyArray.length > 0) {
      model = historyArray[0];

      for (i = 0; i < model.getPlayerCount(); i++) {
        summary.push({
          "label": "Player" + i,
          "value": 0
        });
      }

      for (i = 0; i < historyArray.length; i++) {
        model = historyArray[i];
        if (model.isTie()) {
        } else {
          summary[model.getWinningPlayerId()].value++;
          hasData = true;
        }
      }
    }

    if (!hasData) {
      summary = [];
    }

    return summary;
  },

  update: function(historyArray) {
    var historyGraph = d3.select(this._graph_selector).select(".pie_chart");
    var graphDataArray = this.graphData(historyArray);

    if (graphDataArray.length > 0) {
      var color = d3.scale.category20(); //builtin range of colors
      color(0);
      var r = 100;
      var textOffset = 14;


      // arc definition
      var arc = d3.svg.arc().outerRadius(r).innerRadius(r / 2);

      //this will create pie data for us given a list of values
      var pieData = d3.layout.pie().value(function(d) {
        return d.value;
      }).sort(null)(graphDataArray);

      var paths = historyGraph.selectAll("path").data(pieData);

      paths.enter().append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("transform", "translate(" + r + ", " + r + ")")
        .attr("d", arc)
        .each(function(d) {
          this._current = d;
        });

      paths.transition()
        .attrTween("d", arcTween);

      paths.exit().remove();

      function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
          return arc(i(t));
        };
      }
    }
  }
};
