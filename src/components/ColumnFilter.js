import React from "react";
//the component will automatic receive column props
export const ColumnFilter = ({ column }) => {
  //from the column we destructring filterValue setFilter
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:{" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
