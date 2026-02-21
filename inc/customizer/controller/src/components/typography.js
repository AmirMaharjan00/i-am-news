const { SelectControl, SearchControl } = wp.components,
    { useState, useEffect, useMemo } = wp.element,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

import { IanControlHead } from "./components"
import googleFonts from '../google-fonts.min.json'
import { Virtuoso } from "react-virtuoso";
import Select from 'react-select'

const fontWeights = googleFonts.reduce( ( _thisVal, item ) => {
    let { family, variants } = item
    _thisVal[ family ] = {
        normal: variants.filter( variant => ! variant.includes( 'italic' ) ),
        italic: variants.filter( variant =>  variant.includes( 'italic' ) )
    }
    return _thisVal
}, {})

const fontFamilies = googleFonts.reduce( ( _thisVal, _thisFamily ) => {
    let { family } = _thisFamily
    return [ ..._thisVal, {
        label: family,
        value: family
    } ]
}, [] )

// total of 1932 fonts

/**
 * Typography Component
 * 
 * @since 1.0.0
 */
export const TypographComponent = ( props ) => {
    const { label, description, setting } = props,
        [ value, setValue ] = useState( setting.get() ),
        { font_family, font_weight, font_size, line_height, letter_spacing, text_transform, text_decoration, preset } = value

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <FontFamily 
                fontFamily = { font_family }
            />
            <FontWeight 
                fontWeight = { font_weight }
                fontFamily = { font_family }
            />
        </div>
    </div>
}

/**
 * MARK: Font Family
 * 
 * @since 1.0.0
 */
const FontFamily = ( props ) => {
    const { fontFamily } = props

    return <div className="font-family-block">
        <span className="label">{ __( 'Font Family' , 'i-am-news') }</span>
        <Select
            defaultValue = { fontFamily }
            options = { fontFamilies }
            components = { { MenuList: FontFamilyList } }
            placeholder = { __( escapeHTML( "Select an option" ), 'i-am-news' ) }
            classNamePrefix = "ian-select-wrapper"
            menuPortalTarget = { document.body }
            menuPosition = "fixed"
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
    const { children, maxHeight } = props,
        calculatedHeight = Math.min( maxHeight, children.length * 38 )

    return <div style = { { height: calculatedHeight } } className="ian-menu-list">
        <Virtuoso
            totalCount = { children.length }
            itemContent = { ( index ) => <div>{ children[ index ] } </div> }
            className = "family-collection"
        />
    </div>
}

/**
 * MARK: Font Weight
 * 
 * @since 1.0.0
 */
const FontWeight = ( props ) => {
    const { fontWeight, fontFamily } = props,
        activeFontWeights = fontWeights[ fontFamily.label ],
        { normal = [], italic = [] } = activeFontWeights

    /**
     * Get font label
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

    return <div className="font-weight-block">
        <SelectControl
            label = { __( 'Font Weight', 'i-am-news' ) }
            value = { fontWeight }
        >
            { normal.length &&  <optgroup label={ __( 'Normal', 'i-am-news' ) }>
                {
                    normal.map(( weight ) => {
                        return <option value={ weight }>{ getWeightLabel( weight ) }</option>
                    })
                }
            </optgroup> }
            { italic.length && <optgroup label={ __( 'Italic', 'i-am-news' ) }>
                {
                    italic.map(( weight ) => {
                        return <option value={ weight }>{ getWeightLabel( weight ) }</option>
                    })
                }
            </optgroup> }
        </SelectControl>
    </div>
}