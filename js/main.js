// Set the listeners for lazy loading funcitonaliteis.
registerListener('load', setLazy);
registerListener('load', lazyLoad);
registerListener('scroll', lazyLoad);
registerListener('scroll', titleCardStick);
registerListener('resize', titleCardStick);
registerListener('scroll', skillItemCheck);

// Stores all the images that are to be lazy loaded.
var lazy = [];

// Loads all the lazy load images into the lazy array.
function setLazy() {

	lazy = document.getElementsByClassName('lazy');

}

// Checks to load images that are currently in the view port.
function lazyLoad() {

	for (var i = 0; i < lazy.length; i++) {

		if (isInViewport(lazy[i])) {

			if (lazy[i].getAttribute('data-src')) {
				lazy[i].src = lazy[i].getAttribute('data-src');
				lazy[i].removeAttribute('data-src');
				lazy[i].classList.add('loaded');
				if (lazy[i].parentNode.classList.contains("content-image")) {
					lazy[i].parentNode.classList.add("content-loaded");
				}
			}

		}

	}

	cleanLazy();

}

// Updates the lazy array to only keep images that haven't been loaded.
function cleanLazy() {

	lazy = Array.prototype.filter.call(lazy, function(l) {
		return l.getAttribute('data-src');
	});

}

// Checks to see if a title card is in the viewport. Sticks it to the side if true.
function titleCardStick() {
	
	var sections = document.getElementsByClassName('section');

	for (var i = 0; i < sections.length; i++) {

		var scroll = window.scrollY || window.pageYOffset
		var boundsTop = sections[i].getBoundingClientRect().top + scroll
		
		var viewport = {
			top: scroll,
			bottom: scroll + window.innerHeight,
		}
		
		var bounds = {
			top: boundsTop,
			bottom: boundsTop + sections[i].clientHeight,
		}

		var title = sections[i].getElementsByClassName('section-title');

		title[0].classList.remove("title-stick", "title-bottom");

		// If the given section is in viewport, stick the title to the side.
		if (( bounds.bottom >= viewport.bottom ) && ( bounds.top <= viewport.top )) {
			title[0].classList.add("title-stick");
		}
		// If the given section is above viewport, stick the title to the bottom.
		else if (( bounds.bottom <= viewport.bottom ) && ( bounds.top <= viewport.top )) {
			title[0].classList.add("title-bottom");
		}

	}

}

// Checks to see if any skill items is in the viewport. Shows the skills if so.
function skillItemCheck() {

	var items = document.getElementsByClassName('skill-item');

	for (var i = 0; i < items.length; i++) {

		if (isInViewportComplete(items[i])) {
			items[i].classList.add("show");
		}

	}

}

// Checks to see if the given element is in viewport.
function isInViewport(el) {

	var rect = el.getBoundingClientRect();

	return (
		rect.bottom >= 0 &&
		rect.right >= 0 &&
		rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.left <= (window.innerWidth || document.documentElement.clientWidth)
	);

}

// Checks to see if the given element is completely in viewport.
function isInViewportComplete(el) {

	var scroll = window.scrollY || window.pageYOffset
	var boundsTop = el.getBoundingClientRect().top + scroll

	var viewport = {
		top: scroll,
		bottom: scroll + window.innerHeight,
	}

	var bounds = {
		top: boundsTop,
		bottom: boundsTop + el.clientHeight,
	}

	return (bounds.bottom <= viewport.bottom);

}

// Registers a listener.
function registerListener(event, func) {

	if (window.addEventListener) {
		window.addEventListener(event, func);
	}
	else {
		window.attachEvent('on' + event, func);
	}

}

//Detach a listener.
function detachListener(event, func) {

	if (window.removeEventListener) {
		window.removeEventListener(event, func);
	}
	else {
		window.detachEvent('on' + event, func);
	}

}

// Handling Navigation Clicks.
var navLinks = document.getElementsByClassName("nav-link");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', navigationScroll, false);
}

function navigationScroll(event) {

	event.preventDefault();

	var e = this.getAttribute("href").substr(1);

	if (e != "") {

		var target = document.querySelector("[data-id=" + e + "]");

		variableTimeScroll(target.offsetTop);

	}

}

// Handling Portfolio Details Clicks.
var contentItems = document.getElementsByClassName("content-image");
for (var i = 0; i < contentItems.length; i++) {
	contentItems[i].addEventListener('click', itemClick, false);
}

