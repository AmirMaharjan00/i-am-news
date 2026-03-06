<?php
    /**
     * Customizer Header builder section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Section\Header_Top_Row as Header_Top_Row;
    use IAN\Customizer\Section\Header_Middle_Row as Header_Middle_Row;
    use IAN\Customizer\Section\Header_Bottom_Row as Header_Bottom_Row;

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
                        'row_section_ids'   =>  [
                            'top' =>  'header_top_row_section',
                            'middle' =>  'header_middle_row_section',
                            'bottom' =>  'header_bottom_row_section',
                        ],
                        'widgets'   =>  [
                            'site-logo'  =>  [
                                'label' =>  esc_html__( 'Site Identity', 'i-am-news' ),
                                'section_id' =>  'title_tagline',
                                'icon'  =>  'admin-site'
                            ],
                            'time'  =>  [
                                'label' =>  esc_html__( 'Time', 'i-am-news' ),
                                'section_id' =>  'time_section',
                                'icon'  =>  'clock'
                            ],
                            'date-time'  =>  [
                                'label' =>  esc_html__( 'Date Time', 'i-am-news' ),
                                'section_id' =>  'date_time_section',
                                'icon'  =>  'calendar'
                            ],
                            'dark-mode'  =>  [
                                'label' =>  esc_html__( 'Dark Mode', 'i-am-news' ),
                                'section_id' =>  'dark_mode_section',
                                'icon'  =>  'lightbulb'
                            ],
                            'social-icons'  =>  [
                                'label' =>  esc_html__( 'Social Icons', 'i-am-news' ),
                                'section_id' =>  'scroll_to_top_section',
                                'icon'  =>  'share'
                            ],
                            'search'  =>  [
                                'label' =>  esc_html__( 'Search', 'i-am-news' ),
                                'section_id' =>  'scroll_to_top_section',
                                'icon'  =>  'search'
                            ],
                            'primary-menu'  =>  [
                                'label' =>  esc_html__( 'Menu', 'i-am-news' ),
                                'section_id' =>  'primary_menu_section',
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
                self::update_theme_defaults( [
                    'header_builder_section_tab' =>  'general',
                    'header_builder_layouts' =>  'one',
                    'header_builder' =>  [
                        'top'   =>  [
                            'first' =>  [],
                            'second' =>  [],
                            'third' =>  []
                        ],
                        'middle'    =>  [
                            'first' =>  [ 'site-logo' ],
                            'second' =>  [ 'primary-menu' ],
                            'third' =>  [ 'search', 'dark-mode' ]
                        ],
                        'bottom'    =>  [
                            'first' =>  [],
                            'second' =>  [],
                            'third' =>  []
                        ],
                    ],
                    'header_builder_background' =>  [
                        'type'  =>  'solid',
                        'value' =>  '#000'
                    ],
                    'header_builder_border' =>  $this->get_border(),
                    'header_builder_box_shadow' =>  $this->get_box_shadow(),
                    'header_builder_padding' =>  $this->get_dimension(),
                ] );
            }

            /**
             * Dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'header_builder_background' =>  [
                        'value' =>  self::get_theme_option( 'header_builder_background' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_background' ),
                        'property'  =>  'background'
                    ],
                    'header_builder_border' =>  [
                        'value' =>  self::get_theme_option( 'header_builder_border' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_border' )
                    ],
                    'header_builder_box_shadow' =>  [
                        'value' =>  self::get_theme_option( 'header_builder_box_shadow' ),
                        'selector'  =>  '.ian-header',
                        'default'   =>  $this->get_defaults( 'header_builder_box_shadow' )
                    ],
                    'header_builder_padding' =>  [
                        'value' =>  self::get_theme_option( 'header_builder_padding' ),
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
                $block_class[] = 'layout--' . self::get_theme_option( 'header_builder_layouts' );
                ?>
                    <header id="masthead" class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">
                        <?php Header_Top_Row::get_instance()->render_html(); ?>
                        <?php Header_Middle_Row::get_instance()->render_html(); ?>
                        <?php Header_Bottom_Row::get_instance()->render_html(); ?>
                    </header>
                <?php
            }
        }
        Header_Builder::get_instance();
    }