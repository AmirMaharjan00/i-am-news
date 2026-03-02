const { useState, useContext, createContext } = wp.element,
    { __ } = wp.i18n,
    { escapeHTML } = wp.escapeHtml,
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
import { useEffect } from "react";

export const BuilderComponent = ( props ) => {
    const { setting, widgets } = props,
        [ value, setValue ] = useState( setting.get() ),
        sensors = useSensors( useSensor( PointerSensor ) ),
        [ activeId, setActiveId ] = useState( null );

    useEffect( () => {
        setting.set( value )
    }, [ value ] )

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
            targetColumn = overData.column;

        // Only proceed if we're moving to a different column
        if( ! targetColumn || currentColumn === targetColumn ) return;

        const [ startRow, startColumn ] = currentColumn.split( "-" ),
            [ endRow, endColumn ] = targetColumn.split( "-" );

        setValue( ( prev ) => {
            const newValue = { ...prev },
                sourceItems = [ ...newValue[ startRow ][ startColumn ] ],
                targetItems = [ ...newValue[ endRow ][ endColumn ] ],
                activeIndex = sourceItems.indexOf( active.id );

            // Remove active from source
            if( activeIndex > -1 ) sourceItems.splice( activeIndex, 1 );

            // Determine insertion index
            let overIndex = ( overData.type === "widget" ) ? targetItems.indexOf( over.id ) : targetItems.length;

            targetItems.splice( overIndex, 0, active.id );

            // Assign back
            newValue[ startRow ][ startColumn ] = sourceItems;
            newValue[ endRow ][ endColumn ] = targetItems;

            return newValue;
        });

        // Update active's column only after moving
        active.data.current.column = targetColumn;
    };

    const builderContextObject = {
        widgets
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
const SortableGroup = ( { id, items } ) => {
    const droppableObject = {
        id,
        data: {
            type: "column",
            column: id,
        },
    },
    { setNodeRef } = useDroppable( droppableObject ),
    isEmpty = ( items.length === 0 );

    return (
        <div ref = { setNodeRef } className = "column">
            <SortableContext
                items = { [ ...items, `${ id }-placeholder` ] }
                strategy = { rectSortingStrategy }
            >
                {
                    items.map( ( item ) => (
                        <SortableItem 
                            key = { item }
                            id = { item }
                            columnId = { id }
                        />
                    ) )
                }

                {/* Always render placeholder to prevent shrink/expand */}
                {
                    isEmpty && <div
                        key = { `${ id }-placeholder` }
                        id = { `${ id }-placeholder` }
                        className = "widget-item placeholder"
                        style = { { opacity: 0 } }
                    /> 
                }
            </SortableContext>
        </div>
    );
};

/**
 * Sortable Item
 * 
 * @since 1.0.0
 */
const SortableItem = ( { id, columnId } ) => {
    const sortableObject = {
        id,
        data: { type: "widget", column: columnId },
    },
    { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable( sortableObject ),
    style = {
        transform: CSS.Transform.toString( transform ),
        transition,
        opacity: isDragging ? 0.5 : 1
    },
    { widgets } = useContext( BuilderContext )

    return (
        <div ref={ setNodeRef } style={ style } {...attributes} {...listeners} className="widget-item">
            { __( escapeHTML( widgets[ id ].label ), 'i-am-news' ) }
        </div>
    );
};