function itemClick() {

	if (this.parentNode.id.startsWith("web")) {
		if (this.parentNode.id === "webSchool") {
			window.open('https://saadkhan.info/SchoolNexus', '_blank');
		}
		else if (this.parentNode.id === "webTurbo") {
			window.open('https://schooltastic.herokuapp.com', '_blank');
		}
		else if (this.parentNode.id === "webCanal") {
			window.open('https://saadkhan.info/Canal_Control', '_blank');
		}
	}
	else if (!this.classList.contains("active")) {

		var parent = this.parentNode;
		var parentOffset = parent.offsetTop + parent.parentNode.parentNode.offsetTop;

		variableTimeScroll(parentOffset, function() {

			var closeButton = parent.parentNode.parentNode.querySelector(".close-button");
			closeButton.classList.add("show");
			closeButton.classList.remove("hide");
	
			var siblingItems = parent.parentNode.querySelectorAll(".content-item.active");
			
			for (var i = 0; i < siblingItems.length; i++) {
				siblingItems[i].classList.remove("active");
				siblingItems[i].getElementsByClassName("content-details")[0].classList.remove("show");
				siblingItems[i].getElementsByClassName("content-details")[0].classList.add("hide");
			}
	
			parent.classList.add("active");

			parent.getElementsByClassName("content-details")[0].classList.add("show");
			parent.getElementsByClassName("content-details")[0].classList.remove("hide");
			
			parent.parentNode.parentNode.getElementsByClassName('section-content')[0].classList.add("section-content-details");
			parent.parentNode.parentNode.getElementsByClassName('section-title')[0].classList.add("section-title-details");
		
			var detailImages = parent.getElementsByTagName("img");
			for (var i = 0; i < detailImages.length; i++) {
				detailImages[i].classList.add("lazy");
				lazy.push(detailImages[i]);
			}

		});

	}

}

// Handling Portfolio Details Close Button Clicks.
var closeButtons = document.getElementsByClassName("close-button");
for (var i = 0; i < closeButtons.length; i++) {
	closeButtons[i].addEventListener('click', closeClick, false);
}

function closeClick() {

	var element = this;
	var parent = document.querySelector(".content-details.show");

	var contentDiv = parent.parentNode;
	var parentOffset = contentDiv.offsetTop + contentDiv.parentNode.parentNode.offsetTop;

	variableTimeScroll(parentOffset, function() {
	
		element.classList.remove("show");
		element.classList.add("hide");

		parent.classList.add("hide");
		parent.parentNode.classList.remove("active");
		
		setTimeout(function(){
			parent.classList.remove("show");
			parent.parentNode.parentNode.parentNode.getElementsByClassName('section-content')[0].classList.remove("section-content-details");
			parent.parentNode.parentNode.parentNode.getElementsByClassName('section-title')[0].classList.remove("section-title-details");
		}, 890);

		var detailImages = parent.getElementsByTagName("img");
		for (var i = 0; i < detailImages.length; i++) {
			detailImages[i].classList.remove("lazy");
			lazy.splice(lazy.indexOf(detailImages[i]), 1);
		}

		setLazy();	

	});

}

// Scrolls to the given element.
// The scroll time depends upon the distance. The scroll speed remains constant.
function variableTimeScroll(to, callback) {

	var start =  document.documentElement.scrollTop || document.body.scrollTop,
		change = to - start,
		currentTime = 0,
		increment = 20,
		duration = Math.abs(change) * 0.2;

	detachListener("scroll", lazyLoad);

	console.log(`start: ${start}, to: ${to} change: ${change}, duration: ${duration}`);

	var animateScroll = function() {

		currentTime += increment;

		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		
		document.documentElement.scrollTop = document.body.scrollTop  = val;

		console.log(currentTime + " " + duration);
		if (currentTime < duration) {
			setTimeout(animateScroll, increment);
		}
		else {
			registerListener("scroll", lazyLoad);
			if (callback) callback();
		}

	}
	animateScroll();

}

// Calculate the amount by which the scrolling animation moves in every iteration.
//currTime = current time
//start = start value
//change = change in value
//duration = duration
Math.easeInOutQuad = function(currTime, start, change, duration) {
	currTime /= duration / 2;
	if (currTime < 1) return change / 2 * currTime * currTime + start;
	currTime--;
	return -change / 2 * (currTime * (currTime - 2) - 1) + start;
};