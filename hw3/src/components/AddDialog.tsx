"use client";

import { useEffect, useRef, useState } from "react";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import TweetInput from "./TweetInput";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      //   // 點擊對話框以外的區域，關閉對話框
      //   setDialogOpen(false);
      // }
    }

    if (dialogOpen) {
      // 監聽點擊事件以偵測是否點擊對話框以外的區域
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      // 卸載時停止監聽
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dialogOpen]);


  return (
    <div className="flex h-screen w-full">
      <Button
        onClick={() => setDialogOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl"   style={{ width: '30%', marginLeft: 'auto' }}
      >
        新增
      </Button>
      <div ref={dialogRef}>
        <Dialog open={dialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                  <TweetInput/>
              <DialogFooter>
                <Button onClick={() => setDialogOpen(false)}>x</Button>
              </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
