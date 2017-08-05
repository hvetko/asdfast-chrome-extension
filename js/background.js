function asdFast() {
	chrome.tabs.executeScript(null, {
		file: "js/content.js"
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
}

chrome.contextMenus.create({
	title: "Insert AsdFast Text",
	contexts: ["editable"],
	onclick: asdFast
});
