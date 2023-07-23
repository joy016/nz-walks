'use client';

import { Box, Typography } from '@mui/material';
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nz Walks',
  description: 'Nz Walks App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#D6E8DB' }}>
        <Box sx={{ position: 'sticky', margin: '10px', paddingBottom: '50px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h5">NZ Walks UI</Typography>
          </Link>
        </Box>
        {children}
      </body>
    </html>
  );
}
