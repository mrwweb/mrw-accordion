"use strict";

document.addEventListener('DOMContentLoaded', function() {

	const 	accordions = document.querySelectorAll('.mrw-accordion'),
			accordionsTotal = accordions.length;

	let	i,
		accordion;

	for ( i = 0; i < accordionsTotal; i = i + 1 ) {

		// A new instance of the accordion object is stored in the accordion variable on each iteration of the loop
		accordion = new AccordionMaker(accordions[i], i);
		accordion.init();

	}

});

const AccordionMaker = function( accordionContainer, i ) {

	const accordionHeading = accordionContainer.firstElementChild,
		accordionBody = accordionContainer.lastElementChild,
		// This function both creates the button and returns it
		accordionButton = addButtonToHeading( accordionHeading ),
		// Create ID for accordion based on existing ID -OR- accordion number on page
		headingID = accordionHeading.id,
		accordionID = ( '' !== headingID ? headingID : i ) + '-accordion';

	this.init = function() {

		accordionBody.id = accordionID;
		accordionButton.setAttribute('aria-controls', accordionID);

		// ARIA and Event for Button
		accordionButton.setAttribute('aria-expanded', 'false');
		accordionButton.addEventListener('click', accordionClick, false);

		// ARIA for body
		accordionBody.setAttribute('aria-hidden', 'true');


	};

	function addButtonToHeading( heading ) {

		const 	headingHTML = heading.innerHTML,
				button = document.createElement( 'button' );

		button.innerHTML = headingHTML.trim();
		heading.innerHTML = '';
		heading.appendChild(button);

		return button;

	}

	function accordionClick(e) {

		if ( 'false' === accordionButton.getAttribute('aria-expanded') ) {

			accordionContainer.classList.toggle('is-open');
			accordionButton.setAttribute('aria-expanded', 'true');
			accordionBody.setAttribute('aria-hidden', 'false')

		} else {

			accordionContainer.classList.toggle('is-open');
			accordionButton.setAttribute('aria-expanded', 'false');
			accordionBody.setAttribute('aria-hidden', 'true')

		}

	}

};
