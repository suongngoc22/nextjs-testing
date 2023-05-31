import { useAuth } from "@/app/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const Nav = () => {
  const { logoutGoogle, currentUser } = useAuth();
  const navigation = useRouter();
  const pathname = usePathname();
  console.log(currentUser);
  return (
    <nav className="bg-gray-800 mb-10">
      <div className="flex items-center justify-between px-8 h-16 text-sm">
        <div className="flex gap-4">
          <span
            className={`${
              pathname == "/" ? "underline" : ""
            } text-md text-bold text-white cursor-pointer`}
            onClick={() => {
              navigation.push("/");
            }}
          >
            Home
          </span>
          <span
            className={`${
              pathname == "/todo" ? "underline" : ""
            } text-md text-bold text-white cursor-pointer`}
            onClick={() => {
              navigation.push("/todo");
            }}
          >
            Todo
          </span>
          <span
            className={`${
              pathname == "/posts" ? "underline" : ""
            } text-md text-bold text-white cursor-pointer`}
            onClick={() => {
              navigation.push("/posts");
            }}
          >
            Posts
          </span>
          <span
            className={`${
              pathname == "/posts/create-post" ? "underline" : ""
            } text-md text-bold text-white cursor-pointer`}
            onClick={() => {
              navigation.push("/posts/create-post");
            }}
          >
            My Posts
          </span>
        </div>
        <div>
          <span className="text-white">{currentUser?.email}</span>
          <span
            onClick={() => {
              logoutGoogle();
              navigation.push("/login");
            }}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            Logout
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
