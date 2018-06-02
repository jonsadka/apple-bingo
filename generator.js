var OPTIONS = [
  '"... best iOS yet" is said',
  '"... best XXX yet" is said at least 3 times',
  '"... people will love it" is said',
  '"For the first time ..." is said',
  '"I’d like to invite ..." is said',
  '"iPhone" is said at least 10 times',
  '"Let me show it to you." is said',
  '"Let’s take a look." is said',
  '"To tell you all about it ..." is said',
  'A celebrity (athlete, musician, etc.) partakes in keynote',
  'A grass roots app developer is featured',
  'An educational app is featured',
  'Apple AirPower released',
  'Apple executive touts incredible App Store sales',
  'Craig Federighi demos new Animoji',
  'Craig Federighi makes a dad joke',
  'Eddy Cue\'s sleeves are cuffed',
  'Johnny Ive voiceover in a video',
  'Live AR demo with iPhone',
  'Mention of being environmentally friendly',
  'Mention of competitiors copying the iPhone X notch',
  'Mention or picture of the Golden State Warriors',
  'New Apple Watch bands announced',
  'New iOS feature built with privacy in mind',
  'New product feature about accessibility',
  'New watchface announced',
  'Siri is used in a demo',
  'Slide stating "1 in X,XXX,XXX"',
  'Slide with a line chart showing App Store sales',
  'Slide with a pie chart of install base',
  'Slide with logos of Fortune-500 companies',
  'Some service is launched in multiple country',
  'Some update is made available "starting today"',
  'Someone tries to convince us that Siri is great',
  'Statistic about improved App Store sales due to redesign',
  'Statistic about money paid to developers',
  'Statistic saying how popular Apple Pay is',
  'The oldest app developer is featured',
  'Tim Cook appears on stage at least three times',
  'Tim Cook mentions Duke',
  'Tim Cook says "excited" at least 7 times',
  'Tim Cook talks about health and privacy',
  'Tim Cook thanks employees who participated in launch',
  'Tim Cook thanks everyone for attending',
  'Video pans over Apple Executives sitting in front row',
  'We\'re told how impactful Podcast improvements have been'
];

var NUM_TILES = 5;
var BORDER_SPACING = 10;
var BOARD_PADDING = 20;

function tableCreate() {
  var body = document.getElementById('board');
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var randomizedOptions = _shuffle(OPTIONS);
  var tileSize = _calculateTileSize(NUM_TILES, BORDER_SPACING);
  var offset = _calculateOffset(NUM_TILES, BORDER_SPACING);

  for (var rowNumber = 0; rowNumber < NUM_TILES; rowNumber++) {
    var tr = document.createElement('tr');
    for (var colNumber = 0; colNumber < NUM_TILES; colNumber++) {
      var nextOption = randomizedOptions.pop();
      var td = document.createElement('td');
      if (rowNumber === 2 && colNumber === 2){
        td.appendChild(document.createTextNode('Free'));
        td.setAttribute('class', 'locked');
      } else {
        td.appendChild(document.createTextNode(nextOption));
      }
      _decorateTD(td, tileSize);
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
  table.appendChild(tableBody);
  table.setAttribute('style', 'margin-' + offset.direction + ':' + offset.amount + 'px; padding:' + BOARD_PADDING + 'px');
  // table.setAttribute('style', 'padding:' + BOARD_PADDING + 'px');
  body.appendChild(table);
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function _shuffle(array) {
  var currentIndex = array.length
  var temporaryValue
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function _calculateTileSize(numberOfTiles, borderSpacing) {
  var availableHeight = window.innerHeight - document.getElementById('header').offsetHeight;
  var maxTileHeight = (availableHeight - numberOfTiles * borderSpacing - 2 * BOARD_PADDING) / numberOfTiles;
  var maxTileWidth = (window.innerWidth - numberOfTiles * borderSpacing - 2 * BOARD_PADDING) / numberOfTiles;
  return Math.min(maxTileHeight, maxTileWidth);
}

function _calculateOffset(numberOfTiles, borderSpacing) {
  var availableHeight = window.innerHeight - document.getElementById('header').offsetHeight;
  var maxTileHeight = availableHeight - numberOfTiles * borderSpacing - 2 * BOARD_PADDING;
  var maxTileWidth = window.innerWidth - numberOfTiles * borderSpacing - 2 * BOARD_PADDING;
  var direction = maxTileHeight > maxTileWidth ? 'top' : 'left';
  return {
    direction: direction, // left or top
    amount: Math.abs(maxTileHeight - maxTileWidth) / 2
  };
}

function _decorateTD(td, tileSize){
  var tileSize = tileSize + 'px';
  td.setAttribute('min-width', tileSize);
  td.setAttribute('min-height', tileSize);
  td.setAttribute('height', tileSize);
  td.setAttribute('width', tileSize);
  td.setAttribute('onclick', 'toggleTile(this)');
}

function resizeBoard(){
  var tileSize = _calculateTileSize(NUM_TILES, BORDER_SPACING);
  var offset = _calculateOffset(NUM_TILES, BORDER_SPACING);
  console.log(offset)
  var tds = document.getElementsByTagName('td')
  for (var i = 0; i < tds.length; i++){
    _decorateTD(tds[i], tileSize);
  }
  var table = document.getElementsByTagName('table')[0];
  table.setAttribute('style', 'margin-' + offset.direction + ':' + offset.amount + 'px; padding:' + BOARD_PADDING + 'px');
  // table.setAttribute('style', 'padding:' + BOARD_PADDING + 'px');
}

function toggleTile(td){
  var classNames = (td.getAttribute('class') || '').split(' ');
  if (classNames.indexOf('locked') > -1) return;
  td.classList.toggle('selected')
  // if (classNames.indexOf('selected') > -1){
  //   td.setAttribute('class', '');
  // } else {
  //   td.setAttribute('class', 'selected');
  // }
}

tableCreate();
window.onresize = resizeBoard;
