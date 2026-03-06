const { Dropdown, SelectControl, Dashicon } = wp.components,
    { useState, useEffect, useContext, createContext } = wp.element,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

import { IanControlHead, IanResponsiveIcons } from "./components"
import googleFonts from '../google-fonts.min.json'
import { Virtuoso } from "react-virtuoso";
import Select from 'react-select'
import { IanRangeControl } from './number'
import { getUnit, getValue } from '../functions'

const TypographyContext = createContext( null )

/**
 * MARK: Get font label
 * 
 * @since 1.0.0
 */
const getWeightLabel = ( weight ) => {
    let isItalic = weight.includes( 'italic' ),
        weightOnly = weight

    if( weight.includes( 'italic' ) && weight.length > 6 ) {
        weightOnly = weight.replace( 'italic', '' )
    }

    switch( weightOnly ) {
        case '100':
            return `Thin 100${ isItalic ? ' italic' : '' }`
            break;
        case '200':
            return `Extralight 200${ isItalic ? ' italic' : '' }`
            break;
        case '300':
            return `Light 300${ isItalic ? ' italic' : '' }`
            break;
        case '500':
            return `Medium 500${ isItalic ? ' italic' : '' }`
            break;
        case '600':
            return `SemiBold 600${ isItalic ? ' italic' : '' }`
            break;
        case '700':
            return `Bold 700${ isItalic ? ' italic' : '' }`
            break;
        case '800':
            return `ExtraBold 800${ isItalic ? ' italic' : '' }`
            break;
        case '900':
            return `Black 900${ isItalic ? ' italic' : '' }`
            break;
        default:
            return `Regular 400${ isItalic ? ' italic' : '' }`
            break;
    }
}

/**
 * MARK: Font Weights
 * 
 * @since 1.0.0
 */
const fontWeights = googleFonts.reduce( ( _thisVal, item ) => {
    const { family, variants } = item;

    _thisVal[ family ] = {
        normal: variants
            .filter( variant => ! variant.includes( 'italic' ) )
            .map( variant => ( {
                label: getWeightLabel( variant ),
                value: variant
            } ) ),

        italic: variants
            .filter( variant => variant.includes( 'italic' ) )
            .map( variant => ( {
                label: getWeightLabel( variant ),
                value: variant
            } ) )
    };

    return _thisVal;
}, {});

/**
 * MARK: Font Familes
 * 
 * @since 1.0.0
 */
const fontFamilies = googleFonts.reduce( ( _thisVal, _thisFamily ) => {
    let { family } = _thisFamily
    return [ ..._thisVal, {
        label: family,
        value: family
    } ]
}, [] )

/**
 * MARK: Load Google Fonts
 * 
 * @since 1.0.0
 */
