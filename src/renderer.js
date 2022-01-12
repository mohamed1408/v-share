/**
 * Sending messages to Main
 * `data` can be a boolean, number, string, object, or array
 */
 api.send( 'custom-endpoint', data )

 /**
  * Receiving messages from Main
  */
 api.handle( 'custom-endpoint', ( event, data ) => function( event, data ) {
     console.log( data )
 }, event);