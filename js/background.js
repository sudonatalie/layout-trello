const boardUrl = 'trello.com/b/';

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  // Match Trello board pages only
  const match = details.url.includes(boardUrl);

  // Setup page for layout changes and show page action
  if (match) {
    chrome.tabs.executeScript(null, {
      file: 'js/setup-css.js'
    });
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    file: 'js/toggle-layout.js'
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