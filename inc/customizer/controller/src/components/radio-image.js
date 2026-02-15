const { useState } = wp.element,
    { RadioControl, Tooltip } = wp.components

import { IanControlHead } from './components'

export const RadioImageComponent = ( props ) => {
    const { label, description, setting, fields } = props,
        [ value, setValue ] = useState( setting.get() )

    /**
     * Handle Change
     * 
     * @since 1.0.0
     */
    const handleChange = ( newValue ) => {
        setting.set( newValue )
        setValue( newValue )
    }

    /**
     * Filter options
     * 
     * @since 1.0.0
     */
    const filterOptions = () => {
        return fields.reduce(( _thisVal, item ) => {
            let { value: itemValue, label: itemLabel, url } = item
            _thisVal = [ 
                ..._thisVal,
                {
                    label: <Tooltip text={ itemLabel } delay={ 300 } placement='top'>
                        <img src={ url } alt={ itemLabel } />
                    </Tooltip>,
                    value: itemValue
                }
            ]
            return _thisVal
        }, [])
    }

    return <div className="control-content">
        <IanControlHead 
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <RadioControl
                selected = { value }
                onChange = { ( newValue ) => handleChange( newValue ) }
                options = { filterOptions() }
            />
        </div>
    </div>
}