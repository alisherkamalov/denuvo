import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function useAutoLogin() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!error && data.user) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };

    checkUser();
  }, []);

  return { loading, setLoading }; 
}
