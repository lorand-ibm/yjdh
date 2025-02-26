import CredentialsIngress from 'benefit/applicant/components/credentialsIngress/CredentialsIngress';
import {
  ATTACHMENT_TYPES,
  EMPLOYEE_CONSENT_FILE_PREFIX,
} from 'benefit/applicant/constants';
import { DynamicFormStepComponentProps } from 'benefit/applicant/types/common';
import {
  Button,
  IconArrowRight,
  IconDocument,
  IconPenLine,
  IconPrinter,
} from 'hds-react';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';
import AttachmentItem from 'shared/components/attachments/AttachmentItem';
import UploadAttachment from 'shared/components/attachments/UploadAttachment';
import {
  $Grid,
  $GridCell,
  $Hr,
} from 'shared/components/forms/section/FormSection.sc';
import {
  ATTACHMENT_CONTENT_TYPES,
  ATTACHMENT_MAX_SIZE,
} from 'shared/constants/attachment-constants';
import useLocale from 'shared/hooks/useLocale';
import { useTheme } from 'styled-components';

import StepperActions from '../stepperActions/StepperActions';
import CredentialsSection from './credentialsSection/CredentialsSection';
import { useApplicationFormStep4 } from './useApplicationFormStep4';

const ApplicationFormStep4: React.FC<DynamicFormStepComponentProps> = ({
  data,
}) => {
  const {
    t,
    handleBack,
    handleNext,
    handleSave,
    handleDelete,
    handleRemoveAttachment,
    handleUploadAttachment,
    translationsBase,
    attachment,
    isRemoving,
    isUploading,
  } = useApplicationFormStep4(data);
  const theme = useTheme();
  const locale = useLocale();

  // temporary disabled feature
  const hasElectronicPowerOfAttorney = false;

  return (
    <>
      <CredentialsIngress />
      <$Grid>
        {hasElectronicPowerOfAttorney && (
          <$GridCell $colSpan={6}>
            <CredentialsSection
              title={t(`${translationsBase}.electronicPowerOfAttorney.title`)}
              description={t(
                `${translationsBase}.electronicPowerOfAttorney.description`
              )}
              icon={<IconPenLine size="l" />}
              actions={
                <Button
                  theme="black"
                  variant="secondary"
                  iconRight={<IconArrowRight />}
                >
                  {t(`${translationsBase}.electronicPowerOfAttorney.action1`)}
                </Button>
              }
            />
          </$GridCell>
        )}
        <$GridCell $colSpan={6}>
          <CredentialsSection
            title={t(`${translationsBase}.uploadPowerOfAttorney.title`)}
            description={t(
              `${translationsBase}.uploadPowerOfAttorney.description`
            )}
            icon={<IconDocument size="l" />}
            actions={
              <$Grid>
                {attachment ? (
                  <$GridCell>
                    <AttachmentItem
                      id={attachment.id}
                      name={attachment.attachmentFileName}
                      removeText={t(
                        `common:applications.sections.attachments.remove`
                      )}
                      onClick={() =>
                        // eslint-disable-next-line security/detect-non-literal-fs-filename
                        window
                          .open(attachment.attachmentFile, '_blank')
                          ?.focus()
                      }
                      onRemove={() =>
                        !isRemoving && handleRemoveAttachment(attachment.id)
                      }
                    />
                  </$GridCell>
                ) : (
                  <>
                    <$GridCell $colSpan={4}>
                      <Button
                        theme="black"
                        onClick={() =>
                          // eslint-disable-next-line security/detect-non-literal-fs-filename
                          window
                            .open(
                              `/${EMPLOYEE_CONSENT_FILE_PREFIX}_${locale}.pdf`,
                              '_blank'
                            )
                            ?.focus()
                        }
                        variant="secondary"
                        iconLeft={<IconPrinter />}
                      >
                        {t(`${translationsBase}.uploadPowerOfAttorney.action1`)}
                      </Button>
                    </$GridCell>
                    <$GridCell $colSpan={6}>
                      <UploadAttachment
                        theme="black"
                        variant="secondary"
                        onUpload={handleUploadAttachment}
                        isUploading={isUploading}
                        attachmentType={ATTACHMENT_TYPES.EMPLOYEE_CONSENT}
                        allowedFileTypes={ATTACHMENT_CONTENT_TYPES}
                        maxSize={ATTACHMENT_MAX_SIZE}
                        uploadText={t(
                          `${translationsBase}.uploadPowerOfAttorney.action2`
                        )}
                        loadingText={t(`common:upload.isUploading`)}
                        errorTitle={t('common:error.attachments.title')}
                        errorFileSizeText={t('common:error.attachments.tooBig')}
                        errorFileTypeText={t(
                          'common:error.attachments.fileType'
                        )}
                        icon={<IconArrowRight />}
                      />
                    </$GridCell>
                  </>
                )}
              </$Grid>
            }
          />
        </$GridCell>
      </$Grid>
      <$Hr
        css={`
          margin-top: ${theme.spacing.s};
          margin-bottom: ${theme.spacing.l};
        `}
      />
      <StepperActions
        disabledNext={isEmpty(
          data.attachments?.find(
            (att) => att.attachmentType === ATTACHMENT_TYPES.EMPLOYEE_CONSENT
          )
        )}
        handleSubmit={handleNext}
        handleSave={handleSave}
        handleBack={handleBack}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ApplicationFormStep4;
