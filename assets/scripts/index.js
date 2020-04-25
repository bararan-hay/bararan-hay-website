/* ################################################################### */
/* ############ Այստեղ կարող էք աւելացնել ձեր բառարանը ############# */
/* ################################################################### */

var dictionaries = [
	{
		wordPattern: "^[A-z]",
		linePattern: "^text.+\n",
		name: "Բարաթեանի բառարան",
		link: "https://github.com/tigransimonyan/baratian-dictionary-assets",
		row: "https://raw.githubusercontent.com/tigransimonyan/baratian-dictionary-assets/master/baratyan-dictionary.tab",
		data: "{% include navigation.html %}"
	},
	{
		wordPattern: "^[A-z]",
		linePattern: "^text.+\n",
		name: "Noch տեխնիկական բառարան",
		link: "https://github.com/norayr/noch-armenian-dictionary",
		row: "https://raw.githubusercontent.com/norayr/noch-armenian-dictionary/master/noch_en-hy.tab"
	},
	{
		wordPattern: "^[A-z]",
		linePattern: "^text.+\n",
		name: "Armdicto բառարան",
		link: "https://github.com/norayr/freearmdicto",
		row: "https://raw.githubusercontent.com/norayr/freearmdicto/master/armdicto.tab"
	},
	{
		wordPattern: "^[Ա-և]",
		linePattern: "^text.+\n",
		name: "Հայկազեան բառարան",
		link: "https://github.com/norayr/enacademic_to_stardict",
		row: " https://raw.githubusercontent.com/norayr/enacademic_to_stardict/master/armenian_enacademic.tab"
	},
	{
		wordPattern: "^[A-z]",
		linePattern: "^text.*\n.+\n",
		name: "տօկի պօնա֊հայերէն բառարան",
		link: "https://gitlab.com/kamee/toki-pona-armenian",
		row: " https://cors-anywhere.herokuapp.com/https://gitlab.com/kamee/toki-pona-armenian/-/raw/master/toki-pona-armenian.babylon"
	}
];

/* ################################################################### */
/* ################################################################### */
/* ################################################################### */

var loading = false;
var timeout = null;
var resultsMaxCount = 5;
var debounceDelay = 300;

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

function searchText(promise, dictionary) {
	const text = searchInput.value.trim();
	return promise.then(function (html) {
		var wordRegExp = new RegExp(dictionary.wordPattern);
		if (!wordRegExp.test(text)) {
			return Promise.resolve(html);
		}
		var linePattern = dictionary.linePattern.replace("text", text);
		var lineRegExp = new RegExp(linePattern, "gim");
		if (dictionary.data) {
			return html + getResultsHtml(dictionary, lineRegExp);
		}
		return window.axios
			.get(dictionary.row)
			.then(function (response) {
				dictionary.data = response.data;
				return html + getResultsHtml(dictionary, lineRegExp);
			})
	})
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
		dictionaries
			.reduce(searchText, Promise.resolve(''))
			.then(function (html) {
				results.innerHTML = renderResultsHtml(html);
				loading = false;
			})
	}, debounceDelay)
}