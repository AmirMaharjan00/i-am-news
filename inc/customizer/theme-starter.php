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
             * Get default box shadow
             * 
             * @since 1.0.0
             */
            protected function get_box_shadow( $box_shadow = [] ) {
                $default = [
                    'enable'    =>  true,
                    'offsetx'   =>  0,
                    'offsety'   =>  0,
                    'inset' =>  false,
                    'color' =>  '#000',
                    'blur'  =>  0,
                    'spread'    =>  0
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
                    'font_family'   => [ 'value' => 'Jost', 'label' => 'Jost' ],
                    'font_weight'   =>  '500italic',
                    'font_size'   => [
                        'desktop'   =>  '13px',
                        'tablet'   =>  '13px',
                        'mobile'   =>  '13px'
                    ],
                    'line_height'   => [
                        'desktop'   =>  '21%',
                        'tablet'   =>  '21%',
                        'mobile'   =>  '21%'
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
                    'unit'  =>  'px'
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
                    'style' =>  'solid',
                    'width' =>  [
                        'top'   =>  0,
                        'right'   =>  0,
                        'bottom'   =>  0,
                        'left'   =>  0,
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
        }
    endif;