import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import BaseHeader from 'shared/components/header/Header';
import { SUPPORTED_LANGUAGES } from 'shared/i18n/i18n';
import { OptionType } from 'shared/types/common';
import useLogin from 'tet/admin/hooks/backend/useLogin';
import useUserQuery from 'tet/admin/hooks/backend/useUserQuery';
import useLogout from 'tet/admin/hooks/backend/useLogout';
import useGoToFrontPage from 'shared/hooks/useGoToFrontPage';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { asPath } = router;
  const goToFrontPage = useGoToFrontPage();

  const languageOptions = React.useMemo(
    (): OptionType<string>[] =>
      SUPPORTED_LANGUAGES.map((language) => ({
        label: t(`common:languages.${language}`),
        value: language,
      })),
    [t],
  );

  const handleLanguageChange = React.useCallback(
    (e: React.SyntheticEvent<unknown>, { value: lang }: OptionType<string>): void => {
      e.preventDefault();
      void router.push(asPath, asPath, {
        locale: lang,
      });
    },
    [router, asPath],
  );

  const login = useLogin();
  const userQuery = useUserQuery();

  const logout = useLogout();

  const isLoading = userQuery.isLoading;
  const isLoginPage = asPath?.startsWith('/login');

  return (
    <BaseHeader
      title={t('common:appName')}
      skipToContentLabel={t('common:header.linkSkipToContent')}
      menuToggleAriaLabel={t('common:header.menuToggleAriaLabel')}
      languages={languageOptions}
      onLanguageChange={handleLanguageChange}
      onTitleClick={goToFrontPage}
      login={
        !isLoading
          ? {
              isAuthenticated: !isLoginPage && userQuery.isSuccess,
              loginLabel: t('common:header.loginLabel'),
              logoutLabel: t('common:header.logoutLabel'),
              onLogin: login,
              onLogout: logout as () => void,
              userName: userQuery.isSuccess ? userQuery.data.name : undefined,
              userAriaLabelPrefix: t('common:header.userAriaLabelPrefix'),
            }
          : undefined
      }
    />
  );
};

export default Header;
