var OPTIONS = [
  '"To tell you all about it"',
  '"iPhone 7 and 7 Plus"',
  '"For the First Time"',
  '"I’d like to invite"',
  '"Let me show it to you"',
  '"Let’s Take a Look"',
  '"Over One Billion iPhones Sold"',
  'Craig Federighi Makes a Dad Koke',
  'New Apple Watch Announced',
  '"Incredibly Thin" Product is Described',
  'Tim Cook talks about Health and Privacy',
  '"... And it’s Available Beginning Today"',
  'Tim Cook Appears on Stage at Least Three Times',
  'New iPhone Announced',
  '"...People Love it"',
  'Collaboration with Sonos Announced',
  'New Headphones (EarPods / AirPods) Announced',
  'A Photo is Taken on Stage Using an iPhone',
  'Battery Life is Improved for a Product',
  'Tim Cook Touts Incredible iPad Sales',
  'Johnny Ive\'s Voiceover in a Video',
  '"Best iPhone Yet"',
  'Video pans over Apple Executives sitting in front row',
  'New Color(s) for the iPhone Announced',
  'New Apple Watch Bands Announced',
  'Somebody Uses Siri in a Demo',
  'Tim Cook Says the Word "Excited"',
  'A Celebrity (Athlete, Musician, etc.) Partakes in Keynote',
  'Tim Cook Thanks Everyone for Attending',
  'Demo of a Game to Show Off New Graphics Hardware',
  'Tim Cook Thanks Employees who Participated in Launch',
  'A Product or Service Launched in a New Country',
  'Slide with Logos of Fortune-500 Companies is Shown',
  'New Retail Store(s) Announced',
  'One Speaker is not Wearing an Apple Watch'
]

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
