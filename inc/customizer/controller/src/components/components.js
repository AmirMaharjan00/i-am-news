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

    return ( label || description ) && <div className="control-head">
        { label && <label className="customizer-control-title">{ label }</label> }
        { 
            description && <Tooltip className="description customize-control-description" text={ description } delay={ 300 } placement="top">
                <Dashicon icon = "editor-help" className = "desc-icon" />
            </Tooltip>
        }
    </div>
}