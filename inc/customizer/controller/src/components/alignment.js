const { useState } = wp.element,
    { AlignmentMatrixControl } = wp.components

import { IanControlHead } from "./components";

export const Example = () => {
    const { label, description, setting } = props,
        [ value, setValue ] = useState( setting.get() )
    // const [ alignment, setAlignment ] = useState( 'center center' );

    return <div className="control-content">
        <IanControlHead
            label = { label }
            description = { description }
        />

        <div className="content-wrapper">
            {/* <AlignmentMatrixControl
                value = { alignment }
                onChange = { setAlignment }
            /> */}
        </div>
    </div>
};