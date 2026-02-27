const { ColorIndicator, Dropdown, ColorPicker, Button, Tooltip } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState, useContext, createContext } = wp.element,
    BorderContext = createContext(),
    borderStyle = [ 'none', 'solid', 'dotted', 'dashed', 'double' ]

import { IanControlHead } from "./components"
import { Dimension } from './dimension'

/**
 * Number Control
 * 
 * @since 1.0.0
 */
export const BorderComponent = ( props ) => {
    const { label, description, setting, input_attrs } = props,
        [ value, setValue ] = useState( setting.get() )

    const borderContextObject = {
        ...value,
        setValue,
        input_attrs,
        setting
    }

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <BorderContext.Provider value={ borderContextObject }>
                <Color />
                <Style />
                <Width />
            </BorderContext.Provider>
        </div>
    </div>
}

/**
 * MARK: Color
 * 
 * @since 1.0.0
 */
const Color = () => {
    const { color, setValue, width, style, setting } = useContext( BorderContext )

    /**
     * Handle color change
     * 
     * @since 1.0.0
     */
    const handleColorChange = ( newColor ) => {
        let newValue = {
            color: newColor.hex,
            width,
            style
        }
        setValue( newValue )
        setting.set( newValue )
    }

    return <div className="border-block color">
        <Dropdown
            className = 'ian-dropdown-container'
            contentClassName = 'ian-dropdown-popover'
            popoverProps = { {
                placement: 'bottom-start',
                shift: true
            } }
            renderToggle = { ( { isOpen, onToggle } ) => {
                return <Tooltip text={ __( 'Color', 'i-am-news' ) } delay={ 300 } placement="top">
                    <ColorIndicator 
                        colorValue = { color }
                        onClick = { onToggle }
                        className = 'ian-color-indicator'
                    />
                </Tooltip>
            } }
            renderContent = { () => {
                return <ColorPicker
                    color = { color }
                    onChangeComplete = { handleColorChange }
                    enableAlpha
                />
            } }
        />
    </div>
}

/**
 * MARK: Style
 * 
 * @since 1.0.0
 */
const Style = () => {
    const { style, setValue, color, width, setting } = useContext( BorderContext )

    /**
     * Handle style
     * 
     * @since 1.0.0
     */
    const handleStyle = ( newStyle ) => {
        let newValue = {
            color,
            width,
            style: newStyle
        }
        setting.set( newValue )
        setValue( newValue )
    }

    return <div className="border-block style">
        <Dropdown
            className = 'ian-dropdown-container ian-border-container'
            contentClassName = 'ian-dropdown-popover ian-border-popover'
            popoverProps = { {
                placement: 'bottom-start'
            } }
            renderToggle = { ( { isOpen, onToggle } ) => {
                return <Button 
                    className = { `highlight ${ style }` } 
                    onClick = { onToggle } 
                    aria-expanded = { isOpen }
                    showTooltip = { true }
                    shortcut = { __( 'Style', 'i-am-news' ) }
                    tooltipPosition = 'top'
                >
                    <span className="label">{ style.charAt(0).toUpperCase() + style.slice(1) }</span>
                    <span className="style"></span>
                </Button>
            } }
            renderContent = { () => {
                return <div className="dropdown-content">
                    {
                        borderStyle.map( ( _this, index ) => {
                            return <Button className={ `item${ _this === style ? ' active' : '' }` } key={ index } onClick={ () => handleStyle( _this ) }>
                                <span className="label">{ _this.slice( 0, 1 ).toUpperCase() + _this.slice( 1 ) }</span>
                                <span className={ `style ${ _this }` }></span>
                            </Button>
                        } )
                    }
                </div>
            } }
        />
    </div>
}

/**
 * MARK: Width
 * 
 * @since 1.0.0
 */
const Width = () => {
    const { width, input_attrs, setValue, color, style, setting } = useContext( BorderContext ),
        { link } = width

    /**
     * Handle change
     * 
     * @since 1.0.0
     * @param object    event   An object of onchange event
     * @param string    side    The change side of the dimension control
     */
    const handleChange = ( event, side ) => {
         let updatedValue = event.target.value,
            newWidthValue = {}
        if( link ) {
            newWidthValue = {
                top: updatedValue,
                right: updatedValue,
                bottom: updatedValue,
                left: updatedValue,
                link
            }
        } else {
            newWidthValue = {
                ...width,
                [ side ]: updatedValue
            }
        }
        let newValue = {
            color,
            style,
            width: newWidthValue
        }
        setting.set( newValue )
        setValue( newValue )
    }

    /**
     * Handle link
     * 
     * @since 1.0.0
     */
    const handleLink = () => {
        setValue( {
            color,
            style,
            width: {
                ...width,
                link: ! link
            }
        } )
    }

    return <div className="border-block width">
         <Dimension
            input_attrs = { input_attrs }
            id = { setting.id }
            handleChange = { handleChange }
            value = { width }
            handleLink = { handleLink }
        />
    </div>
}