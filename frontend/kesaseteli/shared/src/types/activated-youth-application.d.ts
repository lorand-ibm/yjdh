import AdditionalInfoApplication from './additional-info-application';
import CreatedYouthApplication from './created-youth-application';

type ActivatedYouthApplication = CreatedYouthApplication &
  Partial<AdditionalInfoApplication> & {
    receipt_confirmed_at: string;
    additional_info_provided_at?: string;
  };

export default ActivatedYouthApplication;
