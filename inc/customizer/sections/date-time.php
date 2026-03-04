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
                    'date_time_section_tab' =>  'general'
                ];
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [

                ];
                return $dynamic_css_args;
            }

            /**
             * Render html
             * 
             * @since 1.0.0
             */
            public function render_html() {
                ?>
                    <div class="date-time-section">

                        Date time
                    </div>
                <?php
            }
        }
        Date_Time::get_instance();
    }