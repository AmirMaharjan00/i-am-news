<?php
    /**
     * Header middle row section
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


    if( ! class_exists( __NAMESPACE__ . '\\Header_Middle_Row' ) ) {
        /**
         * Header_Middle_Row Class
         */
        class Header_Middle_Row extends Section {
            /**
             * Section id
             * 
             * @since 1.0.0 
             */
            public $id = 'ian-header-middle-row';

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
             * @return Header_Middle_Row
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
                $this->add_section( 'header_middle_row_section' );
                $this->add_control( 'header_middle_row_section_tab' );
                $this->add_control( 'header_middle_row_first_column_heading_toggle' );
                $this->add_control( 'header_middle_row_first_column_width_behavior' );
                $this->add_control( 'header_middle_row_first_column_alignment' );
                $this->add_control( 'header_middle_row_second_column_heading_toggle' );
                $this->add_control( 'header_middle_row_second_column_width_behavior' );
                $this->add_control( 'header_middle_row_second_column_alignment' );
                $this->add_control( 'header_middle_row_third_column_heading_toggle' );
                $this->add_control( 'header_middle_row_third_column_width_behavior' );
                $this->add_control( 'header_middle_row_third_column_alignment' );
                $this->tab = 'design';
                $this->add_control( 'header_middle_row_background' );
                $this->add_control( 'header_middle_row_border' );
                $this->add_control( 'header_middle_row_box_shadow' );
                $this->add_control( 'header_middle_row_padding' );

            }

            /**
             * Settings
             * 
             * @param string $id    The setting id
             * @since 1.0.0
             */
            public function get_settings( $id = '' ): array {
                $settings = [
                    'header_middle_row_section_tab'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_first_column_heading_toggle'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_second_column_heading_toggle'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_third_column_heading_toggle'    =>  [
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_first_column_width_behavior'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_second_column_width_behavior'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_third_column_width_behavior'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_first_column_alignment'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_second_column_alignment'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_third_column_alignment'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_radio_tab' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_background'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_color' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_border'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_border' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_box_shadow'    =>  [
                        'sanitize_callback' =>  [ $this, 'sanitize_box_shadow' ],
                        'transport' =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'header_middle_row_padding'    =>  [
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
                    'header_middle_row_section' =>  [
                        'title' =>  esc_html__( 'Header Middle Row', 'i-am-news' )
                    ],
                    'header_middle_row_section_tab' =>  array_merge( $this->common, [
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
                    'header_middle_row_first_column_heading_toggle' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'First Column Settings', 'i-am-news' ),
                        'type'  =>  'heading-toggle'
                    ] ),
                    'header_middle_row_second_column_heading_toggle' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Second Column Settings', 'i-am-news' ),
                        'type'  =>  'heading-toggle'
                    ] ),
                    'header_middle_row_third_column_heading_toggle' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Third Column Settings', 'i-am-news' ),
                        'type'  =>  'heading-toggle'
                    ] ),
                    'header_middle_row_first_column_width_behavior' =>  array_merge( $this->common, [
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
                    'header_middle_row_second_column_width_behavior' =>  array_merge( $this->common, [
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
                    'header_middle_row_third_column_width_behavior' =>  array_merge( $this->common, [
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
                    'header_middle_row_first_column_alignment' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Alignment', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Left', 'i-am-news' ),
                                'value' =>  'left'
                            ],
                            [
                                'label' =>  esc_html__( 'Center', 'i-am-news' ),
                                'value' =>  'center'
                            ],
                            [
                                'label' =>  esc_html__( 'Right', 'i-am-news' ),
                                'value' =>  'right'
                            ]
                        ],
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'value' =>  'expand',
                                    'operator'  =>  '==',
                                    'setting'   =>  'header_middle_row_first_column_width_behavior'
                                ]
                            ]
                        ]
                    ] ),
                    'header_middle_row_second_column_alignment' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Alignment', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Left', 'i-am-news' ),
                                'value' =>  'left'
                            ],
                            [
                                'label' =>  esc_html__( 'Center', 'i-am-news' ),
                                'value' =>  'center'
                            ],
                            [
                                'label' =>  esc_html__( 'Right', 'i-am-news' ),
                                'value' =>  'right'
                            ]
                        ],
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'value' =>  'expand',
                                    'operator'  =>  '==',
                                    'setting'   =>  'header_middle_row_second_column_width_behavior'
                                ]
                            ]
                        ]
                    ] ),
                    'header_middle_row_third_column_alignment' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Alignment', 'i-am-news' ),
                        'type'  =>  'radio-tab',
                        'fields'    =>  [
                            [
                                'label' =>  esc_html__( 'Left', 'i-am-news' ),
                                'value' =>  'left'
                            ],
                            [
                                'label' =>  esc_html__( 'Center', 'i-am-news' ),
                                'value' =>  'center'
                            ],
                            [
                                'label' =>  esc_html__( 'Right', 'i-am-news' ),
                                'value' =>  'right'
                            ]
                        ],
                        'conditions'    =>  [
                            'relation'  =>  'AND',
                            'rules' =>  [
                                [
                                    'value' =>  'expand',
                                    'operator'  =>  '==',
                                    'setting'   =>  'header_middle_row_third_column_width_behavior'
                                ]
                            ]
                        ]
                    ] ),
                    'header_middle_row_background' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Background', 'i-am-news' ),
                        'type'  =>  'ian-color',
                        'color_types'   =>  [ 'solid', 'gradient' ]
                    ] ),
                    'header_middle_row_border' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Border', 'i-am-news' ),
                        'type'  =>  'border'
                    ] ),
                    'header_middle_row_box_shadow' =>  array_merge( $this->common, [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                    ] ),
                    'header_middle_row_padding' =>  array_merge( $this->common, [
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
                    'header_middle_row_section_tab' =>  'general',
                    'header_middle_row_first_column_heading_toggle' => true,
                    'header_middle_row_second_column_heading_toggle' => false,
                    'header_middle_row_third_column_heading_toggle' => false,
                    'header_middle_row_first_column_width_behavior' => 'auto',
                    'header_middle_row_second_column_width_behavior' => 'auto',
                    'header_middle_row_third_column_width_behavior' => 'auto',
                    'header_middle_row_first_column_alignment' => 'left',
                    'header_middle_row_second_column_alignment' => 'left',
                    'header_middle_row_third_column_alignment' => 'left',
                    'header_middle_row_background' =>  $this->get_color(),
                    'header_middle_row_border' =>  $this->get_border(),
                    'header_middle_row_box_shadow' =>  $this->get_box_shadow(),
                    'header_middle_row_padding'    =>  $this->get_dimension(),
                ] );
            }

            /**
             * Get dynamic css args
             * 
             * @since 1.0.0
             */
            public function get_dynamic_css_args(): array {
                $dynamic_css_args = [
                    'header_middle_row_first_column_width_behavior' =>  [
                        'selector'  =>  '.ian-header-middle-row .column.first',
                        'prefix'    =>  'width--'
                    ],
                    'header_middle_row_second_column_width_behavior' =>  [
                        'selector'  =>  '.ian-header-middle-row .column.second',
                        'prefix'    =>  'width--'
                    ],
                    'header_middle_row_third_column_width_behavior' =>  [
                        'selector'  =>  '.ian-header-middle-row .column.third',
                        'prefix'    =>  'width--'
                    ],
                    'header_middle_row_first_column_alignment' =>  [
                        'selector'  =>  '.ian-header-middle-row .column.first',
                        'prefix'    =>  'align--'
                    ],
                    'header_middle_row_second_column_alignment' =>  [
                        'selector'  =>  '.ian-header-middle-row .column.second',
                        'prefix'    =>  'align--'
                    ],
                    'header_middle_row_third_column_alignment' =>  [
                        'selector'  =>  '.ian-header-middle-row .column.third',
                        'prefix'    =>  'align--'
                    ],
                    'header_middle_row_background' =>  [
                        'value' =>  self::get_theme_option( 'header_middle_row_background' ),
                        'selector'  =>  '.ian-header-middle-row',
                        'default'   =>  $this->get_defaults( 'header_middle_row_background' ),
                        'property'  =>  'background'
                    ],
                    'header_middle_row_border' =>  [
                        'value' =>  self::get_theme_option( 'header_middle_row_border' ),
                        'selector'  =>  '.ian-header-middle-row',
                        'default'   =>  $this->get_defaults( 'header_middle_row_border' )
                    ],
                    'header_middle_row_box_shadow' =>  [
                        'value' =>  self::get_theme_option( 'header_middle_row_box_shadow' ),
                        'selector'  =>  '.ian-header-middle-row',
                        'default'   =>  $this->get_defaults( 'header_middle_row_box_shadow' )
                    ],
                    'header_middle_row_padding'    =>  [
                        'value' =>  self::get_theme_option( 'header_middle_row_padding' ),
                        'selector'  =>  '.ian-header-middle-row',
                        'default'   =>  $this->get_defaults( 'header_middle_row_padding' ),
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
                $block_class[] = 'ian-header-row';
                
                $header_builder = self::get_theme_option( 'header_builder' );
                $middle_row = $header_builder[ 'middle' ];

                $width_behavior[ 'first' ] = self::get_theme_option( 'header_middle_row_first_column_width_behavior' );
                $width_behavior[ 'second' ] = self::get_theme_option( 'header_middle_row_second_column_width_behavior' );
                $width_behavior[ 'third' ] = self::get_theme_option( 'header_middle_row_third_column_width_behavior' );

                $alignment[ 'first' ] = self::get_theme_option( 'header_middle_row_first_column_alignment' );
                $alignment[ 'second' ] = self::get_theme_option( 'header_middle_row_second_column_alignment' );
                $alignment[ 'third' ] = self::get_theme_option( 'header_middle_row_third_column_alignment' );
                ?>  
                    <div class="<?php echo esc_attr( implode( ' ', $block_class ) ); ?>">
                        <?php
                            foreach( $middle_row as $column => $widgets ) :
                                $column_class = 'column ' . $column;
                                $column_class .= ' width--' . $width_behavior[ $column ];
                                $column_class .= ' align--' . $alignment[ $column ];
                                echo '<div class="', esc_attr( $column_class ) ,'">';
                                    foreach( $widgets as $widget ) :
                                        Utility::get_header_builder_widget_html( $widget );
                                    endforeach;
                                echo '</div>';
                            endforeach;
                        ?>
                    </div>
                <?php
            }
        }
        Header_Middle_Row::get_instance();
    }