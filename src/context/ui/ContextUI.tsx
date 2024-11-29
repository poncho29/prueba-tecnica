'use client'

import { createContext } from "react";

export interface IContextUI {
    toggleSidebar: boolean;
    handleToggleSidebar: (value: boolean) => void;
}

export const ContextUI = createContext<IContextUI>({} as IContextUI)