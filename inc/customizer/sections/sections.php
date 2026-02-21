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
    use IAN\Customizer\Controls\Section_Tab as Section_Tab;
    use IAN\Customizer\Controls\Icon_Picker as Icon_Picker;
    use IAN\Customizer\Controls\Toggle_Button as Toggle_Button;
    use IAN\Customizer\Controls\Typography as Typography;
    use IAN\Customizer\Controls\Radio_Tab as Radio_Tab;
    use IAN\Customizer\Customizer_Defaults as Customizer_Defaults;
    use IAN\Customizer\Sanitize_Functions as Sanitize_Functions;

    use function get_theme_mod;

    interface Section_Interface {
        /**
         * Get defaults
         * 
         * @since 1.0.0
         */
        public function get_defaults( $id = '' );

        /**
         * Render html
         * 
         * @since 1.0.0
         */
        public function render_html();

        /**
         * Dynamic css
         * 
         * @since 1.0.0
         */
        public function render_dynamic_css();
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
            use Sanitize_Functions;

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
                add_action( 'init', [ $this, 'set_defaults' ] );
                add_action( 'customize_register', [ $this, 'init' ] );
            }

            /**
             * Init
             * 
             * @since 1.0.0
             */
            public function init( $wp_customize ) {
                $this->manager = $wp_customize;
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
                    'radio-image'    =>  [ $this, 'add_radio_image' ],
                    'section-tab'    =>  [ $this, 'add_section_tab' ],
                    'icon-picker'    =>  [ $this, 'add_icon_picker' ],
                    'toggle-button'    =>  [ $this, 'add_Toggle_Button' ],
                    'typography'    =>  [ $this, 'add_typography' ],
                    'radio-tab'    =>  [ $this, 'add_radio_tab' ],
                ];
            }

            /**
             * Register controls
             * 
             * @since 1.0.0
             */
            abstract protected function register_controls();

            /**
             * Get settings
             * 
             * @since 1.0.0
             */
            abstract protected function get_settings( $id = '' );

            /**
             * Get controls
             * 
             * @since 1.0.0
             */
            abstract protected function get_controls( $id = '' );

            /**
             * Get controls
             * 
             * @since 1.0.0
             */
            abstract public function set_defaults();

            /**
             * Get controls
             * 
             * @since 1.0.0
             */
            abstract public function render_html();

            /**
             * Get controls
             * 
             * @since 1.0.0
             */
            abstract public function render_dynamic_css();

            /**
             * Add setting
             * 
             * @since 1.0.0
             */
            protected function add_section( $id ) {
                $this->section = $id;
                $section = $this->get_controls( $id );
                $this->manager->add_section( $id, $section );
            }

            /**
             * Add control
             * 
             * @since 1.0.0
             */
            protected function add_control( $id ) {
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
            protected function get_custom_control( $id, $control ) {
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
            private function add_box_shadow( $id, $control ) {
                $this->manager->add_control( new Box_Shadow( $this->manager, $id, $control ) );
            }

            /**
             * Add radio image
             * 
             * @since 1.0.0
             */
            private function add_radio_image( $id, $control ) {
                $this->manager->add_control( new Radio_Image( $this->manager, $id, $control ) );
            }

            /**
             * Add section tab
             * 
             * @since 1.0.0
             */
            private function add_section_tab( $id, $control ) {
                $this->manager->add_control( new Section_Tab( $this->manager, $id, $control ) );
            }

            /**
             * Add Icon Picker
             * 
             * @since 1.0.0
             */
            private function add_icon_picker( $id, $control ) {
                $this->manager->add_control( new Icon_Picker( $this->manager, $id, $control ) );
            }

            /**
             * Add Toggle Button
             * 
             * @since 1.0.0
             */
            private function add_Toggle_Button( $id, $control ) {
                $this->manager->add_control( new Toggle_Button( $this->manager, $id, $control ) );
            }

            /**
             * Add Typography
             * 
             * @since 1.0.0
             */
            private function add_typography( $id, $control ) {
                $this->manager->add_control( new Typography( $this->manager, $id, $control ) );
            }

            /**
             * Add Radio Tab
             * 
             * @since 1.0.0
             */
            private function add_radio_tab( $id, $control ) {
                $this->manager->add_control( new Radio_Tab( $this->manager, $id, $control ) );
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

            /**
             * Get updated customizer value
             * 
             * @since 1.0.0
             */
            public function get_customizer_value( $id = '' ) {
                if( ! $id ) return;
                return get_theme_mod( $id, $this->get_defaults( $id ) );
            }
        }
    endif;