
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../components/add-product/types";

export const useAuth = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserId(decoded.id);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      router.push("/register");
    }
  }, [router]);

  return { userId };
};
