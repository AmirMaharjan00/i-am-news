<?php
    /**
     *  A utility class
     * 
     * @package I am News
     * @since 1.0.0
     */

    use IAN\Customizer\Section\Date_Time as Date_Time;
    use IAN\Customizer\Section\Time as Time;
    use IAN\Customizer\Section\Dark_Mode as Dark_Mode;
    use IAN\Customizer\Section\Primary_Menu as Primary_Menu;
    use IAN\Customizer\Section\Secondary_Menu as Secondary_Menu;
    use IAN\Customizer\Section\Site_Logo as Site_Logo;
    use IAN\Customizer\Section\Social_Icons as Social_Icons;
    use IAN\Customizer\Section\Search as Search;

    if( ! class_exists( 'Utility' ) ) {
        /**
         * The utility class
         */
        class Utility {
            /**
             * Get header builder widget html
             * 
             * @since 1.0.0
             * @param   html    $widget The widget id
             */
            public static function get_header_builder_widget_html( $widget ) {
                if( ! $widget ) return;

                switch( $widget ) {
                    case 'date-time':
                        Date_time::get_instance()->render_html();
                        break;
                    case 'dark-mode':
                        Dark_Mode::get_instance()->render_html();
                        break;
                    case 'time':
                        Time::get_instance()->render_html();
                        break;
                    case 'site-logo':
                        Site_Logo::get_instance()->render_html();
                        break;
                    case 'primary-menu':
                        Primary_Menu::get_instance()->render_html();
                        break;
                    case 'search':
                        Search::get_instance()->render_html();
                        break;
                    case 'social-icons':
                        Social_Icons::get_instance()->render_html();
                        break;
                }
            }
        }
    }