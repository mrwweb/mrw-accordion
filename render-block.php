<?php
namespace MRW\Accordion;

require( 'utils.php' );

/**
 * Renders block on the front end
 */
function render_accordion( $atts, $content ) {

	$accordion_id = isset($atts['anchor']) && !empty($atts['anchor']) ? $atts['anchor'] : $atts['accordionId'];
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
	$icon = $atts['icon'] ?? 'caret';
	$icon = in_array( $icon, ['caret','plusMinus'] ) ? $icon : 'caret';
	if( $primary_color ) {
		$block_styles = 'style="border-color:' . esc_attr( $primary_color ) . '"';
	}
	$icon_svg = file_get_contents( plugin_dir_path(__FILE__) .'img/' . $icon . '.svg' );

	/* Due to current "Hybrid Block" strategy, I now need to filter out the first block which is the heading */
	$search_string = "<h${heading_level}>${heading_text}</h${heading_level}>";
	$content = str_replace( $search_string, '', html_entity_decode($content) );

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
			<span class="mrw-accordion__heading-text">
				<?php echo wp_kses_post( $heading_text ); ?>
			</span>
			<span class="mrw-accordion__icon mrw-accordion__icon--<?php echo esc_attr( $icon ); ?>" style="display:none">
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
