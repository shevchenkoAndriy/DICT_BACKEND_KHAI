const refs = {
  chatGpt: document.getElementById("chatgpt"),
  chatGptForm: document.getElementById("chatgpt-form"),
  prompt: document.getElementById("prompt"),
};

refs.chatGptForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const currentPrompt = refs.prompt.value;
  const userPrompt = document.createElement("li");

  userPrompt.textContent = currentPrompt;
  refs.chatGpt.appendChild(userPrompt);
  refs.prompt.value = "";

  const skeleton = document.createElement("li");
  skeleton.textContent = "...typing";
  refs.chatGpt.appendChild(skeleton);

  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    prompt: currentPrompt,
  };

  try {
    const response = await fetch("http://localhost:8080/chat", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const answer = await response.json();

    const answerItem = document.createElement("li");
    answerItem.textContent = answer.content;

    refs.chatGpt.appendChild(answerItem);
  } catch (error) {
    console.error(error);
  } finally {
    refs.chatGpt.removeChild(skeleton);
  }
});
