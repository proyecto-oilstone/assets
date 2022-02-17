import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import AuthContext from '../../contexts/auth/AuthContext';

const UserList = () => {
  const { users, getUsers } = useContext(AuthContext);
  const [downloadCSV, setDownloadCSV] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const [columns, setColumns] = useState([{
    label: 'Nombre',
    key: 'nombre',
    export: true,
    showInTable: true,
  },
  {
    label: 'Apellido',
    key: 'apellido',
    export: true,
    showInTable: true,
  },
  {
    label: 'Mail',
    key: 'mail',
    export: true,
    showInTable: true,
  },
  {
    label: 'Telefono',
    key: 'telefono',
    export: true,
    showInTable: true,
  },
  ]);

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Usuarios</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)} exportableColumns={columns} setExportableColumns={setColumns}/>
      </div>
    </div>
    <CustomReactTable
      defaultSort="nombre"
      withEdit={false}
      withDelete={false}
      columns={columns}
      data={users}
      downloadCSV={downloadCSV}
      CSVFilename="usuarios.csv"
      containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
    />
  </>);
}

export default UserList;