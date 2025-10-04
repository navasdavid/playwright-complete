export interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface PullRequest {
  id: number;
  number: number;
  state: string;
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  user: User;
  html_url: string;
  base: {
    ref: string;
    repo: {
      name: string;
      full_name: string;
    };
  };
  head: {
    ref: string;
  };
}

export async function getAllOpenPullRequests(
  owner: string,
  repo: string,
  token: string
): Promise<PullRequest[]> {
  const allPRs: PullRequest[] = [];
  let page = 1;
  const perPage = 100; // max per page in gitHub API documentation

  // Avoid accidental infinite loops if the API is not behaving as expected
  const MAX_PAGES = 1000;
  let pagesFetched = 0;

  do {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls?per_page=${perPage}&page=${page}&state=open`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching pull requests (page ${page}): ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as PullRequest[];

    allPRs.push(...data);

    page++;
    pagesFetched++;
    // stop if we received less than a full page (no more results) or hit safety cap
  } while (allPRs.length % perPage === 0 && pagesFetched < MAX_PAGES);

  return allPRs;
}
