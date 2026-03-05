const { Button, Dashicon, Dropdown } = wp.components,
    { useState, useEffect } = wp.element

/**
 * MARK: Heading Toggle Component
 * 
 * @since 1.0.0
 */
export const HeadingToggleComponent = ( props ) => {
    const { label, setting, controls } = props,
        [ display, setDisplay ] = useState( setting.get() );

    useEffect( () => {
        controls.forEach( ( control ) => {
            if( display ) {
                control.classList.remove( 'ian-hidden-control' )
            } else {
                control.classList.add( 'ian-hidden-control' )
            }
        } )
    }, [ display ] )

    /**
     * Handle on click
     * 
     * @since 1.0.0
     */
    const handleOnClick = () => {
        setDisplay( ! display )
    }

    return <div className="control-content">
        <div className="content-wrapper" onClick = { handleOnClick }>
            <h2 className='label'>{ label }</h2>
            <Dashicon
                icon = { `arrow-${ display ? 'down' : 'up' }-alt2` }
            />
        </div>
    </div>
}