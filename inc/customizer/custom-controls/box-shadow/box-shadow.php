<?php
    /**
     * Box Shadow Control
     * 
     * @package I am News
     * @see IAN\Customizer\Base
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__. '\\Box_Shadow' ) ) :
        /**
         * Box Shadow Class
         */
        class Box_Shadow extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'box-shadow';
        }
    endif;