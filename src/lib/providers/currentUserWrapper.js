'use client';

import dynamic from 'next/dynamic';

const DynamicUserProvider = dynamic(async () => {
  const mod = await import('@/lib/providers/currentUser');
  return mod.CurrentUserProvider;
}, { ssr: false });

export default function CurrentUserProviderWrapper({ children }) {
  return (
    <DynamicUserProvider>
      {children}
    </DynamicUserProvider>
  );
}