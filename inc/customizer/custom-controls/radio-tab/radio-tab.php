<?php
    /**
     * Radio tab customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Radio_Tab' ) ) :
        /**
         * Radio Tab Class
         */
        class Radio_Tab extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'radio-tab';

            /**
             * Fields
             * 
             * @since 1.0.0
             */
            public $fields = [];

            /**
             * Show label and control in single line
             * 
             * @since 1.0.0
             */
            public $display_block = false;

            /**
             * To json
             * 
             * @since 1.0.0
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'fields' ] = $this->fields;
                $this->json[ 'display_block' ] = $this->display_block;
            }
        }
    endif;