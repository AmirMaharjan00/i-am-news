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
    use IAN\Customizer\Controls\Text as Text;
    use IAN\Customizer\Controls\Number as Number;
    use IAN\Customizer\Controls\Border as Border;
    use IAN\Customizer\Controls\Dimension as Dimension;
    use IAN\Customizer\Controls\Heading_Toggle as Heading_Toggle;
    use IAN\Customizer\Controls\Checkbox as Checkbox;
    use IAN\Customizer\Customizer_Defaults as Customizer_Defaults;
    use IAN\Customizer\Sanitize_Functions as Sanitize_Functions;
    use IAN\Dynamic_Css as Dynamic_Css;

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
            use Dynamic_Css;

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
             * Common control args
             * 
             * @var array
             * @since 1.0.0
             */
            public $common = [];

            /**
             * Tab
             * 
             * @var string
             * @since 1.0.0
             */
            public $tab = 'general';

            /**
             * Custom Controls
             * 
             * @var array
             * @since 1.0.0
             */
            public $custom_controls = [];

            /**
             * Dynamic css args
             * 
             * @var array
             * @since 1.0.0
             */
            public $dynamic_css_args = [];

            /**
             * Dynamic styles
             * 
             * @var array
             * @since 1.0.0
             */
            public $dynamic_styles = [];

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
                add_action( 'init', function(){
                    $this->set_defaults();
                    $this->set_dynamic_style_func();
                } );
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
                    'ian-text'    =>  [ $this, 'add_text' ],
                    'ian-number'    =>  [ $this, 'add_number' ],
                    'border'    =>  [ $this, 'add_border' ],
                    'dimension'    =>  [ $this, 'add_dimension' ],
                    'heading-toggle'    =>  [ $this, 'add_heading_toggle' ],
                    'ian-checkbox'    =>  [ $this, 'add_checkbox' ],
                ];
            }

            /**
             * Get dynamic styles functions
             * 
             * @since 1.0.0
             */
            public function set_dynamic_style_func() {
                $this->dynamic_styles = [
                    'box-shadow'    =>  [ $this, 'dynamic_box_shadow' ],
                    'typography'    =>  [ $this, 'dynamic_typography' ],
                    'ian-number'    =>  [ $this, 'dynamic_number' ],
                    'border'    =>  [ $this, 'dynamic_border' ],
                    'dimension'    =>  [ $this, 'dynamic_dimension' ],
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
             * Dynamic css args
             * 
             * @since 1.0.0
             */
            abstract public function get_dynamic_css_args( $add_type = false );

            /**
             * Add setting
             * 
             * @since 1.0.0
             */
            protected function add_section( $id ) {
                $this->section = $id;
                $section = $this->get_controls( $id );
                $this->manager->add_section( $id, $section );
                $this->common = [
                    'section'   =>  $id,
                    'tab'   =>  $this->tab
                ];
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
             * Add Text
             * 
             * @since 1.0.0
             */
            private function add_text( $id, $control ) {
                $this->manager->add_control( new Text( $this->manager, $id, $control ) );
            }

            /**
             * Add Number
             * 
             * @since 1.0.0
             */
            private function add_number( $id, $control ) {
                $this->manager->add_control( new Number( $this->manager, $id, $control ) );
            }

            /**
             * Add Border
             * 
             * @since 1.0.0
             */
            private function add_border( $id, $control ) {
                $this->manager->add_control( new Border( $this->manager, $id, $control ) );
            }

            /**
             * Add Text
             * 
             * @since 1.0.0
             */
            private function add_dimension( $id, $control ) {
                $this->manager->add_control( new Dimension( $this->manager, $id, $control ) );
            }
            
            /**
             * Add Text
             * 
             * @since 1.0.0
             */
            private function add_heading_toggle( $id, $control ) {
                $this->manager->add_control( new Heading_Toggle( $this->manager, $id, $control ) );
            }

            /**
             * Add Text
             * 
             * @since 1.0.0
             */
            private function add_checkbox( $id, $control ) {
                $this->manager->add_control( new Checkbox( $this->manager, $id, $control ) );
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

            /**
             * Render dynamic css
             * 
             * @return css
             * @since 1.0.0
             */
            public function render_dynamic_css() {
                $dynamic_css = [];
                $dynamic_css_args = $this->get_dynamic_css_args();
                foreach( $dynamic_css_args as $id => $args ) {
                    $control_args = $this->get_controls( $id );
                    $dynamic_css[ $id ] = call_user_func( $this->dynamic_styles[ $control_args[ 'type' ] ], $args );
                }
                $replaced_id = str_replace( '-', '_', $this->id );
                return apply_filters( "{$replaced_id}_dynamic_css_filter", $dynamic_css );
            }
        }
    endif;