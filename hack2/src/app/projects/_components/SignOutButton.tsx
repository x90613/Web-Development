// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file
"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { publicEnv } from "@/lib/env/public";

// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file

// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file

export default function SignOutButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    if (!session) return;
    signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
    router.push("/");
  };
  return (
    <Button
      data-testid="sign-out-button"
      variant={"outline"}
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
// TODO: 4. end
