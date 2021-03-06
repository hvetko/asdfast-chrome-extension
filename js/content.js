function Content() {
	this.loadXMLDoc = function () {
		var self = this;
		var xhr = new XMLHttpRequest();
		var el = document.activeElement;
		var success = null;

		this.musicLoader(el, true);
		var playMusic = setInterval(function () {
			self.musicLoader(el)
		}, 700);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					clearInterval(playMusic);
					var r = JSON.parse(xhr.responseText);
					el.value = r.text;
					success = true;
				} else {
					el.value = '';
					console.error('ASDFast ERROR >>>', xhr);
					clearInterval(playMusic);
					success = false;
				}
			}
		};

		var domHeight = (el.clientHeight !== undefined) ? el.clientHeight : '';
		var domWidth = (el.clientWidth !== undefined) ? el.clientWidth : '';
		var domPaddingLeft = window.getComputedStyle(el, null).getPropertyValue('padding-left');
		var domPaddingRight = window.getComputedStyle(el, null).getPropertyValue('padding-right');
		var domPaddingTop = window.getComputedStyle(el, null).getPropertyValue('padding-top');
		var domPaddingBottom = window.getComputedStyle(el, null).getPropertyValue('padding-bottom');
		var domPadding = domPaddingTop + '|' + domPaddingRight + '|' + domPaddingBottom + '|' + domPaddingLeft;

		var parameters = '&domHeight=' + domHeight + '&domWidth=' + domWidth + '&domPadding=' + domPadding;

		var apiUrl = "https://asdfast.beobit.net/api/";

		xhr.open("GET", apiUrl + "?source=chrome" + parameters, true);
		xhr.send();

		return success;
	};

	this.musicLoader = function (el, forceStart) {
		if (forceStart || el.value.length > 5) {
			el.value = '♫';
		} else {
			el.value += (el.value.length % 2 === 0) ? '♫' : '♪';
		}
	};
}

var content = new Content();
content.loadXMLDoc();
