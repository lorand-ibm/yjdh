import faker from 'faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'lodash/merge';
import { formatDate } from 'shared/utils/date.utils';
import { LocationType, OptionType } from 'tet-shared/types/classification';
import {
  CustomData,
  LocalizedObject,
  Place,
  TetEvent,
  TetEvents,
} from 'tet-shared/types/linkedevents';
import TetPosting from 'tet-shared/types/tetposting';

export const fakeLocalizedObject = (text?: string): LocalizedObject => ({
  en: text || faker.lorem.paragraph(),
  sv: text || faker.lorem.paragraph(),
  fi: text || faker.lorem.paragraph(),
});

export const getPastDate = (): string => formatDate(faker.date.past());

export const fakeLocation = (overrides?: Partial<LocationType>): LocationType =>
  merge<LocationType, typeof overrides>(
    {
      city: faker.address.city(),
      label: faker.lorem.paragraph(),
      name: faker.lorem.paragraph(),
      postal_code: faker.address.zipCode(),
      street_address: faker.lorem.paragraph(),
      value: faker.internet.url(),
    },
    overrides
  );

export const fakeOptionType = (optionName: string): OptionType => ({
  name: optionName,
  label: optionName,
  value: optionName.split(' ').join('-').toLocaleLowerCase(),
});

export const fakeOptions = (options: string[]): OptionType[] =>
  options.map((option) => fakeOptionType(option));

export const fakeTetPosting = (overrides?: Partial<TetPosting>): TetPosting =>
  merge<TetPosting, typeof overrides>(
    {
      id: faker.datatype.uuid(),
      title: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
      org_name: faker.lorem.paragraph(),
      spots: 1,
      start_date: '10-10-2022',
      contact_email: faker.internet.email(),
      contact_first_name: faker.name.firstName(),
      contact_last_name: faker.name.lastName(),
      contact_phone: faker.phone.phoneNumber(),
      date_published: null,
      location: fakeLocation(),
      keywords: [],
      keywords_working_methods: [],
      keywords_attributes: [],
      languages: [{ label: 'Suomi', name: 'fi', value: 'fi' }],
    },
    overrides
  );

export const fakeCustomData = (overrides?: Partial<CustomData>): CustomData =>
  merge<CustomData, typeof overrides>(
    {
      spots: '2',
      org_name: faker.lorem.paragraph(),
      contact_email: faker.internet.email(),
      contact_phone: faker.phone.phoneNumber(),
      contact_first_name: faker.name.firstName(),
      contact_last_name: faker.name.lastName(),
      editor_email: faker.internet.email(),
    },
    overrides
  );

const fakePlace = (): Place => ({
  '@id': faker.internet.url(),
  name: fakeLocalizedObject(),
  street_address: fakeLocalizedObject(),
  postal_code: faker.address.zipCode(),
  address_locality: fakeLocalizedObject(),
  position: {
    type: 'Point',
    coordinates: [
      Number(faker.address.latitude()),
      Number(faker.address.longitude()),
    ],
  },
});

export const fakeTetEvent = (overrides?: Partial<TetEvent>): TetEvent =>
  merge<TetEvent, typeof overrides>(
    {
      id: faker.datatype.uuid(),
      name: fakeLocalizedObject(),
      location: fakePlace(),
      description: fakeLocalizedObject(),
      short_description: fakeLocalizedObject(),
      keywords: [],
      custom_data: fakeCustomData(),
      start_time: '10-10-2022',
      end_time: null,
      date_published: null,
      created_time: null,
      last_modified_time: null,
      publication_status: 'public',
      event_status: 'EventScheduled',
      in_language: [{ '@id': faker.internet.url() }],
    },
    overrides
  );

export const fakeEventListAdmin = (
  draftTitles: string[],
  publishedTitles: string[]
): TetEvents => {
  const draft = draftTitles.map((draftTitle) =>
    fakeTetEvent({ name: fakeLocalizedObject(draftTitle) })
  );
  const published = publishedTitles.map((publishedTitle) =>
    fakeTetEvent({ name: fakeLocalizedObject(publishedTitle) })
  );
  return {
    draft,
    published,
  };
};
