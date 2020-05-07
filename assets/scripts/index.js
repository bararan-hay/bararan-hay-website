var loading = false;
var timeout = null;
var resultsMaxCount = 5;
var debounceDelay = 300;
var version = "v1.1";

var dictionaries = [{
	wordPattern: "^[A-z]",
	linePattern: "^text.+\n",
	name: "Բարաթեանի բառարան",
	link: "https://github.com/tigransimonyan/baratian-dictionary-assets",
	row: "https://raw.githubusercontent.com/tigransimonyan/baratian-dictionary-assets/master/baratyan-dictionary.tab"
}, {
	wordPattern: "^[Ա-և]",
	linePattern: "^text.+\n",
	name: "Հայկազեան բառարան",
	link: "https://github.com/norayr/enacademic_to_stardict",
	row: "https://raw.githubusercontent.com/norayr/enacademic_to_stardict/master/armenian_enacademic.tab"
}, {
	wordPattern: "^[Ա-և]",
	linePattern: "^(?:.+\|\s*)?text.*\n.+\n",
	name: "Noch տեխնիկական բառարան",
	link: "https://github.com/norayr/noch-armenian-dictionary",
	row: "https://raw.githubusercontent.com/norayr/noch-armenian-dictionary/master/noch_hy-en.babylon"
}, {
	wordPattern: "^[A-z]",
	linePattern: "^text.+\n",
	name: "Noch տեխնիկական բառարան",
	link: "https://github.com/norayr/noch-armenian-dictionary",
	row: "https://raw.githubusercontent.com/norayr/noch-armenian-dictionary/master/noch_en-hy.tab"
}, {
	wordPattern: "^[A-z]",
	linePattern: "^text.+\n",
	name: "Armdicto բառարան",
	link: "https://github.com/norayr/freearmdicto",
	row: "https://raw.githubusercontent.com/norayr/freearmdicto/master/armdicto.tab"
}]

caches.keys().then(function (versions) {
	versions.forEach(function (_version) {
		if (_version !== version) {
			return caches.delete(_version);
		}
	})
})

function request(url) {
	return caches.match(url).then(function (response) {
		if (response !== undefined) {
			return response.text();
		}
		return fetch(url).then(function (response) {
			var responseClone = response.clone();
			caches.open(version).then(function (cache) {
				cache.put(url, responseClone);
			});
			return response.text();
		})
	});
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
		html += '<li class="mt-2">' + item.replace(/\\n/g, " ") + '</li>'
	});
	html += '</ul>'
	return html;
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
		loading = false;
		var html = ""
		var count = 0;
		dictionaries.forEach(function (dictionary) {
			var wordRegExp = new RegExp(dictionary.wordPattern);
			if (!wordRegExp.test(text)) {
				return null;
			}
			count++;
			request(dictionary.row).then(function (data) {
				var pattern = dictionary.linePattern.replace("text", text)
				var lineRegExp = new RegExp(pattern, "gim");
				dictionary.data = data;
				html += getResultsHtml(dictionary, lineRegExp);
				if (--count === 0) {
					if (html) {
						results.innerHTML = html;
					} else {
						results.innerHTML = '<h6 class="text-center mt-5">Շտեմարանում նման բառ չկայ ։(</h6>'
					}
				} else {
					results.innerHTML = html + getLoadingHtml();
				}
			})
		})
	}, debounceDelay)
}