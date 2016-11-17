var casper = require('casper').create();
var beersJSON = {
  beers: []
};

//scrape the beers from mytap to
function getBeers() {
  var beers = document.querySelectorAll('.list-group-item');
  return Array.prototype.map.call(beers, function (e) {
     name = e.children[0].children[0].children[0].innerHTML,
     brewery = e.children[1].children[0].children[0].children[0].innerHTML;
     return [name,brewery];
  });
}

casper.start('https://mytap.beer/places/pbs');

casper.then(function() {
  beers = this.evaluate(getBeers);
  for (var i in beers) { 
    name = beers[i][0];
    brewery = beers[i][1];
    beersJSON.beers.push({
      "name"    : name,
      "brewery" : brewery
    });
  }
});

casper.run(function() {
  console.log(JSON.stringify(beersJSON));
  casper.done();
});
