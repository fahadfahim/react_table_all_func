import React, { useMemo } from "react";

//for ordering column we need to import useColumnOrder hook
import { useTable, useColumnOrder } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";
export const ColumnOrder = () => {
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
    // useColumnOrder give you an access setColumnOrder
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
    },
    useColumnOrder
  );
  const changeOrder = () => {
    //setColumnOrder accepts an array as it's argument and that array is list of column ids in the order
    setColumnOrder([
      "id",
      "first_name",
      "last_name",
      "phone",
      "country",
      "date_of_birth",
    ]);
  };
  //these are func and arrays that the useTable hook from react table package given to us enable easy table creation
  // =
  //     tableInstance;
  return (
    //getTableProps needs to destructuring in the table tag
    <>
      <button onClick={changeOrder}>Change Column order</button>
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
    </>
  );
};
