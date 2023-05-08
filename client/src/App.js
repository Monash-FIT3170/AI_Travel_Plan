import DeleteAlert from "./components/DeleteAlert";
import DeleteButton from "./components/DeleteButton";
import Template from "./components/Template";
import EditButton from "./components/EditButton";
import NewDestination from "./components/NewDestination";
import { MyForm2 } from "./components/StorageDailyItineraryGeneral";
// import { MyForm1 } from "./components/StorageEventGeneral";
import Chatbox from "./components/chatbox";

function App() {
  return (
    <div>
      // ART3
      <h1> HELLO </h1>
      <Template></Template>
      <EditButton />
      <NewDestination />
      {/* <AddButton /> */}
       
      <DeleteButton></DeleteButton>
      <DeleteAlert></DeleteAlert>
      <MyForm2 />
      // End of ART3

      <Chatbox />
    </div>
  );
}

export default App;
