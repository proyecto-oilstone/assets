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

  const [columns] = useState([{
    label: 'Nombre',
    key: 'nombre',
  },
  {
    label: 'Apellido',
    key: 'apellido',
  },
  {
    label: 'Mail',
    key: 'mail',
  },
  {
    label: 'Telefono',
    key: 'telefono',
  },
  ]);

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Usuarios</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)}/>
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