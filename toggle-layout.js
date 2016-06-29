var board = document.getElementById('board');

if (!board.classList.contains(classMixed)) {
    if (!board.classList.contains(classVertical)) {
        board.classList.add(classMixed);
        chrome.storage.sync.set({'classList': classMixed});
    } else {
        board.classList.remove(classVertical);
        chrome.storage.sync.remove('classList');
    }
} else {
    board.classList.remove(classMixed);
    board.classList.add(classVertical);
    chrome.storage.sync.set({'classList': classVertical});
}
