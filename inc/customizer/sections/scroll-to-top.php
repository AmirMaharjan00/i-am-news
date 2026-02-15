<?php
    /**
     * Customizer scroll to top section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;
    use IAN\Customizer as Customizer_Defaults;

    if( ! class_exists( __NAMESPACE__ . '\\Scroll_To_Top' ) ) :
        /**
         * Scroll to top
         */
        class Scroll_To_Top extends Section {
            /**
             * Register controls
             * 
             * @since 1.0.0
             * @override
             */
            public function register_controls() {
                $this->add_section( 'scroll_to_top_section' );
                $this->add_control( 'scroll_to_top_layouts' );
                $this->add_control( 'scroll_to_top_box_shadow' );
            }

            /**
             * Get settings
             * 
             * @since 1.0.0
             * @override
             */
            public function get_settings( $id = '' ) {
                $settings = [
                    'scroll_to_top_layouts' =>  [
                        'sanitize_function' =>  'sanitize_text_field',
                        'postMessage'   =>  'refresh',
                        'default'   =>  $this->get_defaults( $id )
                    ],
                    'scroll_to_top_box_shadow' =>  [
                        // 'sanitize_function' =>  'sanitize_text_field',
                        'postMessage'   =>  'postMessage',
                        'default'   =>  $this->get_defaults( $id )
                    ]
                ];
                return ( $id ) ? $settings[ $id ] : $settings;
            }

            /**
             * Get controls
             * 
             * @since 1.0.0
             * @override
             */
            public function get_controls( $id = '' ) {
                $controls = [
                    'scroll_to_top_section' =>  [
                        'title' =>  esc_html__( 'Scroll to Top', 'i-am-news' )
                    ],
                    'scroll_to_top_layouts' =>  [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'radio-image',
                        'section'   =>  $this->section
                    ],
                    'scroll_to_top_box_shadow' =>  [
                        'label' =>  esc_html__( 'Box Shadow', 'i-am-news' ),
                        'description'   =>  esc_html__( 'This is description', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                        'section'   =>  $this->section
                    ],
                ];
                return ( $id ) ? $controls[ $id ] : $controls;
            }

            /**
             * Set defaults
             * 
             * @since 1.0.0
             * @var array
             */
            public function set_defaults() {
                $this->defaults = [
                    'scroll_to_top_layouts' =>  'one',
                    'scroll_to_top_box_shadow' =>  $this->get_box_shadow([
                        'offsetx'   =>  10,
                        'offsety'   =>  10
                    ]),
                ];
            }
        }
        new Scroll_To_Top();
    endif;