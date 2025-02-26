import SummarySection from 'benefit/applicant/components/summarySection/SummarySection';
import { BENEFIT_TYPES } from 'benefit/applicant/constants';
import { Application } from 'benefit/applicant/types/application';
import { Button, IconPen } from 'hds-react';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { $GridCell } from 'shared/components/forms/section/FormSection.sc';
import { convertToUIDateFormat } from 'shared/utils/date.utils';
import { formatStringFloatValue } from 'shared/utils/string.utils';
import { useTheme } from 'styled-components';

import { $ViewField, $ViewFieldBold } from '../../Application.sc';

export interface EmployeeViewProps {
  data: Application;
  isReadOnly?: boolean;
  handleStepChange: (step: number) => void;
}

const EmployeeView: React.FC<EmployeeViewProps> = ({
  data,
  isReadOnly,
  handleStepChange,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const theme = useTheme();
  const translationsBase = 'common:applications.sections';
  const { t } = useTranslation();
  return (
    <>
      <SummarySection
        header={t(`${translationsBase}.employee.heading1Short`)}
        action={
          !isReadOnly && (
            <Button
              theme="black"
              css={`
                margin-top: ${theme.spacing.s};
              `}
              onClick={() => handleStepChange(2)}
              variant="supplementary"
              iconLeft={<IconPen />}
            >
              {t(`common:applications.actions.edit`)}
            </Button>
          )
        }
        withoutDivider
      >
        <$GridCell $colSpan={3}>
          <$ViewField>{`${data.employee?.firstName || ''} ${
            data.employee?.lastName || ''
          }`}</$ViewField>
          <$ViewField>{data.employee?.socialSecurityNumber}</$ViewField>
          <$ViewField>{data.employee?.phoneNumber}</$ViewField>
          <$ViewField>
            {t(`${translationsBase}.employee.fields.isLivingInHelsinki.label`)}
            {': '}
            <$ViewFieldBold>
              {t(
                `${translationsBase}.employee.fields.isLivingInHelsinki.${
                  data.employee?.isLivingInHelsinki ? 'yes' : 'no'
                }`
              )}
            </$ViewFieldBold>
          </$ViewField>
        </$GridCell>
      </SummarySection>

      <SummarySection
        header={t(`${translationsBase}.employee.heading2`)}
        withoutDivider
      >
        <$GridCell $colSpan={12}>
          {data.paySubsidyGranted ? (
            <>
              <$ViewFieldBold>
                {t(
                  `${translationsBase}.employee.fields.paySubsidyGranted.${
                    data.paySubsidyGranted ? 'yes' : 'no'
                  }`
                )}
                <$ViewField isInline>{`, ${data.paySubsidyPercent || ''} % ${
                  data.additionalPaySubsidyPercent
                    ? `${t('common:utility.and')} ${
                        data.additionalPaySubsidyPercent
                      } %`
                    : ''
                }`}</$ViewField>
              </$ViewFieldBold>
              <$ViewField>
                {t(
                  `${translationsBase}.employee.fields.apprenticeshipProgram.label`
                )}{' '}
                <$ViewFieldBold>
                  {t(
                    `${translationsBase}.employee.fields.apprenticeshipProgram.${
                      data.apprenticeshipProgram ? 'yes' : 'no'
                    }`
                  )}
                </$ViewFieldBold>
              </$ViewField>
            </>
          ) : (
            <$ViewField>
              {t(`${translationsBase}.employee.fields.paySubsidyGranted.label`)}{' '}
              <$ViewFieldBold>
                {t(`${translationsBase}.employee.fields.paySubsidyGranted.no`)}
              </$ViewFieldBold>
            </$ViewField>
          )}
        </$GridCell>
      </SummarySection>

      <SummarySection
        header={t(`${translationsBase}.employee.heading3Long`)}
        withoutDivider
      >
        <$GridCell $colSpan={5}>
          <$ViewField>
            {`${t(`${translationsBase}.employee.fields.benefitType.label`)}: `}
            <$ViewFieldBold>
              {t(
                `${translationsBase}.employee.fields.benefitType.${
                  data.benefitType?.split('_')[0] || ''
                }`
              )}
            </$ViewFieldBold>
          </$ViewField>
        </$GridCell>
      </SummarySection>
      <SummarySection>
        <$GridCell $colStart={1} $colSpan={2}>
          <$ViewField>
            {t(`${translationsBase}.employee.fields.startDate.label`)}
          </$ViewField>
          <$ViewField>
            {convertToUIDateFormat(data.startDate) || '-'}
          </$ViewField>
        </$GridCell>
        <$GridCell $colSpan={2}>
          <$ViewField>
            {t(`${translationsBase}.employee.fields.endDate.label`)}
          </$ViewField>
          <$ViewField>{convertToUIDateFormat(data.endDate) || '-'}</$ViewField>
        </$GridCell>
      </SummarySection>
      {(data.benefitType === BENEFIT_TYPES.SALARY ||
        data.benefitType === BENEFIT_TYPES.EMPLOYMENT) && (
        <SummarySection
          header={t(`${translationsBase}.employee.heading5Employment`)}
        >
          <$GridCell $colSpan={5}>
            <$ViewField>
              {`${t(`${translationsBase}.employee.fields.jobTitle.label`)}: ${
                data.employee?.jobTitle || '-'
              }`}
            </$ViewField>
            <$ViewField>
              {t(`${translationsBase}.employee.fields.workingHours.view`, {
                workingHours: formatStringFloatValue(
                  data.employee?.workingHours
                ),
              })}
            </$ViewField>
            <$ViewField>
              {t(`${translationsBase}.employee.fields.monthlyPay.view`, {
                monthlyPay: formatStringFloatValue(data.employee?.monthlyPay),
              })}
            </$ViewField>
            <$ViewField>
              {t(`${translationsBase}.employee.fields.otherExpenses.view`, {
                otherExpenses: formatStringFloatValue(
                  data.employee?.otherExpenses
                ),
              })}
            </$ViewField>
            <$ViewField
              css={`
                &&& {
                  padding-bottom: 0;
                }
              `}
            >
              {t(`${translationsBase}.employee.fields.vacationMoney.view`, {
                vacationMoney: formatStringFloatValue(
                  data.employee?.vacationMoney
                ),
              })}
            </$ViewField>
            <$ViewField>
              {data.employee?.collectiveBargainingAgreement}
            </$ViewField>
          </$GridCell>
        </SummarySection>
      )}
    </>
  );
};

EmployeeView.defaultProps = {
  isReadOnly: undefined,
};

export default EmployeeView;
