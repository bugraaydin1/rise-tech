import { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ModalProps {
  open: boolean;
  dialogTitle: ReactNode | string;
  dialogContentText?: string;
  acceptButtonTitle?: string;
  cancelButtonTitle?: string;
  onAccept: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export default function Modal({
  open,
  dialogTitle,
  dialogContentText,
  acceptButtonTitle = "Accept",
  cancelButtonTitle = "Cancel",
  onAccept,
  onCancel,
  children,
}: ModalProps) {
  return (
    <Dialog fullWidth open={open} onClose={onCancel} maxWidth="sm">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelButtonTitle}</Button>
        <Button onClick={onAccept} color="inherit" sx={{ bgcolor: "primary.main" }}>
          {acceptButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
