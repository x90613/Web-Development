import { useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

// import useCards from "@/hooks/useCards";
// import { createCard, deleteCard, updateCard } from "@/utils/client";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewTaskDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  // listId: string;
};

type EditTaskDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  // listId: string;
  // cardId: string;

  title: string;
  start: string;
  end: string;
  location: string;
  note: string;
};

type TaskDialogProps = NewTaskDialogProps | EditTaskDialogProps;

export default function TaskDialog(props: TaskDialogProps) {
  const { variant, open, onClose, listId } = props;
  const title = variant === "edit" ? props.title : "";
  const start = variant === "edit" ? props.start : "";
  const end = variant === "edit" ? props.end : "";
  const location = variant === "edit" ? props.location : "";
  const note = variant === "edit" ? props.note : "";

  const [editingTitle, setEditingTitle] = useState(variant === "new");
  const [editingStart, setEditingStart] = useState(variant === "new");
  const [editingEnd, setEditingEnd] = useState(variant === "new");
  const [editingLocation, setEditingLocation] = useState(variant === "new");
  const [editingNote, setEditingNote] = useState(variant === "new");

  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newTitle, setNewTitle] = useState(title);
  const [newStart, setNewStart] = useState(start);
  const [newEnd, setNewEnd] = useState(end);
  const [newLocation, setNewLocation] = useState(location);
  const [newNote, setNewNote] = useState(note);

  // const [newListId, setNewListId] = useState(listId);

  // const { lists, fetchCards } = useCards();

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (variant === "new") {
        await createCard({
          title: newTitle,
          description: newDescription,
          list_id: listId,
        });
      } else {
        if (
          newTitle === title &&
          newDescription === description &&
          newListId === listId
        ) {
          return;
        }
        // typescript is smart enough to know that if variant is not "new", then it must be "edit"
        // therefore props.cardId is a valid value
        await updateCard(props.cardId, {
          title: newTitle,
          description: newDescription,
          list_id: newListId,
        });
      }
      fetchCards();
    } catch (error) {
      alert("Error: Failed to save card");
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (variant !== "edit") {
      return;
    }
    try {
      await deleteCard(props.cardId);
      fetchCards();
    } catch (error) {
      alert("Error: Failed to delete card");
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        {editingTitle ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingTitle(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow"
              placeholder="Enter a title for this card..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newTitle}</Typography>
          </button>
        )}
        {/* <Select
          value={newListId}
          onChange={(e) => setNewListId(e.target.value)}
        >
          {lists.map((list) => (
            <MenuItem value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select> */}
        {variant === "edit" && (
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent className="w-[600px]">
        
        <div className="p-1">
          {editingStart ? (
              <ClickAwayListener
                onClickAway={() => {
                  if (variant === "edit") {
                    setEditingStart(false);
                  }
                }}
              >
                <textarea
                  className="bg-white/0 p-2"
                  autoFocus
                  defaultValue={start}
                  placeholder="Add start..."
                  onChange={(e) => setNewStart(e.target.value)}
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEditingStart(true)}
                className="w-full rounded-md p-2 text-black hover:bg-blue-100"
              >
                <Typography className="text-start">{newStart}</Typography>
              </button>
            )}
        </div>

        <div className="p-1">
          {editingEnd ? (
              <ClickAwayListener
                onClickAway={() => {
                  if (variant === "edit") {
                    setEditingEnd(false);
                  }
                }}
              >
                <textarea
                  className="bg-white/0 p-2"
                  autoFocus
                  defaultValue={start}
                  placeholder="Add End..."
                  onChange={(e) => setNewEnd(e.target.value)}
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEditingEnd(true)}
                className="w-full rounded-md p-2 text-black hover:bg-blue-100"
              >
                <Typography className="text-start">{newEnd}</Typography>
              </button>
            )}
        </div>

        <div className="p-1">
          {editingLocation ? (
              <ClickAwayListener
                onClickAway={() => {
                  if (variant === "edit") {
                    setEditingLocation(false);
                  }
                }}
              >
                <textarea
                  className="bg-white/0 p-2"
                  autoFocus
                  defaultValue={location}
                  placeholder="Add Location..."
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEditingLocation(true)}
                className="w-full rounded-md p-2 text-black hover:bg-blue-100"
              >
                <Typography className="text-start">{newLocation}</Typography>
              </button>
            )}
        </div>

        <div className="p-1">
          {editingNote ? (
              <ClickAwayListener
                onClickAway={() => {
                  if (variant === "edit") {
                    setEditingNote(false);
                  }
                }}
              >
                <textarea
                  className="bg-white/0 p-2"
                  autoFocus
                  defaultValue={note}
                  placeholder="Add Note..."
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEditingNote(true)}
                className="w-full rounded-md p-2 text-black hover:bg-blue-100"
              >
                <Typography className="text-start">{newNote}</Typography>
              </button>
            )}
        </div>

        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
