<?php
    /**
     * Sections base
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;

    use IAN\Customizer\Controls\Box_Shadow as Box_Shadow;
    use IAN\Customizer\Controls\Radio_Image as Radio_Image;
    use IAN\Customizer\Customizer_Defaults as Customizer_Defaults;

    interface Section_Interface {        
        /**
         * Adding Section
         * 
         * @since 1.0.0
         */
        public function add_section( $id );

        /**
         * Get control settings
         * 
         * @since 1.0.0
         */
        public function get_settings( $id = '' );

        /**
         * Adding Control
         * 
         * @since 1.0.0
         */
        public function add_control( $id );

        /**
         * Get controls
         * 
         * @since 1.0.0
         */
        public function get_controls( $id = '' );

        /**
         * Register controls
         * 
         * @since 1.0.0
         */
        public function register_controls();

        /**
         * Set defaults
         * 
         * @since 1.0.0
         */
        public function set_defaults();

        /**
         * Get defaults
         * 
         * @since 1.0.0
         */
        public function get_defaults( $id = '' );
    }

    if( ! class_exists( __NAMESPACE__ . '\\Section' ) ) :
        /**
         * Section Class
         */
        abstract class Section implements Section_Interface {
            /**
             * Using trait 
             */
            use Customizer_Defaults;

            /**
             * Manager instance
             * 
             * @see WP_Customizer_Manager
             * @since 1.0.0
             */
            public $manager = null;

            /**
             * Section id
             * 
             * @var string
             * @since 1.0.0
             */
            public $section = '';

            /**
             * Custom Controls
             * 
             * @var array
             * @since 1.0.0
             */
            public $custom_controls = [];

            /**
             * Default values
             * 
             * @var array
             * @since 1.0.0
             */
            public $defaults = [];

            /**
             * Instantiate class
             * 
             * @since 1.0.0
             */
            public function __construct() {
                add_action( 'customize_register', [ $this, 'init' ] );
            }

            /**
             * Init
             * 
             * @since 1.0.0
             */
            public function init( $wp_customize ) {
                $this->manager = $wp_customize;
                $this->set_defaults();
                $this->set_custom_controls();
                $this->register_controls();
            }

            /**
             * Get custom control
             * 
             * @since 1.0.0
             */
            public function set_custom_controls() {
                $this->custom_controls = [
                    'box-shadow'    =>  [ $this, 'add_box_shadow' ],
                    'radio-image'    =>  [ $this, 'add_radio_image' ]
                ];
            }

            /**
             * Register controls
             * 
             * @since 1.0.0
             */
            abstract public function register_controls();

            /**
             * Get settings
             * 
             * @since 1.0.0
             */
            abstract public function get_settings( $id = '' );

            /**
             * Get controls
             * 
             * @since 1.0.0
             */
            abstract public function get_controls( $id = '' );

            /**
             * Get controls
             * 
             * @since 1.0.0
             */
            abstract public function set_defaults();

            /**
             * Add setting
             * 
             * @since 1.0.0
             */
            public function add_section( $id ) {
                $this->section = $id;
                $section = $this->get_controls( $id );
                $this->manager->add_section( $id, $section );
            }

            /**
             * Add control
             * 
             * @since 1.0.0
             */
            public function add_control( $id ) {
                $setting = $this->get_settings( $id );
                $control = $this->get_controls( $id );
                $default_types = [ 'text', 'checkbox', 'textarea', 'radio', 'select', 'dropdown-pages', 'email', 'url', 'number', 'hidden', 'date' ];

                $this->manager->add_setting( $id, $setting );

                if( in_array( $control[ 'type' ], $default_types ) ) :
                    $this->manager->add_control( $id, $control );
                else:
                    $this->get_custom_control( $id, $control );
                endif;
            }

            /**
             * Get custom control
             * 
             * @since 1.0.0
             */
            public function get_custom_control( $id, $control ) {
                if( isset( $this->custom_controls[ $control[ 'type' ] ] ) ) :
                    call_user_func( $this->custom_controls[ $control[ 'type' ] ], $id, $control );
                else:
                    $control[ 'type' ] = 'text';
                    $this->manager->add_control( $id, $control );
                endif;
            }

            /**
             * Add box shadow
             * 
             * @since 1.0.0
             */
            public function add_box_shadow( $id, $control ) {
                $this->manager->add_control( new Box_Shadow( $this->manager, $id, $control ) );
            }

            /**
             * Add radio image
             * 
             * @since 1.0.0
             */
            public function add_radio_image( $id, $control ) {
                $this->manager->add_control( new Radio_Image( $this->manager, $id, $control ) );
            }

            /**
             * Get defaults
             * 
             * @since 1.0.0
             * @var array
             */
            public function get_defaults( $id = '' ) {
                return $id ? $this->defaults[ $id ] : $this->defaults;
            }
        }
    endif;