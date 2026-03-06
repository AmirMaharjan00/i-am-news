<?php
    /**
     * Controls the length of the excerpt
     * 
     * @since 1.0.0
     */
    add_filter( 'excerpt_length', function(){
        return 25;
    } );

    /**
     * Remove everything after 25 words in excerpt and in place add it replacement
     * 
     * @since 1.0.0 
     */
    add_filter( 'excerpt_more', function(){
        return '...';
    } );