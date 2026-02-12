 /* Handles users, admin, auth session, and plans using sessionStorage/localStorage*/

const DEFAULT_ADMIN = {
  name: "Admin",
  email: "admin@cybershield.com",
  password: "admin123",
  role: "admin",
};

export const initAdmin = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const adminExists = users.some((u) => u.role === "admin");
  if (!adminExists) {
    users.push(DEFAULT_ADMIN);
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("currentUser"));
};

export const setCurrentUser = (user) => {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
  sessionStorage.setItem("isLoggedIn", "true");
};

export const logoutUser = () => {
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("isLoggedIn");
};

export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const setAllUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const updateUserInList = (updatedUser) => {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.email === updatedUser.email);
  if (index !== -1) {
    users[index] = updatedUser;
    setAllUsers(users);
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "admin";
};

export const isUser = () => {
  const user = getCurrentUser();
  return user?.role === "user";
};

export const isPremiumUser = () => {
  const user = getCurrentUser();
  return user?.plan?.name === "Premium";
};
