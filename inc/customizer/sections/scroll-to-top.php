<?php
    /**
     * Customizer scroll to top section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;
    use IAN\Customizer as Customizer_Defaults;
    use function esc_html__;
    use function get_template_directory_uri;

    if( ! class_exists( __NAMESPACE__ . '\\Scroll_To_Top' ) ) :
        /**
         * Scroll to top
         */
        class Scroll_To_Top extends Section {
            /**
             * Instance of class
             * 
             * @since 1.0.0
             * @var IAN\Customizer\Section\Scroll_To_Top
             */
            private static $instance = null;

            /**
             * Get instance of class
             * 
             * @since 1.0.0
             * @return IAN\Customizer\Section\Scroll_To_Top
             */
            public static function get_instance() {
                if( self::$instance === null ) self::$instance = new self();

                return self::$instance;
            }

            /**
             * Register controls
             * 
             * @since 1.0.0
             * @override
             */
            public function register_controls() {
                $this->add_section( 'scroll_to_top_section' );
                $this->add_control( 'scroll_to_top_layouts' );
                $this->add_control( 'scroll_to_top_box_shadow' );
            }

            /**
             * Get settings
             * 
             * @since 1.0.0
             * @override
             */
            public function get_settings( $id = '' ) {
                $settings = [
                    'scroll_to_top_layouts' =>  [
                        'sanitize_function' =>  'sanitize_text_field',
                        'postMessage'   =>  'refresh',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_box_shadow' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'postMessage'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ]
                ];
                return ( $id ) ? $settings[ $id ] : $settings;
            }

            /**
             * Get controls
             * 
             * @since 1.0.0
             * @override
             */
            public function get_controls( $id = '' ) {
                $controls = [
                    'scroll_to_top_section' =>  [
                        'title' =>  esc_html__( 'Scroll to Top', 'i-am-news' )
                    ],
                    'scroll_to_top_layouts' =>  [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'radio-image',
                        'section'   =>  $this->section,
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Layout 1', 'i-am-news' ),
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/scroll-to-top-one.png',
                                'value' =>  'one'
                            ],
                            [
                                'label' =>  esc_html__( 'Layout 2', 'i-am-news' ),
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/scroll-to-top-one.png',
                                'value' =>  'two'
                            ]
                        ]
                    ],
                    'scroll_to_top_box_shadow' =>  [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'description'   =>  esc_html__( 'This is description', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                        'section'   =>  $this->section
                    ],
                ];
                return ( $id ) ? $controls[ $id ] : $controls;
            }

            /**
             * Set defaults
             * 
             * @since 1.0.0
             * @var array
             */
            public function set_defaults() {
                $this->defaults = [
                    'scroll_to_top_layouts' =>  'one',
                    'scroll_to_top_box_shadow' =>  $this->get_box_shadow([
                        'offsetx'   =>  10,
                        'offsety'   =>  10
                    ]),
                ];
            }
        }
        Scroll_To_Top::get_instance();
    endif;