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
      <body style={{ backgroundColor: '#F8F6F4' }}>
        <Box
          sx={{
            position: 'fixed',
            padding: '10px',
            backgroundColor: '#9AC5F4',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h5">NZ Walks UI</Typography>
          </Link>
        </Box>
        {children}
      </body>
    </html>
  );
}
