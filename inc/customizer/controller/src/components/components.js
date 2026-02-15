const { useState, useEffect } = wp.element,
    { Dashicon, Tooltip } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

/**
 * Control Head
 * 
 * @since 1.0.0
 */
export const IanControlHead = ( props ) => {
    const { label, description } = props

    return <div className="control-head">
        { label && <h2 className="title">{ label }</h2> }
        { 
            description && <Tooltip className="description" text={ description } delay={ 300 }>
                <Dashicon icon = "editor-help" className = "desc-icon" />
            </Tooltip>
        }
    </div>
}