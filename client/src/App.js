import Template from "./components/Template";
import EditButton from "./components/EditButton";
import NewDestination from "./components/NewDestination";
function App() {
  return (
    <div>
      <Template></Template>
      <EditButton />
      <NewDestination />
      {/* <AddButton /> */}
    </div>
  );
}

export default App;
