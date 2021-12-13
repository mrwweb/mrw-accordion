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
	Icon,
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
		  HeadingTag = 'h' + headingLevel,
		  contentId = ( anchor ? anchor : accordionId ) + '-content',
		  allBlocksExceptSelf = wp.blocks.getBlockTypes().map(block => block.name).filter(name => name !== 'mrw/accordion'),
		  icons = {};

	icons.caret = <svg aria-hidden="true" class="mrw-accordion__svg mrw-accordion__svg--caret" x="0" y="0" viewBox="0 0 16 16" fill="none"><polyline stroke="#000" stroke-width="2" points="2,6 8,12 14,6" /></svg>;
	icons.plusMinus = <svg aria-hidden="true" class="mrw-accordion__svg mrw-accordion__svg--plus-minus" viewBox="0 0 16 16" fill="none"><line x1="4" y1="8" x2="12" y2="8"  stroke="#000" stroke-width=".125em" /><line x1="8" y1="4" x2="8" y2="12"  stroke="#000" stroke-width=".125em" /></svg>;

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
						<legend style={{marginBottom: '8px'}}>Accordion Primary Color</legend>
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
				<HeadingTag
					className={classnames(
							'mrw-accordion__heading',
							{
								[`has-${activeFontSize?.slug}-font-size`]: activeFontSize,
								[`has-${activePrimaryColor?.slug}-background-color`]: activePrimaryColor,
								'has-background': activePrimaryColor,
								[`has-${activeHeadingTextColor?.slug}-color`]: activeHeadingTextColor,
								'has-text-color': activeHeadingTextColor
							}
						)}
					style={{
						backgroundColor: primaryColor,
						color: headingTextColor
					}}
				>
					<RichText
						value={`${headingText ?? ''}`}
						tagName="span"
						className="mrw-accordion__heading-text"
						placeholder={__( 'Accordion Title…', 'mrw-accordion' ) }
						onChange={(val) => {setAttributes({'headingText': val})}}
						allowedFormats={['core/bold', 'core/italic']}
						/>
					<button
						className={`mrw-accordion__editor-button mrw-accordion__icon mrw-accordion__icon--${'caret'}`}
						aria-hidden="true" // remove this when button is ready for use!
					>
						<span className="screen-reader-text">Toggle Accordion</span>
						<Icon icon={icons.caret} />
					</button>
				</HeadingTag>
				<div id={contentId} class="mrw-accordion__content">
					<InnerBlocks
						allowedBlocks={allBlocksExceptSelf}
						/*
						trying with this off because you get a nicer inserter
						template={[[ 'core/paragraph', { placeholder: __( 'Accordion content…', 'mrw-accordion' )}]]} */
						/>
				</div>
			</div>
		</>
	);
}
