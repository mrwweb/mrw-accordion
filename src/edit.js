/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	RichText,
	BlockControls
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import './editor.scss';

export default function Edit( { isSelected, attributes, setAttributes } ) {
	const {
		level,
		heading
	} = attributes;

	const excludeSelf = wp.blocks.getBlockTypes().map(block => block.name).filter(name => name !== 'mrw/accordion');

	return (
		<div
			{ ...useBlockProps( {
					className: 'mrw-accordion',
			} ) }
		>
			<RichText
				value={heading}
				tagName={'h2'}
				placeholder={__( 'Accordion Title…', 'mrw-accordion' ) }
				className={'mrw-accordion__heading'}
				onChange={ (val) => {setAttributes( {'heading': val} )} }
				allowedFormats={['core/bold', 'core/italic']}
				/>
			<div class="mrw-accordion__content">
				<InnerBlocks
					allowedBlocks={excludeSelf}
					template={[[ 'core/paragraph', { placeholder: __( 'Accordion content…', 'mrw-accordion' )}]]}
					/>
			</div>
		</div>
	);
}
