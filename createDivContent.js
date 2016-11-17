/**
 * get the JSON of the beer list and format it for the div on the page
 * #beer-section
 */
document.addEventListener("DOMContentLoaded", function(event) {
    var beerDiv = document.getElementById('beer-section'), position = 0, beerList = {};

    var getJSON = function(url){
      var Httpreq = new XMLHttpRequest();
      Httpreq.open("GET", url, false);
      Httpreq.send(null);
      return Httpreq.responseText;          
    }

    //generate the dom element
    var createElement = function(type, className) {
      var ele = document.createElement(type);
      ele.setAttribute('class', className);
      return ele;
    }

    //create the row of 4 beers, uses position within JSON data to fill beers in
    var generateBeerRow = function(count) {
      var row = createElement('div', 'beer-row'), beerDiv, brewDiv, container;
      for (var i = 0; i < 4; i++) {
        if (count < beerList.beers.length) {
          beerDiv = createElement('div', 'beer');
          beerDiv.appendChild(createElement('strong'));
          beerDiv.firstChild.innerHTML = beerList.beers[count].name;
          brewDiv = createElement('div', 'brewery');
          brewDiv.innerHTML = beerList.beers[count].brewery;
          container = createElement('div', 'beer-cont');
          container.appendChild(beerDiv);
          container.appendChild(brewDiv);
          row.appendChild(container);
          count += 1;
        }
      }
      position = count
      return row; 
    }

    var generateHTML = function(beers) {
      var header = createElement('div', 'beer-header');
      header.setAttribute('id', 'beer-header');
      header.innerHTML = 'Beer on Tap';
      beerDiv.appendChild(header);
      for (var i = 0; i < beers.length - 3; i++) {
        beerDiv.appendChild(generateBeerRow(position));
      }
    }

    beerList = JSON.parse(getJSON('http://104.236.193.5/pbs/results.json'));
    generateHTML(beerList.beers);
});
