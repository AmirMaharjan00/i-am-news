const { useState } = wp.element,
    { ButtonGroup, Button } = wp.components

import { IanControlHead } from "./components";

export const AlignmentComponent = ( props ) => {
    const { label, description, setting } = props,
        [ alignment, setAlignment ] = useState( 'left' );

    const alignments = [ 'left', 'center', 'right' ];

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            <ButtonGroup>
                {alignments.map( (item) => (
                    <Button
                        key = {item}
                        isPrimary = { alignment === item }
                        onClick = { () => setAlignment(item) }
                    >
                        {item}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    </div>
};