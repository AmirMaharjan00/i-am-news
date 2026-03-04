<?php
    /**
     * Date time section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Section\Section as Section;
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
                $this->add_control( 'date_time_enable_date' );
                $this->add_control( 'date_time_enable_time' );
                $this->tab = 'design';
                $this->add_control( 'date_time_typography' );
                $this->add_control( 'date_time_date_color' );
                $this->add_control( 'date_time_date_background' );
                $this->add_control( 'date_time_border' );
                $this->add_control( 'date_time_box_shadow' );
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
                    'date_time_enable_date' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_toggle' ],
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
                    'date_time_border' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_border' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'date_time_box_shadow' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
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
                        'title' =>  esc_html__( 'Date Time', 'i-am-news' ),
                        'active_callback'   =>  function(){ return false; }
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
                    'date_time_enable_date' =>  [
                        'label' =>  esc_html__( 'Enable Date', 'i-am-news' ),
                        'type'  =>  'toggle-button'
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
                        'label' =>  esc_html__( 'Date color', 'i-am-news' ),
                        'type'  =>  'ian-color'
                    ],
                    'date_time_date_background' =>  [
                        'label' =>  esc_html__( 'Date Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ],
                    'date_time_border' =>  [
                        'label' =>  esc_html__( 'Border', 'i-am-news' ),
                        'type'  =>  'border'
                    ],
                    'date_time_box_shadow' =>  [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow'
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
                $this->defaults = [
                    'date_time_section_tab' =>  'general',
                    'date_time_enable_date' =>  true,
                    'date_time_enable_time' =>  true,
                    'date_time_typography'  =>  $this->get_typography(),
                    'date_time_date_color'  =>  $this->get_color(),
                    'date_time_date_background' =>  $this->get_color(),
                    'date_time_border'  =>  $this->get_border(),
                    'date_time_box_shadow'  =>  $this->get_box_shadow(),
                    'date_time_padding' =>  $this->get_dimension(),
                ];
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'date_time_typography'  =>  [
                        'value' =>  $this->get_customizer_value( 'date_time_typography' ),
                        'selector'  =>  '.date-time-section > span',
                        'default'   =>  $this->get_defaults( 'date_time_typography' ),
                        'variable'  =>  false
                    ],
                    'date_time_date_color'  =>  [
                        'value' =>  $this->get_customizer_value( 'date_time_date_color' ),
                        'default'   =>  $this->get_defaults( 'date_time_date_color' ),
                        'selector'  =>  '.date-time-section .date',
                        'property'  =>  'color'
                    ],
                    'date_time_date_background' =>  [
                        'value' =>  $this->get_customizer_value( 'date_time_date_background' ),
                        'default'   =>  $this->get_defaults( 'date_time_date_background' ),
                        'selector'  =>  '.date-time-section .date',
                        'property'  =>  'background'
                    ],
                    'date_time_border'  =>  [
                        'value' =>  $this->get_customizer_value( 'date_time_border' ),
                        'default'   =>  $this->get_defaults( 'date_time_border' ),
                        'selector'  =>  '.date-time-section'
                    ],
                    'date_time_box_shadow'  =>  [
                        'value' =>  $this->get_customizer_value( 'date_time_box_shadow' ),
                        'default'   =>  $this->get_defaults( 'date_time_box_shadow' ),
                        'selector'  =>  '.date-time-section'
                    ],
                    'date_time_padding' =>  [
                        'value' =>  $this->get_customizer_value( 'date_time_padding' ),
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
                $enable_date = $this->get_customizer_value( 'date_time_enable_date' );
                $enable_time = $this->get_customizer_value( 'date_time_enable_time' );
                if( ! $enable_date && ! $enable_time ) return;
                
                $block_class[] = 'date-time-section';

                echo '<div class="', esc_attr( implode( ' ', $block_class ) ), '">';

                    if( $enable_date ) echo '<span class="date">', date( 'l jS \of F Y' ), '</span>';

                    if( $enable_time ) echo '<span class="time">', date( 'h:i:s' ), '</span>';
                    
                echo '</div><!-- .date-time-section -->';
            }
        }
        Date_Time::get_instance();
    }