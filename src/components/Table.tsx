import Link from 'next/link';

import { Brand } from '@prisma/client';

import { CustomPagination } from './CustomPagination';
import { DeleteBrandButtton } from './DeleteBrandButtton';
import { CreateBrandButton } from './CreateBrandButton';

import { Pencil } from 'lucide-react';

interface Props {
    brands: Brand[];
    page: number;
    totalPages: number;
}

export default function Table({ brands, page, totalPages }: Props) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md pb-4 sm:rounded-lg">
                <div className='flex justify-end pr-4'>
                    <CreateBrandButton />
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-4">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-1 bg-gray-50 dark:bg-gray-800">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Marca
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Titular
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brands.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        No hay marcas registradas
                                    </td>
                                </tr>
                            ) : (
                                brands.map((brand) => (
                                    <tr key={brand.id} className="border-b border-gray-200 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                                        >
                                            {brand.id}
                                        </th>
                                        <td className="px-6 py-4">{brand.brandName}</td>
                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{brand.trademarkOwner}</td>
                                        <td className="px-6 py-4">{brand.status ? 'Activo' : 'Inactivo'}</td>
                                        <td className="flex gap-2 px-6 py-4">
                                            <Link
                                                href={`/records/edit/${brand.id}`}
                                                className="font-medium text-slate-700 dark:text-blue-500 hover:animate-bounce"
                                            >
                                                <Pencil size={20} />
                                            </Link>
                                            <DeleteBrandButtton brandId={brand.id} />
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            
                <CustomPagination 
                    page={page}
                    totalPages={totalPages}
                />
            </div> 
        </>
    );
}
