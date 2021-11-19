import React, { ReactNode } from 'react'
import Head from 'next/head';
import Box from '@mui/material/Box';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <Box>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {children}
    </Box>
)

export default Layout
