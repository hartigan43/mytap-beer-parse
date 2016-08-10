/*
* create a properly formatted iframe 
*
*/

var beerList;

var req = new XMLHttpRequest();
req.onLoad = reqListener;
req.open("get", "/path/to/results.txt", true)
req.send();

function reqListener(e) {
  beerList = JSON.parse(this.responseText);
}
