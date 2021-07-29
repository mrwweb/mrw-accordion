/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const AccordionContentTemplate = [
	[ 'core/paragraph', { placeholder: 'Accordion Content' } ]
];

const excludeSelf = wp.blocks.getBlockTypes().map(block => block.name).filter(blockName => blockName !== 'mrw-accordion');

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	return (
		<div className="mrw-accordion__content">
			<InnerBlocks
				template={AccordionContentTemplate}
				templateLock={false}
				allowedBlocks={excludeSelf}
				/>
		</div>
	);
}
