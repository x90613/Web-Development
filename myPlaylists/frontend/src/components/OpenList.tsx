import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";


import CardDialog from "./CardDialog";
import { ClickAwayListener, Divider, Input } from "@mui/material";
import type { CardProps } from "./Card";
import Card from "./Card";
import { updateList } from "@/utils/client";
import useCards from "@/hooks/useCards";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types

type OpenListDialogProps = {
  open: boolean;
  onClose: () => void;
  listId: string;
  //cardId: string;
  title: string;
  description: string;
  cards: CardProps[];
};


export default function OpenList(props: OpenListDialogProps) {
  const { open, onClose, listId, title, description, cards} = props;
  const [editingName, setEditingName] = useState(false);
  const [editingListDescription, setEditingListDescription] = useState(false);
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputListDescriptionRef = useRef<HTMLInputElement>(null);
  const { fetchLists } = useCards();



  const handleUpdateName = async () => {
    if (!inputTitleRef.current) return;
    if (inputTitleRef.current.value ===""){
      setEditingName(false)
      return;
    }
    const newName = inputTitleRef.current.value;
    if (newName !== title ) {
      try {
        await updateList(listId, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEditingName(false);
  };

  const handleUpdateListDescription = async () => {
    if (!inputListDescriptionRef.current) return;
    if (inputListDescriptionRef.current.value ===""){
      setEditingListDescription(false)
      return;
    }

    const newListDescription = inputListDescriptionRef.current.value;
    if (newListDescription !== description) {
      try {
        await updateList(listId, { listDescription: newListDescription });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEditingListDescription(false);
  };


  return (
    <Dialog open={open} fullWidth={true} maxWidth="xl">
      <div>
        <DialogContent>
          <DialogActions>
            <Button onClick={onClose}>close</Button>
          </DialogActions>
        </DialogContent>
      </div>
        <DialogTitle className="flex flex-col gap-2">
        <div className="flex gap-4">
          {editingName ? (
              <ClickAwayListener onClickAway={handleUpdateName}>
                <Input
                  autoFocus
                  defaultValue={title}
                  className="grow"
                  placeholder="Enter a name for this playlist..."
                  sx={{ fontSize: "2rem" }}
                  inputRef={inputTitleRef}
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEditingName(true)}
                className="w-full rounded-md p-2 hover:bg-white/10"
              >
                <Typography className="text-start" variant="h4">
                  {title}
                </Typography>
              </button>
          )}
        </div>
        <div className="flex gap-2">
            <img src="https://images.radio.com/aiu-media/StaticSocialInstagram1080x1080PostMalone2023RegionalToyotaAmphitheatre0815-31411396-376c-4ba0-ae79-ce88c2f7408e.jpg" width={300}/>
            {editingListDescription ? (
            <ClickAwayListener onClickAway={handleUpdateListDescription}>
              <Input
                autoFocus
                defaultValue={description}
                className="grow flex-wrap"
                placeholder="Enter a description for this playlist..."
                sx={{ fontSize: "2rem" }}
                inputRef={inputListDescriptionRef}
              />
            </ClickAwayListener>
            ) : (
            <button
              onClick={() => setEditingListDescription(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start" variant="h4">
                {description}
              </Typography>
            </button>
            )}     
        </div> 
        <div className="flex gap-4">
          <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
            className="w-60"
            >
            <AddIcon className="mr-2" />
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => setDeleteCard(!deleteCard)}
            className="w-60"
            >
            <AddIcon className="mr-2" />
            delete
          </Button>
        </div>
        <CardDialog
          variant="new"
          open={openNewCardDialog}
          onClose={() => setOpenNewCardDialog(false)}
          listId={listId}
        />
        <div className="flex gap-10 items-center">
          <span className="inline-block w-1/4">Song</span>
          <span className="inline-block w-1/4">Singer</span>
          <span className="inline-block w-1/4">URL</span>
          <span className="inline-block w-1/4">Link</span>
        </div>
        {/* <Typography className="text-start">Song Singer URL </Typography>  */}
      </DialogTitle>
      <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
      <div className="flex flex-col gap-4 mb-10">
          {cards.map((card) => (
            <Card key={card.id} {...card} deleteCard={deleteCard}/>
          ))}
      </div>
      {/* <div>
        <SongTable/>
      </div> */}
    </Dialog>
  );
}
