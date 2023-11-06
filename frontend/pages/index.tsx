import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/signin");
    }
    if (typeof window !== "undefined") {
      const user = JSON.parse(window.localStorage.getItem("user") || "{}");
      setName(user ? user.name : "");

      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      setToday(now.toLocaleDateString(undefined, options));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/signin");
  };

  return (
    <div>
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl"></h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-4">
        <h2 className="text-2xl">Hi, {name}</h2>
        <p>Happy {today}</p>
      </div>
    </div>
  );
};

export default Home;
