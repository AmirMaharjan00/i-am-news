const { RangeControl, SelectControl, Button, Dashicon } = wp.components,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml

/**
 * Range Control
 * 
 * @since 1.0.0
 */
export const RangeComponent = () => {

}

export const IanRangeControl = ( props ) => {
    return <>
        <RangeControl
            __next40pxDefaultSize
            value = { 3 }
            afterIcon = { <Button variant = 'secondary'><Dashicon icon="image-rotate" /></Button> }
            // onChange = { ( value ) => setColumns( value ) }
            min = { 2 }
            max = { 10 }
        />
        <SelectControl
            value = { 'px' }
            options = { [
                { label: 'Px', value: 'px' },
                { label: 'Em', value: 'em' },
                { label: 'Rem', value: 'rem' },
                { label: '%', value: '%' },
            ] }
            variant = "minimal"
            // onChange = { ( newSize ) => setSize( newSize ) }
            __next40pxDefaultSize
        />
    </>
}

