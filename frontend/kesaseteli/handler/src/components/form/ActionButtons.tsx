import { Button, IconCheck, IconCross } from 'hds-react';
import useCompleteYouthApplicationQuery from 'kesaseteli/handler/hooks/backend/useCompleteYouthApplicationQuery';
import CompleteOperation from 'kesaseteli/handler/types/complete-operation';
import CreatedYouthApplication from 'kesaseteli-shared/types/created-youth-application';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { $GridCell } from 'shared/components/forms/section/FormSection.sc';
import useConfirm from 'shared/hooks/useConfirm';
import { useTheme } from 'styled-components';

type Props = {
  id: CreatedYouthApplication['id'];
};

const HandlerForm: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { confirm } = useConfirm();
  const { isLoading, mutate } = useCompleteYouthApplicationQuery(id);

  const complete = React.useCallback(
    async (type: CompleteOperation) => {
      const isConfirmed = await confirm({
        header: t(`common:dialog.${type}.title`),
        content: t(`common:dialog.${type}.content`),
        submitButtonLabel: t(`common:dialog.${type}.submit`),
      });
      if (isConfirmed) {
        mutate(type);
      }
    },
    [confirm, mutate, t]
  );

  const accept = React.useCallback(() => complete('accept'), [complete]);
  const reject = React.useCallback(() => complete('reject'), [complete]);

  return (
    <$GridCell>
      <Button
        theme="coat"
        data-testid="accept-button"
        iconLeft={<IconCheck />}
        onClick={accept}
        isLoading={isLoading}
        disabled={isLoading}
        css={`
          margin-right: ${theme.spacing.l};
        `}
      >
        {t(`common:handlerApplication.accept`)}
      </Button>
      <Button
        variant="secondary"
        theme="black"
        data-testid="reject-button"
        iconLeft={<IconCross />}
        onClick={reject}
        loadingText={t(`common:handlerApplication.saving`)}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {t(`common:handlerApplication.reject`)}
      </Button>
    </$GridCell>
  );
};

export default HandlerForm;
