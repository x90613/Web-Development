import { useState } from "react";

import { Paper } from "@mui/material";

import CardDialog from "./CardDialog";

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
        <Paper className="flex w-full  p-2 gap-10" elevation={6}>
          {title + ` / ` }
          {singer + ` / `}
          {url + ' / '}
          <a href={`${url}`} target="_blank">link</a>
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
