import React, { useMemo } from "react";
//for column filtering we need to use useFilter hooks
import { useTable, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
export const FilteringTable = () => {
  //using the useMemo hook ensure that the data isn't recreated on every render if you were not to memoize columns and data react table would think that it is receiving new data on every render and attempt to recalculate a lot of logic
  //as we memoize the columns and data we are gonna pass to the table hook
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  //in useMemo it's first argument is creatror function 2nd is empty array

  //but this time what we are returning is an object with
  //properties that need to be applied to every column in the table
  //
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  //then passed the default column data in the use Table
  //useTable hook recomend that you memorize the rows in columns to use useMemo Hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    //for sortin we need to destructuring two things
    //state which is the table state
    state,
    //which is the function to set the global flter text value
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter
  );
  //state hold many properties we need to globalFilter thats why we destructring
  const { globalFilter } = state;
  //these are func and arrays that the useTable hook from react table package given to us enable easy table creation
  // =
  //     tableInstance;
  return (
    //getTableProps needs to destructuring in the table tag
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
        {/* <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </>
  );
};
