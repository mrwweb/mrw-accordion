<?php
namespace MRW\Accordion;

/**
 * Renders block on the front end
 */
function render_accordion( $atts, $content ) {

	$align = isset($atts['align']) ? ' align' . $atts['align'] : '';
	$heading_level = $atts['level'] ?? 2;
	$heading_tag = 'h' . $heading_level;

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
		<<?php echo $heading_tag; ?> class="mrw-accordion__heading">
			<?php echo esc_html( $atts['heading'] ); ?>
		</<?php echo $heading_tag; ?>>
		<div class="mrw-accordion__content">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
	<?php

	return ob_get_clean();

}
