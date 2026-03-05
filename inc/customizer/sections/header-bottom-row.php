<?php
    /**
     * Header bottom row section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Section\Section as Section;
    use IAN\Helpers;

    use Utility;

    use function esc_html__;
    use function esc_attr;
    use function get_template_directory_uri;


    if( ! class_exists( __NAMESPACE__ . '\\Header_Bottom_Row' ) ) {
        /**
         * Header_Bottom_Row Class
         */
        class Header_Bottom_Row extends Section {
            /**
             * Section id
             * 
             * @since 1.0.0 
             */
            public $id = 'ian-header-bottom-row';

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
             * @return Header_Bottom_Row
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
                $this->add_section( 'header_bottom_row_section' );
                $this->add_control( 'header_bottom_row_section_tab' );
                $this->add_control( 'header_bottom_row_bottom_column_heading_toggle' );
                $this->add_control( 'header_bottom_row_bottom_column_width_behavior' );
                $this->add_control( 'header_bottom_row_second_column_heading_toggle' );
                $this->add_control( 'header_bottom_row_second_column_width_behavior' );
                $this->add_control( 'header_bottom_row_third_column_heading_toggle' );
                $this->add_control( 'header_bottom_row_third_column_width_behavior' );
                $this->tab = 'design';
                $this->add_control( 'header_bottom_row_background' );
                $this->add_control( 'header_bottom_row_border' );
                $this->add_control( 'header_bottom_row_box_shadow' );
                $this->add_control( 'header_bottom_row_padding' );

            }

            /**
             * Settings
             * 
             * @param string $id    The setting id
             * @since 1.0.0
             */
            public function get_settings( $id = '' ): array {
                $settings = [
                    'header_bottom_row_section_tab'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_bottom_column_heading_toggle'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_second_column_heading_toggle'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_third_column_heading_toggle'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_bottom_column_width_behavior'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_second_column_width_behavior'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_third_column_width_behavior'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_background'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_border'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_border' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_box_shadow'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_bottom_row_padding'    =>  [
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
                    'header_bottom_row_section' =>  [
                        'title' =>  esc_html__( 'Header Bottom Row', 'i-am-news' )
                    ],
                    'header_bottom_row_section_tab' =>  array_merge( $this->common, [
                        'type'  =>  'section-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'General', 'i-am-news' ),
                                'value' =>  'general'
                            ],
                            [
                                'label' =>  esc_html__( 'Design', 'i-am-news' ),
                                'value' =>  'design'
                            ]
                        ]
                    ] ),
                    'header_bottom_row_bottom_column_heading_toggle' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Bottom Column Settings', 'i-am-news' ),
                        'type'  =>  'heading-toggle'
                    ] ),
                    'header_bottom_row_second_column_heading_toggle' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Second Column Settings', 'i-am-news' ),
                        'type'  =>  'heading-toggle'
                    ] ),
                    'header_bottom_row_third_column_heading_toggle' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Third Column Settings', 'i-am-news' ),
                        'type'  =>  'heading-toggle'
                    ] ),
                    'header_bottom_row_bottom_column_width_behavior' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Width Behavior', 'i-am-news' ),
                        'description' =>  esc_html__( 'Controls how a column expands within the header row.', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Auto', 'i-am-news' ),
                                'value' =>  'auto'
                            ],
                            [
                                'label' =>  esc_html__( 'Shrink', 'i-am-news' ),
                                'value' =>  'shrink'
                            ],
                            [
                                'label' =>  esc_html__( 'Expand', 'i-am-news' ),
                                'value' =>  'expand'
                            ]
                        ]
                    ] ),
                    'header_bottom_row_second_column_width_behavior' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Width Behavior', 'i-am-news' ),
                        'description' =>  esc_html__( 'Controls how a column expands within the header row.', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Auto', 'i-am-news' ),
                                'value' =>  'auto'
                            ],
                            [
                                'label' =>  esc_html__( 'Shrink', 'i-am-news' ),
                                'value' =>  'shrink'
                            ],
                            [
                                'label' =>  esc_html__( 'Expand', 'i-am-news' ),
                                'value' =>  'expand'
                            ]
                        ]
                    ] ),
                    'header_bottom_row_third_column_width_behavior' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Width Behavior', 'i-am-news' ),
                        'description' =>  esc_html__( 'Controls how a column expands within the header row.', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Auto', 'i-am-news' ),
                                'value' =>  'auto'
                            ],
                            [
                                'label' =>  esc_html__( 'Shrink', 'i-am-news' ),
                                'value' =>  'shrink'
                            ],
                            [
                                'label' =>  esc_html__( 'Expand', 'i-am-news' ),
                                'value' =>  'expand'
                            ]
                        ]
                    ] ),
                    'header_bottom_row_background' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ] ),
                    'header_bottom_row_border' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Border', 'i-am-news' ),
                        'type'  =>  'border'
                    ] ),
                    'header_bottom_row_box_shadow' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                    ] ),
                    'header_bottom_row_padding' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Padding', 'i-am-news' ),
                        'type'  =>  'dimension',
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
                    'header_bottom_row_section_tab' =>  'general',
                    'header_bottom_row_bottom_column_heading_toggle' => true,
                    'header_bottom_row_second_column_heading_toggle' => false,
                    'header_bottom_row_third_column_heading_toggle' => false,
                    'header_bottom_row_bottom_column_width_behavior' => 'auto',
                    'header_bottom_row_second_column_width_behavior' => 'auto',
                    'header_bottom_row_third_column_width_behavior' => 'auto',
                    'header_bottom_row_background' =>  $this->get_color(),
                    'header_bottom_row_border' =>  $this->get_border(),
                    'header_bottom_row_box_shadow' =>  $this->get_box_shadow(),
                    'header_bottom_row_padding'    =>  $this->get_dimension(),
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'header_bottom_row_background' =>  [
                        'value' =>  self::get_theme_option( 'header_bottom_row_background' ),
                        'selector'  =>  '.ian-header-bottom-row',
                        'default'   =>  $this->get_defaults( 'header_bottom_row_background' ),
                        'property'  =>  'background'
                    ],
                    'header_bottom_row_border' =>  [
                        'value' =>  self::get_theme_option( 'header_bottom_row_border' ),
                        'selector'  =>  '.ian-header-bottom-row',
                        'default'   =>  $this->get_defaults( 'header_bottom_row_border' )
                    ],
                    'header_bottom_row_box_shadow' =>  [
                        'value' =>  self::get_theme_option( 'header_bottom_row_box_shadow' ),
                        'selector'  =>  '.ian-header-bottom-row',
                        'default'   =>  $this->get_defaults( 'header_bottom_row_box_shadow' )
                    ],
                    'header_bottom_row_padding'    =>  [
                        'value' =>  self::get_theme_option( 'header_bottom_row_padding' ),
                        'selector'  =>  '.ian-header-bottom-row',
                        'default'   =>  $this->get_defaults( 'header_bottom_row_padding' ),
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
                $block_class[] = $this->id;
                
                $header_builder = self::get_theme_option( 'header_builder' );
                $bottom_row = $header_builder[ 'bottom' ];
                ?>  
                    <div class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">
                        <?php
                            foreach( $bottom_row as $column => $widgets ) :
                                if( ! empty( $widgets ) ) :
                                    foreach( $widgets as $widget ) :
                                        Utility::get_header_builder_widget_html( $widget );
                                    endforeach;
                                endif;
                            endforeach;
                        ?>
                    </div>
                <?php
            }
        }
        Header_Bottom_Row::get_instance();
    }