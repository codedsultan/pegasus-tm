declare module 'google-maps-react'
declare module 'react-color'


import { PageProps as InertiaPageProps } from '@inertiajs/core';

declare module '@inertiajs/core' {
  interface PageProps extends InertiaPageProps {
    auth?: {
      user: {
        id: number;
        name: string;
        email: string;
        first_name: string;
        last_name: string;
        email_verified_at: string;
        avatar_img: string;
        avatar: string;
        // Add any other user-related fields here
      };
    };
  }
}
