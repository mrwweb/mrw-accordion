import { createBlock } from '@wordpress/blocks';

function accordionToAccordion( attributes, innerBlocks ) {
	const { className, headingText, level } = attributes;
	const accordionHeading = createBlock(
		'core/accordion-heading',
		{
			title: headingText,
			level
		}
	);
	const accordionPanel = createBlock(
		'core/accordion-panel',
		{},
		innerBlocks
	);
	const accordionItem = createBlock(
		'core/accordion-item',
		{},
		[
			accordionHeading,
			accordionPanel
		]
	);
	const accordion = createBlock(
		"core/accordion",
		{
			className,
			headingLevel: level,
		},
		[ accordionItem ]
	);
	return accordion;
}

const transforms = {
	to: [
		{
			type: 'block',
			blocks: ['core/accordion'],
			transform: accordionToAccordion
		}
	]
};

export default transforms;