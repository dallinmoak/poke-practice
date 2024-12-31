const authHeader = () => {
  return { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}` };
}

export { authHeader };