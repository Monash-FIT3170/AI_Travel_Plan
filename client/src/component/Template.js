import "../style.css"

const styles = {
  backgroundColor: 'blue',
};
function Template() {
  return (
    <div style ={styles}>
        <h1 className= "template">template</h1>
        <h1>to test components import the new component to App.js and use the</h1>
        <h1>Make sure to file name matches the exported component name</h1>
        <h1>Make sure the compoent follows PascalCase Captial for each starting letter</h1>

    </div>
  );
}

export default Template;
