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

/**
 * Responsive Icons
 * 
 * @since 1.0.0
 */
export const IanResponsiveIcons = () => {
    return <div className="ian-responsive-icons">
        <Tooltip text={ __( 'Desktop', 'i-am-news' ) } placement="top" delay={ 200 }>
            <Dashicon className="responsive-icon" icon="desktop" />
        </Tooltip>
        <Tooltip text={ __( 'Tablet', 'i-am-news' ) } placement="top" delay={ 200 }>
            <Dashicon className="responsive-icon" icon="tablet" />
        </Tooltip>
        <Tooltip text={ __( 'Smartphone', 'i-am-news' ) } placement="top" delay={ 200 }>
            <Dashicon className="responsive-icon" icon="smartphone" />
        </Tooltip>
    </div>
}