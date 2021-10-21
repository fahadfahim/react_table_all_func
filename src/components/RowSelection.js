import React, { useMemo } from "react";
//for selecting row we use Rowselect
import { useTable, useRowSelect } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";
import { Checkbox } from "./Checkbox";
export const RowSelection = () => {
  //using the useMemo hook ensure that the data isn't recreated on every render if you were not to memoize columns and data react table would think that it is receiving new data on every render and attempt to recalculate a lot of logic
  //as we memoize the columns and data we are gonna pass to the table hook
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  //useTable hook recomend that you memorize the rows in columns to use useMemo Hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    //useRowSelect gives a property that helps keep track of the selected rows
    selectedFlatRows,
    //selectedFlatRows gives you a flat array of rows that are currently selected in your table
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    //this functions gets all the table hooks as an arguments
    (hooks) => {
      //we want to show a column
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: "Action",
            // <>
            //   <p>Action</p>
            //   {/* <Checkbox {...getToggleAllRowsSelectedProps()} /> */}
            // </>,

            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  //these are func and arrays that the useTable hook from react table package given to us enable easy table creation
  // =
  //     tableInstance;
  //we are going to show first 10 dat of the table
  const firstPageRows = rows.slice(0, 10);

  return (
    //getTableProps needs to destructuring in the table tag
    <>
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
          {firstPageRows.map((row) => {
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
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};
