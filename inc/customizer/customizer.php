<?php
/**
 * i am news Theme Customizer
 *
 * @package i_am_news
 */
 use IAN\Customizer\Controls as Controls;

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function i_am_news_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	/**
	 * Customizer base class
	 */
	require_once get_template_directory() . '/inc/customizer/custom-controls/base.php';

	/**
	 * Radio Image Control
	 */
	require_once get_template_directory() . '/inc/customizer/custom-controls/radio-image/radio-image.php';
	
	/**
	 * Box Shadow Control
	*/
	require_once get_template_directory() . '/inc/customizer/custom-controls/box-shadow/box-shadow.php';
	
	/**
	 * Section Tab Control
	*/
	require_once get_template_directory() . '/inc/customizer/custom-controls/section-tab/section-tab.php';
	
	/**
	 * Icon Picker Control
	*/
	require_once get_template_directory() . '/inc/customizer/custom-controls/icon-picker/icon-picker.php';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'i_am_news_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'i_am_news_customize_partial_blogdescription',
			)
		);
	}
}
add_action( 'customize_register', 'i_am_news_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function i_am_news_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function i_am_news_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function i_am_news_customize_preview_js() {
	wp_enqueue_script( 'i-am-news-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), I_AM_NEWS_VERSION, true );
}
add_action( 'customize_preview_init', 'i_am_news_customize_preview_js' );

/**
 * Section Class
 */
require_once get_template_directory() . '/inc/customizer/sections/sections.php';

/**
 * Scroll to top section
*/
require_once get_template_directory() . '/inc/customizer/sections/scroll-to-top.php';