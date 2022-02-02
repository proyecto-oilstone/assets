import React, { useContext, useEffect } from 'react';
import { setLabelAndValue } from '../../../helpers/utils';
import Select from "react-select";
import ProviderContext from "../../../contexts/providers/ProviderContext";

const SelectProviders = (props) => {
  const { value, onChange, filter = (p) => true } = props;
  const { providers, getProviders } = useContext(ProviderContext);

  useEffect(() => {
    getProviders();
  }, []);

  return (<Select value={value} onChange={onChange} options={setLabelAndValue(providers.filter(filter), "nombreCorto", "id")} />);
};

export default SelectProviders;
