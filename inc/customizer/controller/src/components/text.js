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
                onChange = { ( newValue ) => setValue( newValue ) }
            />
        </div>
    </div>
}