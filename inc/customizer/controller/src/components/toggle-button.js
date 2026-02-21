const { useState } = wp.element,
    { RadioControl, Tooltip, ToggleButtonComponent } = wp.components

export const ToggleButton = () => {
    const [ isChecked, setChecked ] = useState( true );

    return (
        <ToggleButtonComponent
            checked={ isChecked }
            onChange={ () => setChecked( ( state ) => ! state ) }
        />
    );
};

/**
 * TOD0: change file name to just toggle-button.js
 * TODO: used wp.components twice, use de-constructing (i already explained this to you, it's easy) 
 * TODO: Component name should be ToggleButtonComponent
 * TODO: Maintain spacing before and after "="
 */