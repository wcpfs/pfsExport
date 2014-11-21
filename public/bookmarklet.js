(function () {
function toContent(elem) { return elem.textContent.trim(); }

function to_a(elems) { 
  var a = []; 
  for (var i = 0; i < elems.length; i++) {
    a.push(elems[i]); 
  } 
  return a; 
}

function isDataRow(row) { return row.childElementCount == 12; }

function joinLineFeeds(str) { return str.replace(/\n\s*/g, ''); }

function toCSVLine(row) { return to_a(row.children).map(toContent).map(joinLineFeeds).slice(0,11); }

function dataRows(el) { return to_a(el.getElementsByTagName('tr')).filter(isDataRow).map(toCSVLine); }

function toCSV( rows ){ 
  var fsep = ','; 
  var quot = '"'; 
  var quotquot = '\\' + quot;
  var alwaysQuote = false;
  var quoteIfContainsQuote = true; 
  var lines = []; 
  rows.forEach(function(row){ 
    var line = []; 
    row.forEach(function(field){ 
      var s = field; 
      var needsQuote = alwaysQuote; 
      if( s.indexOf( fsep ) >= 0 ) { 
        needsQuote = true; 
      } 
      if( s.indexOf( quot ) >= 0 ) { 
        needsQuote = needsQuote || quoteIfContainsQuote; 
        s = s.replace( quot, quotquot ); 
      } 
      if( needsQuote ) { 
        s = quot + s + quot; 
      } 
      line.push( s ); 
    }); 
    lines.push( line.join( fsep )); 
  }); 
  return lines.join( '\n' ); 
} 

function download(data) { 
  var a = document.createElement('a'); 
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data); 
  a.download = 'playerInfo.csv'; 
  document.getElementsByTagName('body')[0].appendChild(a); 
  a.textContent = "click to download"; 
  a.click(); 
} 

var rows = [['Date', 'Event', 'Session', 'GM', 'Scenario', 'Player', 'Society Number', 'Character', 'Faction', 'Prestige Points', 'Notes']].concat(dataRows(document.getElementById('_0')).concat(dataRows(document.getElementById('_1')))); 
download(toCSV(rows)); 
})();
