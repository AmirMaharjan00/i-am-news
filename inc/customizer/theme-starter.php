<?php
    /**
     * Starter
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer;

    if( ! trait_exists( __NAMESPACE__ . '\\Customizer_Defaults' ) ) :
        /**
         * Customizer Defaults
         */
        trait Customizer_Defaults {
            /**
             * Set default typography
             * 
             * @since 1.0.0
             */
            protected function get_typography( $typography = [] ) {
                $default = [
                    
                ];
                return array_merge( $default, $typography );
            }

            /**
             * Set default box shadow
             * 
             * @since 1.0.0
             */
            protected function get_box_shadow( $box_shadow = [] ) {
                $default = [
                    'offsetx'   =>  0,
                    'offsety'   =>  0,
                    'inset' =>  false,
                    'color' =>  '#000',
                    'blur'  =>  0,
                    'spread'    =>  0
                ];
                return array_merge( $default, $box_shadow );
            }
        }
    endif;