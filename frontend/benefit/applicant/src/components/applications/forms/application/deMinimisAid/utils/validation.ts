import {
  DE_MINIMIS_AID_GRANTED_AT_MAX_DATE,
  DE_MINIMIS_AID_KEYS,
} from 'benefit/applicant/constants';
import { DeMinimisAid } from 'benefit/applicant/types/application';
import { VALIDATION_MESSAGE_KEYS } from 'benefit-shared/constants';
import isFuture from 'date-fns/isFuture';
import { TFunction } from 'next-i18next';
import { convertToUIDateFormat, parseDate } from 'shared/utils/date.utils';
import { getNumberValue } from 'shared/utils/string.utils';
import * as Yup from 'yup';

export const getValidationSchema = (t: TFunction): Yup.SchemaOf<DeMinimisAid> =>
  Yup.object().shape({
    [DE_MINIMIS_AID_KEYS.GRANTER]: Yup.string()
      .required(VALIDATION_MESSAGE_KEYS.REQUIRED)
      .max(64, (param) => ({
        max: param.max,
        key: VALIDATION_MESSAGE_KEYS.STRING_MAX,
      })),
    [DE_MINIMIS_AID_KEYS.AMOUNT]: Yup.number()
      .transform((_value, originalValue) => getNumberValue(originalValue))
      .required(VALIDATION_MESSAGE_KEYS.REQUIRED)
      .typeError(VALIDATION_MESSAGE_KEYS.NUMBER_INVALID)
      .min(0, (param) => ({
        min: param.min,
        key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
      })),
    [DE_MINIMIS_AID_KEYS.GRANTED_AT]: Yup.string()
      .typeError(VALIDATION_MESSAGE_KEYS.DATE_FORMAT)
      .test({
        message: t(VALIDATION_MESSAGE_KEYS.DATE_MAX, {
          max: convertToUIDateFormat(DE_MINIMIS_AID_GRANTED_AT_MAX_DATE),
        }),
        test: (value) => {
          if (!value) return false;

          const date = parseDate(value);

          if (date && isFuture(date)) {
            return false;
          }
          return true;
        },
      }),
  });
