import * as fs from 'fs';
import type { PullRequest } from './github_api';

export function savePullRequestsToCSV(
  pullrequests: PullRequest[],
  outputPath: string
): void {
  const headers = ['Title', 'Author', 'Created At'];
  const rows = pullrequests.map((pr) => [
    `"${pr.title.replace(/"/g, '""')}"`, // escapa comillas dobles
    pr.user.login,
    pr.created_at
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(','))
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
}
