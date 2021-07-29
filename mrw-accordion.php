<?php
/**
 * Plugin Name:       MRW Accordion
 * Description:       An accessible accordion block that&#39;s a joy to edit
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Mark Root-Wiley
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mrw-accordion
 *
 * @package           mrw-accordion
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function mrw_accordion_block_init() {

	register_block_type( __DIR__ );
	register_block_type( __DIR__ . '/accordion-content' );

	register_block_style( 'mrw/accordion', array(
		'name' => 'white-button',
		'label' => _x( 'White button', 'Color of accordion expand/collapse button', 'mrw-accordion' ),
	) );

}
add_action( 'init', 'mrw_accordion_block_init' );
