import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['resourcesrelationnelles.s3.eu-west-3.amazonaws.com'], 
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig); 
