import { useTranslation } from 'benefit/applicant/i18n';
import {
  getApplicationStepFromString,
  getApplicationStepString,
} from 'benefit/applicant/utils/common';
import camelcaseKeys from 'camelcase-keys';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import hdsToast from 'shared/components/toast/Toast';
import { getFullName } from 'shared/utils/application.utils';
import { convertToBackendDateFormat, parseDate } from 'shared/utils/date.utils';
import { getNumberValue } from 'shared/utils/string.utils';
import snakecaseKeys from 'snakecase-keys';

import DeMinimisContext from '../context/DeMinimisContext';
import { Application, ApplicationData, Employee } from '../types/application';
import useCreateApplicationQuery from './useCreateApplicationQuery';
import useDeleteApplicationQuery from './useDeleteApplicationQuery';
import useUpdateApplicationQuery from './useUpdateApplicationQuery';

interface FormActions {
  onNext: (values: Application) => Promise<ApplicationData | void>;
  onBack: () => Promise<ApplicationData | void>;
  onSave: (values: Application) => Promise<ApplicationData | void>;
  onDelete: (id: string) => void;
}

const useFormActions = (application: Application): FormActions => {
  const router = useRouter();
  const currentStep = getApplicationStepFromString(
    application.applicationStep ?? ''
  );

  const { mutateAsync: createApplication, error: createApplicationError } =
    useCreateApplicationQuery();

  const { mutate: deleteApplication, error: deleteApplicationError } =
    useDeleteApplicationQuery();

  const createApplicationAndAppendId = async (
    data: ApplicationData
  ): Promise<void> => {
    const newApplication = await createApplication(data);
    void router.replace({
      query: {
        id: newApplication?.id,
      },
    });
  };

  const applicationId = router.query.id;

  const { mutateAsync: updateApplication, error: updateApplicationError } =
    useUpdateApplicationQuery();

  const { t } = useTranslation();

  useEffect(() => {
    const error =
      updateApplicationError ||
      createApplicationError ||
      deleteApplicationError;

    if (error) {
      const errorData = camelcaseKeys(error.response?.data ?? {});

      hdsToast({
        autoDismissTime: 0,
        type: 'error',
        labelText: t('common:error.generic.label'),
        text: Object.entries(errorData).map(([key, value]) => (
          <a key={key} href={`#${key}`}>
            {value}
          </a>
        )),
      });
    }
  }, [
    t,
    updateApplicationError,
    createApplicationError,
    deleteApplicationError,
  ]);

  const { deMinimisAids } = useContext(DeMinimisContext);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const getModifiedValues = (currentValues: Application): Application => {
    const employee: Employee | undefined = currentValues?.employee ?? undefined;
    if (employee) {
      employee.commissionAmount = employee.commissionAmount
        ? getNumberValue(employee.commissionAmount.toString())
        : undefined;
      employee.workingHours = employee.workingHours
        ? getNumberValue(employee.workingHours.toString())
        : undefined;
      employee.monthlyPay = employee.monthlyPay
        ? getNumberValue(employee.monthlyPay.toString())
        : undefined;
      employee.otherExpenses = employee.otherExpenses
        ? getNumberValue(employee.otherExpenses.toString())
        : undefined;
      employee.vacationMoney = employee.vacationMoney
        ? getNumberValue(employee.vacationMoney.toString())
        : undefined;
    }

    const normalizedValues = {
      ...currentValues,
      employee,
      startDate: currentValues.startDate
        ? convertToBackendDateFormat(parseDate(currentValues.startDate))
        : undefined,
      endDate: currentValues.endDate
        ? convertToBackendDateFormat(parseDate(currentValues.endDate))
        : undefined,
      apprenticeshipProgram: currentValues.apprenticeshipProgram,
    };

    const deMinimisAidSet =
      deMinimisAids.length > 0
        ? deMinimisAids
        : currentValues.deMinimisAidSet ?? [];

    return {
      ...application,
      ...normalizedValues,
      deMinimisAidSet,
    };
  };

  const getData = (values: Application, step: number): ApplicationData =>
    snakecaseKeys(
      {
        ...values,
        applicationStep: getApplicationStepString(step),
      },
      { deep: true }
    );

  const onNext = async (
    currentValues: Application
  ): Promise<ApplicationData | void> => {
    const data = getData(getModifiedValues(currentValues), currentStep + 1);

    try {
      return applicationId
        ? await updateApplication(data)
        : await createApplicationAndAppendId(data);
    } catch (error) {
      // useEffect will catch this error
    }
    return undefined;
  };

  const onBack = async (): Promise<ApplicationData | void> => {
    const data = getData(application, currentStep - 1);

    try {
      return await updateApplication(data);
    } catch (error) {
      // useEffect will catch this error
    }
    return undefined;
  };

  const onSave = async (
    currentValues: Application
  ): Promise<ApplicationData | void> => {
    const data = getData(getModifiedValues(currentValues), currentStep);

    try {
      const result = applicationId
        ? await updateApplication(data)
        : await createApplication(data);

      const fullName = getFullName(
        result?.employee?.first_name,
        result?.employee?.last_name
      );
      const applicantName = fullName ? `(${fullName})` : '';
      const applicationNumber = result?.application_number ?? '';

      hdsToast({
        autoDismissTime: 5000,
        type: 'success',
        labelText: t('common:notifications.applicationSaved.label'),
        text: t('common:notifications.applicationSaved.message', {
          applicationNumber,
          applicantName,
        }),
      });

      await router.push('/');
      return result;
    } catch (error) {
      // useEffect will catch this error
    }
    return undefined;
  };

  const onDelete = (id: string): void => {
    deleteApplication(id, {
      onSuccess: () => {
        hdsToast({
          autoDismissTime: 5000,
          type: 'success',
          labelText: t('common:notifications.applicationDeleted.label'),
          text: t('common:notifications.applicationDeleted.message'),
        });

        return router.push('/');
      },
    });
  };

  return {
    onNext,
    onBack,
    onSave,
    onDelete,
  };
};

export default useFormActions;
