import React, { useContext } from 'react';
import {
  $Bar,
  $BarWrapper,
  $BackLink,
  $PreviewText,
} from 'tet/admin/components/editor/previewWrapper/PreviewWrapper.sc';
import { Button } from 'hds-react';
import Container from 'tet/shared/src/components/container/Container';
import { IconArrowLeft, IconUpload } from 'hds-react';
import { PreviewContext } from 'tet/admin/store/PreviewContext';
import { useTranslation } from 'next-i18next';
import usePublishTetPosting from 'tet/admin/hooks/backend/usePublishTetPosting';
import TetPosting from 'tet-shared/types/tetposting';
import useConfirm from 'shared/hooks/useConfirm';

type BarProps = {
  hasMargin?: boolean;
  allowPublish: boolean;
  onPublish: () => void;
};

const PreviewBar: React.FC<BarProps> = ({ hasMargin, allowPublish, onPublish }) => {
  const { setPreviewVisibility } = useContext(PreviewContext);
  const { t } = useTranslation();

  return (
    <$Bar style={hasMargin ? { marginBottom: '20px' } : {}}>
      <Container>
        <$BarWrapper style={{ minHeight: '3.5rem' }}>
          <$BackLink onClick={() => setPreviewVisibility(false)}>
            <IconArrowLeft />
            <span>{t('common:editor.backToEdit')}</span>
          </$BackLink>
          <$PreviewText>{t('common:editor.preview')}</$PreviewText>
          {allowPublish && (
            <Button onClick={onPublish} variant="success" iconLeft={<IconUpload />}>
              {t('common:editor.publish')}
            </Button>
          )}
        </$BarWrapper>
      </Container>
    </$Bar>
  );
};

const PreviewWrapper: React.FC<{ allowPublish?: boolean; posting?: TetPosting }> = ({
  children,
  allowPublish = false,
  posting,
}) => {
  const publishTetPosting = usePublishTetPosting();
  const { confirm } = useConfirm();
  const { t } = useTranslation();

  const publishPostingHandler = async () => {
    if (posting) {
      const isConfirmed = await confirm({
        header: t('common:publish.confirmation', { posting: posting.title }),
        submitButtonLabel: t('common:publish.publishPosting'),
      });

      if (isConfirmed) {
        publishTetPosting.mutate(posting);
      }
    }
  };

  return (
    <>
      <PreviewBar allowPublish={allowPublish} onPublish={publishPostingHandler} />
      <div>{children}</div>
      <PreviewBar hasMargin={true} allowPublish={allowPublish} onPublish={publishPostingHandler} />
    </>
  );
};

export default PreviewWrapper;
