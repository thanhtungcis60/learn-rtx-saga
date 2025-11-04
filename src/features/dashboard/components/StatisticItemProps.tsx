import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: number | string;
}

export function StatisticItem({ icon, label, value }: StatisticItemProps) {
  return (
    <Paper
      sx={(theme) => ({
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1,
        px: 2,
        border: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
