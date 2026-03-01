<?php
    /**
     * Trait used to generate dynamic css
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN;

    if( ! trait_exists( __NAMESPACE__ . '\\Dynamic_Css' ) ) {
        /**
         * Dynamic_Css Trait
         */
        trait Dynamic_Css {
            /**
             * Typography
             * 
             * @since 1.0.0
             * @param array $raw_value  The saved typography value
             * @param bool  $variable   Whether to return in variable ready value
             */
            private function get_css_typography_value( $raw_value, $variable = '' ): array {
                $font_family = $raw_value[ 'font_family' ];
                $font_weight = $this->get_font_weight( $raw_value[ 'font_weight' ] );
                $font_size = $raw_value[ 'font_size' ];
                $line_height = $raw_value[ 'line_height' ];
                $letter_spacing = $raw_value[ 'letter_spacing' ];
                $text_transform = $raw_value[ 'text_transform' ];
                $text_decoration = $raw_value[ 'text_decoration' ];
                $preset = $raw_value[ 'preset' ];
                if( $variable ) {
                    return [
                        $variable . 'size'  =>  $font_size[ 'desktop' ],
                        $variable . 'size-tablet'  =>  $font_size[ 'tablet' ],
                        $variable . 'size-mobile'  =>  $font_size[ 'mobile' ],
                        $variable . 'line-height'  =>  $line_height[ 'desktop' ],
                        $variable . 'line-height-tablet'  =>  $line_height[ 'tablet' ],
                        $variable . 'line-height-mobile'  =>  $line_height[ 'mobile' ],
                        $variable . 'letter-spacing'  =>  $letter_spacing[ 'desktop' ],
                        $variable . 'letter-spacing-tablet'  =>  $letter_spacing[ 'tablet' ],
                        $variable . 'letter-spacing-mobile'  =>  $letter_spacing[ 'mobile' ],
                        $variable . 'family'  =>  $font_family[ 'value' ],
                        $variable . 'weight'  =>  $font_weight[ 'weight' ],
                        $variable . 'style'  =>  $font_weight[ 'style' ],
                        $variable . 'text-decoration'  =>  $text_decoration,
                        $variable . 'text-transform'  =>  $text_transform,
                    ];
                } else {
                    return [
                        'desktop'   =>  [
                            'font-family' =>  $font_family[ 'value' ],
                            'font-size' =>  $font_size[ 'desktop' ],
                            'line-height' =>  $line_height[ 'desktop' ],
                            'letter-spacing' =>  $letter_spacing[ 'desktop' ],
                            'font-weight' =>  $font_weight[ 'weight' ],
                            'font-style' =>  $font_weight[ 'style' ],
                            'text-decoration' =>  $text_decoration,
                            'text-transform' =>  $text_transform
                        ],
                        'tablet'   =>  [
                            'font-size' =>  $font_size[ 'tablet' ],
                            'line-height' =>  $line_height[ 'tablet' ],
                            'letter-spacing' =>  $letter_spacing[ 'tablet' ]
                        ],
                        'mobile'   =>  [
                            'font-size' =>  $font_size[ 'mobile' ],
                            'line-height' =>  $line_height[ 'mobile' ],
                            'letter-spacing' =>  $letter_spacing[ 'mobile' ]
                        ]
                    ];
                }
            }

            /**
             * Get font Weight
             * 
             * @since 1.0.0
             * @param   string  $weight The font weight value from typogrpahy control
             */
            private function get_font_weight( $weight ): array {
                $defualt_weight = "400" ;
                $default_style = 'regular';
                if( $weight === 'regular' ) {
                    return [
                        'weight'    =>  400,
                        'style' =>  'normal'
                    ];
                } else if( $weight === 'italic' ) {
                    return [
                        'weight'    =>  400,
                        'style' =>  'italic'
                    ];
                } else if( in_array( $weight, [ '100', '200', '300', '500', '600', '700', '800', '900' ] ) ) {
                    return [
                        'weight'    =>  $weight,
                        'style' =>  'normal'
                    ];
                } else {
                    $string_regex = preg_match( '/^(\d+)([a-z]+)$/i', $weight, $matches );
                    return [
                        'weight'    =>  $matches[ 1 ],
                        'style' =>  $matches[ 2 ]
                    ];
                }
                return [
                    'weight'    =>  $defualt_weight,
                    'style' =>  $default_style
                ];
            }

            /**
             * Generate typography dynamic css
             * 
             * @since 1.0.0
             * @param   array   $args   The arguments required to generate css
             */
            public function dynamic_typography( $args ): string {
                $expected_keys = [ 'value', 'selector', 'default', 'variable' ];
                if( array_diff( $expected_keys, array_keys( $args ) ) ) return '';
                
                if( serialize( $args[ 'default' ] ) === serialize( $args[ 'value' ] ) ) return '';
                $typography = $this->get_css_typography_value( $args[ 'value' ], $args[ 'variable' ] );
                return $this->generate_css( [
                    'selector'  =>  $args[ 'selector' ],
                    'value' =>  $typography
                ] );
            }

            /**
             * Generate css
             * 
             * @since 1.0.0
             * @param   array   $value
             */
            private function generate_css( $raw_value ): string {
                $expected_keys = [ 'selector', 'value' ];
                $hover_selector_exists = false;
                if( array_key_exists( 'hover_selector', $raw_value ) ) {
                    $hover_selector_exists = true;
                    $expected_keys[] = 'hover_selector';
                }
                if( array_diff_key( $expected_keys, array_keys( $raw_value ) ) ) return '';
                $value = $raw_value[ 'value' ];
                $selector = $raw_value[ 'selector' ];
                $hover_selector = $hover_selector_exists ? $raw_value[ 'hover_selector' ] : $selector;
                $opening_bracket = '{';
                $closing_bracket = '}';
                if( array_key_exists( 'desktop', $value ) ) {
                    $desktop = array_map( fn( $property, $property_value ) => "$property:$property_value", array_keys( $value[ 'desktop' ] ), $value[ 'desktop' ] );
                    $tablet = array_map( fn( $property, $property_value ) => "$property:$property_value", array_keys( $value[ 'tablet' ] ), $value[ 'tablet' ] );
                    $mobile = array_map( fn( $property, $property_value ) => "$property:$property_value", array_keys( $value[ 'mobile' ] ), $value[ 'mobile' ] );
                    $tablet_width = '@media(max-width: 1024px)';
                    $mobile_width = '@media(max-width: 768px)';
                    $css = '';
                    $css .= $selector . $opening_bracket . implode( ';', $desktop ) . $closing_bracket;
                    $css .= $tablet_width . $opening_bracket . $selector . $opening_bracket . implode( ';', $tablet ) . $closing_bracket . $closing_bracket;
                    $css .= $mobile_width . $opening_bracket . $selector . $opening_bracket . implode( ';', $mobile ) . $closing_bracket . $closing_bracket;
                    return $css;
                } elseif( array_key_exists( 'initial', $value ) ) {
                    $css_arr = [];
                    foreach( $value as $type => $color ) {
                        $css_arr[ $type ] = array_map( fn( $property, $property_value ) => "$property: $property_value", array_keys( $color ), $color );
                    }
                    $initial = $css_arr[ 'initial' ];
                    $hover = $css_arr[ 'hover' ];
                    $css = '';
                    $css .= $selector . $opening_bracket . implode( ';', $initial ) . $closing_bracket;
                    $css .= $hover_selector . $opening_bracket . implode( ';', $hover ) . $closing_bracket;
                    return $css;
                } else {
                    $css = array_map( fn( $property, $property_value ) => "$property: $property_value", array_keys( $value ), $value );
                    return $selector . $opening_bracket . implode( ';', $css ) . $closing_bracket;
                }
            }

            /**
             * Generate border dynamic css
             * 
             * @since 1.0.0
             * @param   array   $args   The arguments required to generate css
             */
            public function dynamic_border( $args ): string {
                $expected_keys = [ 'value', 'selector', 'default' ];
                if( array_diff( $expected_keys, array_keys( $args ) ) ) return '';
                
                if( serialize( $args[ 'default' ] ) === serialize( $args[ 'value' ] ) ) return '';
                $value = $args[ 'value' ];
                $width = $value[ 'width' ];
                unset( $width[ 'link' ] );
                $border = [
                    'border-color'  =>  $value[ 'color' ],
                    'border-style'  =>  $value[ 'style' ],
                    'border-width'  =>  implode( 'px ', $width ) . 'px',
                ];

                return $this->generate_css( [
                    'selector'  =>  $args[ 'selector' ],
                    'value' =>  $border
                ] );
            }

            /**
             * Generate number dynamic css
             * 
             * @since 1.0.0
             * @param   array   $args   The arguments required to generate css
             */
            public function dynamic_number( $args ): string {
                $expected_keys = [ 'value', 'selector', 'default', 'property' ];
                if( array_diff( $expected_keys, array_keys( $args ) ) ) return '';
                
                if( serialize( $args[ 'default' ] ) === serialize( $args[ 'value' ] ) ) return '';
                $value = $args[ 'value' ];
                if( array_key_exists( 'desktop', $args[ 'value' ] ) ) {
                    $number = [
                        'desktop'   =>  [
                            $args[ 'property' ] =>  $value[ 'desktop' ]
                        ],
                        'tablet'   =>  [
                            $args[ 'property' ] =>  $value[ 'tablet' ]
                        ],
                        'mobile'   =>  [
                            $args[ 'property' ] =>  $value[ 'mobile' ]
                        ],
                    ];
                } else {
                    $number = [
                        $args[ 'property' ] =>  $value
                    ];
                }

                return $this->generate_css( [
                    'selector'  =>  $args[ 'selector' ],
                    'value' =>  $number
                ] );
            }

            /**
             * Generate box shadow dynamic css
             * 
             * @since 1.0.0
             * @param   array   $args   The arguments required to generate css
             */
            public function dynamic_box_shadow( $args ): string {
                $expected_keys = [ 'value', 'selector', 'default' ];
                if( array_diff( $expected_keys, array_keys( $args ) ) ) return '';
                
                $value = $args[ 'value' ];
                if( serialize( $args[ 'default' ] ) === serialize( $value ) ) return '';
                $enable = $value[ 'enable' ];
                if( ! $enable ) return '';
                $offsetx = $value[ 'offsetx' ] . 'px';
                $offsety = $value[ 'offsety' ] . 'px';
                $inset = $value[ 'inset' ];
                $color = $value[ 'color' ];
                $blur = $value[ 'blur' ] . 'px';
                $spread = $value[ 'spread' ] . 'px';
                $type = $inset ? 'inset' : '';
                $box_shadow = [
                    'box-shadow'    =>   "$type $offsetx $offsety $blur $spread $color"
                ];
                

                return $this->generate_css( [
                    'selector'  =>  $args[ 'selector' ],
                    'value' =>  $box_shadow
                ] );
            }

            /**
             * Generate dimension dynamic css
             * 
             * @since 1.0.0
             * @param   array   $args   The arguments required to generate css
             */
            public function dynamic_dimension( $args ): string {
                $expected_keys = [ 'value', 'selector', 'default', 'property' ];
                if( array_diff( $expected_keys, array_keys( $args ) ) ) return '';
                
                $value = $args[ 'value' ];
                if( serialize( $args[ 'default' ] ) === serialize( $value ) ) return '';
                $property = $args[ 'property' ];
                if( array_key_exists( 'desktop', $value ) ) {
                    $desktop = $value[ 'desktop' ];
                    unset( $desktop[ 'link' ] );
                    $tablet = $value[ 'tablet' ];
                    unset( $tablet[ 'link' ] );
                    $mobile = $value[ 'mobile' ];
                    unset( $mobile[ 'link' ] );
                    $dimension = [
                        'desktop'   =>  [
                            $property   =>  implode( 'px ', $desktop ) . 'px'
                        ],
                        'tablet'   =>  [
                            $property   =>  implode( 'px ', $tablet ) . 'px'
                        ],
                        'mobile'   =>  [
                            $property   =>  implode( 'px ', $mobile ) . 'px'
                        ],
                    ];
                } else {
                    unset( $value[ 'link' ] );
                    $dimension = [
                        $property   =>  implode( 'px ', $value ) . 'px'
                    ];
                }

                return $this->generate_css( [
                    'selector'  =>  $args[ 'selector' ],
                    'value' =>  $dimension
                ] );
            }

            /**
             * Get background image css
             * 
             * @since 1.0.0
             * @param array $image_args The arguments of image
             */
            private function get_color_css( $color_args, $property ) {
                $value = $color_args[ 'value' ];
                if( $color_args[ 'type' ] === 'image' ) {
                    $image_url = wp_get_attachment_image_src( $value );
                    $background_image_css = [
                        'background-image'  =>  'url('. $image_url[ 0 ] .')'
                    ];

                    if( isset( $color_args[ 'image' ] ) ) {
                        $image_properties = $color_args[ 'image' ];
                        $blend_mode = $image_properties[ 'blend_mode' ];
                        $position = $image_properties[ 'position' ];
                        $repeat = $image_properties[ 'repeat' ];
                        $size = $image_properties[ 'size' ];
                        $background_properties = [
                            'background-blend-mode' =>  $blend_mode,
                            'background-position'   =>  $position,
                            'background-repeat' =>  $repeat,
                            'background-size'   =>  $size
                        ];
                        return array_merge( $background_image_css, $background_properties );
                    }
    
                    return $background_image_css;
                } else {
                    return [
                        $property   =>  $value
                    ];
                }
            }

            /**
             * Generate color dynamic css
             * 
             * @since 1.0.0
             * @param   array   $args   The arguments required to generate css
             */
            public function dynamic_color( $args ): string {
                $expected_keys = [ 'value', 'selector', 'default', 'property' ];
                $hover_selector_exists = false;
                if( array_key_exists( 'hover_selector', $args ) ) {
                    $expected_keys[] = 'hover_selector';
                    $hover_selector_exists = true;
                }
                if( array_diff( $expected_keys, array_keys( $args ) ) ) return '';
                
                $value = $args[ 'value' ];
                // if( serialize( $args[ 'default' ] ) === serialize( $value ) ) return '';
                $property = $args[ 'property' ];
                if( array_key_exists( 'initial', $value ) ) {
                    $initial = $value[ 'initial' ];
                    $hover = $value[ 'hover' ];
                    $color = [
                        'initial'   =>  $this->get_color_css( $initial, $property ),
                        'hover'   =>  $this->get_color_css( $hover, $property )
                    ];
                } else {
                    $color = $this->get_color_css( $value, $property );
                }

                $generate_css_args = [
                    'selector'  =>  $args[ 'selector' ],
                    'value' =>  $color
                ];
                if( $hover_selector_exists ) $generate_css_args[ 'hover_selector' ] = $args[ 'hover_selector' ];

                return $this->generate_css( $generate_css_args );
            }
        }
    }