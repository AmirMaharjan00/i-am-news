(function( $, api ){
    console.log( 'Hello Preview js' )
    const dynamicCSS = {},
        googleFonts = {},
        tabletWidth = '@media(max-width: 1024px)',
        mobileWidth = '@media(max-width: 768px)',
        googleFontsURL = 'https://fonts.googleapis.com/css2'

    console.log( IanConfig )
    /**
     * Utility functions
     * 
     * @since 1.0.0
     * @var { object }
     */
    const Utils = {
        /**
         * Get control function
         * 
         * @since 1.0.0
         * @param { string }    type    control type
         * @return { string }   function to call from PreviewJs object
         */
        getControlFunction: function( type ) {
            const allControlTypes = {
                'box-shadow': 'boxShadow',
                'typography': 'typography',
                'ian-number': 'number',
                'border': 'border',
                'dimension': 'dimension',
                'ian-color': 'color',
                'radio-tab': 'toggleClass',
            }
            return allControlTypes[ type ]
        },
        /**
         * Add style tag for dynamic css
         * 
         * @since 1.0.0
         * @param { css }   css     The css to append to style tag
         * @return { void }
         */
        generateStyleTag: function( id, css ) {
            dynamicCSS[ id ] = css
            let styleTag = $( '#ian-dynamic-preview' );

            if( ! styleTag.length ) styleTag = $( '<style id="ian-dynamic-preview"></style>' ).appendTo( 'head' );

            let allCSS = Object.values( dynamicCSS ).join( '\n' );
            styleTag.html( allCSS );
        },
        /**
         * Add link tag for dynamic google fonts
         * 
         * @since 1.0.0
         * @param { css }   css     The css to append to style tag
         * @return { void }
         */
        generateGoogleFontsLinkTag: function( id, font ) {
            const { font_family, font_weight } = font
            let family = font_family.value,
                { weight, style } = this.getFontWeightAndStyle( font_weight )

            // add only one font family for one control
            googleFonts[ id ] = {
                family,
                weight,
                style
            }

            let linkTag = $( '#ian-google-fonts' ),
                href = this.getFullGoogleFontsLink()

            if( ! linkTag.length ) linkTag = $( '<link id="ian-google-fonts" rel="stylesheet"></link>' ).appendTo( 'head' );
            linkTag.attr( 'href', href )
        },
        /**
         * Get font weight and style in an object
         * 
         * @since 1.0.0
         */
        getFontWeightAndStyle: function( fontWeight ) {
            let weight = "400", style = ''
            if( fontWeight === 'regular' ) {
                style = 'normal'
            } else if( fontWeight === 'italic' ) {
                style = 'italic'
            } else if( [ '100', '200', '300', '500', '600', '700', '800', '900' ].includes( fontWeight ) ) {
                weight = fontWeight
                style = 'normal'
            } else {
                let regex = fontWeight.match( /^(\d+)([a-z]+)$/i )
                weight = String( regex[ 1 ] ),
                style = regex[ 2 ]
            }

            return {
                weight,
                style
            }
        },
        /**
         * Get filtered fonts
         * 
         * @since 1.0.0
         * @returns { object }
         */
        filterGoogleFonts: function() {
            return Object.values( googleFonts ).reduce( ( _this, args ) => {
                let { family, weight, style } = args

                // if font family doesn't exist
                if( ! Object.hasOwn( _this, family ) ) {
                    _this[ family ] = {
                        weight: [ weight ],
                        style: [ style ],
                    }
                }
    
                // if font weight doesn't exist
                if( ! _this[ family ].weight.includes( weight ) ) {
                    _this[ family ].weight.push( weight )
                }
    
                // if font style doesn't exist
                if( ! _this[ family ].style.includes( style ) ) {
                    _this[ family ].style.push( style )
                }

                return _this
            }, {} )
        },
        /**
         * Get full google fonts link
         * 
         * @since 1.0.0
         * @returns { string }
         */
        getFullGoogleFontsLink: function() {
            let filteredFonts = this.filterGoogleFonts(),
                fontArgs = Object.entries( filteredFonts ).reduce( ( _this, font ) => {
                    let [ family, args ] = font,
                        { weight, style } = args,
                        joinedWeights = weight.join( ';' ),
                        includesItalic = style.includes( 'italic' ),
                        prefix = includesItalic ? 'ital,' : "",
                        weights = includesItalic ? `0,${ weight.join( ';0,' ) };1,${ weight.join( ';1,' ) }` : joinedWeights

                    return [
                        ..._this,
                        `family=${ family }:${ prefix }wght@${ weights }`
                    ]
                }, [] ).join( '&' )
            
            return `${ googleFontsURL }?${ fontArgs }&display=swap`
        },

        /**
         * Get color css
         * 
         * @since 1.0.0
         * @param { array } color   The color value saved in db
         * @param { string } property   The css property
         * @returns { css }
         */
        getColorCss: function( color, property ) {
            let { type, value } = color
            if( type === 'image' ) {
                let css = ''
                if( Object.hasOwn( color, 'image' ) ) {
                    let image = color.image
                    if( Object.hasOwn( image, 'url' ) ) css += `background-image: url(${ image.url });`
                    if( Object.hasOwn( image, 'position' ) ) css += `background-position: ${ image.position };`
                    if( Object.hasOwn( image, 'repeat' ) ) css += `background-repeat: ${ image.repeat };`
                    if( Object.hasOwn( image, 'size' ) ) css += `background-size: ${ image.size };`
                }
                return css
            } else {
                return `${ property }: ${ value }`
            }
        }
    }
    
    /**
     * Collection of functions to use to update preview
     * 
     * @since 1.0.0
     * @var { object }
     */
    const PreviewJs = {
        /**
         * MARK: Border
         * 
         * @since 1.0.0
         * @param { string }    id  updated value of the setting
         * @param { array }     value   updated value of the setting
         */
        border: function( id, value ) {
            const { color, style, width } = value,
                { top, right, bottom, left } = width,
                { selector} = IanConfig[ id ]

            let css = ''

            if( style === 'none' ) {
                css = `
                    ${ selector } {
                        border: none;
                    }
                `
            } else {
                css = `
                    ${ selector } {
                        border-color: ${ color };
                        border-style: ${ style };
                        border-top-width: ${ top }px;
                        border-right-width: ${ right }px;
                        border-bottom-width: ${ bottom }px;
                        border-left-width: ${ left }px;
                    }
                `
            }

            Utils.generateStyleTag( id, css )
        },
        
        /**
         * MARK: Number
         * 
         * @since 1.0.0
         * @param { string }    id  updated value of the setting
         * @param { array }     value   updated value of the setting
         */
        number: function( id, value ) {
            const { selector, property } = IanConfig[ id ]

            let css = ''

            if( ( typeof value === 'object' ) && ( 'desktop' in value ) ) {
                const { desktop, tablet, mobile } = value
                css = `
                    ${ selector } {
                        ${ property }: ${ desktop };
                    }
                    ${ tabletWidth } { ${ selector } {
                        ${ property }: ${ tablet };
                    } }
                    ${ mobileWidth } { ${ selector } {
                        ${ property }: ${ mobile };
                    } }
                `
            } else {
                css = `
                    ${ selector } {
                        ${ property }: ${ value };
                    }
                `
            }

            Utils.generateStyleTag( id, css )
        },

        /**
         * MARK: Box shadow
         * 
         * @since 1.0.0
         * @param { string }    id  updated value of the setting
         * @param { array }     value   updated value of the setting
         */
        boxShadow: function( id, value ) {
            const { selector } = IanConfig[ id ],
                { enable, offsetx, offsety, inset, blur, spread, color } = value,
                type = inset ? 'inset' : ''

            let css = ''

            if( enable ) {
                css = `
                    ${ selector } {
                        box-shadow: ${ type } ${ offsetx }px ${ offsety }px ${ blur }px ${ spread }px ${ color };
                    }
                `
            } else {
                css = `
                    ${ selector } {
                        box-shadow: none;
                    }
                `
            }

            Utils.generateStyleTag( id, css )
        },

        /**
         * MARK: Dimension
         * 
         * @since 1.0.0
         * @param { string }    id  updated value of the setting
         * @param { array }     value   updated value of the setting
         */
        dimension: function( id, value ) {
            const { selector, property } = IanConfig[ id ]

            let css = ''

            if( ( typeof value === 'object' ) && ( 'desktop' in value ) ) {
                const { desktop, tablet, mobile } = value
                css = `
                    ${ selector } {
                        ${ property }: ${ desktop.top }px ${ desktop.right }px ${ desktop.bottom }px ${ desktop.left }px;
                    }
                    ${ tabletWidth } { ${ selector } {
                        ${ property }: ${ tablet.top }px ${ tablet.right }px ${ tablet.bottom }px ${ tablet.left }px;
                    } }
                    ${ mobileWidth } { ${ selector } {
                        ${ property }: ${ mobile.top }px ${ mobile.right }px ${ mobile.bottom }px ${ mobile.left }px;
                    } }
                `
            } else {
                css = `
                    ${ selector } {
                        ${ property }: ${ value.top }px ${ value.right }px ${ value.bottom }px ${ value.left }px;
                    }
                `
            }

            Utils.generateStyleTag( id, css )
        },

        /**
         * MARK: Typography
         * 
         * @since 1.0.0
         * @param { string }    id  updated value of the setting
         * @param { array }     value   updated value of the setting
         */
        typography: function( id, value ) {
            const { selector } = IanConfig[ id ],
                { font_family, font_weight, font_size, line_height, letter_spacing, text_decoration, text_transform } = value,
                { weight, style } = Utils.getFontWeightAndStyle( font_weight )

            Utils.generateGoogleFontsLinkTag( id, {
                font_family,
                font_weight
            } )

            let css = `
                ${ selector } {
                    font-family: '${ font_family.value }';
                    font-size: ${ font_size.desktop };
                    line-height: ${ line_height.desktop };
                    letter-spacing: ${ letter_spacing.desktop };
                    font-weight: ${ weight };
                    font-style: ${ style };
                    text-decoration: ${ text_decoration };
                    text-transform: ${ text_transform };
                }
                ${ tabletWidth } { ${ selector } {
                    font-size: ${ font_size.tablet };
                    line-height: ${ line_height.tablet };
                    letter-spacing: ${ letter_spacing.tablet };
                } }
                ${ mobileWidth } { ${ selector } {
                    font-size: ${ font_size.mobile };
                    line-height: ${ line_height.mobile };
                    letter-spacing: ${ letter_spacing.mobile };
                } }
            `

            Utils.generateStyleTag( id, css )
        },

        /**
         * MARK: Color
         * 
         * @since 1.0.0
         * @param { string }    id  updated value of the setting
         * @param { array }     value   updated value of the setting
         */
        color: function( id, value ) {
            const { selector, property } = IanConfig[ id ],
                isHoverType = Object.hasOwn( value, 'hover' )

            let color = value, hoverColor = ''
            if( isHoverType ) {
                let { initial, hover } = value
                color = initial
                hoverColor = hover
            }

            let hoverSelector = `${ selector }:hover`, hoverSelectorExists = false
            if( Object.hasOwn( IanConfig[ id ], 'hover_selector' ) ) {
                hoverSelector = IanConfig[ id ].hover_selector
                hoverSelectorExists = true
            }

            let css = `
                ${ selector } { ${ Utils.getColorCss( color, property ) } }
            `
            if( hoverSelectorExists && isHoverType ) {
                css += `
                    ${ hoverSelector } { ${ Utils.getColorCss( hoverColor, property ) } }
                `
            }
            Utils.generateStyleTag( id, css )
        },

        /**
         * MARK: Toggle class
         * 
         * @since 1.0.0
         * @param { string }    id  updated value of the setting
         * @param { array }     value   updated value of the setting
         */
        toggleClass: function( id, value ) {
            const { selector, prefix } = IanConfig[ id ]

            if( prefix ) {
                $( selector ).removeClass( function( index, currentClass ) {
                    let regex = new RegExp( "\\b" + prefix + "\\S*", 'g' )
                    return currentClass.match( regex || [] ).join( ' ' )
                } ).addClass( `${ prefix }${ value }` )
            } else {
                $( selector ).toggleClass( value )
            }
        },
    }

    Object.keys( IanConfig ).forEach( function( controlId ) {
        api( controlId, function( setting ) {
            setting.bind( function( value ) {
                const settingArgs = IanConfig[ controlId ],
                    { type } = settingArgs,
                    functionToCall = Utils.getControlFunction( type )

                PreviewJs[ functionToCall ]( controlId, value )
            } )
        } )
    } )
})( jQuery, wp.customize )