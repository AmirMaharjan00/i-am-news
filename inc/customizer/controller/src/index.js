const { customize } = wp,
    { controlConstructor, Control, section } = customize,
    { createRoot } = wp.element

import { BoxShadowComponent } from './components/box-shadow'
import { RadioImageComponent } from './components/radio-image'
import { SectionTabComponent } from './components/section-tab'
import { IconPickerComponent } from './components/icon-picker'
import { ToggleButtonComponent } from './components/toggle-button'
import { TextComponent } from './components/text'
import { RadioTabComponent } from './components/radio-tab'
import { TypographComponent } from './components/typography'
import { NumberComponent } from './components/number'
import { BorderComponent } from './components/border'
import { DimensionComponent } from './components/dimension'
import { HeadingToggleComponent } from './components/heading-toggle'
import { CheckboxComponent } from './components/checkbox'
import { ColorComponent } from './components/color'
import { BuilderComponent } from './components/builder'

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

/**
 * MARK: Typography
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'typography' ] = Control.extend({

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
        const renderTypography = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <TypographComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderTypography()
            } );
        } else {
            renderTypography()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});


/**
 * MARK: Text
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'ian-text' ] = Control.extend({

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
        const renderText = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <TextComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderText()
            } );
        } else {
            renderText()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Radio tab
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'radio-tab' ] = Control.extend({

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
        const renderRadioTab = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <RadioTabComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderRadioTab()
            } );
        } else {
            renderRadioTab()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Number
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'ian-number' ] = Control.extend({

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
        const renderNumber = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <NumberComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderNumber()
            } );
        } else {
            renderNumber()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Border
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'border' ] = Control.extend({

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
        const renderBorder = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <BorderComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderBorder()
            } );
        } else {
            renderBorder()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Dimension
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'dimension' ] = Control.extend({

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
        const renderDimension = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <DimensionComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderDimension()
            } );
        } else {
            renderDimension()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Heading Toggle
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'heading-toggle' ] = Control.extend({

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
        const renderHeadingToggle = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <HeadingToggleComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderHeadingToggle()
            } );
        } else {
            renderHeadingToggle()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Checkbox
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'ian-checkbox' ] = Control.extend({

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
        const renderCheckbox = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <CheckboxComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderCheckbox()
            } );
        } else {
            renderCheckbox()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Color
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'ian-color' ] = Control.extend({

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
        const renderColor = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <ColorComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderColor()
            } );
        } else {
            renderColor()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * MARK: Builder
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor[ 'ian-builder' ] = Control.extend({

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
        const renderBuilder = () => {
            if ( rendered ) return;
            rendered = true;
            reactRoot.render( <BuilderComponent { ...props } /> )
        };

        /**
         * Lazy load when the section expands
         * Component will mount only when section is mounted
         */
        if( _thisSection ) {
            section( _thisSection() ).expanded.bind( 'expanded', function( isExpanded ) {
                if( isExpanded ) renderBuilder()
            } );
        } else {
            renderBuilder()
        }

        /**
         * Unbind if the controls container <li> tag is remoed
         */
        container.on( 'remove', () => reactRoot.unmount() );
    }
});

/**
 * Conditional rendering
 * 
 * @since 1.0.0
 */
const ConditionalRendering = {
    controls: [],   // stores controls that has conditions
    settingsMap : [],

    init: function () {
        let self = this
        customize.control.each( function( control ) {
            let { params, id } = control,
                { conditions } = params

            if( Array.isArray( conditions ) || conditions === undefined ) return    // return if condition doesn't exists or is array

            self.controls.push( id )    // push controls that have conditions

            conditions.rules.forEach( ( rule ) => {
                let { setting } = rule
                if( ! self.settingsMap[ setting ] ) {
                    self.settingsMap[ setting ] = []
                }
                self.settingsMap[ setting ].push( control )     // push setting on which the control should show or hide
            } )
        } )
        this.initialRendering()
        this.bindSettings()
    },

    bindSettings: function () {
        let self = this

        Object.keys( this.settingsMap ).forEach( ( settingId ) => {
            let setting = customize( settingId )

            if( ! setting ) return
            
            setting.bind( function( settingValue ) {
                self.settingsMap[ settingId ].forEach( function( control ) {
                    let evaluate = self.evaluate( settingValue, control )
                    if( evaluate ) {
                        control.container.slideDown()
                    } else {
                        control.container.slideUp()
                    }
                } )
            } )
        } )
    },

    evaluate: function( settingValue, control ) {
        let { params } = control,
            { conditions } = params,
            { relation, rules } = conditions,
            match = false,
            results = []
            
        rules.forEach( function( rule ) {
            let { operator, value } = rule

            switch( operator ) {
                case '!=' :
                        match = settingValue != value
                    break;
                case 'in' :
                        match = value.includes( settingValue )
                    break;
                default:
                        match = value === settingValue
                    break;
            }
            results.push( match )
        } )

        if( relation === 'OR' ) return results.some( Boolean )
        return results.every( Boolean )
    },

    initialRendering: function(){
        let self = this
        Object.keys( this.settingsMap ).map( settingId => {
            let settingValue = customize( settingId ).get()
            self.settingsMap[ settingId ].map( ( instance ) => {
                let evaluate = self.evaluate( settingValue, instance )
                if( ! evaluate ) {
                    instance.container.hide()
                }
            } )
        } )
    }
    
}

customize.bind( 'ready', function() {
    ConditionalRendering.init()
} )
