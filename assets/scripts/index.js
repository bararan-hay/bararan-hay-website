var loading = false;
var timeout = null;
var resultsMaxCount = 5;
var debounceDelay = 300;

function pageLoaded() {
	if (searchInput) {
		searchInput.removeAttribute("disabled");
		results.innerHTML = "";
	}
}

window.addEventListener('DOMContentLoaded', (event) => {
	pageLoaded();
});

document.addEventListener("DOMContentLoaded", function (event) {
	pageLoaded();
});

document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		pageLoaded();
	}
}

function getLoadingHtml() {
	var html = '<div class="d-flex justify-content-center mt-5">';
	html += '<div class="spinner-border text-dark" role="status">';
	html += '<span class="sr-only">որոնում...</span>';
	html += '</div>';
	html += '</div>';
	return html;
}

function getResultsHtml(dictionary, regexp) {
	var lines = dictionary.data.match(regexp);
	if (!lines || lines.length === 0) {
		return '';
	}
	var html = '<div class="border-bottom pb-2 pt-3 d-flex flex-row justify-content-between">';
	html += '<b>' + dictionary.name + '</b>';
	html += '<a target="_blank" href="' + dictionary.link + '">աղբիւր</a>';
	html += '</div>'
	html += '<ul class="pl-4">'
	lines.slice(0, resultsMaxCount).forEach(function (item) {
		html += '<li class="mt-2">' + item + '</li>'
	});
	html += '</ul>'
	return html;
}

function renderResultsHtml(html) {
	if (html) {
		return html.replace(/\\n/g, " ");
	}
	return '<h6 class="text-center mt-5">Շտեմարանում նման բառ չկայ ։(</h6>';
}

function handleInput(e) {
	clearTimeout(timeout)
	var text = e.value.trim();
	if (!text) {
		results.innerHTML = "";
		return null;
	}
	if (!loading) {
		results.innerHTML = getLoadingHtml();
		loading = true;
	}
	timeout = setTimeout(function () {
		var html = '';
		for (var i = 0; i < dictionaries.children.length; i++) {
			var children = dictionaries.children[i];
			var wordPattern = children.getAttribute("wordPattern");
			var linePattern = children.getAttribute("linePattern");
			var wordRegExp = new RegExp(wordPattern);
			if (!wordRegExp.test(text)) {
				continue;
			}
			var dictionary = {
				name: children.getAttribute("name"),
				link: children.getAttribute("link"),
				data: children.innerText
			}
			var lineRegExp = new RegExp(linePattern.replace("text", text), "gim");
			html += getResultsHtml(dictionary, lineRegExp);
		}
		results.innerHTML = renderResultsHtml(html);
		loading = false;
	}, debounceDelay)
}