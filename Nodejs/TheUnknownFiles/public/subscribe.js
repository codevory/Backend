const inputField = document.getElementById("email-input");

document.getElementById("sub-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("./sub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputField.value }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    formMessageText.textContent = `Serious ghouls! Please try again.`;
    console.error("Error:", error);
  }
});
