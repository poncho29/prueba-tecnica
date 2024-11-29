'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

export const CreateBrandButton = () => {
  const router = useRouter();
  
  return (
    <Button
      className="mt-4"
      onClick={() => router.push('/records/create')}
    >
      Crear Registro
    </Button>
  )
}
