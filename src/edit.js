/**
 * WordPress Dependencies
 */
import { find } from 'lodash';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	InspectorControls,
	useSetting
} from '@wordpress/block-editor';
import {
	Icon,
	PanelBody,
	ToolbarDropdownMenu,
	RadioControl,
	FontSizePicker,
	ColorPalette
} from '@wordpress/components';
import { useRef } from '@wordpress/element';

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
		accordionIcon,
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
		  selectedIcon = accordionIcon ?? 'caret',
		  icons = {},
		  toggleButton = useRef(),
		  innerContainer = useRef();

	icons.caret = <svg aria-hidden="true" class="mrw-accordion__svg mrw-accordion__svg--caret" x="0" y="0" viewBox="0 0 16 16" fill="none"><polyline stroke="#000" stroke-width="2" points="2,6 8,12 14,6" /></svg>;
	icons.plusMinus = <svg aria-hidden="true" class="mrw-accordion__svg mrw-accordion__svg--plusminus" viewBox="0 0 16 16" fill="none"><line x1="2" y1="8" x2="14" y2="8"  stroke="#000" stroke-width="2" /><line x1="8" y1="2" x2="8" y2="14"  stroke="#000" stroke-width="2" /></svg>;

	function setHeadingLevel( level ) {
		setAttributes( { 'level': parseInt( level ) } );
	}

	function toggleAccordion() {
		const state = 'true' === toggleButton.current.getAttribute('aria-expanded');
		toggleButton.current.setAttribute('aria-expanded', ! state);
		if( state ) {
			innerContainer.current.style.display = 'none';
		} else {
			innerContainer.current.style.display = 'block';
		}
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
				<PanelBody title={ __( 'Accordion Settings', 'mrw-accordion' ) }>
					<fieldset>
						<legend style={{marginBottom: '8px'}}>Primary Color</legend>
						<ColorPalette
							value={primaryColor}
							onChange={(val) => setAttributes({'primaryColor': val})}
							colors={colors}
							disableCustomColors={true}
							/>
					</fieldset>
					<h3 className="mrw-accordion-settings-heading">Heading Styles</h3>
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
					<h3 className="mrw-accordion-settings-heading">Icon</h3>
					<RadioControl
						label={ __( 'Expand/Collapse Icon', 'mrw-accordion' ) }
						selected={selectedIcon}
						options={[
							{ label: __( 'Caret', 'mrw-accordion' ), value: 'caret' },
							{ label: __( 'Plus/Minus' ), value: 'plusMinus' }
						]}
						onChange={(val) => setAttributes({'accordionIcon': val})}
						className="mrw-accordion-icon-option"
					/>
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
						ref={toggleButton}
						onClick={toggleAccordion}
						className={`mrw-accordion__editor-button mrw-accordion__icon mrw-accordion__icon--${selectedIcon.toLowerCase()}`}
						aria-expanded="true"
					>
						<span className="screen-reader-text">Toggle Accordion</span>
						<Icon icon={icons[selectedIcon]} />
					</button>
				</HeadingTag>
				<div
					{ ...useInnerBlocksProps(
						{
							id: contentId,
							className: "mrw-accordion__content",
							ref: innerContainer,
						},
						{
							allowedBlocks: {allBlocksExceptSelf},
						}
					) }
				/>
			</div>
		</>
	);
}
