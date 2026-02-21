<?php
    /**
     * Typography customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Typography' ) ) :
        /**
         * Typography Class
         */
        class Typography extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'toggle-button';
        }
    endif;