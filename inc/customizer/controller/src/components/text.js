const { TextControl } = wp.components,
    { useState } = wp.element

import { IanControlHead } from "./components"

/**
 * MARK: Typography Component
 * 
 * @since 1.0.0
 */
export const TextComponent = ( props ) => {
    const { label, description, setting } = props,
        [ value, setValue ] = useState( setting.get() )

    /**
     * Handle change
     * 
     * @since 1.0.0
     */
    const handleChange = ( newValue ) => {
        setting.set( newValue )
        setValue( newValue )
    }

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <TextControl
                __next40pxDefaultSize
                __nextHasNoMarginBottom
                value = { value }
                onChange = { ( newValue ) => handleChange( newValue ) }
            />
        </div>
    </div>
}