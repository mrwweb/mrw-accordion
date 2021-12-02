<?php
namespace MRW\Accordion;

require( 'utils.php' );

/**
 * Renders block on the front end
 */
function render_accordion( $atts, $content ) {

	$align = isset($atts['align']) ? ' align' . $atts['align'] : '';
	$heading_level = $atts['level'] ?? 2;
	$heading_tag = 'h' . $heading_level;
	$heading_text = $atts['headingText'] ?? '';
	$heading_classes = get_accordion_heading_classes( $atts['headingFontSize'] ?? false);

	ob_start();

	?>
	<div
		id="<?php echo esc_attr( $atts['anchor'] ); ?>"
		class="mrw-accordion <?php echo esc_attr( $atts['className'] . $align ); ?>"
	>
		<<?php echo $heading_tag; ?> class="<?php echo $heading_classes; ?>">
			<?php echo esc_html( $heading_text ); ?>
		</<?php echo $heading_tag; ?>>
		<div class="mrw-accordion__content">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
	<?php

	return ob_get_clean();

}
