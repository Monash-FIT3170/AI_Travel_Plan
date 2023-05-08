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
        {/*Notice each ExampleBox's state is unique to its component instance i.e. it is not linked across all instances of a component */}
        {/*This means all components are reusable. You therefore don't need to remake a component if you can simply reuse it */}
        <ExampleBox/>   
        <ExampleBox/>  
        <ExampleBox/>  


    </div>
  )
}
