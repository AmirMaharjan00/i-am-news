const { RangeControl, SelectControl } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState } = wp.element

import { IanControlHead, IanResponsiveIcons } from "./components"
import { getUnit, getValue } from '../functions'

/**
 * Number Control
 * 
 * @since 1.0.0
 */
export const NumberComponent = ( props ) => {
    const { label, description, setting, responsive, input_attrs } = props,
        [ value, setValue ] = useState( setting.get() ),
        [ device, setDevice ] = useState( 'desktop' ),
        currentValue = getValue( responsive ? value[ device ] : value ),
        unit = getUnit( responsive ? value[ device ] : value ),
        { min, max, step } = input_attrs

    /**
     * Handle range change
     * 
     * @since 1.0.0
     */
    const handleRangeChange = ( val ) => {
        let newValue = {}
        if( responsive ) {
            newValue = {
                ...value,
                [ device ]: `${ val }${ unit }`
            }
        } else {
            newValue = `${ val }${ unit }`
        }
        setValue( newValue )
        setting.set( newValue )
    }

    /**
     * Handle select change
     * 
     * @since 1.0.0
     */
    const handleSelectChange = ( val ) => {
        let newValue = {}
        if( responsive ) {
            newValue = {
                ...value,
                [ device ]: `${ currentValue }${ val }`
            }
        } else {
            newValue = `${ currentValue }${ val }`
        }
        setValue( newValue )
        setting.set( newValue )
    }

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
            <IanRangeControl
                min = { min }
                max = { max }
                step = { step }
                selectValue = { unit }
                rangeValue = { currentValue }
                handleRangeChange = { handleRangeChange }
                handleSelectChange = { handleSelectChange }
            />
        </div>
    </div>
}

export const IanRangeControl = ( props ) => {
    const { 
        min = 0,
        max = 100,
        step = 1,
        options = [
            { label: 'Px', value: 'px' },
            { label: 'Em', value: 'em' },
            { label: 'Rem', value: 'rem' },
            { label: '%', value: '%' },
        ],
        rangeValue = 0,
        selectValue = 'px'
    } = props

    /**
     * Handle range change
     * 
     * @since 1.0.0
     */
    const handleRangeChange = ( newValue ) => {
        props.handleRangeChange( newValue )
    }

    /**
     * Handle select change
     * 
     * @since 1.0.0
     */
    const handleSelectChange = ( newValue ) => {
        props.handleSelectChange( newValue )
    }

    return <>
        <RangeControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            value = { rangeValue }
            className = 'ian-range-item'
            onChange = { handleRangeChange }
            min = { min }
            max = { max }
            step = { step }
        />
        <SelectControl
            __nextHasNoMarginBottom
            value = { selectValue }
            className = 'ian-range-item'
            options = { options }
            variant = "minimal"
            onChange = { handleSelectChange }
            __next40pxDefaultSize
        />
    </>
}

