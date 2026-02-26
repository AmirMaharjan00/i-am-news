<?php
    /**
     * Dimension customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Dimension' ) ) :
        /**
         * Dimension Class
         */
        class Dimension extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             * @var string
             */
            public $type = 'dimension';
            
            /**
             * Sides to exclude
             * 
             * @since 1.0.0
             * @var array
             */
            public $exclude = [];

            /**
             * Whether the control should be responsive or not
             * 
             * @since 1.0.0
             * @var bool
             */
            public $responsive = false;

            /**
             * To json
             * 
             * @since 1.0.0
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'exclude' ] = $this->exclude;
                $this->json[ 'responsive' ] = $this->responsive;
            }
        }
    endif;