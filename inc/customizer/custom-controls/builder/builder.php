<?php
    /**
     * Builder customzer custom control
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Controls;

    use IAN\Customizer\Base as Base;
    
    if( ! class_exists( __NAMESPACE__ . '\\Builder' ) ) :
        /**
         * Builder Class
         */
        class Builder extends Base {
            /**
             * Type of control
             * 
             * @var string
             * @since 1.0.0
             */
            public $type = 'ian-builder';

            /**
             * Builder widgets
             * 
             * @var array
             * @since 1.0.0
             */
            public $widgets = [];

            /**
             * Row section ids
             * 
             * @var array
             * @since 1.0.0
             */
            public $row_section_ids = [];

            /**
             * To json
             * 
             * @since 1.0.0
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'widgets' ] = $this->widgets;
                $this->json[ 'row_section_ids' ] = $this->row_section_ids;
            }
        }
    endif;