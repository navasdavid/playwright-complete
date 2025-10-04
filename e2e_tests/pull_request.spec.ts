import { test, expect } from '@playwright/test';
import { getAllOpenPullRequests } from './support/github_api';
import { savePullRequestsToCSV } from './support/csv.utils';

test('exportar todos los PRs a CSV', async () => {
  test.skip(test.info().project.name !== 'chrome', 'Executing only on chrome');
  const owner = 'appwrite';
  const repo = 'appwrite';
  const token = process.env['GITHUB_TOKEN'];

  if (!token) {
    throw new Error('GITHUB_TOKEN not included in the environment variables');
  }

  const pullRequests = await getAllOpenPullRequests(owner, repo, token);

  expect(pullRequests.length).toBeGreaterThan(0);

  const outputPath = './pull_requests.csv';
  savePullRequestsToCSV(pullRequests, outputPath);
});
