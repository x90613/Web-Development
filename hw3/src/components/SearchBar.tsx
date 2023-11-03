"use client";
import useUserInfo from '@/hooks/useUserInfo';
//import type { TweetProps } from  "@/components/Tweet";
import { useRouter } from 'next/navigation'
import { useRef } from 'react';
import { ClickAwayListener, Divider, Input } from "@mui/material";
  
  export default function SearchBar() {
    const { username, handle } = useUserInfo();
    const searchString = useRef<HTMLInputElement>(null);
    const router = useRouter();

    function search(){
        if (!searchString.current) return;
        if (searchString.current.value ===""){
          router.push(`?username=${username}&handle=${handle}&search=`); 
          return;
        }
        router.push(`?username=${username}&handle=${handle}&search=${searchString.current.value}`); 
    }

    const handleKeyPress = (event:any) => {
        if (event.key === 'Enter') {
          search();
        }
    }

  return(
    <div className="">
        <div className="flex items-center justify-center">
            <Input
                defaultValue={""}
                className="grow"
                placeholder="SearchBar"
                sx={{ fontSize: "2rem" }}
                inputRef={searchString}
                onKeyPress={handleKeyPress}
            />
        </div>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl"   style={{ width: '15%', marginLeft: 'auto' }}
            onClick={() => search123()}>
        </button> */}
    </div>
  );
}