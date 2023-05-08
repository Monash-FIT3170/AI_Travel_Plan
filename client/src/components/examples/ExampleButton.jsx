import Button from 'react-bootstrap/Button';

import React from 'react'

/**
 * 
 * @param {*} props This contains any props the button is passed down. 
 * In this case, the onclick function is passed from ExampleBox's usage of this button to this button
 * Similarly, the text within the button needs to be passed down too. This is done through the children prop.
 */
export default function ExampleButton(props) {
  return (
    <>
        <Button variant="primary" onClick={props.onClick}>{props.children}</Button>{' '}
    </>
    
  );
}
