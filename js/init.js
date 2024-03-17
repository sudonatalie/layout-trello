function constructStorageKey() {
  let boardId = location.pathname.split('/')[2];
  return 'classList_' + boardId;
}

function syncState() {
  let storageKey = constructStorageKey();

  chrome.storage.sync.get(storageKey, function onChromeStorageSyncResult(result) {
    let board = document.getElementById('board');

    if (board === null) {
      window.addEventListener(
        'domcontentloaded',
        onChromeStorageSyncResult.bind(this, result)
      );

      return;
    }

    if (result[storageKey]) {
      board.classList.add(result[storageKey]);
    }
  });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  let board = document.getElementById('board');
  let storageKey = constructStorageKey();

  if (namespace == 'sync' && storageKey in changes) {
    board.classList.remove(changes[storageKey].oldValue);
    board.classList.add(changes[storageKey].newValue);
  }
});

function toggleLayout() {
  const classVertical = 'layout-trello-vertical';
  const classMixed = 'layout-trello-mixed';

  let board = document.getElementById('board');
  let storageKey = constructStorageKey();

  if (board.classList.contains(classMixed)) {
    chrome.storage.sync.set({
      [storageKey]: classVertical
    });
  } else if (board.classList.contains(classVertical)) {
    chrome.storage.sync.remove(storageKey);
  } else {
    chrome.storage.sync.set({
      [storageKey]: classMixed
    });
  }
}

syncState();
