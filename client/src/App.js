import Template from "./components/Template";
import EditButton from "./components/EditButton";
import NewDestination from "./components/NewDestination";
import { MyForm2 } from "./components/StorageDailyItineraryGeneral";
// import { MyForm1 } from "./components/StorageEventGeneral";

function App() {
  return (
    <div>
      <h1> HELLO </h1>
      <Template></Template>
      <EditButton />
      <NewDestination />
      {/* <AddButton /> */}
      <MyForm2 />
    </div>
  );
}

export default App;
