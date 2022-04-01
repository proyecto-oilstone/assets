import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import styles from "./CustomReactTable.module.css";
import { CSVLink } from "react-csv";
import { findAndReplaceWithKey } from '../../../helpers/utils';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import Search from '../../Search';
import ModalWarningDelete from '../../Modals/WarningDelete';
import useSelectionCheckbox from '../../../hooks/useSelectionCheckbox';

/**
 * Props
 * Columns: columns of the table, with:
 * - label: the label of the column that will be displayed in the table
 * - key: the name of the key in the object to display the data 
 * - export (boolean): if is true the column will be exported, if is false the column will be ignored in CSV
 * - href (optional): if is present then the column will be a link
 * - showInTable (boolean): true to show column in the table, false to ignore in the table (ignored columns can be exported)
 * - onExport (optional function): function with object data as parameter should return the value in row on csv (string)
 * 
 * Data: Array of objects with data. Keys in each object of data:
 * - "label"
 * - "key"
 * 
 * DownloadCSV: state boolean, initially should be false, when you want export to CSV put the state in true
 * 
 * CSVFilename (optional): name of the file when export to CSV
 * 
 * onDelete
 * 
 * onEdit
 * 
 * withEdit (optional default true): true to show edit column, false to hidde edit column
 * 
 * withDelete (optional default true): same as withEdit with delete column
 * 
 * withFiles (optional default false): Upload files column
 * 
 * withFilters (optional default true) Show or hide the filters in table
 * 
 * defaultSort (optional String): to dafault sort one column
 * 
 * containerClassName (optional): className to container of table
 * 
 * deleteModalTitle
 * 
 * deleteModalDescription
 * 
 * extraActions (optional Array): to add more actions in column of actions. This should be an Array of Components, each component will receibe the row as parameter
 * 
 * selectableRows (optional default false): if is true the rows of table will be selectable
 * 
 * selectableRowsCheckboxCriteria (optional): If is present, should be a function that receibe a data as parameter and should return true to show the checkbox and false to hide it. selectableRows should be true to work
 * 
 * onSelectedRowsChange (optional): to handle the rows selected. Should be a function that receibe a rows as parameter
 * 
 * defaultFilters (optional): if you want to set any default filter when the table finish to render
 */
