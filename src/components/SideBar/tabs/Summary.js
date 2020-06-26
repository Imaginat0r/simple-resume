import React from 'react';
import { useTranslation } from 'react-i18next';

import RichTextArea from '../../../shared/RichTextArea';
import TextField from '../../../shared/TextField';
import Checkbox from '../../../shared/Checkbox';

const ObjectiveTab = ({ data, config, onChange }) => {
  const { t } = useTranslation('sideBar');

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={config.summary.enable}
            onChange={v => onChange('config.summary.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={config.summary.heading}
            onChange={v => onChange('config.summary.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      <RichTextArea
        label={t('basics.summary.label')}
        style={{'height': '60vh', 'minHeight': '420px', 'maxHeight': '580px'}}
        value={data.basics.summary}
        placeholder="Looking for a challenging role in a reputable organization to utilize my technical, database, and management skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector."
        onChange={v => onChange('data.basics.summary', v)}
      />
    </div>
  );
};

export default ObjectiveTab;
