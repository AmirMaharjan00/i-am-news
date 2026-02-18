<?php
    /**
     * Icon Picker Control
     * 
     * @package I am News
     * @see IAN\Customizer\Base
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__. '\\Icon_Picker' ) ) :
        /**
         * Icon Picker Class
         */
        class Icon_Picker extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'icon-picker';

            /**
             * Fields to exclude
             * 
             * @since 1.0.0
             */
            public $exclude = [];

            /**
             * Take entire width and the control in a seperate line from title and description
             * 
             * @since 1.0.0
             */
            public $display_block = false;

            /**
             * Send values to js
             * 
             * @since 1.0.0
             * @override
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'exclude' ] = $this->exclude;
                $this->json[ 'display_block' ] = $this->display_block;
            }
        }
    endif;