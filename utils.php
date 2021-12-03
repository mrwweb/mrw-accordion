<?php
namespace MRW\Accordion;

function get_accordion_heading_classes( $font_size = false, $bg_color = false, $text_color = false ) {

	$classes = 'mrw-accordion__heading';

	if( $font_size ) {
		$font_sizes = wp_list_pluck( get_theme_support( 'editor-font-sizes' )[0],'slug','size' );
		$heading_font_size = str_replace( 'px', '', $font_size );
		$size_key = intval( $heading_font_size > 1 ) ? intval( $heading_font_size ) : $heading_font_size;
		$heading_font_size_slug = $font_sizes[$size_key] ?? false;
		if( $heading_font_size_slug ) {
			$classes .= ' has-' . esc_attr( $heading_font_size_slug ) . '-font-size';
		}
	}

	$colors = wp_list_pluck( get_theme_support( 'editor-color-palette' )[0],'slug','color');
	$primary_color_slug = $colors[$bg_color] ?? false;
	$text_color_slug = $colors[$text_color] ?? false;

	if( $primary_color_slug ) {
		$classes .= ' has-' . esc_attr( $primary_color_slug ) . '-background-color';
		$classes .= ' has-background';
	}
	if( $text_color_slug ) {
		$classes .= ' has-' . esc_attr( $text_color_slug ) . '-color';
		$classes .= ' has-text-color';
	}

	return $classes;
}
