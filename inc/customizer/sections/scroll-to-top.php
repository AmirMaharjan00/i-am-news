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
            protected function register_controls() {
                $this->add_section( 'scroll_to_top_section' );
                $this->add_control( 'scroll_to_top_section_tab' );
                $this->add_control( 'scroll_to_top_layouts' );
                $this->add_control( 'scroll_to_top_label' );
                $this->add_control( 'scroll_to_top_icon_picker' );
                $this->add_control( 'scroll_to_top_is_fixed' );
                $this->add_control( 'scroll_to_top_position' );
                $this->add_control( 'scroll_to_top_typography' );
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
                        'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_layouts' =>  [
                        'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'refresh',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_label' =>  [
                        'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_icon_picker' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_is_fixed' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_position' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_typography' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_border' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_border_radius' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_box_shadow' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_padding' =>  [
                        // 'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'radio_tab_test' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                ];
                return ( $id ) ? $settings[ $id ] : $settings;
            }

            /**
             * Get controls
             * 
             * @since 1.0.0
             * @override
             */
            protected function get_controls( $id = '' ) {
                $controls = [
                    'scroll_to_top_section' =>  [
                        'title' =>  esc_html__( 'Scroll to Top', 'i-am-news' )
                    ],
                    'scroll_to_top_section_tab' =>  [
                        'type'  =>  'section-tab',
                        'section'   =>  $this->section,
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
                    ],
                    'scroll_to_top_layouts' =>  [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'radio-image',
                        'tab'   =>  'general',
                        'section'   =>  $this->section,
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
                    ],
                    'scroll_to_top_label' =>  [
                        'label' =>  esc_html__( 'Label', 'i-am-news' ),
                        'description'   =>  esc_html__( 'Leave the field empty to hide the label.', 'i-am-news' ),
                        'type'  =>  'ian-text',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_icon_picker' =>  [
                        'label' =>  esc_html__( 'Icon', 'i-am-news' ),
                        'type'  =>  'icon-picker',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_is_fixed' =>  [
                        'label' =>  esc_html__( 'Fixed', 'i-am-news' ),
                        'description'   =>  esc_html__( 'Enable to make it fixed.', 'i-am-news' ),
                        'type'  =>  'toggle-button',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_position' =>  [
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
                        'section'   =>  $this->section,
                        'display_block' =>  true,
                        'active_callback'   =>  function( $setting ) {
                            return $setting->manager->get_setting( 'scroll_to_top_is_fixed' )->value();
                        }
                    ],
                    'scroll_to_top_typography' =>  [
                        'label' =>  esc_html__( 'Typography', 'i-am-news' ),
                        'type'  =>  'typography',
                        'tab'  =>  'design',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_border' =>  [
                        'label' =>  esc_html__( 'Border', 'i-am-news' ),
                        'type'  =>  'border',
                        'tab'  =>  'design',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_border_radius' =>  [
                        'label' =>  esc_html__( 'Border Radius', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'tab'   =>  'design',
                        'section'   =>  $this->section,
                        'responsive'    =>  true
                    ],
                    'scroll_to_top_box_shadow' =>  [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                        'tab'   =>  'design',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_padding' =>  [
                        'label' =>  esc_html__( 'Padding', 'i-am-news' ),
                        'type'  =>  'dimension',
                        'tab'   =>  'design',
                        'section'   =>  $this->section
                    ],
                    'radio_tab_test' =>  [
                        'label' =>  esc_html__( 'Radio Tab', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'section'   =>  $this->section,
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( '1', 'i-am-news' ),
                                'value' =>  'one'
                            ],
                            [
                                'label' =>  esc_html__( '2', 'i-am-news' ),
                                'value' =>  'two'
                            ]
                        ]
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
                    'scroll_to_top_section_tab' =>  'general',
                    'scroll_to_top_layouts' =>  'one',
                    'scroll_to_top_label' =>  esc_html__( 'Go to Top', 'i-am-news' ),
                    'scroll_to_top_icon_picker' =>  [
                        'type'  =>  'icon',
                        'value'  =>  'fa-solid fa-jet-fighter-up'
                    ],
                    'scroll_to_top_is_fixed' =>  false,
                    'scroll_to_top_position' =>  'right',
                    'scroll_to_top_typography'   =>  [
                        'font_family'   => [ 'value' => 'Jost', 'label' => 'Jost' ],
                        'font_weight'   =>  '500italic',
                        'font_size'   => [
                            'desktop'   =>  13,
                            'tablet'   =>  13,
                            'mobile'   =>  13
                        ],
                        'line_height'   => [
                            'desktop'   =>  21,
                            'tablet'   =>  21,
                            'mobile'   =>  21
                        ],
                        'letter_spacing'   => [
                            'desktop'   =>  0,
                            'tablet'   =>  0,
                            'mobile'   =>  0
                        ],
                        'text_transform'    => 'none',
                        'text_decoration'    => 'none',
                        'preset'    =>  '-1'
                    ],
                    'scroll_to_top_border' =>  '',
                    'scroll_to_top_border_radius'   =>  5,
                    'scroll_to_top_box_shadow' =>  $this->get_box_shadow([
                        'offsetx'   =>  10,
                        'offsety'   =>  10
                    ]),
                    'scroll_to_top_padding' => '',
                    'radio_tab_test'    =>  'one',
                ];
            }

            /**
             * Render dynamic css
             * 
             * @return css
             * @since 1.0.0
             */
            public function render_dynamic_css() {
                
            }

            /**
             * Render html
             * 
             * @return html
             * @since 1.0.0
             */
            public function render_html() {
                $block_class[] = $this->id;
                $block_class[] = 'layout--' . $this->get_customizer_value( 'scroll_to_top_layouts' );

                if( $this->get_customizer_value( 'scroll_to_top_is_fixed' ) ) {
                    $block_class[] = 'position--' . $this->get_customizer_value( 'scroll_to_top_position' );
                }

                ?>
                    <div id="<?php echo esc_attr( $this->id ); ?>" class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">

                        <span class="label"><?php echo esc_html( $this->get_customizer_value( 'scroll_to_top_label' ) ); ?></span>

                        <?php echo Helpers::get_icon_html( $this->get_customizer_value( 'scroll_to_top_icon_picker' ) ); ?>

                    </div>
                <?php
            }
        }
        Scroll_To_Top::get_instance();
    endif;