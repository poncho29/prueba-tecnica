'use client'

import { useContext, useEffect } from "react";

import Link from "next/link";

import { ContextUI } from "@/context/ui/ContextUI";

import { useScreenSize } from "@/hooks";

import { Separator } from "@/components/ui/separator";

import { Menu, NotebookPenIcon } from "lucide-react";

function SideBar() {
    const { toggleSidebar, handleToggleSidebar } = useContext(ContextUI);

    const { width } = useScreenSize();

    useEffect(() => {
        if (width < 1024 && toggleSidebar) {
            handleToggleSidebar(false);
        }

        if (width >= 1024 && !toggleSidebar) {
            handleToggleSidebar(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return (
        <div
            className={`
                absolute top-0 w-full h-full max-w-72 p-4 text-white bg-slate-700 transition-all
                ease-in-out duration-300  z-50 lg:static ${toggleSidebar ? 'left-0' : '-left-72 lg:max-w-20'}
            `}
        >
            <div
                className={`flex items-center ${toggleSidebar ? 'justify-between' : 'justify-center'}`}
            >
                <h4
                    className={`
                        text-3xl  font-bold transition-all ease-in-out duration-300 
                        ${toggleSidebar ? '' : 'overflow-hidden w-0 '}
                    `}
                >
                    DashBoard
                </h4>

                <Menu
                    size={26}
                    className="hidden lg:block cursor-pointer"
                    onClick={() => handleToggleSidebar(!toggleSidebar)}
                />
            </div>
            <ul className="mt-8">
                <li className="justify-center">
                    <Link
                        href={'/records'}
                        className={`
                            flex items-center font-semibold text-lg 
                            ${toggleSidebar ? 'gap-4 ' : 'justify-center'}
                        `}
                    >
                        <NotebookPenIcon size={26} />
                        <span
                            className={`
                                text-xl font-bold transition-all ease-in-out duration-300 
                                ${toggleSidebar ? '' : 'overflow-hidden w-0 '}
                           `}
                        >
                            Registro de Marca
                        </span>
                    </Link>
                </li>
                <Separator className="my-4" />
            </ul>
        </div>
    )
}

export default SideBar