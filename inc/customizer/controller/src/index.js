const { controlConstructor, Control, section } = wp.customize,
    { createElement, createRoot, useState, useEffect, unmountComponentAtNode } = wp.element,
    { ToggleControl } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

import { BoxShadowComponent } from './components/box-shadow'

/**
 * MARK: Box Shadow
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'box-shadow' ] = Control.extend({

    ready: function () {
        const control = this,
            { params, container, section: _thisSection, setting } = control,
            root = container.find( '.root' ),
            props = { 
                ...params,
                setting
            }

        let rendered = false; // ensure we render only once

        /**
         * Function to render your React toggle
         */
        const renderBoxShadow = () => {
            if ( rendered ) return;
            rendered = true;
            let reactRoot = createRoot( root[ 0 ] )
            reactRoot.render( <BoxShadowComponent { ...props }/> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderBoxShadow()
            });
        } else {
            renderBoxShadow()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});