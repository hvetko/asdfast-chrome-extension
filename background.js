var asdFastThis = function (e) {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, function (activeTabs) {
            chrome.tabs.executeScript(activeTabs[0].id, {
                file: 'content.js', allFrames: true
            });
        });
    });
};

chrome.contextMenus.create({
    title: "Insert AsdFast Text",
    contexts: ["editable"],
    onclick: asdFastThis
});
