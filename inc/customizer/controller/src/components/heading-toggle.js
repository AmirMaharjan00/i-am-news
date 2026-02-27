const { Button, Dashicon, Dropdown } = wp.components,
    { useState } = wp.element

import fontAwesomeIcons from '../font-awesome-classes.json'

/**
 * MARK: Heading Toggle Component
 * 
 * @since 1.0.0
 */
export const HeadingToggleComponent = ( props ) => {
    const { label, description } = props,
        [ display, setDisplay ] = useState( true );

    function value() {
        setDisplay( display => ! display )
    }

    return <div className="control-content">

        <div className="content-wrapper">
            <div>
                <h2 onClick={ value }>
                    Heading
                </h2>
                <Dashicon  className="icon-picker-dashicon" />
            </div>
            {
                display &&
                <span>
                    Welcome to WordPress. This is your first post. Edit or delete it, then start writing!
                </span>
            }
        </div>
    </div>
}