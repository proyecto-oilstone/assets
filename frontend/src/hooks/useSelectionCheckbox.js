import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { Form } from 'react-bootstrap';

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, className, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate]);

    return (<Form.Check type="checkbox" className={className} ref={resolvedRef} {...rest} />);
  }
);
IndeterminateCheckbox.displayName = "CustomReactTableCheckbox";

export default (criteria = () => true) => hooks => {
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
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} className={!criteria(row.original) && "invisible"}/>
        </div>
      ),
    },
    ...columns,
  ]);
}
