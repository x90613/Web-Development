import { useState } from "react";
import { Paper } from "@mui/material";
import CardDialog from "./CardDialog";
import LinkIcon from '@mui/icons-material/Link';

export type CardProps = {
  id: string;
  title: string;
  singer: string;
  url: string;
  listId: string;
};

export default function Card({ id, title, singer, url, listId }: CardProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="flex ml-5 mr-5 p-2 gap-10 items-center" elevation={6}>
          <span className="inline-block w-1/4 truncate">{title}</span>
          <span className="inline-block w-1/4 truncate">{singer}</span>
          <span className="inline-block w-1/4 truncate">{url}</span>
          <span className="inline-block w-1/4">
            <a href={`${url}`} target="_blank"><LinkIcon className="mr-2" /></a>
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
