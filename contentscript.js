
var cssFile = chrome.extension.getURL('css/layout.css'),
    classVertical = 'layout-trello-vertical',
    classMixed = 'layout-trello-mixed',
    timer;

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

    btnView.id = 'layout-button';
    btnView.setAttribute('class', 'header-btn header-notifications js-toggle-view');
    btnView.setAttribute('title', 'Toggle Layout');
    btnView.setAttribute('href', '#');
    btnView.innerHTML = '<span class="header-btn-icon icon-lg icon-list light"></span>';
    btnView.onclick = toggleView;

    btnNotifications.parentNode.insertBefore(btnView, btnNotifications.nextSibling);
}

function readyCheck() {
    var btnNotifications = document.getElementsByClassName('header-notifications')[0];
    var btnView = document.getElementById('layout-button');

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
