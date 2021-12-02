"use strict";

document.addEventListener('DOMContentLoaded', function() {

	const accordions = document.querySelectorAll('.mrw-accordion'),
		  accordionsTotal = accordions.length,
		  target = window.location.hash.substring(1);

	let	i,
		accordion;

	for ( i = 0; i < accordionsTotal; i = i + 1 ) {

		// A new instance of the accordion object is stored in the accordion variable on each iteration of the loop
		accordion = new AccordionMaker(accordions[i], i);
		accordion.init( accordions[i].id === target );

	}

});

window.addEventListener('hashchange', function() {
	const target = window.location.hash.substring(1);
	openAccordion(target);
});

function getAccordionInstance( accordionId ) {
	if( typeof accordionId !== 'string' ) {
		return false;
	}

	const accordion = document.getElementById(accordionId);

	if( accordion === null) {
		return false;
	}

	return accordion;
}

function toggleAccordion( accordionId ) {

	const accordion = getAccordionInstance( accordionId );

	if( ! accordion ) {
		return;
	}

	const button = accordion.querySelector('.mrw-accordion__heading button'),
		  body = accordion.querySelector('.mrw-accordion__content');

	if ( 'false' === button.getAttribute('aria-expanded') ) {

		accordion.classList.toggle('is-open');
		button.setAttribute('aria-expanded', 'true');
		body.setAttribute('aria-hidden', 'false')

	} else {

		accordion.classList.toggle('is-open');
		button.setAttribute('aria-expanded', 'false');
		body.setAttribute('aria-hidden', 'true')

	}

}

function openAccordion( accordionId ) {
	const accordion = getAccordionInstance( accordionId );

	if( ! accordion ) {
		return;
	}

	const 	button = accordion.querySelector('.mrw-accordion__heading button'),
			body = accordion.querySelector('.mrw-accordion__content');

	if ( 'false' === button.getAttribute('aria-expanded') ) {

		accordion.classList.toggle('is-open');
		button.setAttribute('aria-expanded', 'true');
		body.setAttribute('aria-hidden', 'false')

	}

}

const AccordionMaker = function( accordionContainer, i ) {

	const accordionHeading = accordionContainer.querySelector('.mrw-accordion__heading'),
		accordionBody = accordionContainer.querySelector('.mrw-accordion__content'),
		// This function both creates the button and returns it
		accordionButton = addButtonToHeading( accordionHeading ),
		accordionID = accordionContainer.id;

	this.init = function( isOpen ) {

		accordionBody.id = accordionID + '-content';
		accordionButton.setAttribute('aria-controls', accordionBody.id);

		// ARIA and Event for Button
		accordionButton.setAttribute('aria-expanded', isOpen );
		accordionButton.addEventListener('click', e => toggleAccordion(e.currentTarget.getAttribute('aria-controls').replace('-content','')), false);

		// ARIA for body
		accordionBody.setAttribute('aria-hidden', ! isOpen);


	};

	function addButtonToHeading( heading ) {

		const 	headingHTML = heading.innerHTML,
				button = document.createElement( 'button' );

		button.innerHTML = headingHTML.trim();
		heading.innerHTML = '';
		heading.appendChild(button);

		return button;

	}

};
