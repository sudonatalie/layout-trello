
var cssFile = chrome.extension.getURL('css/vertical.css'),
    classVertical = 'vertical-trello-vertical',
    classMixed = 'vertical-trello-mixed',
    timer;

function insertCss() {
    if (document.getElementById('verticalcss') === null) {
        var css = document.createElement('link');
        css.id = 'verticalcss';
        css.type = 'text/css';
        css.rel = 'stylesheet';
        css.href = cssFile;
        document.getElementsByTagName('head')[0].appendChild(css);
    }
}

function toggleView() {
    var board = document.getElementById('board');

    if (!board.classList.contains(classMixed)) {
        if (!board.classList.contains(classVertical)) {
            board.classList.add(classMixed);
        } else {
            board.classList.remove(classVertical);
        }
    } else {
        board.classList.remove(classMixed);
        board.classList.add(classVertical);
    }
}

function insertButton() {
    var btnNotifications = document.getElementsByClassName('header-notifications')[0];
    var btnView = document.createElement('a');

    btnView.id = 'vertical-button';
    btnView.setAttribute('class', 'header-btn header-notifications js-toggle-view');
    btnView.setAttribute('title', 'Toggle Vertical View');
    btnView.setAttribute('href', '#');
    btnView.innerHTML = '<span class="header-btn-icon icon-lg icon-list light"></span>';
    btnView.onclick = toggleView;

    btnNotifications.parentNode.insertBefore(btnView, btnNotifications.nextSibling);
}

function readyCheck() {
    var btnNotifications = document.getElementsByClassName('header-notifications')[0];
    var btnView = document.getElementById('vertical-button');

    if (!btnView && btnNotifications) {
        insertButton();
        insertCss();
        clearInterval(timer);
    }
}

if (document.URL.indexOf('/b/') !== -1) {
    timer = setInterval(readyCheck, 100);
    // @todo Need better solution than interval checking after pushState,
    //       but readyState always 'complete' after initial DOM load
}