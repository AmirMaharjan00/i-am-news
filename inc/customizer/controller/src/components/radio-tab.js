const { useState } = wp.element,
    { Button } = wp.components

import { IanControlHead } from "./components";

export const RadioTabComponent = ( props ) => {
    const { label, description, setting, fields, display_block: displayBlock } = props,
        [ tab, setTab ] = useState( setting.get() )
        
    let mainClass = 'control-content'
    if( displayBlock ) mainClass += ' is-block'

    /**
     * Handle Click
     * 
     * @since 1.0.0
     */
    const handleClick = ( newValue ) => {
        setTab( newValue )
        setting.set( newValue )
    }

    return <div className={ mainClass }>
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            { fields.map( ( item ) => {
                let { label: _thisLabel, value } = item
                return <Button
                    variant = { ( value === tab ) ? 'primary' : 'secondary' }
                    onClick = { () => handleClick( value ) }
                >
                    { _thisLabel }
                </Button>
            } ) }
        </div>
    </div>
};