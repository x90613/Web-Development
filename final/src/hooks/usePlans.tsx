"use client";

import {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from "react";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

type PlanContextType = {
  plan;
  fetchPlan;
  deletePlan;
  addPlan;
};

const planContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const currentTravelId = useParams().travelId;
  const router = useRouter();

  const fetchPlan = useCallback(async () => {
    const res = await fetch(`/api/plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setPlan(data.plan);
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchPlan();
  }, [userId, fetchPlan]); // Why do we need to add fetchPlan here?

  const deletePlan = async (pid: string) => {
    const needToRedirect = currentTravelId === pid;
    const res = await fetch(`/api/plans/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    await fetchPlan();
    // if current Plan is deleted, redirect to home page
    if (needToRedirect) {
      router.push("/plans");
    }
  };

  const addPlan = async (title: string, description: string) => {
    const res = await fetch(`/api/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    await fetchPlan();
    return data;
  };

  return (
    <planContext.Provider
      value={{
        plan,
        fetchPlan,
        deletePlan,
        addPlan,
      }}
    >
      {children}
    </planContext.Provider>
  );
}

export default function usePlan() {
  const context = useContext(planContext);
  if (context) {
    throw new Error("usePlan must be used within PlanProvider");
  }
}
