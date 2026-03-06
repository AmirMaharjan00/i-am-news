<?php
    /**
     * Site Logo Section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Section\Section as Section;
    use IAN\Helpers;

    use function esc_html__;

    if( __NAMESPACE__ . '\\Site_Logo' ) {
        /**
         * Site Logo class
         */
        class Site_Logo extends Section {
            /**
             * Section Id
             * 
             * @since 1.0.0
             * @var string
             */
            public $id = 'ian-site-logo';

            /**
             * Class instance 
             * 
             * @since 1.0.0
             * @var Site_Logo;
             */
            private static $instance = null;

            /**
             * Get instance
             * 
             * @since 1.0.0
             * @return Site_Logo
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
                $this->section = 'title_tagline';
                $this->add_control( 'site_logo_section_tab' );
            }

            /**
             * Settings
             * 
             * @since 1.0.0
             */
            public function get_settings( $id = '' ) {
                $settings = [
                    'site_logo_section_tab' =>  [
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
                    'site_logo_section_tab' =>  [
                        'type'  =>  'section-tab',
                        'priority'  =>  5,
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
                    'site_logo_section_tab' =>  'general'
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
                $title_tag = ( is_home() || is_front_page() ) ? 'h1' : 'p';

                echo '<div class="site-logo">';

                    echo '<a href="', esc_url( home_url() ),'" rel="home"><', $title_tag,' class="site-title">', esc_html( get_bloginfo( 'title' ) ),'</', $title_tag,'></a>';

                    echo '<p class="site-description">', esc_html( get_bloginfo( 'description' ) ),'</p>';

                echo '</div>';
            }
        }
        Site_Logo::get_instance();
    }