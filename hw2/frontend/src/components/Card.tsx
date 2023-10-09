import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import CardDialog from "./CardDialog";
import LinkIcon from '@mui/icons-material/Link';
import Checkbox from '@mui/material/Checkbox';
import useCards from "@/hooks/useCards";
import { deleteCard as deleteFunction } from "@/utils/client";

export type CardProps = {
  id: string;
  title: string;
  singer: string;
  url: string;
  listId: string;
  deleteCard: boolean;
};

export default function Card({ id, title, singer, url, listId , deleteCard}: CardProps) {
  const [open, setOpen] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const {fetchCards} = useCards();


  const handleDelete = async () => {
    try {
      await deleteFunction(id);
      fetchCards();
    } catch (error) {
      //alert("Error: Failed to delete card");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() =>{
    if(checkbox === true){
      handleDelete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deleteCard])


  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="flex ml-5 mr-5 p-2 gap-10 items-center" elevation={6}>
          <Checkbox checked={checkbox} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
          onClick={(e) =>  e.stopPropagation()}
          onChange={() => setCheckBox(!checkbox)}></Checkbox>
          <span className="inline-block w-1/4 truncate">{title}</span>
          <span className="inline-block w-1/4 truncate">{singer}</span>
          <span className="inline-block w-1/4 truncate">{url}</span>
          <span className="inline-block w-1/4">
            <a href={`${url}`} target="_blank" rel="noreferrer"><LinkIcon className="mr-2" /></a>
          </span>
        </Paper>
      </button>
      <CardDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        singer={singer}
        url={url}
        listId={listId}
        cardId={id}
      />
    </>
  );
}
