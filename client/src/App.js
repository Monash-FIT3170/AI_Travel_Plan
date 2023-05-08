
import DeleteAlert from "./components/DeleteAlert";
import DeleteButton from "./components/DeleteButton";
import AddButton from "./components/AddButton";
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
       <AddButton />
       
      <DeleteButton></DeleteButton>
      <DeleteAlert></DeleteAlert>
      <MyForm2 />
    </div>
  );
}

export default App;
