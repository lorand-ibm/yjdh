import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  $GridCell,
  GridCellProps,
} from 'shared/components/forms/section/FormSection.sc';

type Props = GridCellProps & {
  id?: string;
  type?: string;
  value?: string;
};

const Field: React.FC<Props> = ({ id, type, value, ...gridCellProps }) => {
  const { t } = useTranslation();
  const dataTestId = type ?? id;
  return (
    <$GridCell
      data-testid={dataTestId && `handlerApplication-${dataTestId}`}
      {...gridCellProps}
    >
      {type && (
        <>
          <strong>{t(`common:handlerApplication.${type}`)}</strong>:{' '}
        </>
      )}
      {value || '-'}
    </$GridCell>
  );
};

Field.defaultProps = {
  id: undefined,
  type: undefined,
  value: '-',
};

export default Field;
