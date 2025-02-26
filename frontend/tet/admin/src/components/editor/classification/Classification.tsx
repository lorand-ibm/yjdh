import React from 'react';
import FormSection from 'shared/components/forms/section/FormSection';
import { $Grid, $GridCell } from 'shared/components/forms/section/FormSection.sc';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'styled-components';
import {
  getWorkMethods,
  getWorkFeatures,
  getWorkKeywords,
  keywordToOptionType,
} from 'tet-shared/backend-api/linked-events-api';
import { useQuery, useQueries } from 'react-query';
import { OptionType } from 'tet-shared/types/classification';
import Combobox from 'tet/admin/components/editor/Combobox';
import SelectionGroup from 'tet/admin/components/editor/SelectionGroup';
import { useFormContext } from 'react-hook-form';
import TetPosting from 'tet-shared/types/tetposting';
import EditorLoadingError from 'tet/admin/components/editor/EditorLoadingError';
import { Language } from 'shared/i18n/i18n';

export type FilterFunction = (options: OptionType[], search: string) => OptionType[];

const Classification: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [search, setSearch] = React.useState('');
  const { getValues } = useFormContext<TetPosting>();

  const results = useQueries([
    { queryKey: 'workMethods', queryFn: getWorkMethods },
    { queryKey: 'workFeatures', queryFn: getWorkFeatures },
  ]);

  const keywordsResults = useQuery(['keywords', search], () => getWorkKeywords(search));

  const keywords = React.useMemo(() => {
    return !keywordsResults.isLoading && keywordsResults.data
      ? keywordsResults.data.map((k) => keywordToOptionType(k, i18n.language as Language))
      : [];
  }, [keywordsResults]);

  const [workMethods, workFeatures] = results;

  if (workMethods.isLoading || workFeatures.isLoading) {
    return <div>Lataa</div>;
  }

  const filterHandler: FilterFunction = (options, search) => {
    setSearch(search);
    return options;
  };

  if (workMethods.error || workFeatures.error) {
    const error = (workMethods.error || workFeatures.error) as Error;
    return <EditorLoadingError error={error} />;
  }

  const workMethodsList = workMethods.data?.map((k) => keywordToOptionType(k, i18n.language as Language)) || [];

  const workFeaturesList = workFeatures.data?.map((k) => keywordToOptionType(k, i18n.language as Language)) || [];

  const isSetRule = () => {
    return getValues('keywords_working_methods').length > 0 ? true : t('common:editor.posting.validation.isSet');
  };

  return (
    <FormSection header={t('common:editor.classification.classifications')}>
      <$GridCell
        as={$Grid}
        $colSpan={12}
        css={`
          row-gap: ${theme.spacing.xl};
        `}
      >
        <$GridCell $colSpan={4}>
          <SelectionGroup
            required={true}
            fieldId="keywords_working_methods"
            label={t('common:editor.classification.workMethod')}
            rules={isSetRule}
            options={workMethodsList}
          ></SelectionGroup>
        </$GridCell>
        <$GridCell $colSpan={4}>
          <SelectionGroup
            required={false}
            fieldId="keywords_attributes"
            label={t('common:editor.classification.workFeature')}
            options={workFeaturesList}
          ></SelectionGroup>
        </$GridCell>
        <$GridCell $colSpan={4}>
          <Combobox<OptionType>
            id={'keywords'}
            multiselect
            required={false}
            label={t('common:editor.classification.keywords')}
            placeholder={t('common:editor.classification.search')}
            options={keywords}
            optionLabelField={'label'}
            filter={filterHandler}
          />
        </$GridCell>
      </$GridCell>
    </FormSection>
  );
};

export default Classification;
