import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CardDialog from "./CardDialog";
import Typography from "@mui/material/Typography";


import { Divider } from "@mui/material";
import Card, { CardProps } from "./Card";
import SongTable from "./SongTable";

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
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  //using listID to get its cards

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
        <Typography className="text-start">{title}</Typography>
        <div className="flex gap-2">
            <img src="https://images.radio.com/aiu-media/StaticSocialInstagram1080x1080PostMalone2023RegionalToyotaAmphitheatre0815-31411396-376c-4ba0-ae79-ce88c2f7408e.jpg" width={300}/>
            <Typography className="text-start">{description}</Typography>       
        </div> 
        <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
            className="w-60"
          >
            <AddIcon className="mr-2" />
            Add
        </Button>

        <CardDialog
          variant="new"
          open={openNewCardDialog}
          onClose={() => setOpenNewCardDialog(false)}
          listId={listId}
        />
        <Typography className="text-start">Song Singer URL </Typography> 
      </DialogTitle>
      <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
      <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
      </div>
      <div>
        <SongTable/>
      </div>


    </Dialog>
  );
}
