'use client';

import { useEffect, useRef } from "react";

export const usePortal = (id = "portal") => {
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent)
      document.body.appendChild(parentElem);

    if (rootElemRef.current)
      parentElem.appendChild(rootElemRef.current);

    return () => {
      if (rootElemRef.current)
        rootElemRef.current.remove();

      if (!parentElem.childNodes.length)
        parentElem.remove();
    };
  }, [id]);

  function createRootElement(id: string) {
    const rootContainer = document.createElement("div");
    rootContainer.setAttribute("id", id);
    return rootContainer;
  }

  function getRootElem() {
    if (typeof window === "undefined") return null;
    
    if (!rootElemRef.current) {
        rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  }

  return getRootElem();
};