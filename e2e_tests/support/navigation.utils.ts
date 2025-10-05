import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { SectionsLinks } from 'page_objects/home_page';

export type Log = {
  message: string;
  type: string;
};

export async function checkConsoleErrors(
  page: Page,
  baseUrl: string,
  expectedPath: string,
  tab: SectionsLinks,
  logs: Log[]
): Promise<void> {
  await page.waitForURL(`${baseUrl}${expectedPath}`, { timeout: 10000 });
  expect(page.url(), `Incorrect URL for ${tab} section: ${page.url()}`).toBe(
    `${baseUrl}${expectedPath}`
  );
  expect(logs.length, `Some errors found in console for ${tab} section`).toBe(
    0
  );
}
