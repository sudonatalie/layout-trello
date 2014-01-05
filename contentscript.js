var cssFile = 'https://s3.amazonaws.com/vertical-trello/vertical.css';

function readyCheck() {
    var header = document.getElementsByClassName('header-user')[0];
    if (header && header.firstChild && header.firstChild.nextSibling)
    {
        insertButton();
        clearInterval(timer);
    }
}

function insertButton() {
    var header = document.getElementsByClassName('header-user')[0];
    var btnView = document.createElement('a');
    btnView.setAttribute('class', 'header-btn header-notifications js-toggle-view');
    btnView.setAttribute('title', 'Toggle Vertical View');
    btnView.setAttribute('href', '#');
    btnView.innerHTML = '<span class="header-btn-icon icon-lg icon-card light"></span><span class="header-btn-text">View</span>';
    btnView.onclick = toggleView;
    header.insertBefore(btnView, header.firstChild.nextSibling);
}

function toggleView() {
    var css = document.getElementById('verticalcss');
    if (css == null)
        applyVertical();
    else
        removeElement(css);
}

function applyVertical() {
    var css = document.createElement('link');
    css.id = 'verticalcss';
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = cssFile;
    document.getElementsByTagName('head')[0].appendChild(css);
}

function removeElement(node) {
    node.parentNode.removeChild(node);
}

if (document.URL.indexOf("/b/") != -1)
    var timer = setInterval(readyCheck,100);
    // @todo Need better solution than interval checking after pushState,
    //       but readyState always 'complete' after initial DOM load
