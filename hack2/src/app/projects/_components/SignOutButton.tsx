// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      // 調用 signOut 函數進行登出
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      // 處理登出過程中的錯誤
    }
  };
  return <Button variant={"outline"} onClick={handleSignOut}>Sign Out</Button>;
}
// TODO: 4. end
