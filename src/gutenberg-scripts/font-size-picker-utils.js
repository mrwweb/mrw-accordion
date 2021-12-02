/*
 * Copied from https://github.com/WordPress/gutenberg/blob/e96d47b35d8933ed15b1e242b9c85b855707737b/packages/components/src/font-size-picker/utils.js
 */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const DEFAULT_FONT_SIZE = 'default';
const DEFAULT_FONT_SIZE_OPTION = {
	slug: DEFAULT_FONT_SIZE,
	name: __( 'Default' ),
};
export const CUSTOM_FONT_SIZE = 'custom';
const CUSTOM_FONT_SIZE_OPTION = {
	slug: CUSTOM_FONT_SIZE,
	name: __( 'Custom' ),
};

/**
 * Helper util to split a font size to its numeric value
 * and its `unit`, if exists.
 *
 * @param {string|number} size Font size.
 * @return {[number, string]} An array with the numeric value and the unit if exists.
 */
export function splitValueAndUnitFromSize( size ) {
	const [ numericValue, unit ] = `${ size }`.match( /[\d\.]+|\D+/g );

	if ( ! isNaN( parseFloat( numericValue ) ) && isFinite( numericValue ) ) {
		return [ numericValue, unit ];
	}

	return [];
}

/**
 * Some themes use css vars for their font sizes, so until we
 * have the way of calculating them don't display them.
 *
 * @param {string|number} value The value that is checked.
 * @return {boolean} Whether the value is a simple css value.
 */
export function isSimpleCssValue( value ) {
	const sizeRegex = /^[\d\.]+(px|em|rem|vw|vh|%)?$/i;
	return sizeRegex.test( value );
}

/**
 * Return font size options in the proper format depending
 * on the currently used control (select, toggle group).
 *
 * @param {boolean}  useSelectControl       Whether to use a select control.
 * @param {Object[]} optionsArray           Array of available font sizes objects.
 * @param {*}        disableCustomFontSizes Flag that indicates if custom font sizes are disabled.
 * @return {Object[]|null} Array of font sizes in proper format for the used control.
 */
export function getFontSizeOptions(
	useSelectControl,
	optionsArray,
	disableCustomFontSizes
) {
	if ( disableCustomFontSizes && ! optionsArray.length ) {
		return null;
	}
	return useSelectControl
		? getSelectOptions( optionsArray, disableCustomFontSizes )
		: getToggleGroupOptions( optionsArray );
}

function getSelectOptions( optionsArray, disableCustomFontSizes ) {
	const options = [
		DEFAULT_FONT_SIZE_OPTION,
		...optionsArray,
		...( disableCustomFontSizes ? [] : [ CUSTOM_FONT_SIZE_OPTION ] ),
	];
	return options.map( ( { slug, name, size } ) => ( {
		key: slug,
		name,
		size,
		__experimentalHint:
			size && isSimpleCssValue( size ) && parseFloat( size ),
	} ) );
}

function getToggleGroupOptions( optionsArray ) {
	return optionsArray.map( ( { slug, size, name } ) => {
		let label = size;
		if ( typeof size === 'string' ) {
			const [ numericValue ] = splitValueAndUnitFromSize( size );
			label = numericValue;
		}
		return { key: slug, value: size, label, name };
	} );
}

export function getSelectedOption( fontSizes, value ) {
	if ( ! value ) {
		return DEFAULT_FONT_SIZE_OPTION;
	}
	return (
		fontSizes.find( ( font ) => font.size === value ) ||
		CUSTOM_FONT_SIZE_OPTION
	);
}
