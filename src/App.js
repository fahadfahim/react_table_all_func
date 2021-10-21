import "./App.css";
import { BasicTable } from "./components/BasicTable";
import { SortingTable } from "./components/SortingTable";
import { FilteringTable } from "./components/FilteringTable";
import { PaginationTable } from "./components/PaginationTable";
import { RowSelection } from "./components/RowSelection";
import { ColumnOrder } from "./components/ColumnOrder";
import { ColumnHiding } from "./components/ColumnHiding";

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      {/* there is one point to consider about global filtering for global filtering to work it requires that your entire data is loaded and the filtering happens on the client side */}
      {/* <FilteringTable /> */}
      {/* use pagination we have to import first then pass as second argument in the useTable  */}
      {/* <PaginationTable /> */}
      <RowSelection />
      {/* <ColumnOrder /> */}
      {/* <ColumnHiding /> */}
    </div>
  );
}

export default App;
