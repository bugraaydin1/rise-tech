import { InfoOutlined } from "@mui/icons-material";
import Modal from "./common/Modal";

interface Props {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export default function TaskRemoveModal(props: Props) {
  const { open, onAccept, onCancel } = props;

  return (
    <Modal
      open={open}
      acceptButtonTitle="Delete"
      dialogTitle={
        <>
          <InfoOutlined
            fontSize="large"
            color="primary"
            sx={{ padding: 1, verticalAlign: "middle" }}
          />
          Remove Task
        </>
      }
      dialogContentText="Are you sure you want to delete the task?"
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
}
