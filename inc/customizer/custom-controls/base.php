<?php
    /**
     * Base class that extends WP_Customzier_Control
     * 
     * @package I am News
     * @see WP_Customzier_Control
     * 
     * @since 1.0.0
     */
    namespace IAN\Customizer;
    if( ! class_exists( __NAMESPACE__ . '\\Base' ) ) :
        /**
         * Base Class
         */
        class Base extends \WP_Customize_Control {
            /**
             * Tab
             * 
             * @var string
             * @since 1.0.0
             */
            public $tab = 'general';

            /**
             * Parameters to send
             * 
             * @since 1.0.0
             * @override 
             */
            public function to_json() {
                parent::to_json();
                $this->json[ 'tab' ] = $this->tab;
            }

            /**
             * Add custom container
             * 
             * @since 1.0.0
             * @override
             */
            public function render_content() {
                ?>
                    <div class="root"></div>
                <?php
            }
        }
    endif;