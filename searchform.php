<?php 
/**
 * Search form
 * 
 * @since 1.0.0
 * @package Blog Postx Pro
 */
use IAN\Customizer\Section\Search as Search;
use IAN\Helpers as Helpers;

$search_instance = Search::get_instance();
$search_layouts = $search_instance::get_theme_option( 'search_layouts' );
$search_icon = $search_instance::get_theme_option( 'search_icon_picker' );
$search_icon[ 'class' ] = 'search-icon';
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label>
        <span class="screen-reader-text">
            <?php
                /* translators: Hidden accessibility text. */
                _x( 'Search for:', 'label', 'i-am-news' );
            ?>
        </span>
        <input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'Search &hellip;', 'placeholder', 'i-am-news' ); ?>" value="<?php echo get_search_query()?>" name="s" />
    </label>
    <?php echo Helpers::get_icon_html( $search_icon ); ?>
</form>