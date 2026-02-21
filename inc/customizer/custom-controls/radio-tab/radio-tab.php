<?php
    /**
     * Radio Tab customzer custom control
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