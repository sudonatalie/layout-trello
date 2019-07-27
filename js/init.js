function syncState() {
  chrome.storage.sync.get('classList', function(result) {
    let board = document.getElementById('board');

    if (result.classList) {
      board.classList.add(result.classList);
    }
  });
}

function toggleLayout() {
  const classVertical = 'layout-trello-vertical';
  const classMixed = 'layout-trello-mixed';

  let board = document.getElementById('board');

  if (board.classList.contains(classMixed)) {
    board.classList.remove(classMixed);
    board.classList.add(classVertical);
    chrome.storage.sync.set({
      'classList': classVertical
    });
  } else if (board.classList.contains(classVertical)) {
    board.classList.remove(classVertical);
    chrome.storage.sync.remove('classList');
  } else {
    board.classList.add(classMixed);
    chrome.storage.sync.set({
      'classList': classMixed
    });
  }
}

syncState();
