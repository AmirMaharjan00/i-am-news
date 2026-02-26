const {  } = wp.components,
    { useState } = wp.element

/**
 * MARK: Checkbox Component
 * 
 * @since 1.0.0
 */
export const CheckboxComponent = () => {
    const [ display, setDisplay ] = useState( true );

    function value() {
        setDisplay( ! display )
    }

    return <div className="control-content">

        <div className="content-wrapper">
            <div>
                <h2 onClick={ value }>
                    Heading
                </h2>
                <Button>
                    <Dashicon icon="dashicon-arrow-down-alt2" className="icon-picker-dashicon" />
                </Button>
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