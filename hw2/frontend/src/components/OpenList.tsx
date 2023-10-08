import { useState } from "react";

import { Delete as DeleteIcon, Description } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { createCard, deleteCard, updateCard } from "@/utils/client";
import { Divider } from "@mui/material";

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
};


export default function CardDialog(props: OpenListDialogProps) {
  const { open, onClose, listId, title, description} = props;
  

  return (
    <Dialog open={open} >
      <DialogTitle className="flex flex-col gap-2">
        <Typography className="text-start">{title}</Typography>
        <div className="flex gap-2">
            <img src="https://images.radio.com/aiu-media/StaticSocialInstagram1080x1080PostMalone2023RegionalToyotaAmphitheatre0815-31411396-376c-4ba0-ae79-ce88c2f7408e.jpg" width={300}/>
            <Typography className="text-start">{description}</Typography>       
        </div>        
        <Typography className="text-start">Song Singer URL </Typography> 
      </DialogTitle>
      <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
      <DialogContent className="w-[600px]">
        <DialogActions>
          <Button onClick={onClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
