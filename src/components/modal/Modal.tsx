import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from "react-dom";

import { usePortal } from '@/hooks';

import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  showCloseButton?: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, showCloseButton = true, onClose, children }: ModalProps) => {
  const target = usePortal("modal-root");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!target || (!isOpen && !isVisible)) return null;

  return ReactDOM.createPortal(
    <div 
      className={`${styles.modalOverlay} ${isOpen ? styles.fadeIn : styles.fadeOut}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modalContent} ${isOpen ? styles.slideIn : styles.slideOut}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={() => !isOpen && setIsVisible(false)}
      >
        {showCloseButton && (
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            Cerrar
          </button>
        )}

        {children}
      </div>
    </div>,
    target
  );
};