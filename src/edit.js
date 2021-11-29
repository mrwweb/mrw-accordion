/**
 * WordPress Dependencies
 */
import { find } from 'lodash';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	RichText,
	BlockControls,
	InspectorControls,
	useSetting
} from '@wordpress/block-editor';
import {
	ToolbarDropdownMenu,
	FontSizePicker,
	PanelBody
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import HeadingLevelIcon from './gutenberg-scripts/heading-level-icons.js';

/**
 * Editor Styles to Compile
 */
import './editor.scss';

export default function Edit( { isSelected, attributes, clientId, setAttributes } ) {
	const {
		anchor,
		accordionId,
		level,
		headingText,
		headingFontSize
	} = attributes;

	const fontSizes = useSetting('typography.fontSizes');
	const activeFontSize = find( fontSizes, { size: headingFontSize } );

	const d = new Date;
	const time = d.getTime();

	if( typeof accordionId === undefined ) {
		setAttributes({ accordionId: clientId });
	}
	const postId = useSelect((select) => {
		return select('core/editor').getCurrentPostId();
	});
	const blockId = accordionId ?? clientId;
	const headingLevel = level ?? 2;
	const tagName = 'h' + headingLevel;

	const excludeSelf = wp.blocks.getBlockTypes().map(block => block.name).filter(name => name !== 'mrw/accordion');


	function setHeadingLevel( level ) {
		setAttributes( { 'level': parseInt( level ) } );
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarDropdownMenu
					icon={ <HeadingLevelIcon level={headingLevel} /> }
					label={__('Heading level', 'mrw-accordion')}
					controls={ [
						{
							title: __( 'Heading 2', 'mrw-accordion' ),
							icon: <HeadingLevelIcon
									level="2"
									isPressed={headingLevel === 2} />,
							onClick: () => setHeadingLevel(2),
							isActive: headingLevel === 2,
							className: 'custom-class'
						},
						{
							title: __( 'Heading 3', 'mrw-accordion' ),
							icon: <HeadingLevelIcon
									level="3"
									isPressed={headingLevel === 3} />,
							isActive: headingLevel === 3,
							onClick: () => setHeadingLevel(3)
						},
						{
							title: __( 'Heading 4', 'mrw-accordion' ),
							icon: <HeadingLevelIcon
									level="4"
									isPressed={headingLevel === 4} />,
							isActive: headingLevel === 4,
							onClick: () => setHeadingLevel(4)
						},
					] }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Heading Styles', 'mrw-accordion' ) }>
					<FontSizePicker
						value={headingFontSize}
						onChange={ (val) => {setAttributes(
							{'headingFontSize': val}
						)} }
						disableCustomFontSizes={true}
						fontSizes={fontSizes}
						/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: 'mrw-accordion',
					id: 'accordionId',
				} ) }
			>
				<RichText
					value={headingText}
					tagName={tagName}
					placeholder={__( 'Accordion Title…', 'mrw-accordion' ) }
					className={classnames(
						'mrw-accordion__heading',
						{
							[`has-${activeFontSize?.slug}-font-size`]: activeFontSize
						}
					)}
					onChange={(val) => {setAttributes({'headingText': val})}
					}
					allowedFormats={['core/bold', 'core/italic']}
					/>
				<div class="mrw-accordion__content">
					<InnerBlocks
						allowedBlocks={excludeSelf}
						template={[[ 'core/paragraph', { placeholder: __( 'Accordion content…', 'mrw-accordion' )}]]}
						/>
				</div>
			</div>
		</>
	);
}
