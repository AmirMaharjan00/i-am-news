const { useState, useContext, createContext, useEffect } = wp.element,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
    { Dashicon, Dropdown, Button } = wp.components,
    { customize } = wp,
    BuilderContext = createContext()

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const BuilderComponent = ( props ) => {
    const { setting, widgets } = props,
        widgetKeys = Object.keys( widgets ),
        [ value, setValue ] = useState( setting.get() ),
        usedWidgets = Object.keys( value ).reduce( ( _this, rowId ) => {
            let columnWidgets = Object.values( value[ rowId ] ).reduce( ( _inner, widgets ) => {
                return [
                    ..._inner,
                    ...widgets
                ]
            }, [] )

            return [
                ..._this,
                ...columnWidgets
            ]
        }, [] ),
        sensors = useSensors( useSensor( PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        } ) ),
        [ activeId, setActiveId ] = useState( null ),
        [ filteredWidgets, setFilteredWidgets ] = useState( widgetKeys.filter( widget => ! usedWidgets.includes( widget ) ) )

    useEffect( () => {
        setting.set( value )
    }, [ value] )

    // Handle drag start
    const handleDragStart = ( event ) => setActiveId( event.active.id );

    // Handle drag end — just clear active overlay
    const handleDragEnd = () => setActiveId( null );

    // Handle drag over — full state update happens here
    const handleDragOver = ( { active, over } ) => {
        if( ! over ) return;

        const activeData = active.data.current,
            overData = over.data.current;

        if( ! activeData || ! overData ) return;

        const currentColumn = activeData.column, // column before this dragOver
            currentRow = activeData.row,
            targetColumn = overData.column,
            targetRow = overData.row

        // Only proceed if we're moving to a different column
        if( ! targetColumn || ! targetRow || ( ( currentColumn === targetColumn ) && ( targetRow === currentRow ) ) ) return;

        setValue( ( prev ) => {
            const newValue = structuredClone( prev ),
                sourceItems = [ ...newValue[ currentRow ][ currentColumn ] ],
                targetItems = [ ...newValue[ targetRow ][ targetColumn ] ],
                activeIndex = sourceItems.indexOf( active.id );

            // Remove active from source
            if( activeIndex > -1 ) sourceItems.splice( activeIndex, 1 );

            // Determine insertion index
            let overIndex = ( overData.type === "widget" ) ? targetItems.indexOf( over.id ) : targetItems.length;

            if( ! targetItems.includes( active.id ) ) targetItems.splice( overIndex, 0, active.id );

            // Assign back
            newValue[ currentRow ][ currentColumn ] = sourceItems;
            newValue[ targetRow ][ targetColumn ] = targetItems;

            return newValue;
        } );

        // Update active's column only after moving
        active.data.current.column = targetColumn;
    };

    /**
     * Add new widget to column
     * 
     * @since 1.0.0
     * @param { string } widgetId   Id of the widget to add
     * @param { string } rowId      Id of the row to add the widget in
     * @param { string } columnId   Id of the column to add the widget in
     */
    const addWidget = ( widgetId, rowId, columnId ) => {
        setFilteredWidgets( prev => {
            return prev.filter( item => item !== widgetId )
        } )
        setValue( prev => {
            return {
                ...prev,
                [ rowId ]: {
                    ...prev[ rowId ],
                    [ columnId ]: [ ...prev[ rowId ][ columnId ], widgetId ]
                }
            }
        } )
    }

    /**
     * Remove widget from column
     * 
     * @since 1.0.0
     * @param { string } widgetId   Id of the widget to remove
     * @param { string } rowId      Id of the row to remove the widget from
     * @param { string } columnId   Id of the column to remove the widget from
     */
    const removeWidget = ( widgetId, rowId, columnId ) => {
        setFilteredWidgets( [
            ...filteredWidgets,
            widgetId
        ] )
        setValue( prev => {
            return {
                ...prev,
                [ rowId ]: {
                    ...prev[ rowId ],
                    [ columnId ]: prev[ rowId ][ columnId ].filter( widget => widget !== widgetId )
                }
            }
        } )
    }

    // Builder context object
    const builderContextObject = {
        widgets,
        addWidget,
        removeWidget,
        filteredWidgets, setFilteredWidgets
    }

    return (
        <div className="content-wrapper">
            <BuilderContext.Provider value={ builderContextObject }>
                <DndContext
                    sensors = { sensors }
                    collisionDetection = { closestCenter }
                    onDragEnd = { handleDragEnd }
                    onDragStart = { handleDragStart }
                    onDragOver = { handleDragOver }
                >
                    {
                        Object.keys( value ).map( ( rowKey ) => (
                            <div key={ rowKey } className="row">
                                {
                                    Object.keys( value[ rowKey ] ).map( ( colKey ) => (
                                        <SortableGroup
                                            key = { colKey }
                                            id = { `${ rowKey }-${ colKey }` }
                                            rowId = { rowKey }
                                            columnId = { colKey }
                                            items = { value[ rowKey ][ colKey ] }
                                        />
                                    ) )
                                }
                            </div>
                        ) )
                    }

                    <DragOverlay>
                        {
                            activeId && <div className="overlay">{ widgets[ activeId ].label }</div>
                        }
                    </DragOverlay>
                </DndContext>
            </BuilderContext.Provider>
        </div>
    );
};

