var cssFile = chrome.extension.getURL('css/layout.css'),
  board = document.getElementById('board'),
  classVertical = 'layout-trello-vertical',
  classMixed = 'layout-trello-mixed';

function insertCss() {
  if (document.getElementById('layoutcss') === null) {
    var css = document.createElement('link');
    css.id = 'layoutcss';
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = cssFile;
    document.getElementsByTagName('head')[0].appendChild(css);
  }
}

insertCss();

chrome.storage.sync.get('classList', function (result) {
  if (result.classList) {
    board.classList.add(result.classList);
  }
});
