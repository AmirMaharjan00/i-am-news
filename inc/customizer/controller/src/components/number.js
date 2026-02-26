const { RangeControl, SelectControl } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState } = wp.element

import { IanControlHead, IanResponsiveIcons } from "./components"
/**
 * Number Control
 * 
 * @since 1.0.0
 */
export const NumberComponent = ( props ) => {
    const { label, description, setting, responsive } = props,
        [ value, setValue ] = useState( setting.get() )

    return <div className="control-content">
        { 
            responsive ? 
            <div className="control-head-wrapper">
                <IanControlHead
                    label = { label }
                    description = { description }
                />
                <IanResponsiveIcons />
            </div> :
            <IanControlHead
                label = { label }
                description = { description }
            />
        }

        <div className="content-wrapper">
            <IanRangeControl />
        </div>
    </div>
}

export const IanRangeControl = ( props ) => {
    return <>
        <RangeControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            value = { 3 }
            className = 'ian-range-item'
            // onChange = { ( value ) => setColumns( value ) }
            min = { 2 }
            max = { 10 }
        />
        <SelectControl
            __nextHasNoMarginBottom
            value = { 'px' }
            className = 'ian-range-item'
            options = { [
                { label: 'Px', value: 'px' },
                { label: 'Em', value: 'em' },
                { label: 'Rem', value: 'rem' },
                { label: '%', value: '%' },
            ] }
            variant = "minimal"
            // onChange = { ( newSize ) => setSize( newSize ) }
            __next40pxDefaultSize
        />
    </>
}

