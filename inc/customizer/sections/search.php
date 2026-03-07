<?php
    /**
     * Search section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Section\Section as Section;
    use IAN\Customizer\Section\Time as Time;
    use IAN\Helpers;

    use function esc_html__;
    use function esc_attr;
    use function get_template_directory_uri;
    use function get_search_form;


    if( ! class_exists( __NAMESPACE__ . '\\Search' ) ) {
        /**
         * Search Class
         */
        class Search extends Section {
            /**
             * Section id
             * 
             * @since 1.0.0 
             */
            public $id = 'ian-search';

            /**
             * Instance of class
             * 
             * @var null
             * @since 1.0.0
             */
            private static $instance = null;

            /**
             * Get instance
             * 
             * @since 1.0.0
             * @return Search
             */
            public static function get_instance() {
                if( is_null( self::$instance ) ) self::$instance = new self();
                 
                return self::$instance;
            }

            /**
             * Register controls
             * 
             * @since 1.0.0
             */
            public function register_controls() {
                $this->tab = 'general';
                $this->add_section( 'search_section' );
                $this->add_control( 'search_section_tab' );
                $this->add_control( 'search_layouts' );
                $this->add_control( 'search_icon_picker' );
                $this->add_control( 'search_placeholder_text' );
                $this->add_control( 'search_width' );
                $this->add_control( 'search_enable_live_search' );
                $this->add_control( 'search_result_count' );
                $this->add_control( 'search_show_featured_image' );
                $this->add_control( 'search_show_all_results_button' );
                $this->tab = 'design';
                $this->add_control( 'search_date_color' );
                $this->add_control( 'search_date_background' );
                $this->add_control( 'search_border_radius' );
                $this->add_control( 'search_padding' );
            }

            /**
             * Settings
             * 
             * @param string $id    The setting id
             * @since 1.0.0
             */
            public function get_settings( $id = '' ): array {
                $settings = [
                    'search_section_tab' =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_layouts' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_image' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_icon_picker' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_icon_picker' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_placeholder_text' =>  [
                        'sanitize_callback' =>  'sanitize_text-field',
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_width' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_enable_live_search' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_toggle' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_result_count' =>  [
                        'sanitize_callback' =>  'absint',
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_show_featured_image' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_toggle' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_show_all_results_button' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_toggle' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_date_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_date_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_border_radius' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'search_padding' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_dimension' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                ];
                return $id ? $settings[ $id ] : $settings;
            }

            /**
             * Controls
             * 
             * @param string    $id     The control id
             * @since 1.0.0
             */
            public function get_controls( $id = '' ): array {
                $controls = [
                    'search_section' =>  [
                        'title' =>  esc_html__( 'Search', 'i-am-news' )
                    ],
                    'search_section_tab' =>  array_merge( $this->common, [
                        'type'  =>  'section-tab',
                        'fields'    =>  [
                            [
                                'label' => esc_html__( 'General', 'i-am-news' ),
                                'value' => 'general'
                            ],
                            [
                                'label' => esc_html__( 'Design', 'i-am-news' ),
                                'value' => 'design'
                            ],
                        ]
                    ] ),
                    'search_layouts' =>  [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'radio-image',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Default Search', 'i-am-news' ),
                                'value' =>  'one',
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/search-one.png'
                            ],
                            [
                                'label' =>  esc_html__( 'Fullscreen Search', 'i-am-news' ),
                                'value' =>  'two',
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/search-two.png'
                            ],
                            [
                                'label' =>  esc_html__( 'Dropdown Search', 'i-am-news' ),
                                'value' =>  'three',
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/search-three.png'
                            ],
                        ]
                    ],
                    'search_icon_picker' =>  [
                        'label' =>  esc_html__( 'Icon Picker', 'i-am-news' ),
                        'type'  =>  'icon-picker',
                        'exclude'   =>  [ 'image' ]
                    ],
                    'search_placeholder_text' =>  [
                        'label' =>  esc_html__( 'Placeholder Text', 'i-am-news' ),
                        'type'  =>  'ian-text'
                    ],
                    'search_width' =>  [
                        'label' =>  esc_html__( 'Width', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Small', 'i-am-news' ),
                                'value' =>  '100px'
                            ],
                            [
                                'label' =>  esc_html__( 'Medium', 'i-am-news' ),
                                'value' =>  '250px'
                            ],
                            [
                                'label' =>  esc_html__( 'Large', 'i-am-news' ),
                                'value' =>  '400px'
                            ],
                            [
                                'label' =>  esc_html__( '100%', 'i-am-news' ),
                                'value' =>  '100%'
                            ]
                        ]
                    ],
                    'search_enable_live_search' =>  [
                        'label' =>  esc_html__( 'Enable Live Search', 'i-am-news' ),
                        'type'  =>  'toggle-button'
                    ],
                    'search_result_count' =>  [
                        'label' =>  esc_html__( 'Result Count', 'i-am-news' ),
                        'description' =>  esc_html__( 'Determines how many results to show.', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'show_unit' =>  false,
                        'input_attrs'   =>  [
                            'min'   =>  2,
                            'max'   =>  10,
                            'step'  =>  1
                        ],
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'search_enable_live_search',
                                    'operator'  =>  '==',
                                    'value' =>  true
                                ]
                            ]
                        ]
                    ],
                    'search_show_featured_image' =>  [
                        'label' =>  esc_html__( 'Show featured image', 'i-am-news' ),
                        'type'  =>  'toggle-button',
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'search_enable_live_search',
                                    'operator'  =>  '==',
                                    'value' =>  true
                                ]
                            ]
                        ]
                    ],
                    'search_show_all_results_button' =>  [
                        'label' =>  esc_html__( 'Show all results button', 'i-am-news' ),
                        'type'  =>  'toggle-button',
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'search_enable_live_search',
                                    'operator'  =>  '==',
                                    'value' =>  true
                                ]
                            ]
                        ]
                    ],
                    'search_date_color' =>  [
                        'label' =>  esc_html__( 'Color', 'i-am-news' ),
                        'type'  =>  'ian-color'
                    ],
                    'search_date_background' =>  [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ],
                    'search_border_radius' =>  [
                        'label' =>  esc_html__( 'Border Radius', 'i-am-news' ),
                        'type'  =>  'ian-number'
                    ],
                    'search_padding' =>  [
                        'label' =>  esc_html__( 'Padding', 'i-am-news' ),
                        'type'  =>  'dimension'
                    ],
                ];
                return $id ? $controls[ $id ] : $controls;
            }

            /**
             * Set defaults
             * 
             * @since 1.0.0
             * 
             */
            public function set_defaults() {
                self::update_theme_defaults( [
                    'search_section_tab' =>  'general',
                    'search_layouts' =>  'one',
                    'search_icon_picker' =>  $this->get_icon_picker( [ 'value' => 'fa-solid fa-magnifying-glass' ] ),
                    'search_placeholder_text' =>  esc_html__( 'Search...', 'i-am-news' ),
                    'search_width' =>  '250px',
                    'search_enable_live_search' =>  false,
                    'search_result_count' =>  4,
                    'search_show_featured_image' =>  true,
                    'search_show_all_results_button' =>  true,
                    'search_date_color'  =>  $this->get_color(),
                    'search_date_background' =>  $this->get_color(),
                    'search_border_radius'  =>  '0px',
                    'search_padding' =>  $this->get_dimension(),
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'search_date_color'  =>  [
                        'value' =>  self::get_theme_option( 'search_date_color' ),
                        'default'   =>  $this->get_defaults( 'search_date_color' ),
                        'selector'  =>  '.ian-search',
                        'property'  =>  'color'
                    ],
                    'search_date_background' =>  [
                        'value' =>  self::get_theme_option( 'search_date_background' ),
                        'default'   =>  $this->get_defaults( 'search_date_background' ),
                        'selector'  =>  '.ian-search',
                        'property'  =>  'background'
                    ],
                    'search_border_radius'  =>  [
                        'value' =>  self::get_theme_option( 'search_border_radius' ),
                        'default'   =>  $this->get_defaults( 'search_border_radius' ),
                        'selector'  =>  '.ian-search'
                    ],
                    'search_padding' =>  [
                        'value' =>  self::get_theme_option( 'search_padding' ),
                        'default'   =>  $this->get_defaults( 'search_padding' ),
                        'selector'  =>  '.ian-search',
                        'property'  =>  'padding'
                    ],
                ];
                return $dynamic_css_args;
            }

            /**
             * Render html
             * 
             * @since 1.0.0
             */
            public function render_html() {
                $block_class[] = $this->id;
                $block_class[] = 'header-widget';
                $block_class[] = 'layout--' . self::get_theme_option( 'search_layouts' );

                echo '<div class="', esc_attr( implode( ' ', $block_class ) ), '">';

                    echo get_search_form();
                    
                echo '</div><!-- .ian-search -->';
            }
        }
        Search::get_instance();
    }