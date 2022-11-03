import React from 'react';
import { GithubContributorInterface } from '@isomera/interfaces';
import {
  Avatar,
  Box,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Commit as CommitIcon,
  Reorder as LinesIcon,
} from '@mui/icons-material';

interface Props {
  contributors: Array<GithubContributorInterface>;
}

export const ContributorsComponent: React.FC<Props> = ({ contributors }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      gap={theme.spacing(2)}
    >
      {contributors
        ?.filter((c) => c.author.type !== 'Bot')
        .sort((a, b) => b.total - a.total)
        .map((contributor) => (
          <Paper key={contributor.author.id} sx={{ p: 1, pr: 2 }}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box>
                <Avatar
                  src={contributor.author.avatar_url}
                  alt={contributor.author.login}
                  variant="rounded"
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
              <Box ml={1}>
                <Typography sx={{ mb: 1 }}>
                  <a
                    href={`https://www.github.com/${contributor.author.login}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{contributor.author.login}
                  </a>
                </Typography>
                <Box display="flex" flexDirection="row">
                  <Tooltip title="Total Commits" sx={{ mr: 2 }}>
                    <Typography>
                      <CommitIcon
                        fontSize="small"
                        sx={{ verticalAlign: 'middle', mr: 1 }}
                      />
                      {contributor.weeks.reduce(
                        (value, obj) => value + obj.c,
                        0
                      )}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={`Total Lines Added`}>
                    <Typography>
                      <LinesIcon
                        fontSize="small"
                        sx={{ verticalAlign: 'middle', mr: 1 }}
                      />
                      {contributor.weeks.reduce(
                        (value, obj) => value + (obj.a - obj.d),
                        0
                      )}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
    </Box>
  );
};
