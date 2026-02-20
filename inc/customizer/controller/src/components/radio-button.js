const { useState } = wp.element,
    { RadioControl, Tooltip } = wp.components
const { FormToggle } = wp.compoenents

export const MyFormToggle  = () => {
    const [ isChecked, setChecked ] = useState( true );

    return (
        <FormToggle
            checked={ isChecked }
            onChange={ () => setChecked( ( state ) => ! state ) }
        />
    );
};