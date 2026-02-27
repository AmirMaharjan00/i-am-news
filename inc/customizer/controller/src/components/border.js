const { ColorIndicator, Dropdown, ColorPicker, Button } = wp.components,
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
    const { label, description, setting, responsive, input_attrs } = props,
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
            responsive = { responsive }
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
    const { color, setValue } = useContext( BorderContext )

    /**
     * Handle color change
     * 
     * @since 1.0.0
     */
    const handleColorChange = () => {

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
                return <ColorIndicator 
                    colorValue = { color }
                    onClick = { onToggle }
                />
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
    const { style, setValue } = useContext( BorderContext )

    return <div className="border-block style">
        <Dropdown
            className = 'ian-dropdown-container'
            contentClassName = 'ian-dropdown-popover'
            popoverProps = { {
                placement: 'bottom-start',
                shift: true
            } }
            renderToggle = { ( { isOpen, onToggle } ) => (
                 <Button
                    variant = "primary"
                    onClick = { onToggle }
                    aria-expanded = { isOpen }
                    className = 'highlight'
                >
                    { `yo` }
                </Button>
            ) }
            renderContent = { () => {
                return <ul className="dropdown-content">
                    {
                        borderStyle.map( ( _this, index ) => {
                            return <li className="item" key={ index }>
                                <span className="label">{ _this.slice( 0, 1 ).toUpperCase() + _this.slice( 1 ) }</span>
                                <span className={ `style ${ _this }` }></span>
                            </li>
                        } )
                    }
                </ul>
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
                ...value,
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
            ...value,
            width: {
                ...value.width,
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