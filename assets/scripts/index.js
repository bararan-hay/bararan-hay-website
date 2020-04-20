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
	},
	{
		name: "armdicto բառարան",
		pattern: "^text.+\n",
		link: "https://github.com/norayr/freearmdicto",
		row: "https://raw.githubusercontent.com/norayr/freearmdicto/master/armdicto.tab"
	},
	{
		name: "Հայկազեան բառարան",
		pattern: "^text.+\n",
		link: "https://github.com/norayr/enacademic_to_stardict",
		row: " https://raw.githubusercontent.com/norayr/enacademic_to_stardict/master/armenian_enacademic.tab"
	},
	{
		name: "տօկի պօնա֊հայերէն բառարան",
		pattern: "^text.*\n.+\n",
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
	html += '<b>' + dictionary.name + '</b>';
	html += '<a target="_blank" href="' + dictionary.link + '">աղբիւր</a>';
	html += '</div>'
	html += '<ul class="pl-4">'
	array.slice(0, resultsMaxCount).forEach(function (item) {
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
	}, debounceDelay)
}