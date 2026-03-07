<?php
    /**
     * Social Icons section
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


    if( ! class_exists( __NAMESPACE__ . '\\Social_Icons' ) ) {
        /**
         * Social_Icons Class
         */
        class Social_Icons extends Section {
            /**
             * Section id
             * 
             * @since 1.0.0 
             */
            public $id = 'ian-social-icons';

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
             * @return Social_Icons
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
                $this->add_section( 'social_icons_section' );
                $this->add_control( 'social_icons_section_tab' );
                $this->add_control( 'social_icons_target' );
                $this->add_control( 'social_icons_use_brand_colors' );
                $this->add_control( 'social_icons_style' );
                $this->add_control( 'social_icons_animation' );
                $this->tab = 'design';
                $this->add_control( 'social_icons_icon_size' );
                $this->add_control( 'social_icons_spacing' );
                $this->add_control( 'social_icons_color' );
                $this->add_control( 'social_icons_background' );
            }

            /**
             * Settings
             * 
             * @param string $id    The setting id
             * @since 1.0.0
             */
            public function get_settings( $id = '' ): array {
                $settings = [
                    'social_icons_section_tab' =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_target' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_use_brand_colors' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_toggle' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_style' =>  [
                        'sanitize_callback' =>  'sanitize_text_field',
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_animation' =>  [
                        'sanitize_callback' =>  'sanitize_text_field',
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_icon_size' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_spacing' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'social_icons_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
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
                    'social_icons_section' =>  [
                        'title' =>  esc_html__( 'Social Icons', 'i-am-news' )
                    ],
                    'social_icons_section_tab' =>  array_merge( $this->common, [
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
                    'social_icons_target'   =>  [
                        'label' =>  esc_html__( 'Open in', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'New Tab', 'i-am-news' ),
                                'value' =>  '_blank'
                            ],
                            [
                                'label' =>  esc_html__( 'Same Tab', 'i-am-news' ),
                                'value' =>  '_self'
                            ],
                        ]
                    ],
                    'social_icons_use_brand_colors' =>  [
                        'label' =>  esc_html__( 'Use official brand colors', 'i-am-news' ),
                        'type'  =>  'toggle-button'
                    ],
                    'social_icons_style'    =>  [
                        'label' =>  esc_html__( 'Icon Style', 'i-am-news' ),
                        'type'  =>  'select',
                        'choices'   =>  [
                            'default'   =>  esc_html__( 'Default', 'i-am-news' ),
                            'filled'    =>  esc_html__( 'Filled', 'i-am-news' ),
                            'outline'   =>  esc_html__( 'Outline', 'i-am-news' ),
                            'rounded'   =>  esc_html__( 'Rounded', 'i-am-news' ),
                            'circle'    =>  esc_html__( 'Circle', 'i-am-news' ),
                            'square'    =>  esc_html__( 'Square', 'i-am-news' ),
                        ]
                    ],
                    'social_icons_animation'    =>  [
                        'label' =>  esc_html__( 'Animation', 'i-am-news' ),
                        'type'  =>  'select',
                        'choices'   =>  [
                            'none'  =>  esc_html__( 'None', 'i-am-news' ),
                            'grow'  =>  esc_html__( 'Grow', 'i-am-news' ),
                            'shrink'    =>  esc_html__( 'Shrink', 'i-am-news' ),
                            'rotate'    =>  esc_html__( 'Rotate', 'i-am-news' ),
                            'fade'  =>  esc_html__( 'Fade', 'i-am-news' ),
                            'slide-up'  =>  esc_html__( 'Slide Up', 'i-am-news' ),
                        ]
                    ],
                    'social_icons_icon_size'    =>  [
                        'label' =>  esc_html__( 'Icon Size', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'responsive'    =>  true,
                        'input_attrs'   =>  [
                            'min'   =>  12,
                            'max'   =>  40,
                            'step'  =>  1
                        ]
                    ],
                    'social_icons_color'    =>  [
                        'label' =>  esc_html__( 'Color', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'include_hover' =>  true
                    ],
                    'social_icons_spacing'  =>  [
                        'label' =>  esc_html__( 'Icon Spacing', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'input_attrs'   =>  [
                            'min'   =>  0,
                            'max'   =>  30,
                            'step'  =>  1
                        ]
                    ],
                    'social_icons_background'   =>  [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'include_hover' =>  true,
                        'color_types'   =>  [ 'solid', 'gradient' ]
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
                    'social_icons_section_tab' =>  'general',
                    'social_icons_target'   =>  '_blank',
                    'social_icons_use_brand_colors' =>  false,
                    'social_icons_style'    =>  'default',
                    'social_icons_animation'    =>  'none',
                    'social_icons_icon_size'    =>  $this->get_responsive( '14px', '14px', '14px' ),
                    'social_icons_color'    =>  [
                        'initial'   =>  $this->get_color(),
                        'hover'   =>  $this->get_color(),
                    ],
                    'social_icons_spacing'  =>  '5px',
                    'social_icons_background'   =>  [
                        'initial'   =>  $this->get_color(),
                        'hover'   =>  $this->get_color(),
                    ],
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    // 'social_icons_use_brand_colors' =>  [
                    //     'value' =>  self::get_theme_option( 'social_icons_use_brand_colors' ),
                    //     'default'   =>  $this->get_defaults( 'social_icons_use_brand_colors' ),
                    //     'selector'  =>  '.ian-social-icons',
                    //     'prefix'    =>  'official--'
                    // ],
                    'social_icons_style'    =>  [
                        'value' =>  self::get_theme_option( 'social_icons_style' ),
                        'default'   =>  $this->get_defaults( 'social_icons_style' ),
                        'selector'  =>  '.ian-social-icons',
                        'prefix'    =>  'style--'
                    ],
                    'social_icons_animation'    =>  [
                        'value' =>  self::get_theme_option( 'social_icons_animation' ),
                        'default'   =>  $this->get_defaults( 'social_icons_animation' ),
                        'selector'  =>  '.ian-social-icons',
                        'prefix'    =>  'animation--'
                    ],
                    'social_icons_icon_size'    =>  [
                        'value' =>  self::get_theme_option( 'social_icons_icon_size' ),
                        'default'   =>  $this->get_defaults( 'social_icons_icon_size' ),
                        'selector'  =>  '.ian-social-icons i',
                        'property'  =>  'font-size'
                    ],
                    'social_icons_spacing'  =>  [
                        'value' =>  self::get_theme_option( 'social_icons_spacing' ),
                        'default'   =>  $this->get_defaults( 'social_icons_spacing' ),
                        'selector'  =>  '.ian-header .ian-header-row .ian-social-icons',
                        'property'  =>  'gap'
                    ],
                    'social_icons_color'    =>  [
                        'value' =>  self::get_theme_option( 'social_icons_color' ),
                        'default'   =>  $this->get_defaults( 'social_icons_color' ),
                        'selector'  =>  '.ian-social-icons i',
                        'hover_selector'    =>  '.ian-social-icons i:hover',
                        'property'  =>  'color'
                    ],
                    'social_icons_background'   =>  [
                        'value' =>  self::get_theme_option( 'social_icons_background' ),
                        'default'   =>  $this->get_defaults( 'social_icons_background' ),
                        'selector'  =>  '.ian-social-icons i',
                        'hover_selector'    =>  '.ian-social-icons i:hover',
                        'property'  =>  'background'
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
                $block_class[] = 'official--' . ( self::get_theme_option( 'social_icons_use_brand_colors' ) ? 'on' : 'off' );
                $block_class[] = 'style--' . self::get_theme_option( 'social_icons_style' );
                $block_class[] = 'animation--' . self::get_theme_option( 'social_icons_animation' );

                $target = self::get_theme_option( 'social_icons_target' );
                
                echo '<div class="', esc_attr( implode( ' ', $block_class ) ), '">';

                    echo '<i class="fa-solid fa-plus"></i>';
                    echo '<i class="fa-solid fa-plus"></i>';
                    echo '<i class="fa-solid fa-plus"></i>';
                    echo '<i class="fa-solid fa-plus"></i>';
                    
                echo '</div><!-- .ian-social-icons -->';
            }
        }
        Social_Icons::get_instance();
    }