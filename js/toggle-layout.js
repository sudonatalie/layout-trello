if (board.classList.contains(classMixed)) {
  board.classList.remove(classMixed);
  board.classList.add(classVertical);
  chrome.storage.sync.set({'classList': classVertical});
} else if (board.classList.contains(classVertical)) {
  board.classList.remove(classVertical);
  chrome.storage.sync.remove('classList');
} else {
  board.classList.add(classMixed);
  chrome.storage.sync.set({'classList': classMixed});
}
