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
                    'dark_mode_section_tab' =>  'general'
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_args = [

                ];
                return $dynamic_args;
            }

            /**
             * Render HTML
             * 
             * @since 1.0.0
             */
            public function render_html() {

            }
        }
        Dark_Mode::get_instance();
    }