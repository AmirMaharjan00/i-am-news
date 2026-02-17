const { useState, useEffect } = wp.element,
    { RadioControl } = wp.components

import { IanControlHead } from './components'

export const SectionTabComponent = ( props ) => {
    const { label, description, setting, fields, controls, id } = props,
        [ value, setValue ] = useState( setting.get() )

    useEffect(() => {
        controls.forEach(( control ) => {
            if( id === control.id ) return
            let { params, container } = control,
                { tab = 'general' } = params

            if( tab === value ) {
                container.addClass( 'ian-show' ).removeClass( 'ian-hide' )
            } else {
                container.addClass( 'ian-hide' ).removeClass( 'ian-show' )
            }
        })
    }, [ value ])

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
            let { value: itemValue, label: itemLabel } = item
            _thisVal = [ 
                ..._thisVal,
                {
                    label: <div className={ `tab${ value === itemValue ? ' active' : '' }` }>{ itemLabel }</div>,
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