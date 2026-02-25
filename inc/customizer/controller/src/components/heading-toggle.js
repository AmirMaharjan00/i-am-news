const {  } = wp.components,
    { useState, useEffect } = wp.element

import { IanControlHead } from "./components"

// total of 1932 fonts

/**
 * MARK: Typography Component
 * 
 * @since 1.0.0
 */
export const HeadingToggleComponent = ( props ) => {
    const { label, description } = props,
        [ desplay, setDisplay ] = useState( true );

    function test() {
        setDisplay( ! desplay )
    }

    return <>
        <h2 onClick={ test }>
            Heading
        </h2>
        {
            desplay &&
            <span>
                Welcome to My site Sites. This is your first post. Edit or delete it, then start writing!
            </span>
        }
    </>
}