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

					function sanitize_border( $input, $setting ): array {
						if( empty( $input ) || ! is_array( $input ) ) return $setting->default;
						$expected_border_keys = [ 'color', 'style', 'width' ];
						$input_value_keys = array_keys( $input );
						if( $expected_border_keys !== $input_value_keys ) return $setting->default;
						extract( $input );

						// sanitize style
						$expected_style_values = [ 'solid', 'dotted', 'dashed', 'double', 'none' ];
						if( ! in_array( $style, $expected_style_values ) ) return $setting->default;
						$sanitized_style = sanitize_text_field( $style );

						// sanitize color
						$sanitized_color = sanitize_hex_color( $color );
						if( ! $sanitized_color ) return $setting->default;

						// sanitize width
						$expected_width_keys = [ 'top', 'right', 'bottom', 'left' ];
						$width_keys = array_keys( $width );
						if( $expected_width_keys !== $width_keys ) return $setting->default;
						$sanitized_width = [
							'top'   =>  $this->sanitize_number( $width[ 'top' ] ),
							'right'   =>  $this->sanitize_number( $width[ 'right' ] ),
							'bottom'   =>  $this->sanitize_number( $width[ 'bottom' ] ),
							'left'   =>  $this->sanitize_number( $width[ 'left' ] )
						];

						return [
							'color' =>  $sanitized_color,
							'style' =>  $sanitized_style,
							'width' =>  $sanitized_width
						];
					}

					
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
