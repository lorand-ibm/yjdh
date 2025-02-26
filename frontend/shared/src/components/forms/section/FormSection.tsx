import * as React from 'react';

import Heading from '../heading/Heading';
import {
  $Action,
  $Grid,
  $Hr,
  $Section,
  FormSectionProps,
} from './FormSection.sc';

const FormSection: React.FC<FormSectionProps> = ({
  children,
  header,
  action,
  withoutDivider = false,
  paddingBottom = false,
  role,
  loading,
  'aria-label': ariaLabel,
  ...rest
}) => (
  <$Section paddingBottom={paddingBottom} aria-label={ariaLabel ?? header}>
    {action && <$Action>{action}</$Action>}
    {header && <Heading header={header} loading={loading} {...rest} />}
    {children && (
      <$Grid role={role} {...rest}>
        {children}
      </$Grid>
    )}
    {!withoutDivider && <$Hr />}
  </$Section>
);

export default FormSection;
