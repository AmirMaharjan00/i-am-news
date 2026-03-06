const { useState, useContext, createContext } = wp.element,
    { ToggleControl, RangeControl, ColorPicker, Dropdown, ColorIndicator, Dashicon } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    BoxShadowContext = createContext()

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

    const contextObject = {
        ...value,
        handleChange
    }

    return <div className="control-content">
        <IanControlHead 
            label = { label }
            description = { description }
        />
        <div className="content-wrapper">

            <Dropdown
                className = 'ian-dropdown-container box-shadow-container'
                contentClassName = 'ian-dropdown-popover box-shadow-popover'
                popoverProps = { {
                    placement: 'bottom-start',
                    shift: true
                } }
                renderToggle = { ( { isOpen, onToggle } ) => {
                    return <div className='highlight' onClick={ onToggle } aria-expanded={ isOpen }>
                        <span className='label'>{ `${ ( enable ? 'Enabled': 'Disabled' ) }` }</span>
                        <span className='info'>{ `${ offsetx } / ${ offsety } / ${ blur } / ${ spread }` }</span>
                        <Dashicon
                            className = "dropdown-icon"
                            icon = { `arrow-${ isOpen ? 'up' : 'down' }-alt2` }
                        />
                    </div>
                } }
                renderContent = { () => {
                    return <BoxShadowContext.Provider value={ contextObject }>
                        <div className="box-shadow-block flex-block">
                            <Enable />
                            <Inset />
                        </div>
                        <HorizontalOffset />
                        <VerticalOffset />
                        <Blur />
                        <Spread />
                        <Color />
                    </BoxShadowContext.Provider>
                } }
            />

        </div>
    </div>
}

/**
 * MARK: Enable
 * 
 * @since 1.0.0
 */
const Enable = () => {
    const { enable, handleChange } = useContext( BoxShadowContext )

    return <div className="box-shadow-block enable-block toggle-block">
        <div className="block-head">
            <span className="label">{ __( escapeHTML( 'Enable' ), 'i-am-news' ) }</span>
        </div>
        <ToggleControl 
            onChange = { ( newValue ) => handleChange( 'enable', newValue ) }
            checked = { enable }
            __nextHasNoMarginBottom = { true }
        />
    </div>
}

/**
 * MARK: Horizontal Offset
 * 
 * @since 1.0.0
 */
const HorizontalOffset = () => {
    const { offsetx, handleChange } = useContext( BoxShadowContext )

    return <div className="box-shadow-block offsetx-block">
        <div className="block-head">
            <span className="label">{ __( escapeHTML( 'Horizontal Offset (X)' ), 'i-am-news' ) }</span>
        </div>
        <RangeControl
            value = { offsetx }
            onChange = { ( newValue ) => handleChange( 'offsetx', newValue ) }
            min = { -50 }
            max = { 50 }
            __next40pxDefaultSize = { true }
            __nextHasNoMarginBottom = { true }
        />
    </div>
}

/**
 * MARK: Vertical Offset
 * 
 * @since 1.0.0
 */
const VerticalOffset = () => {
    const { offsety, handleChange } = useContext( BoxShadowContext )

    return <div className="box-shadow-block offsety-block">
        <div className="block-head">
            <span className="label">{ __( escapeHTML( 'Vertical Offset (Y)' ), 'i-am-news' ) }</span>
        </div>
        <RangeControl
            value = { offsety }
            onChange = { ( newValue ) => handleChange( 'offsety', newValue ) }
            min = { -50 }
            max = { 50 }
            __next40pxDefaultSize = { true }
            __nextHasNoMarginBottom = { true }
        />
    </div>
}

/**
 * MARK: Blur
 * 
 * @since 1.0.0
 */
const Blur = () => {
    const { blur, handleChange } = useContext( BoxShadowContext )

    return <div className="box-shadow-block blur-block">
        <div className="block-head">
            <span className="label">{ __( escapeHTML( 'Blur' ), 'i-am-news' ) }</span>
        </div>
        <RangeControl
            value = { blur }
            onChange = { ( newValue ) => handleChange( 'blur', newValue ) }
            min = { 0 }
            max = { 100 }
            __next40pxDefaultSize = { true }
            __nextHasNoMarginBottom = { true }
        />
    </div>
}

/**
 * MARK: Spread
 * 
 * @since 1.0.0
 */
const Spread = () => {
    const { spread, handleChange } = useContext( BoxShadowContext )

    return <div className="box-shadow-block spread-block">
        <div className="block-head">
            <span className="label">{ __( escapeHTML( 'Spread' ), 'i-am-news' ) }</span>
        </div>
        <RangeControl
            value = { spread }
            onChange = { ( newValue ) => handleChange( 'spread', newValue ) }
            min = { -50 }
            max = { 50 }
            __next40pxDefaultSize = { true }
            __nextHasNoMarginBottom = { true }
        />
    </div>
}

/**
 * MARK: Color
 * 
 * @since 1.0.0
 */
const Color = () => {
    const { color, handleChange } = useContext( BoxShadowContext )

    return <div className="box-shadow-block color-block">
        <div className="block-head">
            <span className="label">{ __( escapeHTML( 'Color' ), 'i-am-news' ) }</span>
        </div>
        <Dropdown
            className = 'ian-dropdown-container'
            contentClassName = 'ian-dropdown-popover'
            popoverProps = { {
                placement: 'right-start',
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
                    onChangeComplete = { ( newValue ) => handleChange( 'color', ( newValue.hex || '' ) ) }
                    enableAlpha
                />
            } }
        />
    </div>
}

/**
 * MARK: Inset
 * 
 * @since 1.0.0
 */
const Inset = () => {
    const { inset, handleChange } = useContext( BoxShadowContext )

    return <div className="box-shadow-block inset-block toggle-block">
        <div className="block-head">
            <span className="label">{ __( escapeHTML( 'Inset' ), 'i-am-news' ) }</span>
        </div>
        <ToggleControl
            checked = { inset }
            onChange = { ( newValue ) => handleChange( 'inset', newValue ) }
            __nextHasNoMarginBottom = { true }
        />
    </div>
}