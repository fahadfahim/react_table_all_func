import React, { useState } from "react";
//for global filtering if we have to filter huge amount of data it might not be work that's why we need to use
import { useAsyncDebounce } from "react-table";
export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setvalue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setvalue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};
