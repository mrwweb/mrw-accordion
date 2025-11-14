/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import transforms from './transforms';

/**
 * Internal dependencies
 */
import blockJson from '../block.json';
import edit from './edit';

import './style.scss';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( blockJson, {
	edit,
	transforms,
	save: props => {
		const {
			level,
			headingText
		} = props.attributes;

		const headingLevel = level ?? 2,
			  HeadingTag = 'h' + headingLevel;

		return (
			<>
				<HeadingTag>{headingText}</HeadingTag>
				<InnerBlocks.Content />
			</>
		)
	},
} );
