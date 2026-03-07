const { RangeControl, SelectControl } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState } = wp.element

import { IanControlHead, IanResponsiveIcons } from "./components"
import { getUnit, getValue, toCapitalizeFirstLetter } from '../functions'

/**
 * Number Control
 * 
 * @since 1.0.0
 */
export const NumberComponent = ( props ) => {
    const { label, description, setting, responsive, input_attrs, show_unit } = props,
        [ value, setValue ] = useState( setting.get() ),
        [ device, setDevice ] = useState( 'desktop' ),
        _thisValue = responsive ? value[ device ] : value

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
                unit = { show_unit ? unit : input_attrs }
                rangeValue = { currentValue }
                showUnit = { show_unit }
                handleRangeChange = { handleRangeChange }
                handleSelectChange = { handleSelectChange }
                input_attrs = { input_attrs }
            />
        </div>
    </div>
}

export const IanRangeControl = ( props ) => {
    const {
        input_attrs,
        rangeValue = 0,
        unit = 'px',
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
                min = { unit.min || 0 }
                max = { unit.max || 100 }
                step = { unit.step || 1 }
            />
        }
        {
            showUnit && <SelectControl
                __nextHasNoMarginBottom
                __next40pxDefaultSize
                value = { unit }
                className = 'ian-range-item'
                options = { Object.keys( input_attrs ).map( unit => ( { label: toCapitalizeFirstLetter( unit ), value: __( escapeHTML( unit ), 'i-am-news' ) } ) ) }
                variant = "minimal"
                onChange = { handleSelectChange }
            />
        }
    </>
}

