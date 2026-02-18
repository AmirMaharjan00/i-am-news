const { useState } = wp.element,
    { Button } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

import { IanControlHead } from './components'
// import fontAwesomeIcons from '@fortawesome/fontawesome-free/metadata/icon-families.json'

export const IconPickerComponent = ( props ) => {
    const { label, description, setting, exclude, display_block: displayBlock } = props,
        [ value, setValue ] = useState( setting.get() ),
        { type, value: currentValue } = value

    /**
     * Handle Change
     * 
     * @since 1.0.0
     * @param string    id  The id of the field
     * @param string|int|bool   newValue    The new value of the field
     * @return void 
     */
    const handleChange = ( id, newValue ) => {
        let updatedValue = {
            ...value,
            [ id ]: newValue
        }
        setting.set( updatedValue )
        setValue( updatedValue )
    }

    /**
     * Handle Button click
     * 
     * @since 1.0.0
     */
    const handleButtonClick = ( newType ) => {
        let newValue = {
            type: newType
        }
        switch( newType ) {
            case 'icon' :
                newValue.value = ''
                break;
            case 'image' :
                newValue.value = 0
                break;
            default:
                newValue.value = ''
        }
        setValue( newValue )
    }

    return <div className="control-content">
        <IanControlHead 
            label = { label }
            description = { description }
        />
        <div className="content-wrapper">

            <div className="buttons-wrapper">
                <Button
                    onClick = { () => handleButtonClick( 'none' ) }
                    variant = { ( ( type === 'none' ) ? 'primary': 'secondary' ) }
                    className = "button-item"
                >
                    { __( escapeHTML( 'None' ), 'i-am-news' ) }
                </Button>

                <Button
                    onClick = { () => handleButtonClick( 'image' ) }
                    variant = { ( ( type === 'image' ) ? 'primary': 'secondary' ) }
                    className = "button-item"
                >
                    { __( escapeHTML( 'Image' ), 'i-am-news' ) }
                </Button>

                <Button
                    onClick = { () => handleButtonClick( 'icon' ) }
                    variant = { ( ( type === 'icon' ) ? 'primary': 'secondary' ) }
                    className = "button-item"
                >
                    { __( escapeHTML( 'Icon' ), 'i-am-news' ) }
                </Button>
            </div>

            { ( type !== 'none' ) && <div className="button-dropdown">
                
                { ( type === 'image' ) && <div className="image-dropdown">

                    <div className="preview-area">
                        
                    </div>
                    <div className="buttons-area">
                        <Button 
                            className = "remove button-item"
                            variant = "secondary"
                            onClick = { '' }
                        >
                            { __( escapeHTML( 'Remove' ), 'i-am-news' ) }
                        </Button>
                        <Button 
                            className = "remove button-item"
                            variant = "secondary"
                            onClick = { '' }
                        >
                            { __( escapeHTML( 'Replace' ), 'i-am-news' ) }
                        </Button>
                    </div>
                </div> }

                { ( type === 'icon' ) && <div className="icon-dropdown">
                    {
                        // Object.keys( fontAwesomeIcons ).map(( item, index ) => {
                        //     return <Button variant="secondary">
                        //         <i className={ `fa${ item }` }>{ index }</i>
                        //     </Button>
                        // })
                    }
                </div> }

            </div> }
        </div>
    </div>
}