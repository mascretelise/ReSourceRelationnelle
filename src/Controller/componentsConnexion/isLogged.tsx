const emailUserByToken = async () => {
  try {
    const resEmail = await fetch(`http://localhost:3000/api/user/emailByToken`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
      const {email}  = await resEmail.json();
    console.log("email by la fonction", email)
    return email
  }
    catch(err) {
      console.error("Erreur lors de la récupération du statut :", err);
    }
}
  

export {emailUserByToken}
