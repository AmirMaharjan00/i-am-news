<?php
    /**
     * Customizer Header builder section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use function esc_html__;
    use function esc_attr;
    use function get_template_directory_uri;

    use IAN\Helpers;

    if( ! class_exists( __NAMESPACE__ . '\\Header_Builder' ) ) :
        /**
         * Header builder
         */
        class Header_Builder extends Section {
            /**
             * Id of section
             * 
             * @since 1.0.0
             * @var string
             */
            public $id = 'ian-header';

            /**
             * Instance of class
             * 
             * @since 1.0.0
             * @var IAN\Customizer\Section\Header_Builder
             */
            private static $instance = null;

            /**
             * Get instance of class
             * 
             * @since 1.0.0
             * @return IAN\Customizer\Section\Header_Builder
             */
            public static function get_instance() {
                if( self::$instance === null ) self::$instance = new self();

                return self::$instance;
            }

            /**
             * Register controls
             * Render
             * 
             * @since 1.0.0
             * @override
             */
            protected function register_controls() {
                $this->tab = 'general';
                $this->add_section( 'header_builder_section' );
                $this->add_control( 'header_builder_section_tab' );
                $this->add_control( 'header_builder' );
                $this->tab = 'design';
                $this->add_control( 'header_builder_background' );
            }

            /**
             * Get settings
             * 
             * @since 1.0.0
             * @override
             */
            protected function get_settings( $id = '' ) {
                $settings = [
                    'header_builder_section_tab' =>  [
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_builder' =>  [
                        // 'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default' =>  $this->get_defaults( $id )
                    ],
                    'header_builder_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default' =>  $this->get_defaults( $id )
                    ],
                ];
                return ( $id ) ? $settings[ $id ] : $settings;
            }

            /**
             * Get controls
             * Helpers
             * 
             * @since 1.0.0
             * @override
             */
            protected function get_controls( $id = '' ) {
                $controls = [
                    'header_builder_section' =>  array_merge( $this->common, [
                        'title' =>  esc_html__( 'Header Builder', 'i-am-news' )
                    ] ),
                    'header_builder_section_tab' =>  array_merge( $this->common, [
                        'type'  =>  'section-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'General', 'i-am-news' ),
                                'value' =>  'general'
                            ],
                            [
                                'label' =>  esc_html__( 'Design', 'i-am-news' ),
                                'value' =>  'design'
                            ]
                        ]
                    ] ),
                    'header_builder' =>  array_merge( $this->common, [
                        'type'  =>  'ian-builder',
                        'widgets'   =>  [
                            'logo'  =>  [
                                'label' =>  esc_html__( 'Site Logo and Title', 'i-am-news' ),
                            ],
                            'date-time'  =>  [
                                'label' =>  esc_html__( 'Date Time', 'i-am-news' ),
                            ],
                            'dark-mode'  =>  [
                                'label' =>  esc_html__( 'Dark Mode', 'i-am-news' ),
                            ],
                            'social-icons'  =>  [
                                'label' =>  esc_html__( 'Social Icons', 'i-am-news' ),
                            ],
                            'menu'  =>  [
                                'label' =>  esc_html__( 'Menu', 'i-am-news' ),
                            ],
                        ]
                    ] ),
                    'header_builder_background' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Builder', 'i-am-news' ),
                        'color_types' =>  [ 'solid', 'gradient', 'image' ],
                        'type'  =>  'ian-color',
                        'tab'   =>  'design'
                    ] ),
                ];
                return ( $id ) ? $controls[ $id ] : $controls;
            }

            /**
             * Set defaults
             * Theme Starter
             * 
             * @since 1.0.0
             * @var array
             */
            public function set_defaults() {
                $this->defaults = [
                    'header_builder_section_tab' =>  'general',
                    'header_builder' =>  [
                        'top'   =>  [
                            'first' =>  [ 'date-time', 'dark-mode' ],
                            'second' =>  [],
                            'third' =>  [],
                            'forth' =>  [],
                        ],
                        'middle'    =>  [
                            'first' =>  [ 'logo' ],
                            'second' =>  [ 'social-icons' ],
                            'third' =>  [],
                            'forth' =>  [],
                        ],
                        'bottom'    =>  [
                            'first' =>  [ 'menu' ],
                            'second' =>  [],
                            'third' =>  [],
                            'forth' =>  [],
                        ],
                    ],
                    'header_builder_background' =>  [
                        'type'  =>  'solid',
                        'value' =>  '#000'
                    ],
                ];
            }

            /**
             * Dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args( $add_type = false ): array {
                $dynamic_css_args = [
                    'header_builder_background' =>  [
                        'value' =>  $this->get_customizer_value( 'header_builder_background' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_background' ),
                        'property'  =>  'background'
                    ]
                ];
                if( $add_type ) {
                    $configs = [];
                    foreach( $dynamic_css_args as $id => $args ) {
                        $control_args = $this->get_controls( $id );
                        $args[ 'type' ] = $control_args[ 'type' ];
                        $configs[ $id ] = $args;
                    }
                    return $configs;
                } else {
                    return $dynamic_css_args;
                }
            }

            /**
             * Render html
             * 
             * @return html
             * @since 1.0.0
             */
            public function render_html() {
                $block_class[] = $this->id;
                $block_class[] = 'site-header';
                ?>
                    <header id="masthead" class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">

                    </header>
                <?php
            }
        }
        Header_Builder::get_instance();
    endif;