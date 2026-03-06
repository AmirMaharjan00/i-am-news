<?php
    /**
     * Dark Mode Section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Section\Section as Section;
    use IAN\Helpers;

    use function esc_html__;
    use function get_template_directory_uri;

    if( __NAMESPACE__ . '\\Dark_Mode' ) {
        /**
         * Dark Mode class
         */
        class Dark_Mode extends Section {
            /**
             * Section Id
             * 
             * @since 1.0.0
             * @var string
             */
            public $id = 'ian-dark-mode';

            /**
             * Class instance 
             * 
             * @since 1.0.0
             * @var Dark_Mode;
             */
            private static $instance = null;

            /**
             * Get instance
             * 
             * @since 1.0.0
             * @return Dark_Mode
             */
            public static function get_instance() {
                if( self::$instance === null ) self::$instance = new self();

                return self::$instance;
            }

            /**
             * Register controls
             * 
             * @since 1.0.0
             */
            public function register_controls() {
                $this->tab = 'general';
                $this->add_section( 'dark_mode_section' );
                $this->add_control( 'dark_mode_section_tab' );
                $this->add_control( 'dark_mode_layouts' );
                $this->add_control( 'dark_mode_dark_icon' );
                $this->add_control( 'dark_mode_light_icon' );
                $this->add_control( 'dark_mode_dark_text' );
                $this->add_control( 'dark_mode_light_text' );
                $this->add_control( 'dark_mode_icon_size' );
                $this->tab = 'design';
                $this->add_control( 'dark_mode_typography' );
                $this->add_control( 'dark_mode_dark_color' );
                $this->add_control( 'dark_mode_light_color' );
                $this->add_control( 'dark_mode_dark_background' );
                $this->add_control( 'dark_mode_light_background' );
                $this->add_control( 'dark_mode_border_radius' );
                $this->add_control( 'dark_mode_box_shadow' );
                $this->add_control( 'dark_mode_padding' );
            }

            /**
             * Settings
             * 
             * @since 1.0.0
             */
            public function get_settings( $id = '' ) {
                $settings = [
                    'dark_mode_section_tab' =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_layouts' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_image' ],
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_dark_icon' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_icon_picker' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_light_icon' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_icon_picker' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_dark_text' =>  [
                        'sanitize_callback' =>  'sanitize_text_field',
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_icon_size' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_typography' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_typography' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_light_text' =>  [
                        'sanitize_callback' =>  'sanitize_text_field',
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_dark_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_light_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_dark_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_light_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_border_radius' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_box_shadow' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'dark_mode_padding' =>  [
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
             * @since 1.0.0
             */
            public function get_controls( $id = '' ) {
                $controls = [
                    'dark_mode_section' =>  [
                        'title' =>  esc_html__( 'Dark Mode', 'i-am-news' )
                    ],
                    'dark_mode_section_tab' =>  [
                        'type'  =>  'section-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'General', 'i-am-news' ),
                                'value' =>  'general'
                            ],
                            [
                                'label' =>  esc_html__( 'Design', 'i-am-news' ),
                                'value' =>  'design'
                            ],
                        ]
                    ],
                    'dark_mode_layouts' =>  [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'radio-image',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Layout 1', 'i-am-news' ),
                                'value' =>  'one',
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/dark-mode-one.png'
                            ],
                            [
                                'label' =>  esc_html__( 'Layout 2', 'i-am-news' ),
                                'value' =>  'two',
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/dark-mode-two.png'
                            ],
                            [
                                'label' =>  esc_html__( 'Layout 3', 'i-am-news' ),
                                'value' =>  'three',
                                'url'   =>  get_template_directory_uri() . '/inc/customizer/assets/images/dark-mode-three.png'
                            ],
                        ]
                    ],
                    'dark_mode_dark_icon' =>  [
                        'label' =>  esc_html__( 'Dark Icon', 'i-am-news' ),
                        'type'  =>  'icon-picker',
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'dark_mode_layouts',
                                    'operator'  =>  '!=',
                                    'value' =>  'three'
                                ]
                            ]
                        ]
                    ],
                    'dark_mode_light_icon' =>  [
                        'label' =>  esc_html__( 'Light Icon', 'i-am-news' ),
                        'type'  =>  'icon-picker',
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'dark_mode_layouts',
                                    'operator'  =>  '!=',
                                    'value' =>  'three'
                                ]
                            ]
                        ]
                    ],
                    'dark_mode_dark_text' =>  [
                        'label' =>  esc_html__( 'Dark Text', 'i-am-news' ),
                        'type'  =>  'ian-text',
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'dark_mode_layouts',
                                    'operator'  =>  '==',
                                    'value' =>  'three'
                                ]
                            ]
                        ]
                    ],
                    'dark_mode_light_text' =>  [
                        'label' =>  esc_html__( 'Light Text', 'i-am-news' ),
                        'type'  =>  'ian-text',
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'dark_mode_layouts',
                                    'operator'  =>  '==',
                                    'value' =>  'three'
                                ]
                            ]
                        ]
                    ],
                    'dark_mode_icon_size' =>  [
                        'label' =>  esc_html__( 'Icon Size', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'input_attrs'   =>  [
                            'min'   =>  0,
                            'max'   =>  100,
                            'step'  =>  1
                        ],
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'dark_mode_layouts',
                                    'operator'  =>  '!=',
                                    'value' =>  'three'
                                ]
                            ]
                        ]
                    ],
                    'dark_mode_typography' =>  [
                        'label' =>  esc_html__( 'Typography', 'i-am-news' ),
                        'type'  =>  'typography',
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'setting'   =>  'dark_mode_layouts',
                                    'operator'  =>  '==',
                                    'value' =>  'three'
                                ]
                            ]
                        ]
                    ],
                    'dark_mode_dark_color' =>  [
                        'label' =>  esc_html__( 'Dark Color', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'include_hover' =>  true,
                    ],
                    'dark_mode_light_color' =>  [
                        'label' =>  esc_html__( 'Light Color', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'include_hover' =>  true,
                    ],
                    'dark_mode_dark_background' =>  [
                        'label' =>  esc_html__( 'Dark Backround', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'include_hover' =>  true,
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ],
                    'dark_mode_light_background' =>  [
                        'label' =>  esc_html__( 'Light Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'include_hover' =>  true,
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ],
                    'dark_mode_border_radius' =>  [
                        'label' =>  esc_html__( 'Border Radius', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'input_attrs'   =>  [
                            'min'   =>  0,
                            'max'   =>  100,
                            'step'  =>  1
                        ]
                    ],
                    'dark_mode_box_shadow' =>  [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow'
                    ],
                    'dark_mode_padding' =>  [
                        'label' =>  esc_html__( 'Padding', 'i-am-news' ),
                        'type'  =>  'dimension'
                    ],
                ];
                return $id ? $controls[ $id ] : $controls;
            }

            /**
             * Defaults
             * 
             * @since 1.0.0
             */
            public function set_defaults() {
                self::update_theme_defaults( [
                    'dark_mode_section_tab' =>  'general',
                    'dark_mode_layouts' =>  'one',
                    'dark_mode_dark_icon' =>  $this->get_icon_picker( [ 'value' => 'fa-solid fa-moon' ] ),
                    'dark_mode_light_icon' =>  $this->get_icon_picker( [ 'value' => 'fa-solid fa-sun' ] ),
                    'dark_mode_dark_text' =>  esc_html__( 'Dark', 'i-am-news' ),
                    'dark_mode_light_text' =>  esc_html__( 'Light', 'i-am-news' ),
                    'dark_mode_icon_size' =>  '16px',
                    'dark_mode_typography' =>  $this->get_typography(),
                    'dark_mode_dark_color' =>  [
                        'initial'   =>  $this->get_color(),
                        'hover' =>  $this->get_color()
                    ],
                    'dark_mode_light_color' =>  [
                        'initial'   =>  $this->get_color(),
                        'hover' =>  $this->get_color()
                    ],
                    'dark_mode_dark_background' =>  [
                        'initial'   =>  $this->get_color(),
                        'hover' =>  $this->get_color()
                    ],
                    'dark_mode_light_background' =>  [
                        'initial'   =>  $this->get_color(),
                        'hover' =>  $this->get_color()
                    ],
                    'dark_mode_border_radius' =>  '0px',
                    'dark_mode_box_shadow' =>  $this->get_box_shadow(),
                    'dark_mode_padding' =>  $this->get_dimension(),
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_args = [
                    'dark_mode_icon_size'   =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_icon_size' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_icon_size' ),
                        'selector'  =>  '.ian-dark-mode > .icon',
                        'property'  =>  'font-size'
                    ],
                    'dark_mode_typography'  =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_typography' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_typography' ),
                        'selector'  =>  '.ian-dark-mode > .label',
                        'variable'  =>  false
                    ],
                    'dark_mode_dark_color'  =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_dark_color' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_dark_color' ),
                        'selector'  =>  '.ian-dark-mode > .icon.dark-icon, .ian-dark-mode > .label.dark-label',
                        'hover_selector'  =>  '.ian-dark-mode > .icon.dark-icon:hover, .ian-dark-mode > .label.dark-label:hover',
                        'property'  =>  'color'
                    ],
                    'dark_mode_light_color' =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_light_color' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_light_color' ),
                        'selector'  =>  '.ian-dark-mode > .icon.light-icon, .ian-dark-mode > .label.light-label',
                        'hover_selector'  =>  '.ian-dark-mode > .icon.light-icon:hover, .ian-dark-mode > .label.light-label:hover',
                        'property'  =>  'color'
                    ],
                    'dark_mode_dark_background' =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_dark_background' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_dark_background' ),
                        'selector'  =>  '.ian-dark-mode > .icon.dark-icon, .ian-dark-mode > .label.dark-label',
                        'hover_selector'  =>  '.ian-dark-mode > .icon.dark-icon:hover, .ian-dark-mode > .label.dark-label:hover',
                        'property'  =>  'background'
                    ],
                    'dark_mode_light_background'    =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_light_background' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_light_background' ),
                        'selector'  =>  '.ian-dark-mode > .icon.light-icon, .ian-dark-mode > .label.light-label',
                        'hover_selector'  =>  '.ian-dark-mode > .icon.light-icon:hover, .ian-dark-mode > .label.light-label:hover',
                        'property'  =>  'background'
                    ],
                    'dark_mode_border_radius'   =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_border_radius' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_border_radius' ),
                        'selector'  =>  '.ian-dark-mode > .icon, .ian-dark-mode > .label',
                        'property'  =>  'border-radius'
                    ],
                    'dark_mode_box_shadow'  =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_box_shadow' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_box_shadow' ),
                        'selector'  =>  '.ian-dark-mode > .icon, .ian-dark-mode > .label',
                    ],
                    'dark_mode_padding' =>  [
                        'value' =>  self::get_theme_option( 'dark_mode_padding' ),
                        'default'   =>  $this->get_defaults( 'dark_mode_padding' ),
                        'selector'  =>  '.ian-dark-mode > .icon, .ian-dark-mode > .label',
                        'property'  =>  'padding'
                    ],
                ];
                return $dynamic_args;
            }

            /**
             * Render HTML
             * 
             * @since 1.0.0
             */
            public function render_html() {
                $layout = self::get_theme_option( 'dark_mode_layouts' );
                $block_class[] = $this->id;
                $block_class[] = 'header-widget';
                $block_class[] = 'layout--' . $layout;

                ?>
                    <div class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">
                        <?php
                            if( $layout !== 'three' ) :
                                echo Helpers::get_icon_html( array_merge( self::get_theme_option( 'dark_mode_dark_icon' ), [ 'class' => 'dark-icon' ] ) );
                                echo Helpers::get_icon_html( array_merge( self::get_theme_option( 'dark_mode_light_icon' ), [ 'class' => 'light-icon' ] ) );
                            else:
                                echo '<span class="label dark-label">', self::get_theme_option( 'dark_mode_dark_text' ) ,'</span>';
                                echo '<span class="label light-label">', self::get_theme_option( 'dark_mode_light_text' ) ,'</span>';
                            endif;
                        ?>
                    </div>
                <?php
            }
        }
        Dark_Mode::get_instance();
    }