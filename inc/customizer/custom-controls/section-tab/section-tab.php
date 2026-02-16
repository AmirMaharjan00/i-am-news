<?php
    /**
     * Radio Image customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Section_Tab' ) ) :
        /**
         * Radio Image Class
         */
        class Section_Tab extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'section-tab';

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