import React, { useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import AppContext from '../../../context/AppContext';
import TextArea from "../../../shared/TextArea";
import { addItem, migrateSection } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import ItemHeading from '../../../shared/ItemHeading';
import AddItemButton from '../../../shared/AddItemButton';

const CertificationsTab = ({ data, config, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          {
            config.certifications.enable ? 
            <button 
              type="button"
              onClick={() => onChange(`config.certifications.enable`, false)}
              className="p-1 text-gray-600 hover:text-red-600 flex justify-center items-center"
            >
              <i className="material-icons font-bold text-2xl">visibility</i>
            </button>
            :
            <button 
              type="button"
              onClick={() => onChange(`config.certifications.enable`, true)}
              className="p-1 text-gray-600 hover:text-green-600 flex justify-center items-center"
            >
              <i className="material-icons font-bold text-2xl">visibility_off</i>
            </button>
          }
        </div>
        <div className="col-span-5">
          <TextField
              placeholder="Heading"
              value={config.certifications.heading}
              onChange={v => onChange('config.certifications.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      <AddItem heading={config.certifications.heading} dispatch={dispatch} />

      <ReactSortable
        list={data.certifications}
        setList={newState => migrateSection(dispatch, 'certifications', newState)}
      >
        {
          data.certifications.map((x, index) => (
            <Item
              item={x}
              key={x.id}
              index={index}
              onChange={onChange}
              dispatch={dispatch}
            />
          ))
        }
      </ReactSortable>
    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation(['sideBar', 'app']);

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('certifications.title.label')}
        placeholder="DCUCI 642-999"
        value={item.title}
        onChange={v => onChange(`${identifier}title`, v)}
      />
      
      <TextField
        className="mb-6"
        label={t('certifications.issuer.label')}
        placeholder="Cisco Systems"
        value={item.issuer}
        onChange={v => onChange(`${identifier}issuer`, v)}
      />

      <TextField
        className="mb-6"
        label={t('certifications.date.label')}
        placeholder="Jan, 2020"
        value={item.date}
        onChange={v => onChange(`${identifier}date`, v)}
      />

      <TextArea
        className="mb-6"
        label={t('app:item.summary.label')}
        value={item.summary}
        onChange={v => onChange(`${identifier}summary`, v)}
      />

    </div>
  );
};

const AddItem = ({ heading, dispatch }) => {
  const certificationItem = {
    id: uuidv4(),
    enable: true,
    title: '',
    issuer: '',
    date: '',
    summary: '',
  };
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({ ...certificationItem });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (item.title === '') return;

    addItem(dispatch, 'certifications', item);

    setItem({ ...certificationItem });

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5 ">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      {
        isOpen ?
        <div className="mt-6">
          <Form item={item} onChange={onChange} />
          <AddItemButton onSubmit={onSubmit} />
        </div>
        :
        null
      }

    </div>
  );
};

const Item = ({ item, index, onChange, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.certifications[${index}].`;
  const itemRef = useRef(null);

  return (
    <div className={`my-4 bg-white border border-gray-200 rounded p-5 animate__animated ${item.enable ? '' :'opacity-50 hover:opacity-75'}`} ref={itemRef}>
      <ItemHeading title={item.title} setOpen={setOpen} isOpen={isOpen}>
        <div className={`${isOpen ? 'hidden' : 'block' }`}>
          <ItemActions
            dispatch={dispatch}
            identifier={identifier}
            item={item}
            onChange={onChange}
            itemRef={itemRef}
            setOpen={setOpen}
            type="certifications"
          />
        </div>
      </ItemHeading>


      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />
      </div>
    </div>
  );
};

export default CertificationsTab;
