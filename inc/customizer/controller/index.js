const { controlConstructor, Control } = wp.customize,
    { createElement, render, useState, useEffect } = wp.element,
    { ToggleControl } = wp.components

/**
 * MARK: Box Shadow
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'box-shadow' ] = Control.extend({

    ready: function () {
        const control = this,
            { params, container, section, setting } = control
        console.log( section )

        let rendered = false; // ensure we render only once

        // Function to render your React toggle
        const renderBoxShadow = () => {
            if ( rendered ) return;
            rendered = true;

            const BoxShadowComponent = () => {
                const [ value, setValue ] = useState( setting.get() )

                useEffect(() => {
                    console.log( 'component mounted.' )
                }, [])

                /**
                 * Update value
                 * 
                 * @since 1.0.0
                 */
                const update = ( newVal ) => {
                    setValue( newVal )
                    setting.set( newVal )
                };

                /**
                 * Component main return
                 */
                return createElement( ToggleControl, {
                    label: params.label,
                    checked: value,
                    onChange: update
                });
            };

            render( createElement( BoxShadowComponent ), container[ 0 ] );
        };

        // Lazy load when the section expands
        section.bind( 'expanded', function( isExpanded ) {
            console.log( isExpanded )
            if( isExpanded ) renderBoxShadow()
        });
    }
});
