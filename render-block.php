<?php
namespace MRW\Accordion;

require( 'utils.php' );

/**
 * Renders block on the front end
 */
function render_accordion( $atts, $content ) {

	$accordion_id = $atts['anchor'] ?? $atts['accordionId'];
	$align = isset($atts['align']) ? ' align' . $atts['align'] : '';
	$primary_color = $atts['primaryColor'] ?? false;
	$heading_level = $atts['level'] ?? 2;
	$heading_tag = 'h' . $heading_level;
	$heading_text = $atts['headingText'] ?? '';
	$heading_classes = get_accordion_heading_classes(
		$atts['headingFontSize'] ?? false,
		$atts['primaryColor'] ?? false,
		$atts['headingTextColor'] ?? false
	);
	if( $primary_color ) {
		$block_styles = 'style="border-color:' . esc_attr( $primary_color ) . '"';
	}

	ob_start();

	if( ! isset( $atts['anchor'] ) ) {
		echo '<!-- ⚠ If you want to make an anchor link to the following accordion, you must set a custom anchor ID in the Advanced > "HTML anchor" sidebar setting of the accordion. The random ID is _not_ stable and may change each time the page is saved again. -->';
	}
	?>
	<div
		id="<?php echo esc_attr( $accordion_id ); ?>"
		class="mrw-accordion <?php echo esc_attr( $atts['className'] ?? '' . $align ); ?>"
		<?php echo $block_styles ?? ''; ?>
	>
		<<?php echo $heading_tag; ?> class="<?php echo $heading_classes; ?>">
			<?php echo wp_kses_post( $heading_text ); ?>
		</<?php echo $heading_tag; ?>>
		<div class="mrw-accordion__content">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
	<?php

	return ob_get_clean();

}
