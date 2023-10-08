import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const namefieldRef = useRef<HTMLInputElement>(null);
  const listDescriptionfieldRef = useRef<HTMLInputElement>(null);
  const { fetchLists } = useCards();

  const handleAddList = async () => {
    try {
      await createList({ name: namefieldRef.current?.value ?? "" , listDescription: listDescriptionfieldRef.current?.value ?? "" });
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>create a new playlist</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <TextField
          inputRef={namefieldRef}
          label="Playlist Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
        <TextField
          inputRef={listDescriptionfieldRef}
          label=" Playlist Description"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>create</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