/**
 * Sortable group
 * 
 * @since 1.0.0
 */
const SortableGroup = ( { id, items, rowId, columnId } ) => {
    const droppableObject = {
        id,
        data: {
            type: "column",
            column: columnId,
            row: rowId,
        },
    },
    { setNodeRef } = useDroppable( droppableObject ),
    isEmpty = ( items.length === 0 ),
    { widgets, addWidget, filteredWidgets } = useContext( BuilderContext )

    return (
        <Dropdown
            className = 'ian-dropdown-container builder-container'
            contentClassName = 'ian-dropdown-popover builder-popover'
            focusOnMount = { true }
            popoverProps = { {
                placement: 'top',
                shift: true
            } }
            renderToggle = { ( { isOpen, onToggle, onClose } ) => {
                return <div ref = { setNodeRef } className = "column" onClick={ onToggle }>
                    <SortableContext
                        items = { [ ...items, `${ rowId }-${ columnId }-placeholder` ] }
                        strategy = { rectSortingStrategy }
                    >
                        {
                            items.map( ( item ) => (
                                <SortableItem 
                                    key = { item }
                                    id = { item }
                                    rowId = { rowId }
                                    columnId = { columnId }
                                />
                            ) )
                        }

                        {/* Always render placeholder to prevent shrink/expand */}
                        {
                            isEmpty && <div
                                key = { `${ rowId }-${ columnId }-placeholder` }
                                id = { `${ rowId }-${ columnId }-placeholder` }
                                className = "widget-item placeholder"
                                style = { { opacity: 0 } }
                            /> 
                        }
                    </SortableContext>
                </div>
            } }
            renderContent = { () => {
                return <div className="widget-wrapper">
                    {
                        filteredWidgets.length ? filteredWidgets.map( ( widgetId ) => {
                            return <Button
                                variant = "tertiary"
                                onClick = { () => addWidget( widgetId, rowId, columnId ) }
                                className = 'widget-item'
                            >
                                <Dashicon 
                                    icon = { widgets[ widgetId ].icon }
                                />
                                <span className="button-label">{ __( escapeHTML( widgets[ widgetId ].label ), 'i-am-news' ) }</span>
                            </Button>
                        } ) : <span className="no-widgets">{ __( 'All widgets used.', 'i-am-news' ) }</span>
                    }
                </div>
            } }
        />
    );
};

/**
 * Sortable Item
 * 
 * @since 1.0.0
 */
const SortableItem = ( { id, columnId, rowId } ) => {
    const sortableObject = {
        id,
        data: { type: "widget", column: columnId, row: rowId },
    },
    { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable( sortableObject ),
    style = {
        transform: CSS.Transform.toString( transform ),
        transition,
        opacity: isDragging ? 0.5 : 1
    },
    { widgets, removeWidget } = useContext( BuilderContext )

    return (
        <div ref={ setNodeRef } style={ style } {...attributes} {...listeners} className="widget-item">
            <span
                className = "label"
                onClick = { ( event ) => {
                    customize.section( widgets[ id ].section_id ).expand()
                    event.stopPropagation()
                } }
            >
                { __( escapeHTML( widgets[ id ].label ), 'i-am-news' ) }
            </span>
            <Dashicon
                icon = "no"
                onClick = { ( event ) => {
                    removeWidget( id, rowId, columnId )
                    event.stopPropagation()
                } }
            />
        </div>
    );
};