const loadGoogleFonts = ( group, range, extras = [] ) => {
    const { startIndex = 0, endIndex = 8 } = range,
        fonts = group.filter( ( _, index ) => index >= startIndex && index <= endIndex )
            .map( font => `family=${ font.replaceAll( ' ', '+' ) }` )
            .join( '&' )

    if( extras.length > 0 ) fonts.concat( '&' + extras.map( font => `family=${ font.replaceAll( ' ', '+' ) }` ).join( '&' ) )
    let link = null

    if( document.getElementById( 'ian-google-fonts' ) ) {
        link = document.getElementById( 'ian-google-fonts' )
    } else {
        link = document.createElement( 'link' )
        link.rel = "stylesheet"
        link.id = "ian-google-fonts"
    }
    link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`

    document.head.appendChild( link )
}

/**
 * MARK: Get Step
 * 
 * @since 1.0.0
 */
const getStep = ( unit ) => {
    switch( unit ) {
        case "em" :
                return 0.1
            break;
        case "rem" :
                return 0.1
            break;
        default : 
                return 1
            break;
    }
}

// total of 1932 fonts

/**
 * MARK: Typography Component
 * 
 * @since 1.0.0
 */
export const TypographComponent = ( props ) => {
    const { label, description, setting } = props,
        [ value, setValue ] = useState( setting.get() ),
        { font_family, font_weight, font_size, line_height, letter_spacing, text_transform, text_decoration, preset } = value,
        [ range, setRange ] = useState( { startIndex: 0, endIndex: 8 } ),
        [ responsive, setResponsive ] = useState( 'desktop' )

    useEffect( () => {
        let families = fontFamilies.map( font => font.value )
        loadGoogleFonts( families, range, [ font_family.value ] )
    }, [ range ] )

    /**
     * Update Value
     * 
     * @since 1.0.0
     */
    const updateValue = ( id, newValue ) => {
        let newTypoValue = {}
        if( [ 'font_size', 'line_height', 'letter_spacing' ].includes( id ) ) {
            newTypoValue = {
                ...value,
                [ id ]: {
                    ...value[ id ],
                    [ responsive ]: newValue
                }
            }
        } else {
            newTypoValue = {
                ...value,
                [ id ]: newValue
            }
        }
        setValue( newTypoValue )
        setting.set( newTypoValue )
    }

    const contextObject = {
        updateValue,
        fontFamily: font_family,
        fontWeight: font_weight,
        fontSize: font_size[ responsive ],
        lineHeight: line_height[ responsive ],
        letterSpacing: letter_spacing[ responsive ],
        textTransform: text_transform,
        textDecoration: text_decoration,
        preset,
        range, setRange,
        responsive, setResponsive
    }

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <Dropdown
                className = 'ian-dropdown-container typography-container'
                contentClassName = 'ian-dropdown-popover typography-popover'
                popoverProps = { {
                    placement: 'bottom-start',
                    shift: true
                } }
                renderToggle = { ( { isOpen, onToggle } ) => {
                    return <div className='highlight' onClick={ onToggle } aria-expanded={ isOpen }>
                        <span className="label">{ `${ font_family.value }` }</span>
                        <span className="info">{ `${ font_size.desktop } / ${ font_weight }` }</span>
                        <Dashicon
                            className = "dropdown-icon"
                            icon = { `arrow-${ isOpen ? 'up' : 'down' }-alt2` }
                        />
                    </div>
                } }
                renderContent = { () => {
                    return <TypographyContext.Provider value={ contextObject }>

                        <FontFamily />
                        <FontWeight />
                        <FontSize />
                        <LineHeight />
                        <LetterSpacing />
                        <TextDecoration />
                        <TextTransform />

                    </TypographyContext.Provider>
                } }
            />

        </div>
    </div>
}

/**
 * MARK: Font Family
 * 
 * @since 1.0.0
 */
const FontFamily = () => {
    const { fontFamily, updateValue } = useContext( TypographyContext )

    return <div className="typography-block font-family-block">
        <span className="label">{ __( 'Font Family' , 'i-am-news') }</span>
        <Select
            defaultValue = { fontFamily }
            onChange = { ( newValue ) => updateValue( 'font_family', newValue ) }   
            options = { fontFamilies }
            components = { { MenuList: FontFamilyList } }
            placeholder = { __( escapeHTML( "Select an option" ), 'i-am-news' ) }
            classNamePrefix = "ian-select-wrapper"
            menuPortalTarget = { null }
            menuPosition = "absolute"
            styles = { {
                menuPortal: base => ( { ...base, zIndex: 999999 } )
            } }
        />
    </div>
}

/**
 * Font Family List
 * 
 * @since 1.0.0
 */
const FontFamilyList = ( props ) => {
    const { children, maxHeight, selectProps } = props,
        calculatedHeight = Math.min( maxHeight, children.length * 38 ),
        { setRange, range } = useContext( TypographyContext )
    
    useEffect(() => {
        if( ! children.length ) return
        let fontFamiles = children.map( child => child.props.value )
        loadGoogleFonts( fontFamiles, range, [ selectProps.value.value ] )
    }, [ children ]);

    // If children.length === 0, search returned nothing
    if ( ! children.length ) {
        return <div style={ { height: 38, padding: 10, fontStyle: 'italic', color: '#666', textAlign: 'center' } } className="ian-menu-list no-results">
            { __( 'No fonts found', 'i-am-news' ) }
        </div>
    }

    return <div style = { { height: calculatedHeight } } className="ian-menu-list">
        <Virtuoso
            totalCount = { children.length }
            itemContent = { ( index ) => {
                return <div style={ { fontFamily: children[ index ].props.children } }>{ children[ index ] } </div>
            } }
            className = "family-collection"
            rangeChanged = { ( range ) => {
                setRange( range )
            } }
        />
    </div>
}

/**
 * MARK: Font Weight
 * 
 * @since 1.0.0
 */
const FontWeight = () => {
    const { fontWeight, fontFamily, updateValue  } = useContext( TypographyContext ),
        activeFontWeights = fontWeights[ fontFamily.label ],
        { normal = [], italic = [] } = activeFontWeights,
        options = [
            {
                label: __( 'Normal', 'i-am-news' ),
                options: normal
            },
            {
                label: __( 'Italic', 'i-am-news' ),
                options: italic
            }
        ]

    /**
     * Format option label
     * 
     * @since 1.0.0
     */
    const formatOptionLabel = ( weight ) => {
        let label = getWeightLabel( weight.value ),
            style = {
                fontWeight: label.split( ' ' )[ 1 ],
                fontStyle: label.includes( 'italic' ) ? 'italic' : 'normal',
                fontFamily: fontFamily.value
            }
        return <span className={ `weight-label ${ weight.value }` } style={ style }>{ label }</span>
    }

    /**
     * Handle weight change
     * 
     * @since 1.0.0
     */
    const handleWeightChange = ( newValue ) => {
        updateValue( 'font_weight', newValue.value )
    }

    return <div className="typography-block font-weight-block">
        <span className="label">{ __( 'Font Weight' , 'i-am-news') }</span>
        <Select
            defaultValue = { { label: fontWeight, value: fontWeight } }
            classNamePrefix = "ian-select-wrapper"
            options = { options }
            formatOptionLabel = { formatOptionLabel }
            onChange = { handleWeightChange }
            menuPortalTarget = { null }
            menuPosition = "absolute"
            styles = { {
                menuPortal: base => ( { ...base, zIndex: 999999 } )
            } }
        />
    </div>
}

/**
 * MARK: Font Size
 * 
 * @since 1.0.0
 */
const FontSize = () => {
    const { fontSize, updateValue } = useContext( TypographyContext ),
        unit = getUnit( fontSize ),
        value = getValue( fontSize )

    /**
     * Get max
     * 
     * @since 1.0.0
     */
    const getMax = () => {
        switch( unit ) {
            case "%" :
                    return 100
                break;
            case "px" :
                    return 200
                break;
            default : 
                    return 10
                break;
        }
    }

    /**
     * Handle range change
     * 
     * @since 1.0.0
     */
    const handleRangeChange = ( val ) => {
        let newValue = `${ val }${ unit }`
        updateValue( 'font_size', newValue )
    }

    /**
     * Handle select change
     * 
     * @since 1.0.0
     */
    const handleSelectChange = ( val ) => {
        let newValue = `${ value }${ val }`
        updateValue( 'font_size', newValue )
    }

    return <div className="typography-block font-size-block">
        <div className="block-head">
            <span className="label">{ __( 'Font Size' , 'i-am-news') }</span>
            <IanResponsiveIcons />
        </div>
        <div className="range-control">
            <IanRangeControl 
                min = { 0 }
                max = { getMax() }
                step = { getStep( unit ) }
                selectValue = { unit }
                rangeValue = { value }
                handleRangeChange = { handleRangeChange }
                handleSelectChange = { handleSelectChange }
            />
        </div>
    </div>
}

/**
 * MARK: Line Height
 * 
 * @since 1.0.0
 */
const LineHeight = () => {
    const { lineHeight, updateValue } = useContext( TypographyContext )

    /**
     * Handle range change
     * 
     * @since 1.0.0
     */
    const handleRangeChange = ( val ) => {
        updateValue( 'line_height', val )
    }

    return <div className="typography-block line-height-block">
        <div className="block-head">
            <span className="label">{ __( 'Line Height' , 'i-am-news') }</span>
            <IanResponsiveIcons />
        </div>
        <div className="range-control single-item">
            <IanRangeControl
                min = { 0 }
                max = { 5 }
                step = { 0.1 }
                showUnit = { false }
                rangeValue = { lineHeight }
                handleRangeChange = { handleRangeChange }
            />
        </div>
    </div>
}

/**
 * MARK: Letter Spacing
 * 
 * @since 1.0.0
 */
const LetterSpacing = () => {
    const { letterSpacing, updateValue } = useContext( TypographyContext ),
        unit = getUnit( letterSpacing ),
        value = getValue( letterSpacing )

    const getMax = () => {
        switch( unit ) {
            case "%" :
                    return 200
                break;
            case "px" :
                    return 20
                break;
            default : 
                    return 2
                break;
        }
    }

    const getMin = () => {
        switch( unit ) {
            case "%" :
                    return 0
                break;
            case "px" :
                    return -10
                break;
            default : 
                    return -1
                break;
        }
    }

    /**
     * Handle range change
     * 
     * @since 1.0.0
     */
    const handleRangeChange = ( val ) => {
        let newValue = `${ val }${ unit }`
        updateValue( 'letter_spacing', newValue )
    }

    /**
     * Handle select change
     * 
     * @since 1.0.0
     */
    const handleSelectChange = ( val ) => {
        let newValue = `${ value }${ val }`
        updateValue( 'letter_spacing', newValue )
    }

    return <div className="typography-block letter-spacing-block">
        <div className="block-head">
            <span className="label">{ __( 'Letter Spacing' , 'i-am-news') }</span>
            <IanResponsiveIcons />
        </div>
        <div className="range-control">
            <IanRangeControl
                min = { getMin() }
                max = { getMax() }
                step = { getStep( unit ) } 
                selectValue = { unit }
                rangeValue = { value }
                handleRangeChange = { handleRangeChange }
                handleSelectChange = { handleSelectChange }
            />
        </div>
    </div>
}

/**
 * MARK: Text Decoration
 * 
 * @since 1.0.0
 */
const TextDecoration = () => {
    const { textDecoration, updateValue } = useContext( TypographyContext )

    /**
     * Get options
     * 
     * @since 1.0.0
     */
    const getOptions = () => {
        let options = {
            'none': __( 'None', 'i-am-news'),
            'underline': __( 'Underline', 'i-am-news'),
            'overline': __( 'Overline', 'i-am-news'),
            'line-through': __( 'Line Through', 'i-am-news'),
            'initial': __( 'Initial', 'i-am-news'),
            'inherit': __( 'Inherit', 'i-am-news'),
        }

        return Object.entries( options ).map( ( item ) => {
            let [ value, label ] = item

            return {
                label: <span className={ `select-item ${ value }` }>{ label }</span>,
                value
            }
        } )
    }

    /**
     * Handle change
     * 
     * @since 1.0.0
     */
    const handleChange = ( val ) => {
        updateValue( 'text_decoration', val )
    }

    return <div className="typography-block text-decoration-block">
        <div className="block-head">
            <span className="label">{ __( 'Text Decoration' , 'i-am-news') }</span>
        </div>
        <SelectControl
            __nextHasNoMarginBottom
            __next40pxDefaultSize
            value = { textDecoration }
            className = 'typography-select'
            options = { getOptions() }
            variant = "minimal"
            onChange = { handleChange }
        />
    </div>
}

/**
 * MARK: Text Transform
 * 
 * @since 1.0.0
 */
const TextTransform = () => {
    const { textTransform, updateValue } = useContext( TypographyContext )

    /**
     * Get options
     * 
     * @since 1.0.0
     */
    const getOptions = () => {
        let options = {
            'none': __( 'None', 'i-am-news'),
            'capitalize': __( 'Capitalize', 'i-am-news'),
            'uppercase': __( 'UPPERCASE', 'i-am-news'),
            'lowercase': __( 'lowercase', 'i-am-news'),
            'initial': __( 'Initial', 'i-am-news'),
            'inherit': __( 'Inherit', 'i-am-news'),
        }

        return Object.entries( options ).map( ( item ) => {
            let [ value, label ] = item

            return {
                label: <span className={ `select-item ${ value }` }>{ label }</span>,
                value
            }
        } )
    }

    /**
     * Handle change
     * 
     * @since 1.0.0
     */
    const handleChange = ( val ) => {
        updateValue( 'text_transform', val )
    }

    return <div className="typography-block text-transform-block">
        <div className="block-head">
            <span className="label">{ __( 'Text Transform' , 'i-am-news') }</span>
        </div>
        <SelectControl
            __nextHasNoMarginBottom
            __next40pxDefaultSize
            value = { textTransform }
            className = 'typography-select'
            options = { getOptions() }
            onChange = { handleChange }
        />
    </div>
}