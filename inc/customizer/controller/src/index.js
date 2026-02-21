const { controlConstructor, Control, section } = wp.customize,
    { createRoot } = wp.element

import { BoxShadowComponent } from './components/box-shadow'
import { RadioImageComponent } from './components/radio-image'
import { SectionTabComponent } from './components/section-tab'
import { IconPickerComponent } from './components/icon-picker'
import { ToggleButtonComponent } from './components/toggle-button'

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

/**
 * MARK: Section Tab
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'section-tab' ] = Control.extend({

    ready: function () {
        const control = this,
            { params, container, section: _thisSection, setting } = control,
            root = container.find( '.root' )[ 0 ],
            reactRoot = createRoot( root )
        
        let rendered = false; // ensure we render only once

        /**
         * Function to render your React toggle
         */
        const renderSectionTab = ( instance ) => {
            if ( rendered ) return;
            rendered = true;
            const props = { 
                ...params,
                setting,
                id: control.id,
                controls: instance.controls()
            }
            reactRoot.render( <SectionTabComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        section( _thisSection(), function( instance ){
            if( _thisSection ) {
                section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                    if( isExpanded ) renderSectionTab( instance )
                } );
            } else {
                renderSectionTab( instance )
            }
        } )

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Icon Picker
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'icon-picker' ] = Control.extend({

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
        const renderIconPicker = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <IconPickerComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderIconPicker()
            } );
        } else {
            renderIconPicker()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Toggle Button
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'toggle-button' ] = Control.extend({

    ready: function () {
        const control = this,
            { params, container, section: _thisSection, setting } = control,
            root = container.find( '.root' )[ 0 ],
            reactRoot = createRoot( root ),
            props = { 
                ...params,
                setting
            }
        console.log( 'testing outside' )
        
        let rendered = false; // ensure we render only once

        /**
         * Function to render your React toggle
         */
        const renderToggleButton = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <ToggleButtonComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderToggleButton()
            } );
        } else {
            renderToggleButton()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});