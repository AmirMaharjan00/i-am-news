<?php
    /**
     * Radio Image customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Radio_Image' ) ) :
        /**
         * Radio Image Class
         */
        class Radio_Image extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'radio-image';

            /**
             * Control fields
             * 
             * @since 1.0.0
             */
            public $fields = [];

            /**
             * json
             * 
             * @since 1.0.0
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'fields' ] = $this->fields;
            }
        }
    endif;