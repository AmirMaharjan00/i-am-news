<?php
    /**
     * Customizer scroll to top section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use function esc_html__;
    use function esc_attr;
    use function get_template_directory_uri;

    use IAN\Helpers;

    if( ! class_exists( __NAMESPACE__ . '\\Scroll_To_Top' ) ) :
        /**
         * Scroll to top
         */
        class Scroll_To_Top extends Section {
            /**
             * Id of section
             * 
             * @since 1.0.0
             * @var string
             */
            public $id = 'ian-scroll-to-top';

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
            public static function get_instance(): Scroll_To_Top {
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
                $this->add_section( 'scroll_to_top_section' );
                $this->add_control( 'scroll_to_top_section_tab' );
                $this->add_control( 'scroll_to_top_layouts' );
                $this->add_control( 'scroll_to_top_label' );
                $this->add_control( 'scroll_to_top_icon_picker' );
                $this->add_control( 'scroll_to_top_is_fixed' );
                $this->add_control( 'scroll_to_top_position' );
                $this->tab = 'design';
                $this->add_control( 'scroll_to_top_typography' );
                $this->add_control( 'scroll_to_top_color' );
                $this->add_control( 'scroll_to_top_background' );
                $this->add_control( 'scroll_to_top_border' );
                $this->add_control( 'scroll_to_top_border_radius' );
                $this->add_control( 'scroll_to_top_box_shadow' );
                $this->add_control( 'scroll_to_top_padding' );
            }

            /**
             * Get settings
             * 
             * @since 1.0.0
             * @override
             */
            protected function get_settings( $id = '' ) {
                $settings = [
                    'scroll_to_top_section_tab' =>  [
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_layouts' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_image' ],
                        'transport'   =>  'refresh',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_label' =>  [
                        'sanitize_callback' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_icon_picker' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_icon_picker' ],
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_is_fixed' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_toggle' ],
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_position' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_typography' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_typography' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_border' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_border' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_border_radius' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_box_shadow' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_padding' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_dimension' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
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
                    'scroll_to_top_section' =>  array_merge( $this->common, [
                        'title' =>  esc_html__( 'Scroll to Top', 'i-am-news' )
                    ] ),
                    'scroll_to_top_section_tab' =>  array_merge( $this->common, [
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
                    'scroll_to_top_layouts' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'radio-image',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Layout 1', 'i-am-news' ),
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/scroll-to-top-one.png',
                                'value' =>  'one'
                            ],
                            [
                                'label' =>  esc_html__( 'Layout 2', 'i-am-news' ),
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/scroll-to-top-two.png',
                                'value' =>  'two'
                            ]
                        ]
                    ] ),
                    'scroll_to_top_label' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Label', 'i-am-news' ),
                        'description'   =>  esc_html__( 'Leave the field empty to hide the label.', 'i-am-news' ),
                        'type'  =>  'ian-text',
                    ] ),
                    'scroll_to_top_icon_picker' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Icon', 'i-am-news' ),
                        'type'  =>  'icon-picker',
                    ] ),
                    'scroll_to_top_is_fixed' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Fixed', 'i-am-news' ),
                        'description'   =>  esc_html__( 'Enable to make it fixed.', 'i-am-news' ),
                        'type'  =>  'toggle-button',
                    ] ),
                    'scroll_to_top_position' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Position', 'i-am-news' ),
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Left', 'i-am-news' ),
                                'value' =>  'left'
                            ],
                            [
                                'label' =>  esc_html__( 'Center', 'i-am-news' ),
                                'value' =>  'center'
                            ],
                            [
                                'label' =>  esc_html__( 'Right', 'i-am-news' ),
                                'value' =>  'right'
                            ],
                        ],
                        'type'  =>  'radio-tab',
                        'display_block' =>  true,
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'scroll_to_top_is_fixed',
                                    'operator'  =>  '==',
                                    'value' =>  true
                                ]
                            ]
                        ]
                    ] ),
                    'scroll_to_top_typography' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Typography', 'i-am-news' ),
                        'type'  =>  'typography',
                        'tab'  =>  'design',
                    ] ),
                    'scroll_to_top_color' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Color', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'tab'  =>  'design',
                        'include_hover'   =>  true
                    ] ),
                    'scroll_to_top_background' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'tab'  =>  'design',
                        'include_hover'   =>  true,
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ] ),
                    'scroll_to_top_border' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Border', 'i-am-news' ),
                        'type'  =>  'border',
                        'tab'  =>  'design',
                        'input_attrs'   =>  [
                            'px'    =>  [
                                'min'   =>  0,
                                'max'   =>  100,
                                'step'  =>  1
                            ]
                        ]
                    ] ),
                    'scroll_to_top_border_radius' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Border Radius', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'tab'   =>  'design',
                        'responsive'    =>  true,
                        'input_attrs'   =>  [
                            'px'    =>  [
                                'min'   =>  0,
                                'max'   =>  100,
                                'step'  =>  1
                            ]
                        ]
                    ] ),
                    'scroll_to_top_box_shadow' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                        'tab'   =>  'design',
                    ] ),
                    'scroll_to_top_padding' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Padding', 'i-am-news' ),
                        'type'  =>  'dimension',
                        'tab'   =>  'design',
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
                    'scroll_to_top_section_tab' =>  'general',
                    'scroll_to_top_layouts' =>  'one',
                    'scroll_to_top_label' =>  esc_html__( 'Go to Top', 'i-am-news' ),
                    'scroll_to_top_icon_picker' =>  $this->get_icon_picker(),
                    'scroll_to_top_is_fixed' =>  true,
                    'scroll_to_top_position' =>  'right',
                    'scroll_to_top_typography'   =>  $this->get_typography(),
                    'scroll_to_top_color' =>  [
                        'initial'   =>  [
                            'type'  =>  'solid',
                            'value' =>  '#000'
                        ],
                        'hover'   =>  [
                            'type'  =>  'solid',
                            'value' =>  '#ff0000'
                        ]
                    ],
                    'scroll_to_top_background' =>  [
                        'initial'   =>  [
                            'type'  =>  'solid',
                            'value' =>  '#ffff00'
                        ],
                        'hover'   =>  [
                            'type'  =>  'solid',
                            'value' =>  '#ff0000'
                        ]
                    ],
                    'scroll_to_top_border' =>  $this->get_border( [ 'stye' => 'none' ] ),
                    'scroll_to_top_border_radius'   =>  $this->get_responsive( '0px', '0px', '0px' ),
                    'scroll_to_top_box_shadow' =>  $this->get_box_shadow(),
                    'scroll_to_top_padding' => $this->get_dimension( [
                        'top'   =>  5,
                        'right'   =>  5,
                        'bottom'   =>  5,
                        'left'   =>  5
                    ] ),
                ] );
            }

            /**
             * Dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'scroll_to_top_typography'  =>  [
                        'value' =>  self::get_theme_option( 'scroll_to_top_typography' ),
                        'selector'  =>  '.ian-scroll-to-top > span',
                        'default'   =>  $this->get_defaults( 'scroll_to_top_typography' ),
                        'variable'  =>  false
                    ],
                    'scroll_to_top_color'  =>  [
                        'value' =>  self::get_theme_option( 'scroll_to_top_color' ),
                        'selector'  =>  '.ian-scroll-to-top > span',
                        'hover_selector'  =>  '.ian-scroll-to-top:hover > span',
                        'default'   =>  $this->get_defaults( 'scroll_to_top_color' ),
                        'property'  =>  'color'
                    ],
                    'scroll_to_top_background'  =>  [
                        'value' =>  self::get_theme_option( 'scroll_to_top_background' ),
                        'selector'  =>  '.ian-scroll-to-top',
                        'hover_selector'  =>  '.ian-scroll-to-top:hover',
                        'default'   =>  $this->get_defaults( 'scroll_to_top_background' ),
                        'property'  =>  'background'
                    ],
                    'scroll_to_top_border'  =>  [
                        'value' =>  self::get_theme_option( 'scroll_to_top_border' ),
                        'selector'  =>  '.ian-scroll-to-top',
                        'default'   =>  $this->get_defaults( 'scroll_to_top_border' )
                    ],
                    'scroll_to_top_border_radius'  =>   [
                        'value' =>  self::get_theme_option( 'scroll_to_top_border_radius' ),
                        'selector'  =>  '.ian-scroll-to-top',
                        'default'   =>  $this->get_defaults( 'scroll_to_top_border_radius' ),
                        'property'  =>  'border-radius'
                    ],
                    'scroll_to_top_box_shadow'  =>  [
                        'value' =>  self::get_theme_option( 'scroll_to_top_box_shadow' ),
                        'selector'  =>  '.ian-scroll-to-top',
                        'default'   =>  $this->get_defaults( 'scroll_to_top_box_shadow' )
                    ],
                    'scroll_to_top_padding'  => [
                        'value' =>  self::get_theme_option( 'scroll_to_top_padding' ),
                        'selector'  =>  '.ian-scroll-to-top',
                        'default'   =>  $this->get_defaults( 'scroll_to_top_padding' ),
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
                $block_class[] = 'layout--' . self::get_theme_option( 'scroll_to_top_layouts' );

                if( self::get_theme_option( 'scroll_to_top_is_fixed' ) ) {
                    $block_class[] = 'position--' . self::get_theme_option( 'scroll_to_top_position' );
                }

                ?>
                    <div id="<?php echo esc_attr( $this->id ); ?>" class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">

                        <span class="label"><?php echo esc_html( self::get_theme_option( 'scroll_to_top_label' ) ); ?></span>

                        <?php echo Helpers::get_icon_html( self::get_theme_option( 'scroll_to_top_icon_picker' ) ); ?>

                    </div>
                <?php
            }
        }
        Scroll_To_Top::get_instance();
    endif;