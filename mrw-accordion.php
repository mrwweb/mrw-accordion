<?php
/**
 * Plugin Name:       MRW Accordion
 * Description:       An accessible accordion block that&#39;s a joy to edit
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.2.0
 * Author:            Mark Root-Wiley
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mrw-accordion
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
		array( 'render_callback' => __NAMESPACE__ . '\render_accordion' ),
	);

	register_block_style( 'mrw/accordion', array(
		'name' => 'white-button',
		'label' => _x( 'White button', 'Color of accordion expand/collapse button', 'mrw-accordion' ),
	) );

}
add_action( 'init', __NAMESPACE__ . '\block_init' );

/**
 * Renders block on the front end
 */
function render_accordion( $atts, $content ) {

	$align = isset($atts['align']) ? ' align' . $atts['align'] : '';

	ob_start();

	?>
	<div
		id="<?php echo esc_attr( $atts['anchor'] ); ?>"
		class="
			mrw-accordion
			<?php
			echo esc_attr( $atts['className'] );
			echo esc_attr( $align );
		?>"
	>
		<h2 class="mrw-accordion__heading">
			<?php echo esc_html( $atts['heading'] ); ?>
		</h2>
		<div class="mrw-accordion__content">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
	<?php

	return ob_get_clean();

}

