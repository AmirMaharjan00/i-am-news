<?php
    /**
     * This file contains helper functions that are used throughout the application.
     * 
     * @package I am News
     * @since 1.0.0
     */
    namespace IAN;

    use function wp_get_attachment_image;

    if( ! class_exists( __NAMESPACE__ . '\\Helpers' ) ) {
        /**
         * Helpers class
         */
        class Helpers {
            /**
             * Get icon html
             * 
             * @since 1.0.0
             */
            public static function get_icon_html( array $args = [] ) : string {
                if( ( ! isset( $args[ 'type' ] ) || empty( $args[ 'type' ] ) ) || ( ! isset( $args[ 'value' ] ) || empty( $args[ 'value' ] ) ) ) return '';

                $type = isset( $args[ 'type' ] ) ? $args[ 'type' ] : 'icon';
                $value = isset( $args[ 'value' ] ) ? $args[ 'value' ] : 'fa-solid fa-sun';
                $class = isset( $args[ 'class' ] ) ? ' ' . $args[ 'class' ] : '';
                
                switch( $type ) {
                    case 'icon' : 
                            $icon_class = 'icon' . $class;
                            $icon_html = '<button class="' . esc_attr( $icon_class ) . '"><i class="' . esc_attr( $value ) . '"></i></button>';
                            return $icon_html;
                        break;
                    case 'image' : 
                            $image_html = wp_get_attachment_image( $value, 'thumbnail', false, [ 'class' => $class ] );
                            return $image_html;
                        break;
                    default : 
                            return '';
                        break;
                }
            }
        }
        new Helpers();
    }