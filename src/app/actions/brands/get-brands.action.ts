import prisma from "@/lib/prisma";

interface GetBrandsProps {
  take?: number | null;
  skip?: number | null;
}

export const getBrands = async ({ take = 6, skip }: GetBrandsProps) => {
  try {
    const currentPage = skip ? (skip - 1) * Number(take) : 1;

    const [brands, count] = await prisma.$transaction([
      prisma.brand.findMany({
        take: Number(take),
        skip: currentPage,
      }),
      prisma.brand.count(),
    ]);

    return { brands, totalPages: Math.ceil(count / 6), error: null };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Ups ocurrio un error";
    return { brands: [], totalPages: 1, error: errMsg };
  }
}

export const getBrand = async (id: number) => {
  try {
    const res = await prisma.brand.findUnique({ where: { id } });

    return { brand: res, error: null };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Ups ocurrio un error";
    return { brand: null, error: errMsg };
  }
}