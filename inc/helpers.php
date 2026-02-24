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

                extract( $args );
                
                switch( $type ) {
                    case 'icon' : 
                            $icon_html = '<span class="icon"><i class="' . $value . '"></i></span>';
                            return $icon_html;
                        break;
                    case 'image' : 
                            $image_html = wp_get_attachment_image( $value );
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