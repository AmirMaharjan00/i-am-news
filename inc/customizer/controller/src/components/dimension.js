const { Button, Dashicon } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState } = wp.element

import { IanControlHead } from "./components"
/**
 * Number Control
 * 
 * @since 1.0.0
 */
export const DimensionComponent = ( props ) => {
    const { label, description, setting, responsive, exclude, input_attrs } = props,
        [ value, setValue ] = useState( setting.get() ),
        dimensions = [ 'top', 'right', 'bottom', 'left' ]


    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            {
                dimensions.map( ( side ) => {
                    return <NumberControl
                        label = { __( escapeHTML( side.slice( 0, 1 ).toUpperCase() + side.slice( 1 ) ), 'i-am-news' ) }
                        { ...input_attrs }
                        id = { setting.id }
                        // onChange = {() => {}}
                        // value = "0"
                    />
                } )
            }
            <Button
                variant = { 'secondary' }
            >
                {/* editor-unlink */}
                <Dashicon icon="admin-links" />
            </Button>
        </div>
    </div>
}

/**
 * Number Control
 * 
 * @since 1.0.0
 */
const NumberControl = ( props ) => {
    const { label, value = 0, min = 0, max = 100, step = 1, id } = props,
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
        />
    </div>
}