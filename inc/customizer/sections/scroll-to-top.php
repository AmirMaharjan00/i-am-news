<?php
    /**
     * Customizer scroll to top section
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

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
            }

            /**
             * Get settings
             * 
             * @since 1.0.0
             * @override
             */
            public function get_settings( $id ) {
                $settings = [
                    'scroll_to_top_layouts' =>  [
                        'sanitize_function' =>  'sanitize_text_field',
                        'postMessage'   =>  'refresh',
                        'default'   =>  'one'
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
            public function get_controls( $id ) {
                $controls = [
                    'scroll_to_top_section' =>  [
                        'title' =>  esc_html__( 'Scroll to Top', 'i-am-news' )
                    ],
                    'scroll_to_top_layouts' =>  [
                        'label' =>  esc_html__( 'Layouts', 'i-am-news' ),
                        'type'  =>  'box-shadow',
                        'section'   =>  $this->section
                    ]
                ];
                return ( $id ) ? $controls[ $id ] : $controls;
            }
        }
        new Scroll_To_Top();
    endif;