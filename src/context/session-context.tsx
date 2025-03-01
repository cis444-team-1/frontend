import { createContext, useEffect, useState } from "react";
import supabase from "../supabase";
import { Session } from "@supabase/supabase-js";

export const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

type Props = { children: React.ReactNode };

export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return (
    <SessionContext.Provider value={{ session }}>
      {isLoading ? <div>Loading supabase</div> : children}
    </SessionContext.Provider>
  );
};
