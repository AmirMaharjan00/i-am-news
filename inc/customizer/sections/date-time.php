<?php
    /**
     * Date time section
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


    if( ! class_exists( __NAMESPACE__ . '\\Date_Time' ) ) {
        /**
         * Date_Time Class
         */
        class Date_Time extends Section {
            /**
             * Section id
             * 
             * @since 1.0.0 
             */
            public $id = 'ian-date-time';

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
             * @return Date_Time
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
                $this->add_section( 'date_time_section' );
                $this->add_control( 'date_time_section_tab' );
                $this->add_control( 'date_time_date_format' );
                $this->add_control( 'date_time_enable_time' );
                $this->tab = 'design';
                $this->add_control( 'date_time_typography' );
                $this->add_control( 'date_time_date_color' );
                $this->add_control( 'date_time_date_background' );
                $this->add_control( 'date_time_border_radius' );
                $this->add_control( 'date_time_padding' );
            }

            /**
             * Settings
             * 
             * @param string $id    The setting id
             * @since 1.0.0
             */
            public function get_settings( $id = '' ): array {
                $settings = [
                    'date_time_section_tab' =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_date_format' =>  [
                        'sanitize_callback' =>  'sanitize_text_field',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_enable_time' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_toggle' ],
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_typography' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_typography' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_date_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_date_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_border_radius' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_padding' =>  [
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
                    'date_time_section' =>  [
                        'title' =>  esc_html__( 'Date Time', 'i-am-news' )
                    ],
                    'date_time_section_tab' =>  array_merge( $this->common, [
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
                    'date_time_date_format' =>  [
                        'label' =>  esc_html__( 'Date Format', 'i-am-news' ),
                        'type'  =>  'select',
                        'choices'   =>  [
                            // Weekdays + full month + ordinal
                            'l, jS F Y' =>  esc_html__( 'Sunday, 6th March 2026', 'i-am-news' ),
                            'D, jS M Y' =>  esc_html__( 'Sun, 6th Mar 2026', 'i-am-news' ),
                            'l, F jS, Y'    =>  esc_html__( 'Sunday, March 6th, 2026', 'i-am-news' ),
                            'D, M jS, Y'    =>  esc_html__( 'Mon, Mar 6th, 2026', 'i-am-news' ),
                            // Ordinal without weekday
                            'jS F Y'    =>  esc_html__( '6th March 2026', 'i-am-news' ),
                            'F jS, Y'   =>  esc_html__( 'March 6th, 2026', 'i-am-news' ),
                            'jS M Y'    =>  esc_html__( '6th Mar 2026', 'i-am-news' ),
                            'M jS, Y'   =>  esc_html__( 'Mar 6th, 2026', 'i-am-news' ),
                            // Numeric formats
                            'Y-m-d' =>  esc_html__( '2026-03-06 (Y-m-d)', 'i-am-news' ),
                            'm/d/Y' =>  esc_html__( '03/06/2026 (m/d/Y)', 'i-am-news' ),
                            'd/m/Y' =>  esc_html__( '06/03/2026 (d/m/Y)', 'i-am-news' ),
                            'm-d-Y' =>  esc_html__( '03-06-2026 (m-d-Y)', 'i-am-news' ),
                            'd-m-Y' =>  esc_html__( '06-03-2026 (d-m-Y)', 'i-am-news' ),
                            'Ymd'   =>  esc_html__( '20260306 (Ymd)', 'i-am-news' ),
                            'm.d.Y' =>  esc_html__( '03.06.2026 (m.d.Y)', 'i-am-news' ),
                            'd.m.Y' =>  esc_html__( '06.03.2026 (d.m.Y)', 'i-am-news' ),
                        ]
                    ],
                    'date_time_enable_time' =>  [
                        'label' =>  esc_html__( 'Enable Time', 'i-am-news' ),
                        'type'  =>  'toggle-button'
                    ],
                    'date_time_typography' =>  [
                        'label' =>  esc_html__( 'Typography', 'i-am-news' ),
                        'type'  =>  'typography'
                    ],
                    'date_time_date_color' =>  [
                        'label' =>  esc_html__( 'Color', 'i-am-news' ),
                        'type'  =>  'ian-color'
                    ],
                    'date_time_date_background' =>  [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ],
                    'date_time_border_radius' =>  [
                        'label' =>  esc_html__( 'Border Radius', 'i-am-news' ),
                        'type'  =>  'ian-number'
                    ],
                    'date_time_padding' =>  [
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
                    'date_time_section_tab' =>  'general',
                    'date_time_date_format' =>  'l, jS F Y',
                    'date_time_enable_time' =>  false,
                    'date_time_typography'  =>  $this->get_typography(),
                    'date_time_date_color'  =>  $this->get_color(),
                    'date_time_date_background' =>  $this->get_color(),
                    'date_time_border_radius'  =>  '0px',
                    'date_time_padding' =>  $this->get_dimension(),
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'date_time_typography'  =>  [
                        'value' =>  self::get_theme_option( 'date_time_typography' ),
                        'selector'  =>  '.date-time-section',
                        'default'   =>  $this->get_defaults( 'date_time_typography' ),
                        'variable'  =>  false
                    ],
                    'date_time_date_color'  =>  [
                        'value' =>  self::get_theme_option( 'date_time_date_color' ),
                        'default'   =>  $this->get_defaults( 'date_time_date_color' ),
                        'selector'  =>  '.date-time-section',
                        'property'  =>  'color'
                    ],
                    'date_time_date_background' =>  [
                        'value' =>  self::get_theme_option( 'date_time_date_background' ),
                        'default'   =>  $this->get_defaults( 'date_time_date_background' ),
                        'selector'  =>  '.date-time-section',
                        'property'  =>  'background'
                    ],
                    'date_time_border_radius'  =>  [
                        'value' =>  self::get_theme_option( 'date_time_border_radius' ),
                        'default'   =>  $this->get_defaults( 'date_time_border_radius' ),
                        'selector'  =>  '.date-time-section',
                        'property'  =>  'border-radius'
                    ],
                    'date_time_padding' =>  [
                        'value' =>  self::get_theme_option( 'date_time_padding' ),
                        'default'   =>  $this->get_defaults( 'date_time_padding' ),
                        'selector'  =>  '.date-time-section',
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
                $block_class[] = 'date-time-section';
                $block_class[] = 'header-widget';
                
                $enable_time = self::get_theme_option( 'date_time_enable_time' );

                echo '<div class="', esc_attr( implode( ' ', $block_class ) ), '">';

                    echo '<span class="date">', date( self::get_theme_option( 'date_time_date_format' ) ), '</span>';

                    if( $enable_time ) echo '<span class="time">', date( 'h:i:s' ), '</span>';
                    
                echo '</div><!-- .date-time-section -->';
            }
        }
        Date_Time::get_instance();
    }