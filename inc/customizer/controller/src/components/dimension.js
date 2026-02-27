const { Button, Dashicon } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState } = wp.element,
    dimensions = [ 'top', 'right', 'bottom', 'left' ]

import { IanControlHead } from "./components"
/**
 * Number Control
 * 
 * @since 1.0.0
 */
export const DimensionComponent = ( props ) => {
    const { label, description, setting, responsive, exclude, input_attrs } = props,
        [ value, setValue ] = useState( setting.get() ),
        dimensions = [ 'top', 'right', 'bottom', 'left' ].filter( side => ! exclude.includes( side ) ),
        { link } = value

    /**
     * Handle Change
     * 
     * @since 1.0.0
     */
    const handleChange = ( event, side ) => {
        let updatedValue = event.target.value,
            newValue = {}
        if( link ) {
            newValue = {
                top: updatedValue,
                right: updatedValue,
                bottom: updatedValue,
                left: updatedValue,
                link
            }
        } else {
            newValue = {
                ...value,
                [ side ]: updatedValue
            }
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
            link: ! link
        } )
    }

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <Dimension
                input_attrs = { input_attrs }
                id = { setting.id }
                handleChange = { handleChange }
                value = { value }
                handleLink = { handleLink }
            />
        </div>
    </div>
}

/**
 * Number Control
 * 
 * @since 1.0.0
 */
const NumberControl = ( props ) => {
    const { label, value = 0, min = 0, max = 100, step = 1, id, side } = props,
        uniqueId = `${ id }_${ label.toLowerCase() }`

    return <div className="ian-number-control-container">
        <label className="label" htmlFor={ uniqueId }>{ label }</label>
        <input
            type = "number"
            name = { uniqueId }
            id = { uniqueId }
            value = { value }
            min = { min }
            max = { max }
            step = { step }
            className = "ian-input number"
            onChange = { ( event ) => props.onChange( event, side ) }
        />
    </div>
}

/**
 * Dimension
 * 
 * @since 1.0.0
 */
export const Dimension = ( props ) => {
    const { input_attrs, id, handleChange, value, handleLink } = props,
        { link } = value

    return <>
        {
            dimensions.map( ( side ) => {
                return <NumberControl
                    label = { __( escapeHTML( side.slice( 0, 1 ).toUpperCase() + side.slice( 1 ) ), 'i-am-news' ) }
                    { ...input_attrs }
                    id = { id }
                    onChange = { handleChange }
                    value = { value[ side ] }
                    side = { side }
                />
            } )
        }
        <Button
            variant = { link ? 'primary' : 'secondary' }
            onClick = { handleLink }
        >
            <Dashicon icon={ link ? 'admin-links' : 'editor-unlink' } />
        </Button>
    </>
}