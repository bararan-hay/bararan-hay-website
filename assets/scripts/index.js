/* ################################################################### */
/* ############ Այստեղ կարող էք աւելացնել ձեր բառարանը ############# */
/* ################################################################### */

var dictionaries = [
	{
		name: "Բարաթեանի բառարան",
		pattern: "^text.+\n",
		link: "https://github.com/tigransimonyan/baratian-dictionary-assets",
		row: "https://raw.githubusercontent.com/tigransimonyan/baratian-dictionary-assets/master/baratyan-dictionary.tab"
	},
	{
		name: "noch տեխնիկական բառարան",
		pattern: "^text.+\n",
		link: "https://github.com/norayr/noch-armenian-dictionary",
		row: "https://raw.githubusercontent.com/norayr/noch-armenian-dictionary/master/noch_en-hy.tab"
	}
];

/* ################################################################### */
/* ################################################################### */
/* ################################################################### */

var loading = false;
var timeout = null;

dictionaries.forEach(dictionary => {
	dictionary.data = "";
	window.axios
		.get(dictionary.row)
		.then(function (response) {
			dictionary.data = response.data
		})
})

function getLoadingHtml() {
	var html = '<div class="d-flex justify-content-center mt-5">';
	html += '<div class="spinner-border text-dark" role="status">';
	html += '<span class="sr-only">որոնում...</span>';
	html += '</div>';
	html += '</div>';
	return html;
}

function getResultsHtml(dictionary, array) {
	if (!array || array.length === 0) {
		return '';
	}
	var html = '<div class="border-bottom pb-2 pt-3 d-flex flex-row justify-content-between">';
	html += '<b>' + dictionary.name + ' (' + array.length + ' բառ) </b>';
	html += '<a target="_blank" href="' + dictionary.link + '">աղբիւր</a>';
	html += '</div>'
	html += '<ul class="pl-4">'
	array.forEach(function (item) {
		html += '<li class="mt-2">' + item + '</li>'
	});
	html += '</ul>'
	return html;
}

function renderResultsHtml(html) {
	return html || '<h6 class="text-center mt-5">Շտեմարանում նման բառ չկայ ։(</h6>';
}

function handleInput(e) {
	clearTimeout(timeout)
	var text = e.value.trim();
	if (!text) {
		results.innerHTML = "";
		return;
	}
	if (!loading) {
		results.innerHTML = getLoadingHtml();
		loading = true;
	}
	timeout = setTimeout(function () {
		var html = '';
		dictionaries.forEach(dictionary => {
			var pattern = dictionary.pattern.replace("text", text);
			var regex = new RegExp(pattern, "gim");
			var results = dictionary.data.match(regex);
			html += getResultsHtml(dictionary, results);
		})
		results.innerHTML = renderResultsHtml(html);
		loading = false;
	}, 300)
}