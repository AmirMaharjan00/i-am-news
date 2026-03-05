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
             * Theme defaults
             */
            private static $theme_defaults = [];

            /**
             * Update theme default
             * 
             * @since 1.0.0
             */
            public static function update_theme_defaults( $new_defaults = [] ) {
                self::$theme_defaults = array_merge( self::$theme_defaults, $new_defaults );
            }

            /**
             * Get defaults
             * 
             * @since 1.0.0
             */
            public static function get_defaults( $id = '' ) {
                return $id ? self::$theme_defaults[ $id ] : self::$theme_defaults;
            }

            /**
             * Get theme options
             * 
             * @since 1.0.0
             * @param   string  $id The control Id
             */
            public static function get_theme_option( $id ) {
                return get_theme_mod( $id, self::get_defaults( $id ) );
            }
            
            /**
             * Get default box shadow
             * 
             * @since 1.0.0
             */
            protected function get_box_shadow( $box_shadow = [] ) {
                $default = [
                    'enable'    =>  false,
                    'offsetx'   =>  0,
                    'offsety'   =>  0,
                    'inset' =>  false,
                    'color' =>  '#00000010',
                    'blur'  =>  5,
                    'spread'    =>  3
                ];
                return array_merge( $default, $box_shadow );
            }

            /**
             * Get default icon picker
             * 
             * @since 1.0.0
             */
            protected function get_icon_picker( $icon_picker = [] ) {
                $default = [
                    'type'  =>  'icon',
                    'value'  =>  'fa-solid fa-jet-fighter-up'
                ];
                return array_merge( $default, $icon_picker );
            }

            /**
             * Get default typography
             * 
             * @since 1.0.0
             */
            protected function get_typography( $typography = [] ) {
                $default = [
                    'font_family'   => [ 'value' => 'Inter', 'label' => 'Inter' ],
                    'font_weight'   =>  '500',
                    'font_size'   => [
                        'desktop'   =>  '16px',
                        'tablet'   =>  '14px',
                        'mobile'   =>  '12px'
                    ],
                    'line_height'   => [
                        'desktop'   =>  1.5,
                        'tablet'   =>  1.3,
                        'mobile'   =>  1.1
                    ],
                    'letter_spacing'   => [
                        'desktop'   =>  '0em',
                        'tablet'   =>  '0em',
                        'mobile'   =>  '0em'
                    ],
                    'text_transform'    => 'none',
                    'text_decoration'    => 'none',
                    'preset'    =>  '-1'
                ];
                return array_merge( $default, $typography );
            }

            /**
             * Get default typography
             * 
             * @since 1.0.0
             */
            protected function get_dimension( $dimension = [] ) {
                $default = [
                    'top'   =>  0,
                    'right' =>  0,
                    'bottom' =>  0,
                    'left' =>  0,
                    'link' =>  true,
                    // 'unit'  =>  'px'
                ];
                return array_merge( $default, $dimension );
            }

            /**
             * Get default typography
             * 
             * @since 1.0.0
             */
            protected function get_border( $border = [] ) {
                $default = [
                    'color' =>  '#000',
                    'style' =>  'none',
                    'width' =>  [
                        'top'   =>  1,
                        'right'   =>  1,
                        'bottom'   =>  1,
                        'left'   =>  1,
                        'link'   =>  true
                    ]
                ];
                return array_merge( $default, $border );
            }

            /**
             * Get default typography
             * 
             * @since 1.0.0
             */
            protected function get_responsive( $desktop = 0, $tablet = 0, $mobile = 0 ) {
                $default = [
                    'desktop'   =>  $desktop,
                    'tablet'    =>  $tablet,
                    'mobile'    =>  $mobile
                ];
                return $default;
            }

            /**
             * Get default typography
             * 
             * @since 1.0.0
             */
            protected function get_color( $color = [] ) {
                $default = [
                    'type'   =>  'solid',
                    'value'    =>  '#000',
                ];
                return array_merge( $default, $color );
            }
        }
    endif;