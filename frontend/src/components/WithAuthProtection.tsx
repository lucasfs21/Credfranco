'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth-util';

interface WithAuthProtectionProps {
  children: ReactNode;
}

const WithAuthProtection = ({ children }: WithAuthProtectionProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push('/auth/signin');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <></>
  }

  return <>{children}</>;
};

export default WithAuthProtection;
