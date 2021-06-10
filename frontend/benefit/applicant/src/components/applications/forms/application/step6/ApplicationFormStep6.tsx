import { useTranslation } from 'benefit/applicant/i18n';
import { DynamicFormStepComponentProps } from 'benefit/applicant/types/common';
import * as React from 'react';
import FormSection from 'shared/components/forms/section/FormSection';

const ApplicationFormStep6: React.FC<DynamicFormStepComponentProps> = ({
  actions,
}) => {
  const { t } = useTranslation();
  const translationsBase = 'common:applications.sections.send';

  return (
    <>
      <FormSection header={t(`${translationsBase}.heading1`)}>
        Content
      </FormSection>
      {actions}
    </>
  );
};

export default ApplicationFormStep6;