const CustomReactTable = (props) => {
  const { extraActions = [], selectableRowsCheckboxCriteria = () => true, selectableRows = false, onSelectedRowsChange = () => {}, defaultFilters, columns, data, downloadCSV, CSVFilename = "file.csv", onDelete = () => { }, onEdit = () => { }, onFile = () => { }, withEdit, withDelete, withDeleteCriteria = () => true, withFiles = false, defaultSort = "", containerClassName, deleteModalTitle = "", deleteModalDescription = "", withFilters = true } = props;
  const [tableColumns, setTableColumns] = useState([]);
  const [CSVColumns, setCSVColumns] = useState([]);
  const tableColumnsMemo = useMemo(() => tableColumns, [tableColumns]);
  const [CSVData, setCSVData] = useState([]);
  const csvLinkRef = useRef();
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const pageSizeOptions = [5,10,15,25];
  const [searchValue, setSearchValue] = useState("");
  const [warningDelete, setWarningDelete] = useState(null);

  const handleOnDelete = (data) => {
    setWarningDelete(data);
  }

  const DeleteButton = ({ data }) => (<img role="button" className={`icon-sm cursor-pointer ${withDeleteCriteria(data) ? "" : "invisible"}`} src="/icons/trash-alt-solid.svg" alt="eliminar" onClick={() => handleOnDelete(data)} />)
  const EditButton = ({ data }) => (<img role="button" className="icon-sm cursor-pointer" src="/icons/edit-solid.svg" alt="editar" onClick={() => onEdit(data)} />)
  const CustomLink = ({ to, children }) => (<Link to={to}>{children}</Link>)
  const FilesButton = ({ data }) => (<img role="button" className={`${"Files" in data && data.Files !== null ? "invisible" : ""} icon-sm cursor-pointer`} src="/icons/pdf-text-file-svgrepo-com.svg" alt="archivos" onClick={() => onFile(data)} />)
  const ExtraActionsButtons = ({ data }) => extraActions.map(extraAction => extraAction(data));

  const applyFilters = (row) => {
    return filters.every(filter => {
      if ("onFilter" in filter && typeof filter.onFilter === "function") {
        return filter.onFilter(row, filter.value, filter.objectValue);
      } else {
        const rowValue = row[filter.key].toLowerCase();
        const filterValue = filter.value.toLowerCase();
        return rowValue.search(filterValue) >= 0;
      }
    });
  }

  useEffect(() => {
    setFilteredData(data.filter(applyFilters));
  }, [filters]);

  useEffect(() => {
    let copyData = data.filter(applyFilters);
    setFilteredData(copyData);
  }, [data]);
  

  const removeSearchFilter = () => {
    setFilters(filters.filter(filter => filter.key !== "search"));
  }

  const addOrReplaceSearchFilter = () => {
    let copyFilters = Array.from(filters);
    const hasSearchInFilters = copyFilters.some(filter => filter.key === "search");
    const filterSearch = {
      key: "search",
      label: "Buscador",
      value: searchValue,
      onFilter: (row) => {
        const rowValues = Object.values(row);
        return rowValues.some(value => {
          if (typeof value === "string") {
            const v1 = value.toLowerCase();
            const v2 = searchValue.toLowerCase();
            return v1.search(v2) >= 0;
          } else {
            return false;
          }
        });
      },
    }
    if (hasSearchInFilters) {
      copyFilters = copyFilters.map(filter => {
        if (filter.key === "search") {
          return filterSearch;
        } else {
          return filter;
        }
      });
    } else {
      copyFilters.push(filterSearch);
    }
    setFilters(copyFilters);
  }

  useEffect(() => {
    if (searchValue === "") {
      removeSearchFilter();
    } else {
      addOrReplaceSearchFilter();
    }
  }, [searchValue]);

  useEffect(() => {
    if (defaultFilters) {
      setFilters(defaultFilters);
    }
  }, [defaultFilters]);
  

  useEffect(() => {
    const withHeaderAndAccessor = column => ({ ...column, Header: column.label, accessor: "accesor" in column ? column.accesor : column.key });
    const onlyExportableColumns = column => column.export;
    const onlyVisibleColumns = column => column.showInTable;
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
    tableColumns = tableColumns.filter(onlyVisibleColumns)

    const actionColumn = {
      Header: "Acciones", className: styles.actionsCell, Cell: ({ cell }) => (
        <div className="d-flex justify-content-between align-items-center">
          {withDelete && <DeleteButton data={cell.row.original} />}
          {withEdit && <EditButton data={cell.row.original} />}
          {withFiles && <FilesButton data={cell.row.original} />}
          {extraActions.length > 0 && <ExtraActionsButtons data={cell.row.original} />}
        </div>
      )
    };
    if (withEdit || withDelete || withFiles || extraActions.length > 0) {
      tableColumns.push(actionColumn);
    }
    setTableColumns(tableColumns);

    const applyOnExport = () => {
      let newCSVData = JSON.parse(JSON.stringify(filteredData));
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
  }, [columns, filteredData, withEdit, withDelete]);

  useEffect(() => {
    if (downloadCSV) {
      csvLinkRef.current.link.click();
    }
  }, [downloadCSV]);

  
  const tableHooks = [useSortBy, usePagination];
  if (selectableRows) {
    tableHooks.push(useRowSelect);
    tableHooks.push(useSelectionCheckbox(selectableRowsCheckboxCriteria));
  }
  const tableInstance = useTable({
    columns: tableColumnsMemo,
    data: filteredData,
    initialState: {
      sortBy: [
        {
          id: defaultSort,
          desc: false
        }
      ]
    }
  },
  ...tableHooks
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    state: { selectedRowIds },
  } = tableInstance;

  useEffect(() => {
    if (selectableRows) {
      const selectedRows = filteredData.filter((_, index) => selectedRowIds[index] === true);
      onSelectedRowsChange(selectedRows);
    }
  }, [selectedRowIds, filteredData]);
  

  const SelectAmountRows = () => (
    <div className="ms-3">
      <select
        className="form-select form-select-sm"
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {pageSizeOptions.map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
    </div>
  );

  return (<>
    <div className={containerClassName}>
      <div className="mb-2">
        <Search value={searchValue} onChange={setSearchValue}/>
      </div>
      {withFilters &&
        <div>
          <Filters filters={filters} setFilters={setFilters} columns={columns}><SelectAmountRows/></Filters>
        </div>
      }
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
                          <img src="/icons/caret-right-solid.svg" className={`icon-sm ${styles.iconSort} ${column.isSortedDesc ? styles.desc : styles.asc}`} />
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
            page.map((row, index) => {
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
                        <td key={index} className={cell.column.className} {...cell.getCellProps()}>

                          {// Render the cell content s
                            cell.render('Cell')}
                        </td>
                      )
                    })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>

    <div className="d-flex justify-content-center">
      <div className={`d-flex bg-white px-3 rounded shadow-sm hover-shadow justify-content-between ${styles.paginationContainer}`}>
        <div className={`${styles.previousArrow} pe-3 my-1`}>
          <div role="button" className={`cursor-pointer py-2`} onClick={previousPage} disabled={!canPreviousPage}>
            <img className={`icon-md rotate-180 ${styles.arrowIconPagination}`} src="/icons/arrow.png"/>
          </div>
        </div>
        <div className="my-1 py-2">
          {pageIndex + 1} de {pageOptions.length}
        </div>
        <div className={`${styles.nextArrow} ps-3 my-1`}>
          <div role="button" className={`cursor-pointer py-2`} onClick={nextPage} disabled={!canNextPage}>
            <img className={`icon-md ${styles.arrowIconPagination}`} src="/icons/arrow.png"/>
          </div>
        </div>
      </div>
    </div>
    <CSVLink
      data={CSVData}
      headers={CSVColumns}
      filename={CSVFilename}
      className='hidden'
      ref={csvLinkRef}
      target={'_blank'}
    />
    <ModalWarningDelete
      show={warningDelete !== null}
      toggle={() => setWarningDelete(null)}
      title={deleteModalTitle}
      description={deleteModalDescription}
      data={warningDelete}
      onDelete={() => onDelete(warningDelete)}
    />
  </>);
}

export default CustomReactTable;
