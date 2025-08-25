/**
 * WordPress Dependencies
 */
import { find } from "lodash";
import classnames from "classnames";
import { __ } from "@wordpress/i18n";
import {
	BlockControls,
	ContrastChecker,
	HeadingLevelDropdown,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	useSettings,
} from "@wordpress/block-editor";
import {
	FontSizePicker,
	Icon,
	PanelBody,
	PanelRow,
	RadioControl,
} from "@wordpress/components";

/**
 * Editor Styles to Compile
 */
import "./editor.scss";
import "./accordion-icons-options.scss";

export default function Edit({
	isSelected,
	clientId,
	attributes,
	setAttributes,
}) {
	const {
		anchor,
		accordionId,
		accordionIcon,
		primaryColor,
		level,
		headingText,
		headingTextColor,
		headingFontSize,
		editorExpanded,
	} = attributes;

	if (accordionId !== clientId) {
		setAttributes({ accordionId: clientId });
	}
	const colors = useSettings("color.palette"),
		activePrimaryColor = find(colors, { color: primaryColor }),
		activeHeadingTextColor = find(colors, { color: headingTextColor }),
		fontSizes = useSettings("typography.fontSizes"),
		activeFontSize = find(fontSizes, { size: headingFontSize }),
		HeadingTag = "h" + level,
		contentId = (anchor ? anchor : accordionId) + "-content",
		allBlocksExceptSelf = wp.blocks
			.getBlockTypes()
			.map((block) => block.name)
			.filter((name) => name !== "mrw/accordion"),
		selectedIcon = accordionIcon ?? "caret",
		icons = {
			caret: (
				<svg
					aria-hidden="true"
					class="mrw-accordion__svg mrw-accordion__svg--caret"
					x="0"
					y="0"
					viewBox="0 0 16 16"
					fill="none"
				>
					<polyline stroke="#000" stroke-width="2" points="2,6 8,12 14,6" />
				</svg>
			),
			plusMinus: (
				<svg
					aria-hidden="true"
					class="mrw-accordion__svg mrw-accordion__svg--plusminus"
					viewBox="0 0 16 16"
					fill="none"
				>
					<line x1="2" y1="8" x2="14" y2="8" stroke="#000" stroke-width="2" />
					<line x1="8" y1="2" x2="8" y2="14" stroke="#000" stroke-width="2" />
				</svg>
			),
		};
	// For some reason inlining this on the onClick attribute results in a recursion error but this works fine. I don't understand it, but I'll go with this for now.
	function toggleAccordion() {
		setAttributes({ editorExpanded: !editorExpanded });
	}

	return (
		<>
			<BlockControls group="block">
				<HeadingLevelDropdown
					value={level}
					onChange={(newLevel) => setAttributes({ level: newLevel })}
				/>
			</BlockControls>
			<InspectorControls group="styles">
				<PanelColorSettings
					title="Accordion Colors"
					colorSettings={[
						{
							value: primaryColor,
							onChange: (newVal) => setAttributes({ primaryColor: newVal }),
							label: __("Container"),
						},
						{
							value: headingTextColor,
							onChange: (newVal) => setAttributes({ headingTextColor: newVal }),
							label: __("Heading Text"),
						},
					]}
					children={
						<ContrastChecker
							fontSize={headingFontSize}
							textColor={headingTextColor}
							backgroundColor={primaryColor || "#DDDDDD"}
						/>
					}
				/>

				<PanelBody title={__("Heading Settings")} initialOpen={false}>
					<PanelRow>
						<FontSizePicker
							value={headingFontSize}
							onChange={(newVal) => setAttributes({ headingFontSize: newVal })}
							disableCustomFontSizes={true}
							fontSizes={fontSizes[0]}
						/>
					</PanelRow>
					<PanelRow>
						<RadioControl
							label={__("Expand/Collapse Icon", "mrw-accordion")}
							selected={selectedIcon}
							options={[
								{ label: __("Caret", "mrw-accordion"), value: "caret" },
								{ label: __("Plus/Minus"), value: "plusMinus" },
							]}
							onChange={(newVal) => setAttributes({ accordionIcon: newVal })}
							className="mrw-accordion-icon-option"
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: "mrw-accordion",
				})}
				style={{ borderColor: primaryColor }}
			>
				<HeadingTag
					className={classnames("mrw-accordion__heading", {
						[`has-${activeFontSize?.slug}-font-size`]: activeFontSize,
						[`has-${activePrimaryColor?.slug}-background-color`]:
							activePrimaryColor,
						"has-background": activePrimaryColor,
						[`has-${activeHeadingTextColor?.slug}-color`]:
							activeHeadingTextColor,
						"has-text-color": activeHeadingTextColor,
					})}
					style={{
						backgroundColor: primaryColor,
						color: headingTextColor,
					}}
				>
					<span class="mrw-accordion__button">
						<RichText
							value={`${headingText ?? ""}`}
							tagName="span"
							className="mrw-accordion__heading-text"
							placeholder={__("Accordion Title…", "mrw-accordion")}
							onChange={(newVal) => {
								setAttributes({ headingText: newVal });
							}}
							allowedFormats={["core/bold", "core/italic"]}
						/>
						<button
							onClick={toggleAccordion}
							className={`mrw-accordion__editor-button mrw-accordion__icon mrw-accordion__icon--${selectedIcon.toLowerCase()}`}
							aria-expanded={!editorExpanded}
						>
							<span className="screen-reader-text">Toggle Accordion</span>
							<Icon icon={icons[selectedIcon]} />
						</button>
					</span>
				</HeadingTag>
				<div
					{...useInnerBlocksProps(
						{
							id: contentId,
							className: "mrw-accordion__content",
							hidden: !editorExpanded,
						},
						{
							allowedBlocks: { allBlocksExceptSelf },
						},
					)}
				/>
			</div>
		</>
	);
}
