import * as wdio from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    app: './android/app/build/outputs/apk/release/app-release.apk',
    appPackage: 'de.patwoz.rnappiumtest',
    appActivity: 'de.patwoz.rnappiumtest.MainActivity',
    automationName: 'UiAutomator2',
    noReset: false,
  },
};

let client;

beforeAll(async () => {
  client = await wdio.remote(opts);
});

afterAll(() => client.deleteSession());

export function query(client, queryStr) {
  return client.$(queryStr);
}

export function queryByText(client, text) {
  return query(client, `//*[contains(@text,"${text}")]`);
}

export async function waitFor(getElement) {
  const element = await getElement();
  const exists = await element.isExisting();
  if (exists) {
    return element;
  }
  await element.waitForExist({ timeout: 10000 });
  return getElement();
}

test('Should display welcome page', async () => {
  const elWelcome = await waitFor(() => queryByText(client, 'Welcome to React'));
  expect(elWelcome).not.toBeNull();
});
