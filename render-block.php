<?php
namespace MRW\Accordion;

require( 'utils.php' );

/**
 * Renders block on the front end
 */
function render_accordion( $atts, $content ) {

	$heading_text = $atts['headingText'] ?? '';
	$heading_level = $atts['level'] ?? 2;
	$content = strip_heading( $heading_level, $heading_text, $content );

	if( empty( $heading_text ) && empty( $content ) ) {
		return;
	}

	$has_custom_anchor = isset( $atts['anchor'] ) && ! empty( $atts['anchor'] );
	$accordion_id = $has_custom_anchor ? $atts['anchor'] : $atts['accordionId'];
	$align = isset($atts['align']) ? ' align' . $atts['align'] : '';
	$primary_color = $atts['primaryColor'] ?? false;
	$heading_tag = 'h' . $heading_level;
	$heading_classes = get_accordion_heading_classes(
		$atts['headingFontSize'] ?? false,
		$atts['primaryColor'] ?? false,
		$atts['headingTextColor'] ?? false
	);
	$icon = $atts['accordionIcon'] ?? 'caret';
	$icon = in_array( $icon, ['caret','plusMinus'] ) ? $icon : 'caret';
	if( $primary_color ) {
		$block_styles = 'style="border-color:' . esc_attr( $primary_color ) . '"';
	}
	$icon_svg = file_get_contents( plugin_dir_path(__FILE__) .'img/' . strtolower( $icon ) . '.svg' );

	ob_start();

	if( ! $has_custom_anchor ) {
		echo __( '<!-- ⚠ To link to the next accordion section, set a custom ID in the block sidebar settings ("Advanced" > "HTML anchor"). The random ID is NOT stable and may change the next time this page is saved. -->', 'mrw-accordion' );
	}
	?>
	<div
		id="<?php echo esc_attr( $accordion_id ); ?>"
		class="mrw-accordion <?php echo esc_attr( $atts['className'] ?? '' . $align ); ?>"
		<?php echo $block_styles ?? ''; ?>
	>
		<<?php echo $heading_tag; ?> class="<?php echo $heading_classes; ?>">
			<span class="mrw-accordion__heading-text">
				<?php echo wp_kses_post( $heading_text ); ?>
			</span>
			<span class="mrw-accordion__icon mrw-accordion__icon--<?php echo strtolower( esc_attr( $icon ) ); ?>" style="display:none">
				<?php echo $icon_svg; ?>
			</span>
		</<?php echo $heading_tag; ?>>
		<div class="mrw-accordion__content">
			<?php echo wp_kses_post( $content ); ?>
		</div>
	</div>
	<?php

	return ob_get_clean();

}
