<?php
    /**
     * time section
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


    if( ! class_exists( __NAMESPACE__ . '\\Time' ) ) {
        /**
         * Time Class
         */
        class Time extends Section {
            /**
             * Section id
             * 
             * @since 1.0.0 
             */
            public $id = 'ian-time';

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
             * @return Time
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
                $this->add_section( 'time_section' );
                $this->add_control( 'time_typography' );
                $this->add_control( 'time_color' );
                $this->add_control( 'time_background' );
                $this->add_control( 'time_border' );
                $this->add_control( 'time_box_shadow' );
                $this->add_control( 'time_padding' );
            }

            /**
             * Settings
             * 
             * @param string $id    The setting id
             * @since 1.0.0
             */
            public function get_settings( $id = '' ): array {
                $settings = [
                    'time_typography' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_typography' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'time_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'time_background' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'time_border' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_border' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'time_box_shadow' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'time_padding' =>  [
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
                    'time_section' =>  [
                        'title' =>  esc_html__( 'Time', 'i-am-news' )
                    ],
                    'time_typography' =>  [
                        'label' =>  esc_html__( 'Typography', 'i-am-news' ),
                        'type'  =>  'typography'
                    ],
                    'time_color' =>  [
                        'label' =>  esc_html__( 'Color', 'i-am-news' ),
                        'type'  =>  'ian-color'
                    ],
                    'time_background' =>  [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ],
                    'time_border' =>  [
                        'label' =>  esc_html__( 'Border', 'i-am-news' ),
                        'type'  =>  'border'
                    ],
                    'time_box_shadow' =>  [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow'
                    ],
                    'time_padding' =>  [
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
                    'time_section_tab' =>  'general',
                    'time_typography'  =>  $this->get_typography(),
                    'time_color'  =>  $this->get_color(),
                    'time_background' =>  $this->get_color(),
                    'time_border'  =>  $this->get_border(),
                    'time_box_shadow'  =>  $this->get_box_shadow(),
                    'time_padding' =>  $this->get_dimension(),
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'time_typography'  =>  [
                        'value' =>  self::get_theme_option( 'time_typography' ),
                        'selector'  =>  '.time-section > span',
                        'default'   =>  $this->get_defaults( 'time_typography' ),
                        'variable'  =>  false
                    ],
                    'time_color'  =>  [
                        'value' =>  self::get_theme_option( 'time_color' ),
                        'default'   =>  $this->get_defaults( 'time_color' ),
                        'selector'  =>  '.time-section .time',
                        'property'  =>  'color'
                    ],
                    'time_background' =>  [
                        'value' =>  self::get_theme_option( 'time_background' ),
                        'default'   =>  $this->get_defaults( 'time_background' ),
                        'selector'  =>  '.time-section',
                        'property'  =>  'background'
                    ],
                    'time_border'  =>  [
                        'value' =>  self::get_theme_option( 'time_border' ),
                        'default'   =>  $this->get_defaults( 'time_border' ),
                        'selector'  =>  '.time-section'
                    ],
                    'time_box_shadow'  =>  [
                        'value' =>  self::get_theme_option( 'time_box_shadow' ),
                        'default'   =>  $this->get_defaults( 'time_box_shadow' ),
                        'selector'  =>  '.time-section'
                    ],
                    'time_padding' =>  [
                        'value' =>  self::get_theme_option( 'time_padding' ),
                        'default'   =>  $this->get_defaults( 'time_padding' ),
                        'selector'  =>  '.time-section',
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
                $block_class[] = 'time-section';
                $block_class[] = 'header-widget';

                echo '<div class="', esc_attr( implode( ' ', $block_class ) ), '">';

                    echo '<span class="time">', date( 'h:i:s' ), '</span>';
                    
                echo '</div><!-- .time-section -->';
            }
        }
        Time::get_instance();
    }