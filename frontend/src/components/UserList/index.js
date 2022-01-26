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
    <div className='pt-4'>
      <ExportCSVButton onClick={() => setDownloadCSV(true)} className="mb-4"/>
    </div>
    <CustomReactTable withEdit={false} withDelete={false} columns={columns} data={users} downloadCSV={downloadCSV} CSVFilename="usuarios.csv"/>
  </>);
}

export default UserList;