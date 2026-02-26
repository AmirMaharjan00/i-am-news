const {  } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState } = wp.element

import { IanControlHead } from "./components"

/**
 * Number Control
 * 
 * @since 1.0.0
 */
export const BorderComponent = ( props ) => {
    const { label, description, setting, responsive } = props,
        [ value, setValue ] = useState( setting.get() )

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            
        </div>
    </div>
}