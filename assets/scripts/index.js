var dictionary = null;
window.axios
	.get('https://raw.githubusercontent.com/tigransimonyan/baratian-dictionary-assets/master/baratyan-dictionary.tab')
	.then(function (response) {
		dictionary = response.data
	})

function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var loading = false;
var searchAndRender = debounce(function (regex) {
	var array = dictionary.match(new RegExp(regex, "gim"));
	var html = ''
	if (array) {
		html += '<ul class="pl-3">'
		array.forEach(function (item) {
			html += '<li class="mt-2">' + item + '</li>'
		})
		html += '</ul>'
	} else {
		html += '<h6 class="text-center mt-5">Շտեմարանում նման բառ չկա ։(</h6>'
	}
	results.innerHTML = html;
	loading = false;
}, 250);

function handleInput(e) {
	var text = e.value.trim();
	var regex = "^" + text + ".+\n";
	if (!text || !dictionary) {
		results.innerHTML = "";
		return;
	}
	if (!loading) {
		var html = '<div class="d-flex justify-content-center mt-5">';
		html += '<div class="spinner-border text-dark" role="status">';
		html += '<span class="sr-only">որոնում...</span>';
		html += '</div>';
		html += '</div>';
		results.innerHTML = html;
		loading = true;
	}
	searchAndRender(regex)
}