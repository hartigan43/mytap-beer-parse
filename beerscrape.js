var casper = require('casper').create();
var beers;

//scrape the beers from mytap to
function getBeers() {
  var beers = document.querySelectorAll('.list-group-item'), name, brewery;
  return Array.prototype.map.call(beers, function (e) {
     name = e.children[0].children[0].children[0].innerHTML, //name
     brewery = e.children[1].children[0].children[0].children[0].innerHTML; //brewery
    return [name,brewery];
  });
}

casper.start('http://mytap.beer/places/pbs');

casper.then(function() {
  beers = this.evaluate(getBeers);
});

casper.run(function() {
//  for(var i in beers) {
//    console.log(beers[i]);
//  }
  console.log(JSON.stringify(beers));
  casper.done();
});

//save with cron most likely using the casper output
