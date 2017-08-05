function Popup() {

	this.text = null;
	this.paragraphs = [];
	this.sentences = [];

	this.listRowCount = 6;

	/**
	 * Does the API call
	 */
	this.loadASDFast = function () {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://asdfast.beobit.net/api?length=6&type=paragraph", true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				var response = JSON.parse(xhr.responseText);
				self.loadText(response.text);
				self.setASDFastTexts();
			}
		};
		xhr.send();
	};

	/**
	 * Load text from the API response into paragraph and sentence arrays
	 *
	 * @param text
	 */
	this.loadText = function (text) {
		var self = this;
		this.text = text;

		var paragraphs = text.split('\n');
		$.each(paragraphs, function (i, paragraph) {
			if (paragraph.trim()) {
				self.paragraphs.push(paragraph.trim());

				var sentences = paragraph.split('.');
				$.each(sentences, function (i, sentence) {
					if (sentence.trim()) {
						self.sentences.push(sentence.trim());
					}
				});
			}
		});
	};

	/**
	 * Loads the API response text into popup
	 */
	this.setASDFastTexts = function () {
		this.setParagraph();
		this.setSentence();
		this.setLists();
		this.setHTML();
	};

	/**
	 * Set the paragraph text to random three paragraphs
	 */
	this.setParagraph = function () {
		var self = this;
		var indexes = this.getRandomIndexes(3, this.paragraphs.length);
		var paragraphs = [];

		$.each(indexes, function (i, index) {
			paragraphs.push(self.paragraphs[index]);
		});

		$('#paragraph').val(paragraphs.join('\n\n'));
	};

	/**
	 * Set the sentence as the first sentence from the response
	 */
	this.setSentence = function () {
		$('#sentence').val(this.sentences.shift());
	};

	/**
	 * Set sentence and word lists
	 */
	this.setLists = function () {
		var self = this;
		var sentenceList = [];
		var wordList = [];
		var indexes = this.getRandomIndexes(this.listRowCount, this.sentences.length);
		$.each(indexes, function (i, index) {
			var sentence = self.sentences[index];
			var words = sentence.split(' ');
			var sentenceLength = Math.floor(Math.random() * 7) + 4;
			var shortenedSentence = words.slice(0, sentenceLength);
			sentenceList.push('- ' + shortenedSentence.join(' '));
			wordList.push('- ' + words.shift());
		});

		$('#list-sentences').val(sentenceList.join('\n'));
		$('#list-words').val(wordList.join('\n'));
	};

	/**
	 * Generate and set HTML
	 */
	this.setHTML = function () {
		var generatedHTML = [];

		generatedHTML.push('<h1>Lorem Ipsum ASDFast</h1>');
		generatedHTML.push('<p>' + this.sentences.shift() + '</p>');

		generatedHTML.push('<div> <!-- BEGIN COMMENT -->');

		generatedHTML.push('<div>' + this.sentences.shift() + '</div>');

		generatedHTML.push('<ul>');
		generatedHTML.push('\t<li><a href="#top">' + this.sentences.shift() + '</a></li>');
		generatedHTML.push('\t<li>Лорем ипсум долор сит амет</li>');
		generatedHTML.push('\t<li>Look &uarr;, it h&#229;s &plusmn; 30&deg; or &#8212;&frac34; &copy;</li>');
		generatedHTML.push('</ul>');

		generatedHTML.push('<code>var text = "' + this.sentences.shift() + '"</code>');

		generatedHTML.push('</div> <!-- END COMMENT-->');

		$('#html').val(generatedHTML.join('\n'));
	};

	this.showTextCopiedNotification = function () {
		$('#text-copied').show();

		setTimeout(function () {
			$('#text-copied').fadeOut('fast');
		}, 10000);
	};

	this.openTab = function (element) {
		$('.tab').hide();
		var activeTab = element.attr('tab');
		$('#' + activeTab).show();

		$('.tab-nav-tab').removeClass('active');
		element.addClass('active');
	};

	/**
	 * Get array with random numbers
	 *
	 * @param length
	 * @param maxValue
	 */
	this.getRandomIndexes = function (length, maxValue) {
		var getRandomNumber = function () {
			return Math.floor(Math.random() * maxValue);
		};

		return new Array(length).fill(0).map(getRandomNumber);
	};
}

var popup = new Popup();
document.addEventListener('DOMContentLoaded', popup.loadASDFast());

var manifestData = chrome.runtime.getManifest();
$('#version').text('v' + manifestData.version);

$('#reload').click(function () {
	popup.loadASDFast()
});

$('.copier').click(function () {
	var source = $(this).attr('source');
	$('#' + source).select();
	document.execCommand('copy');
	popup.showTextCopiedNotification();
});

$('.tab-nav-tab').click(function () {
	popup.openTab($(this));
});

