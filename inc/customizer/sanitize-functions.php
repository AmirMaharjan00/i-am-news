<?php
    /**
     * Customizer sanitize functions
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer;

    use function sanitize_hex_color;

    if( ! trait_exists( __NAMESPACE__ . '\\Sanitize_Functions' ) ) {
        /**
         * Sanitize Functions Trait
         */
        trait Sanitize_Functions {
            /**
             * Sanitize boolean
             * 
             * @since 1.0.0
             * @param bool $value   The current value
             * @param bool @default The value to return in case of failure
             */
            public function sanitize_boolean( $value, $default ): bool {
                $bool = filter_var( $value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE );
                return is_null( $bool ) ? $default : $bool;
            }

            /**
             * Sanitize positive and negetive 
             * 
             * @since 1.0.0
             * @param int|float $value      The current value
             * @param int|float @default    The value to return in case of failure
             */
            public function sanitize_number( $value, $default ) {
                if ( ! is_numeric( $value ?? '' ) ) return $default;

                // If the value is a float (contains a decimal point)
                return ( strpos( ( string ) $value, '.' ) !== false ) ? floatval( $value ) : intval( $value );
            }

            /**
             * Sanitize box shadow value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $settings  An instance of WP_Customize_Setting
             */
            public function sanitize_box_shadow( $input, $settings ): array {
                if( empty( $input ) || ! is_array( $input ) ) return $settings->default;
                return [
                    'enable'   =>  $this->sanitize_boolean( $input[ 'enable' ], $settings->default[ 'enable' ] ),
                    'offsetx'   =>  $this->sanitize_number( $input[ 'offsetx' ], $settings->default[ 'offsetx' ] ),
                    'offsety'   =>  $this->sanitize_number( $input[ 'offsety' ], $settings->default[ 'offsety' ] ),
                    'inset'     =>  $this->sanitize_boolean( $input[ 'inset' ], $settings->default[ 'inset' ] ),
                    'color'     =>  sanitize_hex_color( $input[ 'color' ] ) ?: $settings->default[ 'color' ],
                    'blur'      =>  absint( $input[ 'blur' ] ) ?? $settings->default[ 'blur' ] ,
                    'spread'    =>  $this->sanitize_number( $input[ 'spread' ], $settings->default[ 'spread' ] )
                ];
            }
        }
    }