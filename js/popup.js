function Popup() {

	this.loadASDFast = function () {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://asdfast.beobit.net/api?length=3&type=paragraph", true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				var response = JSON.parse(xhr.responseText);
				$('#paragraph').val(response.text);
				$('#sentence').val(response.text.split('.').shift());
			}
		};
		xhr.send();
	};

	this.showTextCopiedNotification = function () {
		$('#text-copied').show();

		setTimeout(function () {
			$('#text-copied').fadeOut('fast');
		}, 1000);
	}
}

var popup = new Popup();
document.addEventListener('DOMContentLoaded', popup.loadASDFast());

var manifestData = chrome.runtime.getManifest();
$('#version').text('v' + manifestData.version);

$('#reload').click(function () {
	popup.loadASDFast()
});

$('#copy-sentence').click(function () {
	$('#sentence').select();
	document.execCommand('copy');
	popup.showTextCopiedNotification();
});
$('#copy-paragraph').click(function () {
	$('#paragraph').select();
	document.execCommand('copy');
	popup.showTextCopiedNotification();
});
