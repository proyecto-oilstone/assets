import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate]);

    return (<Form.Check type="checkbox" ref={resolvedRef} {...rest} />);
  }
);
IndeterminateCheckbox.displayName = "CustomReactTableCheckbox";

export default hooks => {
  hooks.visibleColumns.push(columns => [
    {
      id: 'selection',
      // Header: ({ getToggleAllPageRowsSelectedProps }) => ( Checkbox to select all rows
      //   <div>
      //     <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
      //   </div>
      // ),
      Cell: ({ row }) => (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    ...columns,
  ]);
}
