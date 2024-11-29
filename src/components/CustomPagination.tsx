'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Pagination
} from "@/components/ui/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";


interface Props {
  page: number;
  totalPages: number;
}

export function CustomPagination({
  page,
  totalPages,
}: Props) {
  const pathname = usePathname();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={`
            flex items-center justify-center w-9 h-9
            ${page === 1 ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <Link
            href={page === 2 ? pathname : `${pathname}?page=${page - 1}`}
          >
            <ChevronLeft className="size-6" />
          </Link>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            { page } 
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          className={`
            flex items-center justify-center w-9 h-9
            ${page === totalPages ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <Link
            href={`${pathname}?page=${page + 1}`}
          >
            <ChevronRight className="size-6" />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
