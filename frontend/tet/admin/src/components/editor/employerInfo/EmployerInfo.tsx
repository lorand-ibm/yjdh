import React from 'react';
import FormSection from 'shared/components/forms/section/FormSection';
import { $Grid, $GridCell } from 'shared/components/forms/section/FormSection.sc';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'styled-components';
import { Notification } from 'hds-react';

const EmployerInfo: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <FormSection withoutDivider={true} header={t('common:editor.companyInfo')}>
      <$GridCell
        as={$Grid}
        $colSpan={12}
        css={`
          row-gap: ${theme.spacing.xl};
        `}
      >
        <$GridCell as={$Grid} $colSpan={12}>
          <$GridCell $colSpan={6}>{t('common:editor.helsinkiCity')}</$GridCell>
          <$GridCell $colSpan={6}>
            <Notification size="small">{t('common:editor.companyInfoFetch')}</Notification>
          </$GridCell>
        </$GridCell>
      </$GridCell>
    </FormSection>
  );
};

export default EmployerInfo;
