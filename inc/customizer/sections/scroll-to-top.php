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
            protected function register_controls() {
                $this->add_section( 'scroll_to_top_section' );
                $this->add_control( 'scroll_to_top_section_tab' );
                $this->add_control( 'scroll_to_top_layouts' );
                $this->add_control( 'scroll_to_top_label' );
                $this->add_control( 'scroll_to_top_icon_picker' );
                $this->add_control( 'scroll_to_top_box_shadow' );
                $this->add_control( 'test' );
                $this->add_control( 'typography_test' );
                $this->add_control( 'radio_tab_test' );
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
                    'scroll_to_top_box_shadow' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_icon_picker' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'test' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'transport'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'typography_test' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
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
                    'scroll_to_top_layouts' =>  [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'description' =>  esc_html__( 'Pick your desired layout.', 'i-am-news' ),
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
                    'scroll_to_top_box_shadow' =>  [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'description'   =>  esc_html__( 'This is description', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                        'tab'   =>  'design',
                        'section'   =>  $this->section
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
                    'scroll_to_top_label' =>  [
                        'label' =>  esc_html__( 'Label', 'i-am-news' ),
                        'description' =>  esc_html__( 'Testing', 'i-am-news' ),
                        'type'  =>  'text',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_icon_picker' =>  [
                        'label' =>  esc_html__( 'Icon', 'i-am-news' ),
                        'type'  =>  'icon-picker',
                        'section'   =>  $this->section
                    ],
                    'test' =>  [
                        'label' =>  esc_html__( 'Testing', 'i-am-news' ),
                        'type'  =>  'toggle-button',
                        'section'   =>  $this->section
                    ],
                    'typography_test' =>  [
                        'label' =>  esc_html__( 'Typography', 'i-am-news' ),
                        'type'  =>  'typography',
                        'tab'  =>  'design',
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
                    'scroll_to_top_box_shadow' =>  $this->get_box_shadow([
                        'offsetx'   =>  10,
                        'offsety'   =>  10
                    ]),
                    'scroll_to_top_icon_picker' =>  [
                        'type'  =>  'icon',
                        'value'  =>  'fa-solid fa-jet-fighter-up'
                    ],
                    'test' =>   false,
                    'typography_test'   =>  [
                        'font_family'   => [ 'value' => 'Jost', 'label' => 'Jost' ],
                        'font_weight'   =>  '500italic',
                        'font_size'   => [
                            'desktop'   =>  13,
                            'tablet'   =>  13,
                            'smartphone'   =>  13
                        ],
                        'line_height'   => [
                            'desktop'   =>  21,
                            'tablet'   =>  21,
                            'smartphone'   =>  21
                        ],
                        'letter_spacing'   => [
                            'desktop'   =>  0,
                            'tablet'   =>  0,
                            'smartphone'   =>  0
                        ],
                        'text_transform'    => 'unset',
                        'text_decoration'    => 'none',
                        'preset'    =>  '-1'
                    ],
                    'radio_tab_test'    =>  'one'
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
                $block_class[] = 'scroll-to-top';
                $block_class[] = 'layout--' . $this->get_customizer_value( 'scroll_to_top_layouts' );
                ?>
                    <div id="scroll-to-top" class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">
                        <span class="label"><?php echo esc_html( $this->get_customizer_value( 'scroll_to_top_label' ) ); ?></span>
                        <span class="icon"></span>
                    </div>
                <?php
            }
        }
        Scroll_To_Top::get_instance();
    endif;