<?php
/**
 * Plugin Name:       MRW Accordion
 * Description:       An accessible accordion block that's a joy to edit
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.8.0-beta
 * Author:            Mark Root-Wiley
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mrw-accordion
 * Update URI: 		  false
 *
 * @package           mrw-accordion
 */

namespace MRW\Accordion;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function block_init() {

	register_block_type(
		__DIR__,
		array( 'render_callback' => __NAMESPACE__ . '\render_accordion' )
	);

}
add_action( 'init', __NAMESPACE__ . '\block_init' );

require( 'render-block.php' );
