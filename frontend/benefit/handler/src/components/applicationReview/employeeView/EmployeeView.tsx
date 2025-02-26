import ReviewSection from 'benefit/handler/components/reviewSection/ReviewSection';
import {
  APPLICATION_STATUSES,
  ATTACHMENT_TYPES,
} from 'benefit/handler/constants';
import { ApplicationReviewViewProps } from 'benefit/handler/types/application';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import {
  $ViewField,
  $ViewFieldBold,
} from 'shared/components/benefit/summaryView/SummaryView.sc';
import { $GridCell } from 'shared/components/forms/section/FormSection.sc';
import { getFullName } from 'shared/utils/application.utils';

import AttachmentsListView from '../../attachmentsListView/AttachmentsListView';
import EmployeeActions from './EmployeeActions/EmployeeActions';

const EmployeeView: React.FC<ApplicationReviewViewProps> = ({ data }) => {
  const translationsBase = 'common:review';
  const { t } = useTranslation();
  return (
    <ReviewSection
      header={t(`${translationsBase}.headings.heading5`)}
      action={
        data.status !== APPLICATION_STATUSES.RECEIVED ? (
          <EmployeeActions />
        ) : null
      }
    >
      <$GridCell $colSpan={12}>
        <$ViewField>
          {getFullName(data.employee?.firstName, data.employee?.lastName)}
        </$ViewField>
        <$ViewField>{data.employee?.socialSecurityNumber}</$ViewField>
        <$ViewField>{data.employee?.phoneNumber}</$ViewField>
        <$ViewField>
          {t(`${translationsBase}.fields.isLivingInHelsinki`)}
          {': '}
          <$ViewFieldBold>
            {t(
              `common:utility.${
                data.employee?.isLivingInHelsinki ? 'yes' : 'no'
              }`
            )}
          </$ViewFieldBold>
        </$ViewField>
      </$GridCell>
      <AttachmentsListView
        title={t('common:attachments.types.helsinkiBenefitVoucher.title')}
        type={ATTACHMENT_TYPES.HELSINKI_BENEFIT_VOUCHER}
        attachments={data.attachments || []}
      />
    </ReviewSection>
  );
};

export default EmployeeView;
