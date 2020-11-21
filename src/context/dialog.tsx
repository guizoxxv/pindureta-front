
import React, { createContext, useCallback, useState } from 'react';

interface DialogContextData {
  isOpen: DialogState;
  open(dialogId: string): void;
  close(dialogId: string): void;
}

interface DialogState {
  [id: string]: boolean;
}

const dialogs: DialogState = {
  clearCardConfirm: false,
  payNow: false,
}

export const DialogContext = createContext<DialogContextData>({} as DialogContextData);

export const DialogProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<DialogState>(dialogs);

  const open = useCallback((dialogId: string): void => {
    setIsOpen({
      ...isOpen,
      [dialogId]: true,
    })
  }, [isOpen]);

  const close = useCallback((dialogId: string): void => {
    setIsOpen({
      ...isOpen,
      [dialogId]: true,
    })
  }, [isOpen]);

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  );
};