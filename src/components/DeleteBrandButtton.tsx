'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { deleteBrand } from '@/app/actions';

import { Trash } from 'lucide-react';

import { Modal } from './modal/Modal';
import { Button } from './ui/button';

interface Props {
  brandId?: number;
}

export const DeleteBrandButtton = ({ brandId }: Props) => {
  const router = useRouter();

  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!brandId) return;

    try {
        setLoading(true);
        const result = await deleteBrand(brandId);
        
        if (!result.success) {
          throw new Error(result.error || "Ups ocurrio un error al eliminar la marca");
        }
        
        toast.success('Marca eliminada con exito');
        router.refresh();
    } catch (error) {
      const errMesg = error instanceof Error ? error.message : "Ups ocurrio un error al eliminar la marca";
      toast.error(errMesg); 
    } finally {
      setLoading(false);
      setConfirmModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setConfirmModal(true)}
        className="font-medium text-red-600 dark:text-red-500 hover:animate-bounce"
      >
        <Trash size={20} />
      </button>

      <Modal
        isOpen={confirmModal}
        showCloseButton={false}
        onClose={() => setConfirmModal(false)}
      >
        <div className='flex flex-col gap-4'>
          <h4 className='text-center font-semibold'>
            ¿Estas seguro de eliminar la marca?
          </h4>

          <div className='flex justify-center gap-4'>
            <Button
              onClick={() => handleDelete()}
              className="text-white font-semibold px-3 py-2 rounded-md bg-red-600 hover:bg-red-500"
            >
              {loading ? 'Eliminando...' : 'Eliminar'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmModal(false)}
              className="font-semibold px-3 py-2 rounded-md"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
