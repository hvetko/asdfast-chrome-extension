var asdFastThis = function () {
	chrome.windows.getCurrent(function (currentWindow) {
		chrome.tabs.query({active: true, windowId: currentWindow.id}, function (activeTabs) {
			chrome.tabs.executeScript(activeTabs[0].id, {
				file: 'js/content.js', allFrames: true
			}, function (result) {
				if (result.shift() === false) {
					chrome.notifications.create({
						type: 'basic',
						iconUrl: '../img/asdfast-128.png',
						title: 'ASDFast Error!',
						message: 'API Communication error.'
					});
				}
			});
		});
	});
};

chrome.contextMenus.create({
	title: "Insert AsdFast Text",
	contexts: ["editable"],
	onclick: asdFastThis
});
