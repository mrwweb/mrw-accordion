"use strict";

document.addEventListener('DOMContentLoaded', function() {

	const 	accordions = document.querySelectorAll('.mrw-accordion'),
			accordionsTotal = accordions.length,
			target = window.location.hash.substring(1);

	let	i,
		accordion;

	for ( i = 0; i < accordionsTotal; i = i + 1 ) {

		// A new instance of the accordion object is stored in the accordion variable on each iteration of the loop
		accordion = new AccordionMaker(accordions[i], i);
		accordion.init( accordions[i].id === target );
		console.log( accordions[i].id, target );

	}

});

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
		accordionButton.addEventListener('click', accordionClick, false);

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
