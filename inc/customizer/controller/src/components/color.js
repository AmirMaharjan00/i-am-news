const { ColorIndicator, ColorPicker, Dropdown, Tooltip, GradientPicker, Button, Card, CardHeader, CardBody, SelectControl } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { useState, useRef, useEffect } = wp.element,
    { attachment: mediaAttachment } = wp.media,
    ColorTypes = [ 'solid', 'gradient', 'image' ]

import { IanControlHead } from "./components"
import { getUnit, getValue } from '../functions'

/**
 * Color Component
 * 
 * @since 1.0.0
 */
export const ColorComponent = ( props ) => {
    const { label, description, setting, color_types, include_hover } = props,
        [ value, setValue ] = useState( setting.get() )
    
    let initialColor = {}, hoverColor = {}

    if( include_hover ) {
        const { initial, hover } = value
        initialColor = initial
        hoverColor = hover
    } else {
        initialColor = value
    }

    /**
     * Add missing image fields
     * 
     * @since 1.0.0
     * @param  { object }  imageFields     image fields that already exists in the data that is to be saved
     */
    const addMissingImageValues = ( imageFields ) => {
        let defaultFieldValues = {
            blend_mode: 'normal',
            position: 'left top',
            repeat: 'repeat',
            size: 'auto',
        }
        
        return {
            ...defaultFieldValues,
            ...imageFields
        }
    }


    /**
     * Handle color change
     * 
     * @since 1.0.0
     * @param   { string|int }  newColor    New Color if solid or gradient is changed, image id if image is changed
     * @param   { string }      colorType   type of color Solid || Gradient || Image
     * @param   { string }      type        If initial or hover
     */
    const handleColorChange = ( newColor, colorType, type ) => {
        let newValue = {}
        if( include_hover ) {
            newValue = {
                ...value,
                [ type ]: {
                    type: colorType,
                    value: newColor
                }
            }
        } else {
            newValue = {
                type: colorType,
                value: newColor
            }
        }
        setValue( newValue )
        setting.set( newValue )
    }

    /**
     * Handle image changes
     * 
     * @since 1.0.0
     * @param   { string }  newValue    The new value to save
     * @param   { string }  newValue    The key of the new value to save as
     * @param   { string }  type        If initial or hover
     */
    const handleImageChange = ( val, field, type ) => {
        let newValue = { ...value },
            objectToCheck = include_hover ? value[ type ] : value
        if( ! Object.hasOwn( objectToCheck, 'image' ) ) {
            if( include_hover ) {
                newValue[ type ].image = { [ field ]: val }
                newValue[ type ].image = addMissingImageValues( newValue[ type ].image || {} )
            } else {
                newValue.image = { [ field ]: val }
                newValue.image = addMissingImageValues( newValue.image )
            }
        } else {
            if( include_hover ) {
                newValue = {
                    ...value,
                    [ type ]: {
                        ...value[ type ],
                        image: {
                            ...value[ type ].image,
                            [ field ]: val
                        }
                    }
                }
            } else {
                newValue = {
                    ...value,
                    image: {
                        ...value.image,
                        [ field ]: val
                    }
                }
            }
        }
        setValue( newValue )
        setting.set( newValue )
    }

    return <div className="control-content is-block">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className={ `content-wrapper${ include_hover ? ' is-hover' : '' }` }>
            <Color
                color = { initialColor }
                handleColorChange = { handleColorChange }
                handleImageChange = { handleImageChange }
                type = 'initial'
                color_types
            />
            { include_hover && <Color
                color = { hoverColor }
                handleColorChange = { handleColorChange }
                handleImageChange = { handleImageChange }
                type = 'hover'
                color_types
            /> }
        </div>
    </div>
}

/**
 * Color
 * 
 * @since 1.0.0
 */
