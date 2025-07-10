'use client';

import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function MagicLinkPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  useEffect(() => {
    console.log('renderizou');
    if (!token) {
      router.replace('/login');
      return;
    }

    setCookie('token', token, {
      path: '/',
      maxAge: 60 * 15, // 15 minutos
    });

    router.replace('/dashboard');
  }, [token, router]);

  return <p className="text-white">🔐 Validando login mágico...</p>;
}
