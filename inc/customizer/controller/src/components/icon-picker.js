const { useState, useRef, useEffect } = wp.element,
    { Button } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { attachment: mediaAttachment } = wp.media

import { IanControlHead } from './components'
import fontAwesomeIcons from '../font-awesome-classes.json'
import { VirtuosoGrid } from "react-virtuoso";

export const IconPickerComponent = ( props ) => {
    const { label, description, setting, exclude, display_block: displayBlock } = props,
        [ value, setValue ] = useState( setting.get() ),
        { type, value: currentValue } = value,
        mediaFrame = useRef( null ),
        [ imageUrl, setImageUrl ] = useState( '' ),
        [ imageId, setImageId ] = useState( 0 ),
        [ icon, setIcon ] = useState( '' ),
        [ filteredIcons, setFilteredIcons ] = useState( fontAwesomeIcons )

    useEffect( () => {
        let { type, value: _thisVal } = value
        if( type === 'image' && _thisVal ) {
            const attachment = mediaAttachment( _thisVal )
            attachment.fetch().then( () => { 
                const data = attachment.toJSON()
                setImageUrl( data.url )
            } )
            setImageId( _thisVal )
        }
        if( type === 'icon' ) {
            setIcon( value.value )
        }
        setting.set( value )
    }, [ value ] )

    /**
     * Handle Change
     * 
     * @since 1.0.0
     * @param string clickedIcon icon class
     * @return void 
     */
    const handleIconClick = ( clickedIcon ) => {
        setIcon( clickedIcon )
        setValue( {
            type: 'icon',
            value: clickedIcon
        } )
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
                newValue.value = icon
                break;
            case 'image' :
                newValue.value = imageId
                break;
            default:
                newValue.value = ''
        }
        setValue( newValue )
    }

    /**
     * Open media library
     * 
     * @since 1.0.0
     */
    const openMediaLibrary = () => {
        if ( mediaFrame.current ) {
            mediaFrame.current.open();
            return;
        }

        mediaFrame.current = wp.media( {
            title: 'Select or Upload Image',
            button: { text: 'Use this image' },
            library: { type: 'image' },
            multiple: false
        } );

        mediaFrame.current.on( 'select', () => {
            const attachment = mediaFrame.current
                .state()
                .get( 'selection' )
                .first()
                .toJSON();

            setImageUrl( attachment.url );
            setImageId( attachment.id )
            setValue( {
                type: 'image',
                value: attachment.id
            } )
        } );

        mediaFrame.current.open();
    };

    /**
     * Handle remove image
     * 
     * @since 1.0.0
     */
    const handleRemoveImage = () => {
        setValue( {
            type: 'image',
            value: 0
        } )
        setImageUrl( '' )
    }

    /**
     * handle search change
     * 
     * @since 1.0.0
     * @param object event object
     */
    const handleSearch = ( event ) => {
        let searched = event.target.value

        if( searched === '' ) setFilteredIcons( fontAwesomeIcons )
        let filtered = fontAwesomeIcons.filter( ( icon ) => icon.includes( searched.toLowerCase() ) )
        setFilteredIcons( filtered )
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
                
            { ( type === 'image' ) && <div className="image-dropdown">

                <div className="preview-area" onClick={ openMediaLibrary }>
                    <div className="overlay"></div>
                    {
                        imageUrl ?
                        <img 
                            src = { imageUrl }
                            className = 'image-preview'
                        /> :
                        <span className='label'>{ __( 'Add Image', 'i-am-news' ) }</span>
                    }
                </div>
                <div className="buttons-area">
                    <Button 
                        className = "remove button-item"
                        variant = "secondary"
                        onClick = { handleRemoveImage }
                    >
                        { __( escapeHTML( 'Remove' ), 'i-am-news' ) }
                    </Button>
                    <Button 
                        className = "replace button-item"
                        variant = "secondary"
                        onClick = { openMediaLibrary }
                    >
                        { __( escapeHTML( 'Replace' ), 'i-am-news' ) }
                    </Button>
                </div>
            </div> }

            { ( type === 'icon' ) && <div className="icon-dropdown">
                <input type="search" placeholder='Search...' onChange={ handleSearch }/>
                <IconCollection
                    filteredIcons = { filteredIcons }
                    icon = { value.value }
                    handleIconClick = { handleIconClick }
                />
            </div> }

        </div>
    </div>
}

/**
 * Icon Collection
 * 
 * @since 1.0.0
 */
const IconCollection = ( props ) => {
    const { icon, handleIconClick, filteredIcons } = props

    return <VirtuosoGrid
        totalCount = { filteredIcons.length }
        className = "icon-collection"
        components = { {
            List: React.forwardRef( ( { style, children }, ref ) => (
                <div ref={ ref } className='container' style={ { ...style } }>
                    { children }
                </div>
            ) ),
            Item: ( { children } ) => (
                <>{ children }</>
            ),
        }}
        itemContent = { ( index ) => {
            const variant = ( icon === filteredIcons[ index ] ) ? 'primary' : 'secondary'
            return <Button variant={ variant } className="icon-btn" onClick={ () => handleIconClick( filteredIcons[ index ] ) }>
                <i className={ filteredIcons[ index ] }></i>
            </Button> 
        } }
    />
}