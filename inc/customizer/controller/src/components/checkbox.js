const {  } = wp.components,
    { useState } = wp.element

import { IanControlHead } from "./components"

/**
 * MARK: Checkbox Component
 * 
 * @since 1.0.0
 */
export const CheckboxComponent = ( props ) => {
    const { label, description, setting } = props, 
        [ value, setValue ] = useState( setting.get() );

    const handleChange = () => {
        setValue( value => ! value );
        setting.set( ! value )
    }

    return <div className="control-content">

        <div className="content-wrapper">
            <IanControlHead
                label = { label }
                description = { description }
            />

            <input
                type = "checkbox"
                checked = { value }
                onChange = { handleChange }
            />
        </div>
    </div>
}