<?php
    /**
     * Sections base
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN\Customizer\Section;
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
        public function get_settings( $id );

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
        public function get_controls( $id );

        /**
         * Register controls
         * 
         * @since 1.0.0
         */
        public function register_controls();
    }

    if( ! class_exists( __NAMESPACE__ . '\\Section' ) ) :
        /**
         * Section Class
         */
        abstract class Section implements Section_Interface {
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
                $this->register_controls();
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
            abstract public function get_settings( $id );

            /**
             * Get controls
             * 
             * @since 1.0.0
             */
            abstract public function get_controls( $id );

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

                $this->manager->add_setting( $id, $setting );
                $this->manager->add_control( $id, $control );
            }
        }
    endif;