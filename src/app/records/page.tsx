import { getBrands } from "../actions";

import Table from "@/components/Table";

interface Props {
    searchParams: Promise<{ page: string | undefined }>
  }

export default async function PageRecords({ searchParams }: Props) {
    const page = (await searchParams).page;
    const currentPage = page ? Number(page) : 1;

    const { brands, totalPages } = await getBrands({ take: 6, skip: currentPage});

    return (
        <>
            <Table
                brands={brands}
                page={currentPage}
                totalPages={totalPages}
            />
        </>
    );
}
