<?php
    /**
     * Number customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Number' ) ) :
        /**
         * Number Class
         */
        class Number extends Base {
            /**
             * Type of control
             * 
             * @since 1.0.0
             * @var string
             */
            public $type = 'ian-number';

            /**
             * Is this control responsive
             * 
             * @since 1.0.0
             * @var bool
             */
            public $responsive = false;

            /**
             * Is this control responsive
             * 
             * @since 1.0.0
             * @var array
             */
            public $input_attrs = [];

            /**
             * To json
             * 
             * @since 1.0.0
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'responsive' ] = $this->responsive;
                $this->json[ 'input_attrs' ] = $this->input_attrs;
            }
        }
    endif;