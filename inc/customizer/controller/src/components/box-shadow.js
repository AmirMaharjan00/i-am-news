const { useState } = wp.element,
    { ToggleControl, RangeControl, ColorPicker, Dropdown } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

import { IanControlHead } from './components'

export const BoxShadowComponent = ( props ) => {
    const { label, description, setting } = props,
        [ value, setValue ] = useState( setting.get() ),
        { enable, offsetx, offsety, inset, color, blur, spread } = value

    /**
     * Handle Change
     * 
     * @since 1.0.0
     * @param string    id  The id of the field
     * @param string|int|bool   newValue    The new value of the field
     * @return void 
     */
    const handleChange = ( id, newValue ) => {
        let updatedValue = {
            ...value,
            [ id ]: newValue
        }
        setting.set( updatedValue )
        setValue( updatedValue )
    }

    return <div className="control-content">
        <IanControlHead 
            label = { label }
            description = { description }
        />
        <div className="content-wrapper">

            <Dropdown
                className = 'box-shadow-container'
                contentClassName = 'box-shadow-popover'
                popoverProps = { {
                    placement: 'bottom-start',
                    shift: true
                } }
                renderToggle = { ( { isOpen, onToggle } ) => {
                    return <div className='highlight' onClick={ onToggle } aria-expanded={ isOpen }>
                        { `${ ( enable ? 'Enabled': 'Disabled' ) }, x: ${ offsetx }, y: ${ offsety }, blur: ${ blur }` }
                    </div>
                } }
                renderContent = { () => {
                    return <>
                        <ToggleControl 
                            label = { __( escapeHTML( 'Enable' ), 'i-am-news' ) }
                            onChange = { ( newValue ) => handleChange( 'enable', newValue ) }
                            checked = { enable }
                            __nextHasNoMarginBottom = { true }
                        />

                        <RangeControl
                            label = { __( escapeHTML( 'Horizontal Offset (X)' ), 'i-am-news' ) }
                            value = { offsetx }
                            onChange = { ( newValue ) => handleChange( 'offsetx', newValue ) }
                            min = { -50 }
                            max = { 50 }
                            __next40pxDefaultSize = { true }
                            __nextHasNoMarginBottom = { true }
                        />

                        <RangeControl
                            label = { __( escapeHTML( 'Vertical Offset (Y)' ), 'i-am-news' ) }
                            value = { offsety }
                            onChange = { ( newValue ) => handleChange( 'offsety', newValue ) }
                            min = { -50 }
                            max = { 50 }
                            __next40pxDefaultSize = { true }
                            __nextHasNoMarginBottom = { true }
                        />

                        <RangeControl
                            label={ __( escapeHTML( 'Blur Radius' ), 'i-am-news' ) }
                            value = { blur }
                            onChange = { ( newValue ) => handleChange( 'blur', newValue ) }
                            min = { 0 }
                            max = { 100 }
                            __next40pxDefaultSize = { true }
                            __nextHasNoMarginBottom = { true }
                        />

                        <RangeControl
                            label = { __( escapeHTML( 'Spread Radius' ), 'i-am-news' ) }
                            value = { spread }
                            onChange = { ( newValue ) => handleChange( 'spread', newValue ) }
                            min = { -50 }
                            max = { 50 }
                            __next40pxDefaultSize = { true }
                            __nextHasNoMarginBottom = { true }
                        />

                        <ColorPicker
                            color = { color }
                            onChangeComplete = { ( newValue ) => handleChange( 'color', newValue ) }
                            disableAlpha = { false }
                        />

                        <ToggleControl
                            label = { __( escapeHTML( 'Inset Shadow' ), 'i-am-news' ) }
                            checked = { inset }
                            onChange = { ( newValue ) => handleChange( 'inset', newValue ) }
                            __nextHasNoMarginBottom = { true }
                        />
                    </>
                } }
            />

        </div>
    </div>
}