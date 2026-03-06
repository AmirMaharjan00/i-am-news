<?php
    /**
     * Primary Menu section
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


    if( ! class_exists( __NAMESPACE__ . '\\Primary_Menu' ) ) {
        /**
         * Primary_Menu Class
         */
        class Primary_Menu extends Section {
            /**
             * Section id
             * 
             * @since 1.0.0 
             */
            public $id = 'ian-primary-menu';

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
             * @return Primary_Menu
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
                $this->add_section( 'primary_menu_section' );
                $this->add_control( 'primary_menu_section_tab' );
            }

            /**
             * Settings
             * 
             * @param string $id    The setting id
             * @since 1.0.0
             */
            public function get_settings( $id = '' ): array {
                $settings = [
                    'primary_menu_section_tab' =>  [
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
                    'primary_menu_section' =>  [
                        'title' =>  esc_html__( 'Primary Menu', 'i-am-news' )
                    ],
                    'primary_menu_section_tab' =>  array_merge( $this->common, [
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
                self::update_theme_defaults( [
                    'primary_menu_section_tab' =>  'general',
                ] );
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
                $block_class[] = $this->id;
                $block_class[] = 'header-widget';

                echo '<div class="', esc_attr( implode( ' ', $block_class ) ), '">';

                    wp_nav_menu( [
                        'menu'  =>  'menu-1'
                    ] );
                    
                echo '</div><!-- .date-time-section -->';
            }
        }
        Primary_Menu::get_instance();
    }