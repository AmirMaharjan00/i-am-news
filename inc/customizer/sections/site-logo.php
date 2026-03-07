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
    use function the_custom_logo;

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
                $this->manager->remove_control( 'header_textcolor' );
                $this->manager->get_control( 'custom_logo' )->priority = 6;
                $this->add_control( 'site_logo_dark' );
                $this->manager->get_control( 'site_logo_dark' )->priority = 6;
                $this->tab = 'design';
                $this->add_control( 'site_title_color' );
                $this->add_control( 'site_description_color' );
                $this->add_control( 'site_logo_width' );
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
                    'site_logo_dark' =>  [
                        // 'sanitize_callback' =>  'absint',
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'site_title_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'site_description_color' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'site_logo_width' =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_range' ],
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
                    'site_logo_dark' =>  [
                        'label' =>  esc_html__( 'Dark Logo', 'i-am-news' ),
                        'description' =>  esc_html__( 'Add logo for dark mode. Will only be visible when dark is enabled.', 'i-am-news' ),
                        'type'  =>  'media',
                        'mime_type' =>  'image'
                    ],
                    'site_title_color' =>  [
                        'label' =>  esc_html__( 'Site Title', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'include_hover' =>  true
                    ],
                    'site_description_color' =>  [
                        'label' =>  esc_html__( 'Site Description', 'i-am-news' ),
                        'type'  =>  'ian-color'
                    ],
                    'site_logo_width' =>  [
                        'label' =>  esc_html__( 'Logo Width', 'i-am-news' ),
                        'type'  =>  'ian-number',
                        'responsive'    =>  true,
                        'input_attrs'   =>  [
                            'min'   =>  100,
                            'max'   =>  500,
                            'step'  =>  1
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
                    'site_logo_section_tab' =>  'general',
                    'site_logo_dark' =>  0,
                    'site_title_color' =>  [
                        'initial'   =>  $this->get_color(),
                        'hover'   =>  $this->get_color(),
                    ],
                    'site_description_color' =>  $this->get_color(),
                    'site_logo_width' =>  $this->get_responsive( '150px', '130px', '100px' ),
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_args = [
                    'site_title_color'  =>  [
                        'value' =>  self::get_theme_option( 'site_title_color' ),
                        'default' =>  $this->get_defaults( 'site_title_color' ),
                        'selector'  =>  '.ian-site-logo .site-title',
                        'hover_selector'  =>  '.ian-site-logo .site-title:hover',
                        'property'  =>  'color'
                    ],
                    'site_description_color'    =>  [
                        'value' =>  self::get_theme_option( 'site_description_color' ),
                        'default' =>  $this->get_defaults( 'site_description_color' ),
                        'selector'  =>  '.ian-site-logo .site-description',
                        'property'  =>  'color'
                    ],
                    'site_logo_width'    =>  [
                        'value' =>  self::get_theme_option( 'site_logo_width' ),
                        'default' =>  $this->get_defaults( 'site_logo_width' ),
                        'selector'  =>  '.ian-site-logo .custom-logo-link .custom-logo',
                        'property'  =>  'width'
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
                $block_class[] = $this->id;
                $block_class[] = 'header-widget';
                $title_tag = ( is_home() || is_front_page() ) ? 'h1' : 'p';

                $dark_logo = self::get_theme_option( 'site_logo_dark' );

                echo '<div class="', esc_attr( implode( ' ', $block_class ) ),'">';

                    the_custom_logo();

                    if( $dark_logo ) echo '<a href="', esc_url( home_url() ),'" class="custom-logo-link">', wp_get_attachment_image( $dark_logo, 'thumbnail', false, [ 'class' => 'custom-logo' ] ),'</a>';

                    if( display_header_text() ) :

                        echo '<a href="', esc_url( home_url() ),'" rel="home"><', $title_tag,' class="site-title">', esc_html( get_bloginfo( 'title' ) ),'</', $title_tag,'></a>';
    
                        echo '<p class="site-description">', esc_html( get_bloginfo( 'description' ) ),'</p>';

                    endif;

                echo '</div>';
            }
        }
        Site_Logo::get_instance();
    }