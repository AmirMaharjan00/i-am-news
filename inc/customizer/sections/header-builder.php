<?php
    /**
     * Customizer Header builder section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Section\Date_Time as Date_Time;

    use function esc_html__;
    use function esc_attr;
    use function get_template_directory_uri;

    use IAN\Helpers;

    if( ! class_exists( __NAMESPACE__ . '\\Header_Builder' ) ) {
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
                $this->add_control( 'header_builder_layouts' );
                $this->tab = 'design';
                $this->add_control( 'header_builder_background' );
                $this->add_control( 'header_builder_border' );
                $this->add_control( 'header_builder_box_shadow' );
                $this->add_control( 'header_builder_padding' );
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
                    'header_builder_layouts' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_image' ],
                        'transport' =>  'postMessage',
                        'default' =>  $this->get_defaults( $id )
                    ],
                    'header_builder_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default' =>  $this->get_defaults( $id )
                    ],
                    'header_builder_border' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_border' ],
                        'transport' =>  'postMessage',
                        'default' =>  $this->get_defaults( $id )
                    ],
                    'header_builder_box_shadow' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport' =>  'postMessage',
                        'default' =>  $this->get_defaults( $id )
                    ],
                    'header_builder_padding' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_dimension' ],
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
                    'header_builder_layouts' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'radio-image',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Layout 1', 'i-am-news' ),
                                'url' =>  get_template_directory_uri() . '/inc/customizer/assets/images/header-builder-one.png',
                                'value' =>  'one'
                            ],
                            [
                                'label' =>  esc_html__( 'Layout 2', 'i-am-news' ),
                                'url' =>  get_template_directory_uri() . '/inc/customizer/assets/images/header-builder-two.png',
                                'value' =>  'two'
                            ]
                        ]
                    ] ),
                    'header_builder' =>  array_merge( $this->common, [
                        'type'  =>  'ian-builder',
                        'widgets'   =>  [
                            'logo'  =>  [
                                'label' =>  esc_html__( 'Site Logo and Title', 'i-am-news' ),
                                'section_id' =>  'scroll_to_top_section',
                                'icon'  =>  'admin-site'
                            ],
                            'date-time'  =>  [
                                'label' =>  esc_html__( 'Date Time', 'i-am-news' ),
                                'section_id' =>  'scroll_to_top_section',
                                'icon'  =>  'calendar'
                            ],
                            'dark-mode'  =>  [
                                'label' =>  esc_html__( 'Dark Mode', 'i-am-news' ),
                                'section_id' =>  'scroll_to_top_section',
                                'icon'  =>  'lightbulb'
                            ],
                            'social-icons'  =>  [
                                'label' =>  esc_html__( 'Social Icons', 'i-am-news' ),
                                'section_id' =>  'scroll_to_top_section',
                                'icon'  =>  'share'
                            ],
                            'menu'  =>  [
                                'label' =>  esc_html__( 'Menu', 'i-am-news' ),
                                'section_id' =>  'scroll_to_top_section',
                                'icon'  =>  'menu'
                            ],
                        ]
                    ] ),
                    'header_builder_background' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'color_types' =>  [ 'solid', 'gradient', 'image' ],
                        'type'  =>  'ian-color',
                        'tab'   =>  'design'
                    ] ),
                    'header_builder_border' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Border', 'i-am-news' ),
                        'type'  =>  'border',
                        'tab'   =>  'design'
                    ] ),
                    'header_builder_box_shadow' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                        'tab'   =>  'design'
                    ] ),
                    'header_builder_padding' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Padding', 'i-am-news' ),
                        'type'  =>  'dimension',
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
                    'header_builder_layouts' =>  'one',
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
                            'first' =>  [],
                            'second' =>  [],
                            'third' =>  [],
                            'forth' =>  [],
                        ],
                    ],
                    'header_builder_background' =>  [
                        'type'  =>  'solid',
                        'value' =>  '#000'
                    ],
                    'header_builder_border' =>  $this->get_border(),
                    'header_builder_box_shadow' =>  $this->get_box_shadow(),
                    'header_builder_padding' =>  $this->get_dimension(),
                ];
            }

            /**
             * Dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'header_builder_background' =>  [
                        'value' =>  $this->get_customizer_value( 'header_builder_background' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_background' ),
                        'property'  =>  'background'
                    ],
                    'header_builder_border' =>  [
                        'value' =>  $this->get_customizer_value( 'header_builder_border' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_border' )
                    ],
                    'header_builder_box_shadow' =>  [
                        'value' =>  $this->get_customizer_value( 'header_builder_box_shadow' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_box_shadow' )
                    ],
                    'header_builder_padding' =>  [
                        'value' =>  $this->get_customizer_value( 'header_builder_padding' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_padding' ),
                        'property'  =>  'padding'
                    ],
                ];
                return $dynamic_css_args;
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
                $block_class[] = 'layout--' . $this->get_customizer_value( 'header_builder_layouts' );
                ?>
                    <header id="masthead" class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">
                        <?php Date_Time::get_instance()->render_html(); ?>
                        <span>Dark Mode</span>
                        <span>Social Icons</span>
                        <span>Logo</span>
                        <span>Primary Menu</span>
                        <span>Secondary Menu</span>
                        <span>Search</span>
                        <span>Instagram</span>
                        <span>Ticker News</span>
                        <span>Random News</span>
                        <span>NewsLetter</span>
                        <span>Widget Area</span>
                        <span>Weather</span>
                    </header>
                <?php
            }
        }
        Header_Builder::get_instance();
    }