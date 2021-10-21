import React from "react";
// import { Edit, Trash2, ChevronsUp, PlusCircle, User } from 'react-feather'
export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);


  const handleClick = () => {
    alert('hey you clicked in edit button')
    // console.log('clicked');
  }
  const handleDelete = () => {
    alert('hey you clicked in delete button')
  }
  return (
    <>
      <i onClick={handleClick} ref={resolvedRef} {...rest} className="fas fa-pen"></i>
      <i onClick={handleDelete} ref={resolvedRef} {...rest} className="fas fa-trash-alt"></i>
      {/* <input type="checkbox" ref={resolvedRef} {...rest} /> */}
    </>
  );
});
