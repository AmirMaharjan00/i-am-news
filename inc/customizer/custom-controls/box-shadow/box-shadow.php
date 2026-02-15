<?php
    /**
     * Box Shadow Control
     * 
     * @package I am News
     * @see IAN\Customizer\Base
     * @since 1.0.0
     */
    use IAN\Customizer;
    if( ! class_exists( 'Box_Shadow' ) ) :
        /**
         * Box Shadow Class
         */
        class Box_Shadow extends IAN\Customizer\Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'box-shadow';
        }
    endif;