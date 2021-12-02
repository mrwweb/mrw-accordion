<?php
namespace MRW\Accordion;

function get_accordion_heading_classes( $font_size = false ) {

	$classes = 'mrw-accordion__heading';

	if( $font_size ) {
		$font_sizes = wp_list_pluck(get_theme_support('editor-font-sizes')[0],'slug','size');
		$heading_font_size = str_replace('px', '', $font_size );
		$size_key = intval($heading_font_size > 1) ? intval($heading_font_size) : $heading_font_size;
		$heading_font_size_slug = $font_sizes[$size_key] ?? false;
		$classes .= ' has-' . esc_attr( $heading_font_size_slug ) . '-font-size';
	}

	return $classes;
}
