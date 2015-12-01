function loadXMLDoc() {
    var xhr = new XMLHttpRequest();
    var el = document.activeElement;

    musicLoader(el, true);
    var playMusic = setInterval(function () {
        musicLoader(el)
    }, 700);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            clearInterval(playMusic);
            var r = eval("(" + xhr.responseText + ")");
            el.value = r.text;
        }
    };

    var domHeight = (el.clientHeight != undefined) ? el.clientHeight : '';
    var domWidth = (el.clientWidth != undefined) ? el.clientWidth : '';
    var domPaddingLeft = window.getComputedStyle(el, null).getPropertyValue('padding-left');
    var domPaddingRight = window.getComputedStyle(el, null).getPropertyValue('padding-right');
    var domPaddingTop = window.getComputedStyle(el, null).getPropertyValue('padding-top');
    var domPaddingBottom = window.getComputedStyle(el, null).getPropertyValue('padding-bottom');
    var domPadding = domPaddingTop + '|' + domPaddingRight + '|' + domPaddingBottom + '|' + domPaddingLeft;

    var parameters = '&domHeight=' + domHeight + '&domWidth=' + domWidth + '&domPadding=' + domPadding;

    xhr.open("GET", "http://asdfast.beobit.net/api?source=chrome" + parameters, true);
    xhr.send();
}

/**
 * Show music notes while waiting for an API response.
 *
 * @param el
 * @param forceStart
 */
function musicLoader(el, forceStart) {
    if (forceStart || el.value.length > 5) {
        el.value = '♫';
    } else {
        el.value += (el.value.length % 2 == 0) ? '♫' : '♪';
    }
}

loadXMLDoc();