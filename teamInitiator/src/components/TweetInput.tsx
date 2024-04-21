"use client";

import { useRef } from "react";
import GrowingTextarea from "@/components/GrowingTextarea";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'
import useLike from "@/hooks/useLike";

export default function TweetInput() {
  const { username, handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const startareaRef = useRef<HTMLTextAreaElement>(null);
  const endareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();
  const router = useRouter();
  const { likeTweet } = useLike();
  
  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    const startDate = startareaRef.current?.value;
    const endDate = endareaRef.current?.value;
    if (!content) return;
    if (!handle) return;
    if (!startDate) return;
    if (!endDate) return;
    
    try {
      const body = await postTweet({
        handle,
        content,
        startDate,
        endDate,
      });
      textareaRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );

      // like it and then go to new tweet!!!
      await likeTweet({
        tweetId: body,
        userHandle: handle,
      });
      router.push(`tweet/${body}?username=${username}&handle=${handle}`);     
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
  };

  function isExistDate(dateStr:string) {
    const dateTime = dateStr.split(' ');
    const theHour = parseInt(dateTime[1]);
    if(theHour < 0 || theHour > 24)return false;
    const dateObj = dateTime[0].split('-'); // yyyy/mm/dd
  
    //列出12個月，每月最大日期限制
    const limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    const theYear = parseInt(dateObj[0]);
    const theMonth = parseInt(dateObj[1]);
    const theDay = parseInt(dateObj[2]);
    const isLeap = new Date(theYear, 1, 29).getDate() === 29; // 是否為閏年?
  
    if (isLeap) {
      // 若為閏年，最大日期限制改為 29
      limitInMonth[1] = 29;
    }
    if(theMonth < 0 || theMonth > 12)return false;
  
    // 比對該日是否超過每個月份最大日期限制
    return theDay <= limitInMonth[theMonth - 1];
  }
  const handleChange = () => {
    // 獲取 <textarea> 的值
    const content = textareaRef.current?.value;
    
    if (!content){
      // 如果輸入不符合格式，可以執行相應的處理，例如提示用戶
      alert('請輸入活動標題');
      return
    }

    const start = startareaRef.current?.value || '';
    const end = endareaRef.current?.value || '';

    // 使用正則表達式來驗證輸入格式
    const regex = /^(\d{4}-\d{2}-\d{2} \d{2})$/;
    if (!regex.test(start) || !regex.test(end)) {
      // 如果輸入不符合格式，可以執行相應的處理，例如提示用戶
      alert('請輸入有效的日期時間格式：yyyy-mm-dd hh');
      return
    }

    if(!isExistDate(start) || !isExistDate(end)){
      // 如果輸入不符合格式，可以執行相應的處理，例如提示用戶
      alert('必須是真實可能出現的時間');
      return
    }
    const startvar = new Date(start.split(' ')[0]);
    const endvar = new Date(end.split(' ')[0]);


    console.log('startvar:' + startvar);
    console.log('endvar:' + endvar);

    if (startvar < endvar) {
      console.log('correct')
    } else if(startvar.getTime() == endvar.getTime()){
      console.log('startvar == endvar')
      const startH =  parseInt(start.split(' ')[1]);
      const endH =  parseInt(end.split(' ')[1]);

      if(startH > endH){
        alert('開始時間早於結束時間');
        return
      }
    } else{
      alert('開始日期早於結束日期');
      return
    }

    handleTweet();
  };


  return (
    <div className="flex gap-4">
      {/* <UserAvatar className="h-12 w-12" /> */}
      <div className="flex w-full flex-col px-2">
        {/* <button className="flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold text-brand">
          Everyone
          <ChevronDown size={16} className="text-gray-300" />
        </button> */}
        <div className="mb-2 mt-6">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="活動標題"
          />
        </div>
        <div className="mb-2 mt-6">
          From
          <GrowingTextarea
            ref={startareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="yyyy-mm-dd hh"
          />
        </div>
        <div className="mb-2 mt-2">
          to
          <GrowingTextarea
            ref={endareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="yyyy-mm-dd hh"
          />
        </div>
        <Separator />
        <div className="flex justify-end">
          <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={() => {
              handleChange() 
              // handleTweet()     
              }
            }
            disabled={loading}
          >
            新增
          </button>
        </div>
      </div>
    </div>
  );
}
