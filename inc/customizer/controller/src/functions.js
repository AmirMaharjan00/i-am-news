/**
 * MARK: Get Unit
 * 
 * @since 1.0.0
 */
export const getUnit = ( value ) => {
    return value.match( /[a-z%]+$/i )?.[ 0 ] ?? "px";
}

/**
 * MARK: Get Unit
 * 
 * @since 1.0.0
 */
export const getValue = ( value ) => {
    return Number( value.match( /-?\d*\.?\d+/ )?.[ 0 ] ?? 0 );
}