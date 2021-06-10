import { useTranslation } from 'benefit/applicant/i18n';
import { DynamicFormStepComponentProps } from 'benefit/applicant/types/common';
import * as React from 'react';
import FormSection from 'shared/components/forms/section/FormSection';

const ApplicationFormStep5: React.FC<DynamicFormStepComponentProps> = ({
  actions,
}) => {
  const { t } = useTranslation();
  const translationsBase = 'common:applications.sections.credentials';

  return (
    <>
      <FormSection header={t(`${translationsBase}.heading1`)}>
        Content
      </FormSection>
      {actions}
    </>
  );
};

export default ApplicationFormStep5;