export const Color = ( props ) => {
    const { color, handleColorChange, type, handleImageChange } = props,
        { type: colorType } = color,
        [ activeButton, setActiveButton ] = useState( colorType ),
        mediaFrame = useRef( null ),
        [ imageUrl, setImageUrl ] = useState( '' )
    
    useEffect( () => {
        if( color.type === 'image' ) {
            const attachment = mediaAttachment( color.value )
            attachment.fetch().then( () => { 
                const data = attachment.toJSON()
                setImageUrl( data.url )
            } )
        }
    }, [ color ] )

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
            handleColorChange( attachment.id, 'image', type )
        } );

        mediaFrame.current.open();
    };

    // console.log( color )
    return <Dropdown
        className = 'ian-dropdown-container ian-color-dropdown-container'
        contentClassName = 'ian-dropdown-popover ian-color-dropdown-popover'
        popoverProps = { {
            placement: 'bottom-start',
            shift: true
        } }
        renderToggle = { ( { isOpen, onToggle } ) => {
            return <Tooltip text={ __( 'Color', 'i-am-news' ) } delay={ 300 } placement="top">
                <ColorIndicator 
                    colorValue = { color.value }
                    onClick = { onToggle }
                    className = 'ian-color-indicator'
                />
            </Tooltip>
        } }
        renderContent = { () => {
            return <div className="color-container">
                <div className="container-head">
                    {
                        ColorTypes.map( _this => <Button
                            variant = { activeButton === _this ? 'primary' : 'secondary' }
                            text = { __( escapeHTML( _this.charAt( 0 ).toUpperCase() + _this.slice( 1 ) ), 'i-am-news' ) }
                            onClick = { () => setActiveButton( _this ) }
                            className = "color-tab"
                        /> )
                    }
                </div>
                <div className="container-body">
                    {
                        ( activeButton === 'solid' ) && <ColorPicker
                            color = { color.value }
                            onChange = { ( newColor ) => handleColorChange( newColor, 'solid', type ) }
                            enableAlpha
                        />
                    }
                    {
                        ( activeButton === 'gradient' ) && <GradientPicker
                            value = { color.value }
                            onChange = { ( newColor ) => handleColorChange( newColor, 'gradient', type ) }
                            __nextHasNoMargin
                            gradients = { [] }
                        />
                    }
                    {
                        ( activeButton === 'image' ) &&  <>
                            <Card>
                                <CardHeader onClick={ openMediaLibrary }>
                                    { 
                                        imageUrl ?
                                        <img src={ imageUrl } /> :
                                        <span className="add-image">{ __( 'Add Image', 'i-am-news' ) }</span>
                                    }
                                </CardHeader>
                                <CardBody>
                                    <SelectControl
                                        label = { __( 'Blend Mode', 'i-am-news' ) }
                                        value = { Object.hasOwn( color, 'image' ) ? color.image.blend_mode : 'normal' }
                                        options = { [
                                            { label: 'Normal', value: 'normal' },
                                            { label: 'Multiply', value: 'multiply' },
                                            { label: 'Screen', value: 'screen' },
                                            { label: 'Overlay', value: 'overlay' },
                                            { label: 'Darken', value: 'darken' },
                                            { label: 'Lighten', value: 'lighten' },
                                            { label: 'Color Dodge', value: 'color-dodge' },
                                            { label: 'Saturation', value: 'saturation' },
                                            { label: 'Color', value: 'color' },
                                            { label: 'Luminosity', value: 'luminosity' },
                                        ] }
                                        onChange = { ( newBlendMode ) => handleImageChange( newBlendMode, 'blend_mode', type ) }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                    <SelectControl
                                        label = { __( 'Position', 'i-am-news' ) }
                                        value = { Object.hasOwn( color, 'image' ) ? color.image.position : 'left top' }
                                        options={ [
                                            { label: 'Left Top', value: 'left top' },
                                            { label: 'Left Center', value: 'left center' },
                                            { label: 'Left Bottom', value: 'left bottom' },
                                            { label: 'Right Top', value: 'right top' },
                                            { label: 'Right Center', value: 'right center' },
                                            { label: 'Right Bottom', value: 'right bottom' },
                                            { label: 'Center Top', value: 'center top' },
                                            { label: 'Center Center', value: 'center center' },
                                            { label: 'Center Bottom', value: 'center bottom' },
                                        ] }
                                        onChange = { ( newPosition ) => handleImageChange( newPosition, 'position', type ) }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                    <SelectControl
                                        label = { __( 'Repeat', 'i-am-news' ) }
                                        value = { Object.hasOwn( color, 'image' ) ? color.image.repeat : 'repeat' }
                                        options={ [
                                            { label: 'Repeat', value: 'repeat' },
                                            { label: 'Repeat X', value: 'repeat-x' },
                                            { label: 'Repeat Y', value: 'repeat-y' },
                                            { label: 'No Repeat', value: 'no-repeat' },
                                            { label: 'Space', value: 'space' },
                                            { label: 'Round', value: 'round' },
                                        ] }
                                        onChange = { ( newRepeat ) => handleImageChange( newRepeat, 'repeat', type ) }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                    <SelectControl
                                        label = { __( 'Size', 'i-am-news' ) }
                                        value = { Object.hasOwn( color, 'image' ) ? color.image.size : 'auto' }
                                        options={ [
                                            { label: 'Auto', value: 'auto' },
                                            { label: 'Contain', value: 'contain' },
                                            { label: 'Cover', value: 'cover' },
                                        ] }
                                        onChange = { ( newSize ) => handleImageChange( newSize, 'size', type ) }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                </CardBody>
                            </Card>
                        </>
                    }
                </div>
            </div>
        } }
    />
}