<?php
    /**
     * Toggle Button customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Toggle_Button' ) ) :
        /**
         * Toggle Button Class
         */
        class Toggle_Button extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'toggle-button';
        }
    endif;