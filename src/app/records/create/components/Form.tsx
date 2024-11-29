'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Brand } from "@prisma/client";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { createBrand, updateBrand } from "@/app/actions";

import { INITIAL_VALUES, validationSchema } from '../helpers/createBrand.helper';
import {
    BreadcrumbSeparator,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    Breadcrumb,
} from "@/components/ui/breadcrumb";


interface Props {
    isEditing?: boolean;
    brandData?: Brand | null;
}

export default function StepsForm({ isEditing = false, brandData = null }: Props) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (brandData) {
            formik.setValues({
                brand: brandData.brandName,
                trademarkOwner: brandData.trademarkOwner,
                status: brandData.status ? "activo" : "inactivo",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandData]);


    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                console.log("Form values:", values);

                if (isEditing) {
                    const { brand, error } = await updateBrand(Number(brandData?.id), {
                        brandName: values.brand,
                        trademarkOwner: values.trademarkOwner,
                        status: values.status === "activo"
                    });

                    if (!brand) {
                        throw new Error(error);
                    }
                } else {
                    const { brand, error } = await createBrand({
                        brandName: values.brand,
                        trademarkOwner: values.trademarkOwner,
                        status: values.status === "activo"
                    });

                    if (!brand) {
                        throw new Error(error);
                    }
                }

                toast.success('Marca registrada con exito');
                router.push("/records");
            } catch (error) {
                const errMsg = error instanceof Error ? error.message : "Ups ocurrio un error al registrar la marca";
                toast.error(errMsg);
            } finally {
                setLoading(false);
            }
        },
    });

    const handleNext = () => {
        // Valida campos del paso actual antes de avanzar
        if (currentStep === 1) {
            if (!formik.values.brand) {
                formik.setFieldTouched("brand", true);
                formik.validateField("brand");
                return;
            }
        }
        if (currentStep === 2) {
            if (!formik.values.trademarkOwner) {
                formik.setFieldTouched("trademarkOwner", true);
                formik.validateField("trademarkOwner");
                return;
            }
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => setCurrentStep(currentStep - 1);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-lg p-6 rounded-xl border shadow-md"
            >
                {/* Breadcrumb */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className={currentStep === 1 ? "text-slate-700" : "text-gray-300"}
                            >
                                Paso 1
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className={currentStep === 2 ? "text-slate-700" : "text-gray-300"}
                            >
                                Paso 2
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className={currentStep === 3 ? "text-slate-700" : "text-gray-300"}
                            >
                                Paso 3
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-2xl font-bold text-center uppercase mb-4">
                    {currentStep === 1
                        ? "Paso 1: Nombre de la Marca"
                        : currentStep === 2
                            ? "Paso 2: Titular de la Marca"
                            : "Paso 3: Confirmación"}
                </h1>

                {/* Step 1: Brand */}
                {currentStep === 1 && (
                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-sm font-medium">
                        </label>
                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.brand}
                            className={`mt-1 block w-full p-2 border ${formik.touched.brand && formik.errors.brand
                                ? "border-red-500"
                                : "border-gray-300"
                                } rounded-md shadow-sm`}
                        />
                        {formik.touched.brand && formik.errors.brand && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.brand}</p>
                        )}
                    </div>
                )}
                {/* Step 2: Trademark Owner and Status */}
                {currentStep === 2 && (
                    <div className="mb-4">
                        {/* Input para Titular de la Marca */}
                        <label
                            htmlFor="trademarkOwner"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Titular de la Marca
                        </label>
                        <input
                            id="trademarkOwner"
                            name="trademarkOwner"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.trademarkOwner}
                            className={`mt-1 block w-full p-2 border ${formik.touched.trademarkOwner && formik.errors.trademarkOwner
                                ? "border-red-500"
                                : "border-gray-300"
                                } rounded-md shadow-sm`}
                        />
                        {formik.touched.trademarkOwner && formik.errors.trademarkOwner && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.trademarkOwner}
                            </p>
                        )}

                        {/* Select para Estado */}
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mt-4"
                        >
                            Estado
                        </label>
                        <select
                            id="status"
                            name="status"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                            className={`mt-1 block w-full p-2 border ${formik.touched.status && formik.errors.status
                                ? "border-red-500"
                                : "border-gray-300"
                                } rounded-md shadow-sm`}
                        >
                            <option value="">Selecciona el estado</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        {formik.touched.status && formik.errors.status && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.status}</p>
                        )}
                    </div>
                )}
                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                            <strong>Nombre de la marca:</strong> {formik.values.brand}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                            <strong>Titular de la marca:</strong> {formik.values.trademarkOwner}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Estado:</strong> {formik.values.status}
                        </p>
                    </div>
                )}

                {/* Control Buttons */}
                <div className="flex justify-between mt-4">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                        >
                            Anterior
                        </button>
                    )}

                    {currentStep < 3 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-800"
                            disabled={currentStep === 2 && !formik.values.trademarkOwner} // Disable if no trademark owner
                        >
                            Siguiente
                        </button>
                    )}

                    {currentStep === 3 && (
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Enviando..." : "Confirmar"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
