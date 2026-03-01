const { ColorIndicator, ColorPicker, Dropdown, Tooltip } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState } = wp.element

import { IanControlHead } from "./components"
import { getUnit, getValue } from '../functions'

/**
 * Color Component
 * 
 * @since 1.0.0
 */
export const ColorComponent = ( props ) => {
    const { label, description, setting, color_types, include_hover } = props,
        [ value, setValue ] = useState( setting.get() )
    
    let initialColor = {}, hoverColor = {}

    if( include_hover ) {
        const { initial, hover } = value
        initialColor = initial.value
        hoverColor = hover.value
    } else {
        initialColor = value
    }

    /**
     * Handle color change
     * 
     * @since 1.0.0
     */
    const handleColorChange = ( newColor ) => {
        let newValue = {}
        if( include_hover ) {
            newValue = {
                ...value,
                initial: {
                    type: 'solid',
                    value: newColor.hex
                }
            }
        } else {
            newValue = {
                type: 'solid',
                value: newColor.hex
            }
        }
        setValue( newValue )
    }

    /**
     * Handle hover color change
     * 
     * @since 1.0.0
     */
    const handleHoverChange = () => {

    }

    return <div className="control-content is-block">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className={ `content-wrapper${ include_hover ? ' is-hover' : '' }` }>
            <Color
                color = { initialColor }
                handleColorChange = { handleColorChange }
            />
            { include_hover && <Color
                color = { hoverColor }
                handleColorChange = { handleHoverChange }
            /> }
        </div>
    </div>
}

/**
 * Color
 * 
 * @since 1.0.0
 */
export const Color = ( props ) => {
    const { color, handleColorChange } = props

    return <Dropdown
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
}