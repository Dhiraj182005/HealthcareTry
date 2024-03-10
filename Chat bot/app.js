const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  messages.innerHTML += `<div class="message user-message">
    <img src="C:/Users/Dhiraj/OneDrive/Desktop/MEGA PROJECT/user.jpg"> <span>${message}</span>
  </div>`;

  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: `act as a you are a medicine professional so Give Medicine Information in simple words as anyone can understand it and in points  and new points on new line like Uses, Side effects and Precautions and if it is not a medicine name say "Enter Medicine Name" here is the medicine name enter by the user = ${message}. and "Uses, Side effect, Precautions" in new line and bold`,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const chatbotResponse = response.data.choices[0].text;

  // Format medicine information into paragraphs
  const paragraphs = chatbotResponse.split('\n');
  const formattedParagraphs = paragraphs.filter(paragraph => paragraph.trim() !== '');

  // Display the formatted paragraphs
  formattedParagraphs.forEach(paragraph => {
    messages.innerHTML += `<div class="message bot-message">
      <p>${paragraph}</p>
    </div>`;
  });

  
}