import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";
export const PaginationTable = () => {
  //using the useMemo hook ensure that the data isn't recreated on every render if you were not to memoize columns and data react table would think that it is receiving new data on every render and attempt to recalculate a lot of logic
  //as we memoize the columns and data we are gonna pass to the table hook
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  //useTable hook recomend that you memorize the rows in columns to use useMemo Hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //for next page
    nextPage,
    //for previous page
    previousPage,
    //if next page isn't there
    canNextPage,
    //if previous page isn't there
    canPreviousPage,
    //for see how many page are there with need state
    pageOptions,
    state,
    //direct go to page need pageCount also
    //gotoPage is func that we indicate the page
    gotoPage,
    //
    pageCount,
    page,
    //to see more number of rows we can achive that
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );
  //for how many page are there we dest state
  const { pageIndex, pageSize } = state;
  //these are func and arrays that the useTable hook from react table package given to us enable easy table creation
  // =
  //     tableInstance;
  return (
    <>
      {/* //getTableProps needs to destructuring in the table tag */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page :{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};
