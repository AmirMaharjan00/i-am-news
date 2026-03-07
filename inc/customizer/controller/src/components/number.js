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
    const { label, description, setting, responsive, input_attrs, show_unit } = props,
        [ value, setValue ] = useState( setting.get() ),
        [ device, setDevice ] = useState( 'desktop' ),
        _thisValue = responsive ? value[ device ] : value,
        { min, max, step } = input_attrs

    let currentValue = show_unit ? getValue( _thisValue ) : _thisValue,
        unit = show_unit ? getUnit( _thisValue ) : 'px'

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
                [ device ]: ( show_unit ? `${ val }${ unit }` : val )
            }
        } else {
            newValue = ( show_unit ? `${ val }${ unit }` : val )
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
        <IanControlHead
            label = { label }
            description = { description }
            responsive = { responsive }
        />

        <div className={ `content-wrapper${ show_unit ? '' : ' no-unit' }` }>
            <IanRangeControl
                min = { min }
                max = { max }
                step = { step }
                selectValue = { unit }
                rangeValue = { currentValue }
                showUnit = { show_unit }
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
        selectValue = 'px',
        showUnit = true,
        showRange = true
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
        {
            showRange && <RangeControl
                __next40pxDefaultSize
                __nextHasNoMarginBottom
                value = { rangeValue }
                className = 'ian-range-item'
                onChange = { handleRangeChange }
                min = { min }
                max = { max }
                step = { step }
            />
        }
        {
            showUnit && <SelectControl
                __nextHasNoMarginBottom
                __next40pxDefaultSize
                value = { selectValue }
                className = 'ian-range-item'
                options = { options }
                variant = "minimal"
                onChange = { handleSelectChange }
            />
        }
    </>
}

