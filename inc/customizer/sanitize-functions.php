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
             * MARK: Sanitize boolean
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
             * MARK: Sanitize positive and negetive number
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
             * MARK: Sanitize solid color
             * 
             * @since 1.0.0
             * @param   string  $color  The solid color to sanitize
             * @param   string  $default  The value to return in case of failure
             */
            public function sanitize_solid_color( $color, $default ): string {
                $solid = preg_match( '/^#([a-z0-9]{3}|[a-z0-9]{6}|[a-z0-9]{8})$/i', $color );
                if( $solid ) {
                    return $color;
                } else {
                    return $default;
                }
            }

            /**
             * MARK: Sanitize gradient color
             * 
             * @since 1.0.0
             * @param   string  $color  The solid gradient to sanitize
             * @param   string  $default  The value to return in case of failure
             */
            public function sanitize_gradient_color( $color, $default ): string {
                $gradient = preg_match( '/^(linear-gradient|radial-gradient|conic-gradient)\(.*\)$/i', $color );
                if( $gradient ) {
                    return $color;
                } else {
                    return $default;
                }
            }

            /**
             * MARK: Sanitize background image
             * 
             * @since 1.0.0
             * @param   string  $color  The solid gradient to sanitize
             * @param   string  $default  The value to return in case of failure
             */
            public function sanitize_image( $image, $default ) {
                if( ! is_array( $image ) ) return $default;
                $type = 'image'; $value = 0; $image_properties = [];

                if( wp_attachment_is( 'image', $image[ 'value' ] )  ) {
                    $value = $image[ 'value' ];
                } else {
                    return $default;
                }

                if( array_key_exists( 'image', $image ) ) {
                    $image_keys = $image[ 'image' ];
                    if( array_key_exists( 'url', $image_keys ) ) {
                        $image_properties[ 'url' ] = sanitize_url( $image_keys[ 'url' ] );
                    }

                    if( array_key_exists( 'position', $image_keys ) ) {
                        $position_values = [ 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center top', 'center center', 'center bottom' ];
                        $image_properties[ 'position' ] = in_array( $image_keys[ 'position' ], $position_values ) ? $image_keys[ 'position' ] : 'left top';
                    }

                    if( array_key_exists( 'repeat', $image_keys ) ) {
                        $repeat_values = [ 'repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round' ];
                        $image_properties[ 'repeat' ] = in_array( $image_keys[ 'repeat' ], $repeat_values ) ? $image_keys[ 'repeat' ] : 'repeat';
                    }

                    if( array_key_exists( 'size', $image_keys ) ) {
                        $size_values = [ 'auto', 'contain', 'cover' ];
                        $image_properties[ 'size' ] = in_array( $image_keys[ 'size' ], $size_values ) ? $image_keys[ 'size' ] : 'normal';
                    }
                }

                $sanitized_image = [
                    'type'  =>  $type,
                    'value' =>  $value
                ];
                if( ! empty( $image_properties ) ) $sanitized_image[ 'image' ] = $image_properties;

                return $sanitized_image;
            }

            /**
             * MARK: Sanitize individual color
             * 
             * @since 1.0.0
             * @param int|float $value      The current value
             * @param int|float @default    The value to return in case of failure
             */
            public function sanitize_individual_color( $value, $default ) {
                if ( ! is_array( $value ) ) return $default;

                if( $value[ 'type' ] === 'solid' ) {
                    // sanitize solid color
                    return [
                        'type' => 'solid',
                        'value' => $this->sanitize_solid_color( $value[ 'value' ], $default[ 'value' ] )
                    ];
                } elseif( $value[ 'type' ] === 'gradient' ) {
                    // santize gradient color
                    return [
                        'type'  =>  'gradient',
                        'value' =>  $this->sanitize_gradient_color( $value[ 'value' ], $default[ 'value' ] )
                    ];
                } elseif( $value[ 'type' ] === 'image' ) {
                    // santize image color
                    return $this->sanitize_image( $value, $default );
                } else {
                    // if everything else fails
                    return $default;
                }
            }

            /**
             * MARK: Sanitize unit
             * 
             * @since 1.0.0
             * @param int|float $value      The current value
             * @param int|float @default    The value to return in case of failure
             */
            public function sanitize_unit( $value, $default ) {
                if ( ! is_string( $value ) ) return $default;
                $allowed_units = [ 'px', '%', 'em', 'rem' ];
                $sanitized_value = sanitize_text_field( $value );
                if( ! in_array( $sanitized_value, $allowed_units ) ) return $default;
                return $sanitized_value;
            }

            /**
             * MARK: Sanitize number unit 
             * 
             * @since 1.0.0
             * @param int|float $value      The current value
             * @param int|float @default    The value to return in case of failure
             */
            public function sanitize_number_unit( $value, $default, $args = [ 'min' => -10, 'max' => 300 ] ) {
                if ( ! is_string( $value ) ) return $default;

                if ( preg_match( '/^(-?\d*\.?\d+)([a-z%]+)$/i', $value, $matches ) ) {
                    $number = floatval( $matches[ 1 ] );
                    $unit = strtolower( $matches[ 2 ] );

                    $allowed_units = [ 'px', '%', 'em', 'rem' ];

                    $min = isset( $args[ 'min' ] ) ? $args[ 'min' ] : -10;
                    $max = isset( $args[ 'max' ] ) ? $args[ 'max' ] : 300;
                    if ( in_array( $unit, $allowed_units ) && $number >= $min && $number <= $max ) {
                        return $value;
                    } else {
                        return $default;
                    }
                } else {
                    return $default;
                }
            }

            /**
             * MARK: Sanitize box shadow value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_box_shadow( $input, $setting ): array {
                if( empty( $input ) || ! is_array( $input ) ) return $setting->default;
                return [
                    'enable'    =>  $this->sanitize_boolean( $input[ 'enable' ], $setting->default[ 'enable' ] ),
                    'offsetx'   =>  $this->sanitize_number( $input[ 'offsetx' ], $setting->default[ 'offsetx' ] ),
                    'offsety'   =>  $this->sanitize_number( $input[ 'offsety' ], $setting->default[ 'offsety' ] ),
                    'inset' =>  $this->sanitize_boolean( $input[ 'inset' ], $setting->default[ 'inset' ] ),
                    'color' =>  $this->sanitize_solid_color( $input[ 'color' ], $setting->default[ 'color' ] ),
                    'blur'  =>  absint( $input[ 'blur' ] ) ?? $setting->default[ 'blur' ] ,
                    'spread'    =>  $this->sanitize_number( $input[ 'spread' ], $setting->default[ 'spread' ] )
                ];
            }

            /**
             * MARK: Sanitize radio image value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_radio_image( $input, $setting ): string {
                if( empty( $input ) || ! is_string( $input ) ) return $setting->default;
                $fields = $setting->manager->get_control( $setting->id )->fields;
                $field_values = array_column( $fields, 'value' );
                if( in_array( $input, $fields ) ) {
                    return sanitize_text_field( $input );
                } else {
                    return $setting->default;
                }
            }

            /**
             * MARK: Sanitize icon picker value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_icon_picker( $input, $setting ): array {
                if( empty( $input ) || ! is_array( $input ) ) return $setting->default;
                if( ! isset( $input[ 'type' ] ) || ! isset( $input[ 'value' ] ) ) return $setting->default;
                $type = $input[ 'type' ];
                $value = $input[ 'value' ];
                if( ! in_array( $type, [ 'none', 'image', 'icon' ] ) ) return $setting->default;
                $sanitized_value = [
                    'type'  =>  sanitize_text_field( $type )
                ];
                switch( $type ) {
                    case 'image' : 
                            $sanitized_value[ 'value' ] = absint( $value );
                        break;
                    case 'icon' : 
                            $sanitized_value[ 'value' ] = sanitize_text_field( $value );
                        break;
                    default :
                        $sanitized_value[ 'value' ] = '';
                        break;
                }

                return $sanitized_value;
            }
            
            /**
             * MARK: Sanitize toggle value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_toggle( $input, $setting ): bool {
                if( empty( $input ) || ! is_bool( $input ) ) return $setting->default;

                return $this->sanitize_boolean( $input, $setting->default );
            }

            /**
             * MARK: Sanitize radio tab value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_radio_tab( $input, $setting ): string {
                if( empty( $input ) || ! is_string( $input ) ) return $setting->default;
                $sanitized_input = sanitize_text_field( $input );
                $fields = $setting->manager->get_control( $setting->id )->fields;
                $field_values = array_column( $fields, 'value' );
                if( in_array( $sanitized_input, $field_values ) ) {
                    return $sanitized_input;
                } else {
                    return $setting->default;
                }
            }

            /**
             * MARK: Sanitize typography value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_typography( $input, $setting ): array {
                if( empty( $input ) || ! is_array( $input ) ) return $setting->default;
                $expected_keys = [ 'font_family', 'font_weight', 'font_size', 'line_height', 'letter_spacing', 'text_transform', 'text_decoration', 'preset' ];
                $responsive_keys = [ 'desktop', 'tablet', 'mobile' ];
                if( array_diff( $expected_keys, array_keys( $input ) ) ) return $setting->default;
                $font_family = $input[ 'font_family' ];
                $font_weight = $input[ 'font_weight' ];
                $font_size = $input[ 'font_size' ];
                $line_height = $input[ 'line_height' ];
                $letter_spacing = $input[ 'letter_spacing' ];
                $text_transform = $input[ 'text_transform' ];
                $text_decoration = $input[ 'text_decoration' ];
                $preset = $input[ 'preset' ];

                // sanitize font family
                $font_family_expected_keys = [ 'label', 'value' ];
                if( array_diff( $font_family_expected_keys, array_keys( $font_family ) ) ) return $setting->default;
                $sanitized_font_family_value = sanitize_text_field( $font_family[ 'value' ] );
                $sanitized_font_family = [
                    'label' =>  $sanitized_font_family_value,
                    'value' =>  $sanitized_font_family_value
                ];

                // sanitize font weight
                $font_weight_expected_values = [ '100', '200', '300', 'regular', '500', '600', '700', '800', '900', '100italic', '200italic', '300italic', 'italic', '500italic', '600italic', '700italic', '800italic', '900italic' ];
                if( ! in_array( $font_weight, $font_weight_expected_values ) ) return $setting->default;
                $sanitized_font_weight = sanitize_text_field( $font_weight );

                // sanitize font size
                if( array_diff( $responsive_keys, array_keys( $font_size ) ) ) return $setting->default;
                $sanitized_font_size = [
                    'desktop'   =>  $this->sanitize_number_unit( $font_size[ 'desktop' ], $setting->default[ 'font_size' ][ 'desktop' ] ),
                    'tablet'   =>  $this->sanitize_number_unit( $font_size[ 'tablet' ], $setting->default[ 'font_size' ][ 'tablet' ] ),
                    'mobile'   =>  $this->sanitize_number_unit( $font_size[ 'mobile' ], $setting->default[ 'font_size' ][ 'mobile' ] )
                ];

                // sanitize line height
                if( array_diff( $responsive_keys, array_keys( $line_height ) ) ) return $setting->default;
                $sanitized_line_height = [
                    'desktop'   =>  $this->sanitize_number_unit( $line_height[ 'desktop' ], $setting->default[ 'line_height' ][ 'desktop' ] ),
                    'tablet'   =>  $this->sanitize_number_unit( $line_height[ 'tablet' ], $setting->default[ 'line_height' ][ 'tablet' ] ),
                    'mobile'   =>  $this->sanitize_number_unit( $line_height[ 'mobile' ], $setting->default[ 'line_height' ][ 'mobile' ] )
                ];

                // sanitize letter spacing
                if( array_diff( $responsive_keys, array_keys( $letter_spacing ) ) ) return $setting->default;
                $sanitized_letter_spacing = [
                    'desktop'   =>  $this->sanitize_number_unit( $letter_spacing[ 'desktop' ], $setting->default[ 'letter_spacing' ][ 'desktop' ] ),
                    'tablet'   =>  $this->sanitize_number_unit( $letter_spacing[ 'tablet' ], $setting->default[ 'letter_spacing' ][ 'tablet' ] ),
                    'mobile'   =>  $this->sanitize_number_unit( $letter_spacing[ 'mobile' ], $setting->default[ 'letter_spacing' ][ 'mobile' ] )
                ];

                // sanitize text transform
                $text_transform_expected_values = [ 'none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit' ];
                if( ! in_array( $text_transform, $text_transform_expected_values ) ) return $setting->default;
                $sanitized_text_transform = sanitize_text_field( $text_transform );

                // sanitize text transform
                $text_decoration_expected_values = [ 'none', 'underline', 'overline', 'line', 'initial', 'inherit' ];
                if( ! in_array( $text_decoration, $text_decoration_expected_values ) ) return $setting->default;
                $sanitized_text_decoration = sanitize_text_field( $text_decoration );

                // sanitize preset
                $match_preset = preg_match( '/-?\d*\.?\d+/', $preset );
                if( ! $match_preset ) return $setting->default;
                $sanitized_preset = sanitize_text_field( $preset );

                return [
                    'font_family'   =>  $sanitized_font_family,
                    'font_weight'   =>  $sanitized_font_weight,
                    'font_size' =>  $sanitized_font_size,
                    'line_height'   =>  $sanitized_line_height,
                    'letter_spacing'    =>  $sanitized_letter_spacing,
                    'text_transform'    =>  $sanitized_text_transform,
                    'text_decoration'   =>  $sanitized_text_decoration,
                    'preset'    =>  $sanitized_preset
                ];
            }

            /**
             * MARK: Sanitize range value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_range( $input, $setting ) {
                $control = $setting->manager->get_control( $setting->id );
                $input_attrs = $control->input_attrs;
                $responsive = $control->responsive;
                if( $responsive ) {
                    if( empty( $input ) || ! is_array( $input ) ) return $setting->default;
                } else {
                    if( empty( $input ) || ! is_string( $input ) ) return $setting->default;
                }
                $min = isset( $input_attrs[ 'min' ] ) ? $input_attrs[ 'min' ] : 0;
                $max = isset( $input_attrs[ 'max' ] ) ? $input_attrs[ 'max' ] : 100;
                if( $responsive ) {
                    $expected_input_keys = [ 'desktop', 'tablet', 'mobile' ];
                    if( array_diff_key( $expected_input_keys, array_keys( $input ) ) ) return $setting->default;
                    $desktop = $input[ 'desktop' ];
                    $tablet = $input[ 'tablet' ];
                    $mobile = $input[ 'mobile' ];
                    return [
                        'desktop'   =>  $this->sanitize_number_unit( $desktop, $setting->default[ 'desktop' ], [ 'min' => $min, 'max' => $max ] ),
                        'tablet'   =>  $this->sanitize_number_unit( $tablet, $setting->default[ 'tablet' ], [ 'min' => $min, 'max' => $max ] ),
                        'mobile'   =>  $this->sanitize_number_unit( $mobile, $setting->default[ 'mobile' ], [ 'min' => $min, 'max' => $max ] )
                    ];
                } else {
                    return $this->sanitize_number_unit( $input, $setting->default, [ 'min' => $min, 'max' => $max ] );
                }
            }
            
            /**
             * MARK: Sanitize dimension value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_dimension( $input, $setting ): array {
                if( empty( $input ) || ! is_array( $input ) ) return $setting->default;
                $control = $setting->manager->get_control( $setting->id );
                $responsive = $control->responsive;
                $expected_dimension_keys = [ 'top', 'right', 'bottom', 'left', 'link' ];
                if( $responsive ) {
                    $expected_input_keys = [ 'desktop', 'tablet', 'mobile' ];
                    if( array_diff_key( $expected_input_keys, array_keys( $input ) ) ) return $setting->default;
                    $desktop = $input[ 'desktop' ];
                    $tablet = $input[ 'tablet' ];
                    $mobile = $input[ 'mobile' ];
                    if( array_keys( $desktop ) !== $expected_dimension_keys ) return $setting->default;
                    if( array_keys( $tablet ) !== $expected_dimension_keys ) return $setting->default;
                    if( array_keys( $mobile ) !== $expected_dimension_keys ) return $setting->default;
                    return [
                        'desktop'   =>  [
                            'top'   =>  $this->sanitize_number( $desktop[ 'top' ], $setting->default[ 'desktop' ][ 'top' ] ),
                            'right' =>  $this->sanitize_number( $desktop[ 'right' ], $setting->default[ 'desktop' ][ 'right' ] ),
                            'bottom'    =>  $this->sanitize_number( $desktop[ 'bottom' ], $setting->default[ 'desktop' ][ 'bottom' ] ),
                            'left'  =>  $this->sanitize_number( $desktop[ 'left' ], $setting->default[ 'desktop' ][ 'left' ] ),
                            'link'  =>  $this->sanitize_boolean( $desktop[ 'link' ], $setting->default[ 'desktop' ][ 'link' ] ),
                            // 'unit'  =>  $this->sanitize_unit( $desktop[ 'unit' ], $setting->default[ 'desktop' ][ 'unit' ] )
                        ],
                        'tablet'    =>   [
                            'top'   =>  $this->sanitize_number( $tablet[ 'top' ], $setting->default[ 'tablet' ][ 'top' ] ),
                            'right' =>  $this->sanitize_number( $tablet[ 'right' ], $setting->default[ 'tablet' ][ 'right' ] ),
                            'bottom'    =>  $this->sanitize_number( $tablet[ 'bottom' ], $setting->default[ 'tablet' ][ 'bottom' ] ),
                            'left'  =>  $this->sanitize_number( $tablet[ 'left' ], $setting->default[ 'tablet' ][ 'left' ] ),
                            'link'  =>  $this->sanitize_boolean( $tablet[ 'link' ], $setting->default[ 'tablet' ][ 'link' ] ),
                            // 'unit'  =>  $this->sanitize_unit( $tablet[ 'unit' ], $setting->default[ 'tablet' ][ 'unit' ] )
                        ],
                        'mobile'    =>   [
                            'top'   =>  $this->sanitize_number( $mobile[ 'top' ], $setting->default[ 'mobile' ][ 'top' ] ),
                            'right' =>  $this->sanitize_number( $mobile[ 'right' ], $setting->default[ 'mobile' ][ 'right' ] ),
                            'bottom'    =>  $this->sanitize_number( $mobile[ 'bottom' ], $setting->default[ 'mobile' ][ 'bottom' ] ),
                            'left'  =>  $this->sanitize_number( $mobile[ 'left' ], $setting->default[ 'mobile' ][ 'left' ] ),
                            'link'  =>  $this->sanitize_boolean( $mobile[ 'link' ], $setting->default[ 'mobile' ][ 'link' ] ),
                            // 'unit'  =>  $this->sanitize_unit( $mobile[ 'unit' ], $setting->default[ 'mobile' ][ 'unit' ] )
                        ]
                    ];
                } else {
                    if( array_diff_key( $expected_dimension_keys, array_keys( $input ) ) ) return $setting->default;
                    return [
                        'top'   =>  $this->sanitize_number( $input[ 'top' ], $setting->default[ 'top' ] ),
                        'right' =>  $this->sanitize_number( $input[ 'right' ], $setting->default[ 'right' ] ),
                        'bottom'    =>  $this->sanitize_number( $input[ 'bottom' ], $setting->default[ 'bottom' ] ),
                        'left'  =>  $this->sanitize_number( $input[ 'left' ], $setting->default[ 'left' ] ),
                        'link'  =>  $this->sanitize_boolean( $input[ 'link' ], $setting->default[ 'link' ] ),
                        // 'unit'  =>  $this->sanitize_unit( $input[ 'unit' ], $setting->default[ 'unit' ] )
                    ];
                }
            }
            
            /**
             * MARK: Sanitize border value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_border($input, $setting): array {
                if( empty( $input ) || ! is_array( $input ) ) return $setting->default;

                $expected_keys = ['color','style','width'];
                if( array_diff( $expected_keys, array_keys( $input ) ) ) return $setting->default;

                $color = $input['color'];
                $style = $input['style'];
                $width = $input['width'];

                // style
                $allowed_styles = [ 'solid', 'dotted', 'dashed', 'double', 'none' ];
                if( ! in_array( $style, $allowed_styles ) ) return $setting->default;
                $sanitized_style = sanitize_text_field( $style );

                // color
                $sanitized_color = sanitize_hex_color( $color );
                if( ! $sanitized_color ) return $setting->default;

                // width
                $required_width_keys = [ 'top', 'right', 'bottom', 'left', 'link' ];
                if( array_diff( $required_width_keys, array_keys( $width ) ) ) return $setting->default;
                $sanitized_width = [
                    'top'   =>  $this->sanitize_number( $width[ 'top' ], $setting->default[ 'width' ][ 'top' ] ),
                    'right' =>  $this->sanitize_number( $width[ 'right' ], $setting->default[ 'width' ][ 'right' ] ),
                    'bottom'    =>  $this->sanitize_number( $width[ 'bottom' ], $setting->default[ 'width' ][ 'bottom' ] ),
                    'left'  =>  $this->sanitize_number( $width[ 'left' ], $setting->default[ 'width' ][ 'left' ] ),
                    'link'  =>  $this->sanitize_boolean( $width[ 'link' ], $setting->default[ 'width' ][ 'link' ] )
                ];

                return [
                    'color' => $sanitized_color,
                    'style' => $sanitized_style,
                    'width' => $sanitized_width
                ];
            }
            
            /**
             * MARK: Sanitize color value
             * 
             * @since 1.0.0
             * @param array $input      The current value saved in db
             * @param object $setting  An instance of WP_Customize_Setting
             */
            public function sanitize_color( $input, $setting ): array {
                if( empty( $input ) || ! is_array( $input ) ) return $setting->default;
                
                if( array_key_exists( 'initial', $input ) ) {
                    $initial = $input[ 'initial' ];
                    $hover = $input[ 'hover' ];
                    return [
                        'initial'   =>  $this->sanitize_individual_color( $initial, $setting->default[ 'initial' ] ),
                        'hover'   =>  $this->sanitize_individual_color( $hover, $setting->default[ 'hover' ] )
                    ];
                } else {
                    return $this->sanitize_individual_color( $input, $setting->default );
                }
            }
        }
    }