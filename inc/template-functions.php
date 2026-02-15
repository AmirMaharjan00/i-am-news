<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package i_am_news
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function i_am_news_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'i_am_news_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function i_am_news_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'i_am_news_pingback_header' );

/**
 * Customizer controls enqueue scripts
 * 
 * @since 1.0.0
 */
add_action( 'customize_controls_enqueue_scripts', function(){
	$directory = get_template_directory_uri();
	wp_enqueue_script( 
		'i-am-news-customizer-controls',
		$directory . '/inc/customizer/controller/build/index.js',
		[ 'customize-controls', 'wp-element', 'wp-components', 'jquery' ],
		_S_VERSION,
		true
	);
});

/**
 * Customizer Defaults
 */
require_once get_template_directory() . '/inc/customizer/theme-starter.php';