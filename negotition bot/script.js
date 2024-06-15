const chatbotOutput = document.querySelector('.chatbot-output');
const chatbotInput = document.querySelector('.chatbot-input input');
let interactionCount = 0;
let productPrice = 0;
let basePrice = 0;

function sendMessageToChatbot() {
    const message = chatbotInput.value;
    const userMessage = document.createElement('p');
    userMessage.textContent = `You: ${message}`;
    chatbotOutput.appendChild(userMessage);

    if (interactionCount === 0) {
        productPrice = parseFloat(message);
        basePrice = productPrice * 0.95;
        const chatbotMessage = document.createElement('p');
        chatbotMessage.textContent = `Chatbot: The base price of the product is ${basePrice.toFixed(2)}. What price would you like to offer?`;
        chatbotOutput.appendChild(chatbotMessage);
    } else if (interactionCount < 20) {
        const offerPrice = parseFloat(message);
        let chatbotMessage;
        if (offerPrice >= productPrice * 0.9) {
            chatbotMessage = document.createElement('p');
            chatbotMessage.textContent = `Chatbot: Great! We have a deal at ${offerPrice.toFixed(2)}. Thank you for your business!`;
            chatbotOutput.appendChild(chatbotMessage);
            chatbotInput.disabled = true;
        } else if (offerPrice <= productPrice * 0.85) {
            const minimumPrice = productPrice * 0.9;
            chatbotMessage = document.createElement('p');
            chatbotMessage.textContent = `Chatbot: I'm sorry, that offer is too low. Please offer a price that is greater than or equal to ${minimumPrice.toFixed(2)}.`;
            chatbotOutput.appendChild(chatbotMessage);
        } else if (offerPrice > productPrice * 0.8) {
            const minimumPrice2 = productPrice*0.85;  
            chatbotMessage = document.createElement('p');
            chatbotMessage.textContent = `Chatbot: I see that you are interested in this product. How about we settle on ${minimumPrice2.toFixed(2)} of the product price?`;
            chatbotOutput.appendChild(chatbotMessage);
        } else if (offerPrice >= basePrice) {
            chatbotMessage = document.createElement('p');
            chatbotMessage.textContent = `Chatbot: Thank you for your offer. How about we settle on the base price of ${basePrice.toFixed(2)}?`;
            chatbotOutput.appendChild(chatbotMessage);
        } else {
            chatbotMessage = document.createElement('p');
            chatbotMessage.textContent = `Chatbot: I'm sorry, that offer is too low. Please offer a price that is greater than or equal to the base price of ${basePrice.toFixed(2)}.`;
            chatbotOutput.appendChild(chatbotMessage);
        }
    } else {
        const chatbotMessage = document.createElement('p');
        chatbotMessage.textContent = `Chatbot: I'm sorry, we have exceeded the maximum number of interactions. Please start a new negotiation if you are still interested in the product. Thank you!`;
        chatbotOutput.appendChild(chatbotMessage);
        chatbotInput.disabled = true;
    }

    chatbotInput.value = '';
    interactionCount++;
}

chatbotInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        sendMessageToChatbot();
    }
});
