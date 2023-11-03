"use client";

import { useState } from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import TweetInput from "./TweetInput";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleFlag = ()=>{
    setTimeout(()=>setFlag(true),50);
  }

  const handleClickAway = ()=>{
    if(flag){
      setDialogOpen(false)
    }
    setFlag(false)
  }

  return (
    <div className="flex w-full">
      <Button
        onClick={() => {
          setDialogOpen(true)
          handleFlag()
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl"   style={{ width: '15%', marginLeft: 'auto' }}
      >
        新增
      </Button>

        <div>
          <Dialog open={dialogOpen}>
          <ClickAwayListener onClickAway={handleClickAway}>
              <DialogContent className="sm:max-w-[425px]">
                    <TweetInput/>
                {/* <DialogFooter>
                  <Button onClick={() => setDialogOpen(false)}>x</Button>
                </DialogFooter> */}
              </DialogContent>
          </ClickAwayListener>
          </Dialog>
      </div>
    </div>
  );
}
