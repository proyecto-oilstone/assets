import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useTable, useSortBy } from "react-table";
import styles from "./CustomReactTable.module.css";
import { CSVLink } from "react-csv";
import { findAndReplaceWithKey } from '../../../helpers/utils';
import { Link } from 'react-router-dom';

/**
 * Props
 * Columns: columns of the table, with:
 * - label: the label of the column that will be displayed in the table
 * - key: the name of the key in the object to display the data 
 * - exportable (optional, default true): if is true the column will be exported, if is false the column will be ignored in CSV
 * - href (optional): if is present then the column will be a link
 * 
 * Data: Array of objects with data. Keys in each object of data:
 * - "label"
 * - "key"
 * - "activo" optional: if is present, true the background will be green else red.
 * - "onExport" optional: method to execute when the row is exported to CSV.
 * 
 * DownloadCSV: state boolean, initially should be false, when you want export to CSV put the state in true
 * 
 * CSVFilename (optional): name of the file when export to CSV
 * 
 * onDelete
 * 
 * onEdit
 */
const CustomReactTable = (props) => {
  const { columns, data, downloadCSV, CSVFilename = "file.csv", onDelete = () => {}, onEdit = () => {} } = props;
  const [tableColumns, setTableColumns] = useState([]);
  const [CSVColumns, setCSVColumns] = useState([]);
  const tableColumnsMemo = useMemo(() => tableColumns, [tableColumns]);
  const [CSVData, setCSVData] = useState([]);
  const csvLinkRef = useRef();

  const DeleteButton = ({ data }) => (<img role="button" className={`${"activo" in data && data.activo === true ? "d-none" : ""} icon-sm cursor-pointer`} src="/icons/trash-alt-solid.svg" alt="eliminar" onClick={() => onDelete(data)} />)
  const EditButton = ({ data }) => (<img role="button" className="icon-sm cursor-pointer" src="/icons/edit-solid.svg" alt="editar" onClick={() => onEdit(data)} />)
  const CustomLink = ({ to, children }) => (<Link className="unstyled-link cursor-pointer" to={to}>{children}</Link>)

  useEffect(() => {
    const withHeaderAndAccessor = column => ({ ...column, Header: column.label, accessor: column.key });
    const onlyExportableColumns = column => ("exportable" in column && column.exportable) || !("exportable" in column);
    const addLinks = column => {
      if ("href" in column) {
        column.Cell = ({ cell }) => (<CustomLink to={findAndReplaceWithKey(column.href, cell.row.original)}>{cell.row.original[column.key]}</CustomLink>);
        column.Cell.displayName = "CustomLink";
        return column;
      } else {
        return column;
      }
    }
    let tableColumns = columns.map(withHeaderAndAccessor);
    tableColumns = tableColumns.map(addLinks);
    
    const deleteColumn = { Header: "Eliminar", Cell: ({ cell }) => (<DeleteButton data={cell.row.original}/>) };
    const editColumn = { Header: "Editar", Cell: ({ cell }) => (<EditButton data={cell.row.original}/>) };
    setTableColumns([...tableColumns, editColumn, deleteColumn] );

    const applyOnExport = () => {
      let newCSVData = JSON.parse(JSON.stringify(data));
      columns.forEach(column => {
        if ("onExport" in column && typeof column.onExport === 'function') {
          newCSVData = newCSVData.map(data => {
            data[column.key] = column.onExport(data);
            return data;
          });
        }
      });

      return newCSVData;
    };
    setCSVColumns(columns.filter(onlyExportableColumns));
    const newCSVData = applyOnExport();
    setCSVData(newCSVData);
  }, [columns, data]);

  useEffect(() => {
    if (downloadCSV) {
      csvLinkRef.current.link.click();
    }
  }, [downloadCSV]);

  const tableInstance = useTable({ columns: tableColumnsMemo, data }, useSortBy);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (<>
    <table className={`table table-striped table-bordered table-hover ${styles.table}`} {...getTableProps()}>
      <thead>
        {// Loop over the header rows
          headerGroups.map((headerGroup, index) => (
            // Apply the header row props
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
                headerGroup.headers.map((column, index) => (
                // Apply the header cell props
                  <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted &&
                          <img src="./icons/caret-right-solid.svg" className={`icon-sm ${styles.iconSort} ${column.isSortedDesc ? styles.desc : styles.asc}`}/> 
                      }
                    </span>
                  </th>
                ))}
            </tr>
          ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
          rows.map((row, index) => {
          // Prepare the row for display
            prepareRow(row)
            return (
            // Apply the row props
              <tr key={index} {...row.getRowProps()}>
                {// Loop over the rows cells
                  row.cells.map((cell, index) => {
                    const data = cell.row.original;
                    // Apply the cell props
                    return (
                      <td key={index} className={"activo" in data ? (data.activo ? "bg-success-light" : "bg-danger-light") : ""} {...cell.getCellProps()}>
                        {// Render the cell contents
                          cell.render('Cell')}
                      </td>
                    )
                  })}
              </tr>
            )
          })}
      </tbody>
    </table>
    <CSVLink
      data={CSVData}
      headers={CSVColumns}
      filename={CSVFilename}
      className='hidden'
      ref={csvLinkRef}
      target={'_blank'}
    />
  </>);
}

export default CustomReactTable;
