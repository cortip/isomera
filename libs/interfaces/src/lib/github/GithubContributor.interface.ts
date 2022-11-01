export interface GithubContributorInterface {
  total: number;
  weeks: Array<{
    w: number; // w - Start of the week, given as a Unix timestamp.
    a: number; // a - Number of additions
    d: number; // d - Number of deletions
    c: number; // c - Number of commits
  }>;
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
}
