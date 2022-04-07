import { linkedEventsUrl } from '@frontend/te-yout/src/backend-api/backend-api';
import { HttpRequestHook } from '@frontend/shared/browser-tests/http-utils/http-request-hook';
import requestLogger, { filterLoggedRequests } from '@frontend/shared/browser-tests/utils/request-logger';
import { clearDataToPrintOnFailure } from '@frontend/shared/browser-tests/utils/testcafe.utils';
import frontpage from './pages/frontpage';
import searchpage from './pages/searchpage';
import { Selector } from 'testcafe';
import postingpage from './pages/postingpage';
import { getUrl } from '@frontend/shared/browser-tests/utils/url.utils';

const url = getUrl(process.env.ADMIN_URL ?? 'https://localhost:3001');

fixture('Frontpage')
  .page(url)
  .requestHooks(requestLogger, new HttpRequestHook(url, linkedEventsUrl))
  .beforeEach(async (t) => {
    clearDataToPrintOnFailure(t);
  })
  .afterEach(async () =>
    // eslint-disable-next-line no-console
    console.log(filterLoggedRequests(requestLogger)),
  );

test('user can search and navigate', async (t) => {
  const currentYear: number = new Date().getFullYear();
  const startDate = `31.12.${currentYear}`;
  const endDate = `31.12.${currentYear + 1}`;
  const workMethodText = 'varjosta';
  const languageText = 'suomeksi';

  await frontpage.fillSearch('test');
  await frontpage.search();

  await searchpage.assertSearchTerm('test');
  await searchpage.assertTags(['test']);

  await t.expect(Selector('h2').withText(/\d+ hakutulos/).exists).ok();

  await searchpage.removeTag();
  await searchpage.assertSearchTerm('');

  await searchpage.fillSearch('avustaja');
  await searchpage.selectWorkMethod(workMethodText);
  await searchpage.fillDates(startDate, endDate);
  await searchpage.selectLanguage(languageText);
  await searchpage.search();

  await searchpage.assertSearchTerm('avustaja');
  // selected language is not a label
  await searchpage.assertTags(['avustaja', workMethodText, `${startDate}-${endDate}`]);

  await searchpage.removeAllSearches();
  await searchpage.assertSearchTerm('');
  await searchpage.assertTags([]);

  if (await searchpage.readMoreButton.exists) {
    // if we have any results
    await searchpage.goToPosting();
    await t.expect(postingpage.postingTitle.exists).ok();
  }
});
