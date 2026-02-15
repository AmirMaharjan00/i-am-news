<?php
/**
 * i am news Theme Customizer
 *
 * @package i_am_news
 */
 use IAN\Customizer;

 function i_am_news_customize_register_type( $wp_customize ) {
	/**
	 * Customizer base class
	 */
	require_once get_template_directory() . '/inc/customizer/custom-controls/base.php';

	/**
	 * Radio Image Control
	 */
	require_once get_template_directory() . '/inc/customizer/custom-controls/radio-image/radio-image.php';
	$wp_customize->register_control_type( 'Radio_Image' );
	
	/**
	 * Box Shadow Control
	*/
	require_once get_template_directory() . '/inc/customizer/custom-controls/box-shadow/box-shadow.php';
	// var_dump( class_exists( Box_Shadow::class ) );
	$wp_customize->register_control_type( 'Box_Shadow' );
 }
 add_action( 'customize_register', 'i_am_news_customize_register_type', 1 );
/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function i_am_news_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	echo '<pre>';
	print_r( $wp_customize->get_control_types() );
	echo '</pre>';

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

	$wp_customize->add_setting( 'test', [
		'sanitize_function'	=>	'sanitize_text_field'
	]);

	$wp_customize->add_control( new Radio_Image( $wp_customize, 'test', [
		'label'	=>	esc_html__( 'Test', 'i-am-news' )	,
		'section'	=>	'scroll_to_top_section'
	] ));

	$wp_customize->add_setting( 'test2', [
		'sanitize_function'	=>	'sanitize_text_field'
	]);

	$wp_customize->add_control( 'test2', [
		'label'	=>	esc_html__( 'Test2', 'i-am-news' ),
		'section'	=>	'scroll_to_top_section',
		'type'	=>	'radio-image'
	] );
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
	wp_enqueue_script( 'i-am-news-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), _S_VERSION, true );
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