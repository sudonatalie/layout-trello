const boardUrl = 'trello.com/b/';

// Declarative content script injection doesn't work on push state (i.e. when
// navigating from trello.com/username/boards to a specific board page), so we
// re-inject content scripts programmatically onHistoryStateUpdated.
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  // Match Trello board pages only
  const match = details.url.includes(boardUrl);

  // Setup page for layout changes and show page action
  if (match) {
    chrome.tabs.insertCSS(null, {
      file: 'css/layout.css'
    });
    chrome.tabs.executeScript(null, {
      file: 'js/init.js'
    });
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    code: 'toggleLayout()'
  });
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlContains: boardUrl
          }
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });
});
