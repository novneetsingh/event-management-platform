import toast from "react-hot-toast";

export const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currUserName");
  toast.success("Logged out successfully");
  window.location.href = "/login";
};
