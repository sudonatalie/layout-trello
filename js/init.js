function syncState() {
  let board_id = location.pathname.split('/')[2];
  let storageKey = 'classList_' + board_id;

  chrome.storage.sync.get(storageKey, function(result) {
    let board = document.getElementById('board');

    if (result[storageKey]) {
      board.classList.add(result[storageKey]);
    }
  });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  let board = document.getElementById('board');
  let board_id = location.pathname.split('/')[2];
  let storageKey = 'classList_' + board_id;

  if (namespace == 'sync' && storageKey in changes) {
    board.classList.remove(changes[storageKey].oldValue);
    board.classList.add(changes[storageKey].newValue);
  }
});

function toggleLayout() {
  const classVertical = 'layout-trello-vertical';
  const classMixed = 'layout-trello-mixed';

  let board = document.getElementById('board');
  let board_id = location.pathname.split('/')[2];
  let storageKey = 'classList_' + board_id;

  if (board.classList.contains(classMixed)) {
    board.classList.remove(classMixed);
    board.classList.add(classVertical);
    chrome.storage.sync.set({
      [storageKey]: classVertical
    });
  } else if (board.classList.contains(classVertical)) {
    board.classList.remove(classVertical);
    chrome.storage.sync.remove(storageKey);
  } else {
    board.classList.add(classMixed);
    chrome.storage.sync.set({
      [storageKey]: classMixed
    });
  }
}

syncState();
