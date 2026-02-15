<?php
    /**
     * Radio Image customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    use IAN\Customizer;
    if( ! class_exists( 'Radio_Image' ) ) :
        /**
         * Radio Image Class
         */
        class Radio_Image extends IAN\Customizer\Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             */
            public $type = 'radio-image';

            
        }
    endif;