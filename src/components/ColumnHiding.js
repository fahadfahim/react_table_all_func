import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./table.css";
import { Checkbox } from "./Checkbox";
export const ColumnHiding = () => {
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

    //first we have to dest method from the table instance allcolumns indicate all the columns supply our table
    allColumns,
    //this method will hide or show all columns
    getToggleHideAllColumnsProps,
  } = useTable({
    columns,
    data,
  });
  console.log(allColumns);
  const slCl = allColumns.slice(0, 3)
  console.log(slCl);
  console.log(columns);
  //these are func and arrays that the useTable hook from react table package given to us enable easy table creation
  // =
  //     tableInstance;
  return (
    //getTableProps needs to destructuring in the table tag
    <>
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle all
      </div>
      {allColumns.map((column) => (
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />
            {column.Header}
          </label>
        </div>
      ))}
      <table {...getTableProps()}>
        <thead>
          {/* {slCl.map((sl) => (
            <tr {...sl.getHeaderGroupProps()}>
              {sl.Header.map((cl) => (
                <th {...cl.getHeaderProps()}>{cl.render("Header")}</th>
              ))}
            </tr>
          ))} */}
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
