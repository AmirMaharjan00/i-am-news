const { controlConstructor, Control, section } = wp.customize,
    { createElement, createRoot, useState, useEffect, unmountComponentAtNode } = wp.element,
    { ToggleControl } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

import { BoxShadowComponent } from './components/box-shadow'
import { RadioImageComponent } from './components/radio-image'

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
            root = container.find( '.root' )[ 0 ],
            reactRoot = createRoot( root ),
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
            reactRoot.render( <BoxShadowComponent { ...props } /> )
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

/**
 * MARK: Radio Image
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'radio-image' ] = Control.extend({

    ready: function () {
        const control = this,
            { params, container, section: _thisSection, setting } = control,
            root = container.find( '.root' )[ 0 ],
            reactRoot = createRoot( root ),
            props = { 
                ...params,
                setting
            }

        let rendered = false; // ensure we render only once

        /**
         * Function to render your React toggle
         */
        const renderRadioImage = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <RadioImageComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderRadioImage()
            });
        } else {
            renderRadioImage()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});