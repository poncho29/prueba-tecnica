'use client';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { deleteBrand } from '@/app/actions';

import { Trash } from 'lucide-react';

interface Props {
  brandId?: number;
}

export const DeleteBrandButtton = ({ brandId }: Props) => {
  const router = useRouter();

  const handleDelete = async (id?: number) => {
    if (!id) return;

    const confirmDelete = confirm('Estas seguro de eliminar la marca?');
    if (!confirmDelete) return;

    try {
        const result = await deleteBrand(id);
        
        if (!result.success) {
          throw new Error(result.error || "Ups ocurrio un error al eliminar la marca");
        }
        
        toast.success('Marca eliminada con exito');
        router.refresh();
    } catch (error) {
      const errMesg = error instanceof Error ? error.message : "Ups ocurrio un error al eliminar la marca";
      toast.error(errMesg);
    }
  };

  return (
    <button
      onClick={() => handleDelete(brandId)}
      className="font-medium text-red-600 dark:text-red-500 hover:animate-bounce"
    >
      <Trash size={20} />
  </button>
  )
}
