<?php
    /**
     * Handle all enqueue and dequeue of files from here
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN;
   
    use function add_action;
    use function get_template_directory_uri;
    use function get_template_directory;
    use function wp_enqueue_style;
    use function wp_enqueue_script;
    use function is_singular;
    use function wp_style_add_data;
    use function get_stylesheet_uri;
    use function get_option;
    use function comments_open;

    use IAN\Customizer\Section\Scroll_To_Top as Scroll_To_Top;
    use IAN\Customizer\Section\Header_Top_Row as Header_Top_Row;
    use IAN\Customizer\Section\Header_Middle_Row as Header_Middle_Row;
    use IAN\Customizer\Section\Header_Bottom_Row as Header_Bottom_Row;
    use IAN\Customizer\Section\Header_Builder as Header_Builder;
    use IAN\Customizer\Section\Date_time as Date_time;
    use IAN\Customizer\Section\Time as Time;
    use IAN\Customizer\Section\Dark_Mode as Dark_Mode;

    if( ! class_exists( __NAMESPACE__ . '\\Enqueue' ) ) :
        /**
         * Enqueue Class
         */
        class Enqueue {
            /**
             * Instance of class
             * 
             * @since 1.0.0
             */
            private static $instance = null;

            /**
             * Constructor
             * 
             * @since 1.0.0
             */
            private function __construct() {
                add_action( 'admin_enqueue_scripts', [ $this, 'dashboard' ] );
                add_action( 'customize_controls_enqueue_scripts', [ $this, 'customizer_sidebar' ] );
                add_action( 'customize_preview_init', [ $this, 'customizer_preview' ] );
                add_action( 'wp_enqueue_scripts', [ $this, 'frontend' ] );
            }

            /**
             * Get Instance of class
             * 
             * @since 1.0.0
             * @return \IAN\Enqueue
             */
            public static function get_instance() {
                if( self::$instance === null ) self::$instance = new self();
                return self::$instance;
            }

            /**
             * Enqueue files for dashboard
             * 
             * @since 1.0.0
             */
            public function dashboard() {
                
            }

            /**
             * Enqueue files for customzier
             * 
             * @since 1.0.0
             */
            public function customizer_sidebar() {
                // Wordpress enqueues
                wp_enqueue_media();

                // Enqueue css
                wp_enqueue_style( 'i-am-news-customizer-controls', get_template_directory_uri() . '/inc/customizer/assets/customizer-controls.css', [], I_AM_NEWS_VERSION, false );
                wp_enqueue_style( 'i-am-news-customizer-fontawesome', get_template_directory_uri() . '/assets/libraries/fontawesome/css/all.min.css', [], I_AM_NEWS_VERSION, false );

                // Enqueue js
                // wp_enqueue_script( 'i-am-news-customizer-controls', get_template_directory_uri() . '/inc/customizer/controller/build/index.js', [ 'customize-controls', 'wp-element', 'wp-components', 'jquery' ], I_AM_NEWS_VERSION, true );
                wp_enqueue_script( 'i-am-news-customizer-controls', get_template_directory_uri() . '/inc/customizer/assets/customizer-extends.js', [ 'customize-controls', 'wp-element', 'wp-components', 'jquery' ], I_AM_NEWS_VERSION, true );
            }

            /**
             * Enqueue files for customzier
             * 
             * @since 1.0.0
             */
            public function customizer_preview() {
                wp_enqueue_script( 'i-am-news-customizer', get_template_directory_uri() . '/assets/js/customizer.js', [ 'customize-preview' ], I_AM_NEWS_VERSION, true );
                wp_enqueue_script( 'i-am-news-customizer-preview', get_template_directory_uri() . '/inc/customizer/assets/customizer-preview.js', [ 'jquery', 'customize-preview' ], I_AM_NEWS_VERSION, true );

                wp_localize_script( 'i-am-news-customizer-preview', 'IanConfig', $this->get_preview_configs() );
            }

            /**
             * Enqueue files for frontend
             * 
             * @since 1.0.0
             */
            public function frontend() {
                wp_enqueue_style( 'i-am-news-style', get_stylesheet_uri(), [], I_AM_NEWS_VERSION );
                wp_style_add_data( 'i-am-news-style', 'rtl', 'replace' );
                wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/assets/libraries/fontawesome/css/all.min.css', [], '7.2.0' );
                wp_enqueue_style( 'i-am-news-professional', get_template_directory_uri() . '/assets/css/main.css', [], I_AM_NEWS_VERSION );
                wp_enqueue_style( 'i-am-news-main', get_template_directory_uri() . '/assets/css/theme.css', [], I_AM_NEWS_VERSION );
                wp_add_inline_style( 'i-am-news-main', $this->generate_whole_site_dynamic_css() );

                wp_enqueue_script( 'i-am-news-navigation', get_template_directory_uri() . '/assets/js/navigation.js', [], I_AM_NEWS_VERSION, true );
                wp_enqueue_script( 'i-am-news-main', get_template_directory_uri() . '/assets/js/theme.js', [ 'jquery' ], I_AM_NEWS_VERSION, true );

                if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' );
            }

            /**
             * Generate whole site dynamic css
             * 
             * @since 1.0.0
             */
            private function generate_whole_site_dynamic_css() {
                $scroll_to_top = Scroll_To_Top::get_instance()->render_dynamic_css();
                $header_builder = Header_Builder::get_instance()->render_dynamic_css();
                $date_time = Date_time::get_instance()->render_dynamic_css();
                $time = Time::get_instance()->render_dynamic_css();
                $header_top_row = Header_Top_Row::get_instance()->render_dynamic_css();
                $header_middle_row = Header_Middle_Row::get_instance()->render_dynamic_css();
                $header_bottom_row = Header_Bottom_Row::get_instance()->render_dynamic_css();
                $dark_mode = Dark_Mode::get_instance()->render_dynamic_css();

                $dynamic_css = [];
                if( $scroll_to_top ) $dynamic_css[] = implode( "\n", $scroll_to_top );
                if( $header_builder ) $dynamic_css[] = implode( "\n", $header_builder );
                if( $date_time ) $dynamic_css[] = implode( "\n", $date_time );
                if( $time ) $dynamic_css[] = implode( "\n", $time );
                if( $header_top_row ) $dynamic_css[] = implode( "\n", $header_top_row );
                if( $header_middle_row ) $dynamic_css[] = implode( "\n", $header_middle_row );
                if( $header_bottom_row ) $dynamic_css[] = implode( "\n", $header_bottom_row );
                if( $dark_mode ) $dynamic_css[] = implode( "\n", $dark_mode );
                if( $dynamic_css ) {
                    return implode( ' ', $dynamic_css );
                } else {
                    return '';
                }
            }

            /**
             * Get preview configs
             * 
             * @since 1.0.0
             */
            private function get_preview_configs(): array {
                $raw_configs = array_merge(
                    Scroll_To_Top::get_instance()->get_dynamic_css( true ),
                    Header_Builder::get_instance()->get_dynamic_css( true ),
                    Date_time::get_instance()->get_dynamic_css( true ),
                    Time::get_instance()->get_dynamic_css( true ),
                    Header_Top_Row::get_instance()->get_dynamic_css( true ),
                    Header_Middle_Row::get_instance()->get_dynamic_css( true ),
                    Header_Bottom_Row::get_instance()->get_dynamic_css( true ),
                    Dark_Mode::get_instance()->get_dynamic_css( true ),
                );
                $configs = [];
                foreach( $raw_configs as $id => $args ) {
                    unset( $args[ 'value' ] );
                    unset( $args[ 'default' ] );
                    $configs[ $id ] = $args;
                }
                return $configs;
            }
        }
        Enqueue::get_instance();
    endif;