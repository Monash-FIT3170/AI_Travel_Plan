/**
 * This file is an example of how a page looks in the application
 * Consider a page as being a single page of the application
 * for example, you may be redirected from the HOME page to a LOG IN page to log into your account
 * Each page should contain all the relevant components specific to that page
 * 
 * In terms of react components, a page is also just a react component. 
 */

import React from 'react'
import ExampleBox from '../components/examples/ExampleBox';

export default function ExamplePage() {
  return (
    <div>
        {/*Currently the only thing on the page is this ExampleBox component */}
        <ExampleBox/>   

    </div>
  )
}
