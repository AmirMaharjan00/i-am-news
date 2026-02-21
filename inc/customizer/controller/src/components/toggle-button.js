const { useState } = wp.element,
    { RadioControl, Tooltip, FormToggle } = wp.components

import { IanControlHead } from './components'

export const ToggleButtonComponent = ( props ) => {
    const { label, description, setting } = props,
        [ value, setValue ] = useState( setting.get() )
    
    /**
     * Handle change
     * 
     * @since 1.0.0
     */
    const handleChange = () => {
        setValue( ! value ) // this only change the currently state doesn't save the new value in database
        setting.set( ! value )
    }
    
    return <div className="control-content">
        <IanControlHead 
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <FormToggle
                checked = { value }
                onChange = { handleChange }   // if possible create a seperate function
            />
        </div>
    </div>
};

/**
 * TOD0: change file name to just toggle-button.js
 * TODO: used wp.components twice, use de-constructing (i already explained this to you, it's easy) 
 * TODO: Component name should be ToggleButtonComponent
 * TODO: Maintain spacing before and after "=" yo milauna paryo, ali uniform hunxa yesari
 * TODO: IanControlHead adds label and description passed from php file
 * 
 * setting.get() gets the currently save database value
 * setting.set( newValue ) updates the value in database
 */