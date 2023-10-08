import { useState } from "react";

import { Paper } from "@mui/material";

import CardDialog from "./CardDialog";

export type CardProps = {
  id: string;
  title: string;
  description: string;
  singer: string;
  url: string;
  listId: string;
};

export default function Card({ id, title, description, singer, url, listId }: CardProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="flex w-full  p-2 gap-10" elevation={6}>
          {title + ` / ` }
          {description + ` / `}
          <a href="https://www.youtube.com/watch?v=GL2EVwuwBdA&list=PLOAQYZPRn2V4jYwTGKUH4YaU6NE6VROZX&index=19" target="_blank">link</a>
        </Paper>
      </button>
      <CardDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        singer={singer}
        url={url}
        listId={listId}
        cardId={id}
      />
    </>
  );
}
