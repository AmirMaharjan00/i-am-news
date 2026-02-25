const { TextControl } = wp.components,
    { useState } = wp.element,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

import { IanControlHead } from "./components"

// total of 1932 fonts

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
                onChange = { ( newValue ) => setClassName( newValue ) }
            />
        </div>
    </div>
}