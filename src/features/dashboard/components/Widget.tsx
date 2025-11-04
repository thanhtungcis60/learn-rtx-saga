import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

export default function Widget({ title, children }: WidgetProps) {
  return (
    <Paper sx={(theme) => ({ py: 2, px: 1, border: `1px solid ${theme.palette.divider}` })}>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
