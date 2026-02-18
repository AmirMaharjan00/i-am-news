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
                    // Enqueue css
                    wp_enqueue_style( 'i-am-news-customizer-controls', get_template_directory_uri() . '/inc/customizer/assets/customizer-controls.css', [], I_AM_NEWS_VERSION, false );

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
                wp_enqueue_script( 'i-am-news-customizer-preview', get_template_directory_uri() . '/inc/customizer/assets/customizer-preview.js', [ 'jquery', 'customize-preview' ], I_AM_NEWS_VERSION, true );
            }

            /**
             * Enqueue files for frontend
             * 
             * @since 1.0.0
             */
            public function frontend() {
                wp_enqueue_style( 'i-am-news-style', get_stylesheet_uri(), [], I_AM_NEWS_VERSION );
                wp_style_add_data( 'i-am-news-style', 'rtl', 'replace' );
                wp_enqueue_style( 'i-am-news-main', get_template_directory_uri() . '/assets/css/theme.css', [], I_AM_NEWS_VERSION );

                wp_enqueue_script( 'i-am-news-navigation', get_template_directory_uri() . '/js/navigation.js', [], I_AM_NEWS_VERSION, true );
                wp_enqueue_script( 'i-am-news-main', get_template_directory_uri() . '/assets/js/theme.js', [ 'jquery' ], I_AM_NEWS_VERSION, true );

                if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' );
            }
        }
        Enqueue::get_instance();
    endif;