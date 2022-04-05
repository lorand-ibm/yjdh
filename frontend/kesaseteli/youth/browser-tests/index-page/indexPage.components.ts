import YouthFormData from '@frontend/kesaseteli-shared/src/types/youth-form-data';
import { fillInput } from '@frontend/shared/browser-tests/utils/input.utils';
import {
  getErrorMessage,
  screenContext,
  withinContext,
} from '@frontend/shared/browser-tests/utils/testcafe.utils';
import { DEFAULT_LANGUAGE, Language } from '@frontend/shared/src/i18n/i18n';
import TestController from 'testcafe';

type TextInputName = keyof Omit<
  YouthFormData,
  'selectedSchool' | 'is_unlisted_school' | 'termsAndConditions'
>;

const translations = {
  fi: {
    title: /rekisteröidy ja saat henkilökohtaisen kesäsetelin käyttöösi/i,
    schoolsDropdown: /koulu/i,
    unlistedSchoolCheckbox: /koulua ei löydy listalta/i,
    termsAndConditionsCheckbox:
      /olen lukenut palvelun käyttöehdot ja hyväksyn ne/i,
    sendButton: /lähetä tiedot/i,
    schoolsLoading: /ladataan vaihtoehtoja/i,
  },
  sv: {
    title: /registrera dig och få din personlig sommarsedel/i,
    schoolsDropdown: /skola/i,
    unlistedSchoolCheckbox: /skolan finns inte i listan/i,
    termsAndConditionsCheckbox: /jag har läst och godkänner villkoren/i,
    sendButton: /skicka informationen/i,
    schoolsLoading: /laddar upp alternativ/i,
  },
  en: {
    title: /sign up to receive your personal summer job voucher/i,
    schoolsDropdown: /school/i,
    unlistedSchoolCheckbox: /school not found on the list/i,
    termsAndConditionsCheckbox: /i have read and accept the terms of use/i,
    sendButton: /submit information/i,
    schoolsLoading: /loading up options/i,
  },
};

export const getIndexPageComponents = async (
  t: TestController,
  lang?: Language
) => {
  const screen = screenContext(t);
  const within = withinContext(t);
  const withinForm = (): ReturnType<typeof within> =>
    within(screen.findByTestId('youth-form'));
  const selectors = {
    title() {
      return screen.findByRole('heading', {
        name: translations[lang ?? DEFAULT_LANGUAGE].title,
      });
    },
    textInput(name: TextInputName) {
      return withinForm().findByTestId(name as string);
    },
    schoolsLoading() {
      return withinForm().queryByPlaceholderText(
        translations[lang ?? DEFAULT_LANGUAGE].schoolsLoading
      );
    },
    schoolsDropdown() {
      return withinForm().queryByRole('combobox', {
        name: translations[lang ?? DEFAULT_LANGUAGE].schoolsDropdown,
      });
    },
    unlistedSchoolCheckbox() {
      return withinForm().findByRole('checkbox', {
        name: translations[lang ?? DEFAULT_LANGUAGE].unlistedSchoolCheckbox,
      });
    },
    termsAndConditionsCheckbox() {
      return withinForm().findByRole('checkbox', {
        name: translations[lang ?? DEFAULT_LANGUAGE].termsAndConditionsCheckbox,
      });
    },
    sendButton() {
      return withinForm().findByRole('button', {
        name: translations[lang ?? DEFAULT_LANGUAGE].sendButton,
      });
    },
    result() {
      return withinForm().findByTestId('result');
    },
  };
  const expectations = {
    async isLoaded() {
      await t.expect(selectors.title().exists).ok(await getErrorMessage(t));
      await t
        .expect(selectors.schoolsLoading().exists)
        .notOk(await getErrorMessage(t));
    },
  };
  const actions = {
    async typeInput(name: TextInputName, value?: string) {
      await fillInput<YouthFormData>(
        t,
        name as keyof YouthFormData,
        selectors.textInput(name),
        value
      );
    },
    async typeAndSelectSchoolFromDropdown(schoolName: string) {
      const dropdown = selectors.schoolsDropdown();
      await fillInput<YouthFormData>(t, 'selectedSchool', dropdown, schoolName);
      await t.click(screen.findByRole('option', { name: schoolName }));
    },
    async toggleUnlistedSchoolCheckbox() {
      await t.click(selectors.unlistedSchoolCheckbox());
    },
    async toggleAcceptTermsAndConditions() {
      await t.click(selectors.termsAndConditionsCheckbox());
    },
    async clickSendButton() {
      await t.click(selectors.sendButton());
    },
  };
  await expectations.isLoaded();
  return {
    selectors,
    expectations,
    actions,
  };
};
