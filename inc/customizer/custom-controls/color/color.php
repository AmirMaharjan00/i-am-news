<?php
    /**
     * Color customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Color' ) ) :
        /**
         * Toggle Button Class
         */
        class Color extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             * @var string
             */
            public $type = 'ian-color';

            /**
             * Whether to include hover or not
             * 
             * @since 1.0.0
             * @var bool
             */
            public $include_hover = false;

            /**
             * Color types to include
             * 
             * @since 1.0.0
             * @var array
             */
            public $color_types = [ 'solid' ];

            /**
             * To json
             * 
             * @since 1.0.0
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'include_hover' ] = $this->include_hover;
                $this->json[ 'color_types' ] = $this->color_types;
            }
        }
    endif;