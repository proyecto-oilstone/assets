import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import SectorContext from "../../contexts/sectors/SectorContext";
import CreateSectorModal from "../Modals/CreateSectorModal/CreateSectorModal";

const SectorList = () => {
    const { sectors, getSectors, deleteSector } = useContext(SectorContext);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSector, setSelectedSector] = useState(null);
    const [downloadCSV, setDownloadCSV] = useState(false);
    const toggleEditModal = () => setShowEditModal(!showEditModal);

    const showEditSectorModal = (sector) => {
        setSelectedSector(sector);
        toggleEditModal();
    }

    useEffect(() => {
        getSectors();
    },[])
    

    const [columns] = useState([{
        label: 'Nombre Corto',
        key: 'nombreCorto',
        href: '/sectores/:id',
    },
    {
        label: 'Nombre Largo',
        key: 'nombreLargo',
    },
    {
        label: 'Observaciones',
        key: 'observaciones',
    },
]);

return (
    <>
    <ExportCSVButton onClick={() => setDownloadCSV(true)} />
    <CustomReactTable onEdit={showEditSectorModal} onDelete={(sector) => deleteSector(sector.id)} columns={columns} data={sectors} downloadCSV={downloadCSV} CSVFilename="sectores.csv" />
    <CreateSectorModal show={showEditModal} toggle={toggleEditModal} edit sector={selectedSector} />
    </>
)


}

export default SectorList
