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
	PanelBody,
	ToolbarDropdownMenu,
	FontSizePicker,
	ColorPalette
} from '@wordpress/components';

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
		primaryColor,
		level,
		headingText,
		headingTextColor,
		headingFontSize
	} = attributes;

	if( accordionId !== clientId ) {
		setAttributes({ accordionId: clientId });
	}

	const colors = useSetting('color.palette'),
		  activePrimaryColor = find( colors, { color: primaryColor } ),
		  activeHeadingTextColor = find( colors, { color: headingTextColor } ),
		  fontSizes = useSetting('typography.fontSizes'),
		  activeFontSize = find( fontSizes, { size: headingFontSize } ),
		  headingLevel = level ?? 2,
		  tagName = 'h' + headingLevel,
		  contentId = ( anchor ? anchor : accordionId ) + '-content',
		  allBlocksExceptSelf = wp.blocks.getBlockTypes().map(block => block.name).filter(name => name !== 'mrw/accordion');

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
				<PanelBody title={ __( 'Accordion Styles', 'mrw-accordion' ) }>
					<fieldset>
						<legend style={{marginBottom: '8px'}}>Accordion Color</legend>
						<ColorPalette
							value={primaryColor}
							onChange={(val) => setAttributes({'primaryColor': val})}
							colors={colors}
							disableCustomColors={true}
							/>
					</fieldset>
				</PanelBody>
				<PanelBody title={ __( 'Accordion Heading Styles', 'mrw-accordion' ) }>
					<FontSizePicker
						value={headingFontSize}
						onChange={(val) => setAttributes({'headingFontSize': val})}
						disableCustomFontSizes={true}
						fontSizes={fontSizes}
						/>
					<fieldset>
						<legend style={{marginBottom: '8px'}}>Heading Text Color</legend>
						<ColorPalette
							value={headingTextColor}
							onChange={(val) => setAttributes({'headingTextColor': val})}
							colors={colors}
							disableCustomColors={true}
							/>
					</fieldset>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: 'mrw-accordion'
				} ) }
				style={{borderColor: primaryColor}}
			>
				<RichText
					value={headingText}
					tagName={tagName}
					placeholder={__( 'Accordion Title…', 'mrw-accordion' ) }
					className={classnames(
						'mrw-accordion__heading',
						{
							[`has-${activeFontSize?.slug}-font-size`]: activeFontSize,
							[`has-${activePrimaryColor?.slug}-background-color`]: activePrimaryColor,
							[`has-${activeHeadingTextColor?.slug}-color`]: activeHeadingTextColor
						}
					)}
					onChange={(val) => {setAttributes({'headingText': val})}
					}
					allowedFormats={['core/bold', 'core/italic']}
					style={{
						backgroundColor: primaryColor,
						color: headingTextColor
					}}
					/>
				<div id={contentId} class="mrw-accordion__content">
					<InnerBlocks
						allowedBlocks={allBlocksExceptSelf}
						template={[[ 'core/paragraph', { placeholder: __( 'Accordion content…', 'mrw-accordion' )}]]}
						/>
				</div>
			</div>
		</>
	);
}
