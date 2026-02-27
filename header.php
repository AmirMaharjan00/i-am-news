<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package i_am_news
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'i-am-news' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="i-am-news-container">
			<div class="row">
				<div class="site-branding">
					<?php

						function test( $value, $default, $args = [ 'min' => -10, 'max' => 300 ] ) {
							if ( ! is_string( $value ) ) return $default;

							if ( preg_match( '/^(-?\d*\.?\d+)([a-z%]+)$/i', $value, $matches ) ) {
								$number = floatval( $matches[ 1 ] );
								$unit = strtolower( $matches[ 2 ] );

								$allowed_units = [ 'px', '%', 'em', 'rem' ];

								$min = isset( $args[ 'min' ] ) ? $args[ 'min' ] : -10;
								$max = isset( $args[ 'max' ] ) ? $args[ 'max' ] : 300;
								if ( in_array( $unit, $allowed_units ) && $number >= $min && $number <= $max ) {
									return $value;
								} else {
									return $default;
								}
							} else {
								return $default;
							}
						}
					$value = '24px';
					echo '<pre>';
					print_r( test( $value, '13px' ) );
					echo '</pre>';
					the_custom_logo();
					if ( is_front_page() && is_home() ) :
						?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
						<?php
					else :
						?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
						<?php
					endif;
					$i_am_news_description = get_bloginfo( 'description', 'display' );
					if ( $i_am_news_description || is_customize_preview() ) :
						?>
						<p class="site-description"><?php echo $i_am_news_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
					<?php endif; ?>
				</div><!-- .site-branding -->

				<nav id="site-navigation" class="main-navigation">
					<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'i-am-news' ); ?></button>
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
						)
					);
					?>
				</nav><!-- #site-navigation -->
			</div><!-- .row -->
		</div><!-- .i-am-news-container -->
	</header><!-- #masthead -->
