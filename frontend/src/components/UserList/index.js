import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import AuthContext from '../../contexts/auth/AuthContext';
import useExportButton from '../../hooks/useExportButton';

const UserList = () => {
  const { users, getUsers } = useContext(AuthContext);

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

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Usuarios</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportButton />
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