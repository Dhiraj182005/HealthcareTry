const medicineDatabase = [
    { id: 1, name: 'Aspirin', uses: 'Pain relief, fever reduction', sideEffects: 'Upset stomach', precautions: 'Avoid on an empty stomach' },
    { id: 2, name: 'Ibuprofen', uses: 'Pain relief, inflammation reduction', sideEffects: 'Nausea, headache', precautions: 'Take with food' },
    { id: 3, name: 'Acetaminophen', uses: 'Pain relief, fever reduction', sideEffects: 'Liver damage (if abused)', precautions: 'Do not exceed recommended dosage' },
    { id: 4, name: 'Amoxicillin', uses: 'Antibiotic for bacterial infections', sideEffects: 'Diarrhea, rash', precautions: 'Take as prescribed' },
    { id: 5, name: 'Ciprofloxacin', uses: 'Antibiotic for various infections', sideEffects: 'Tendon rupture, stomach upset', precautions: 'Avoid dairy products' },
    { id: 6, name: 'Paracetamol', uses: 'Pain relief, fever reduction', sideEffects: 'Liver damage (to much consumption)', precautions: 'Consult a healthcare provider if you have liver or kidney issues' },
    { id: 7, name: 'Indopar', uses: 'Pain relief', sideEffects: 'Dizziness, Headache', precautions: 'If pregnant, planning pregnancy, or breastfeeding, consult your healthcare provider ' },
    { id: 8, name: 'Statins', uses: 'Prescribed for managing cholesterol levels', sideEffects: ' muscle pain or weakness', precautions: 'Regular monitoring of liver function is advised ' },
    { id: 9, name: 'Anti-hypertensives', uses: 'Medications to control high blood pressure', sideEffects: '  dizziness, fatigue, weakness', precautions: 'Regular monitoring blood pressure and kidney function and potassium levels' },
    { id: 10, name: 'Vicks Action 500', uses: 'reducing fever and relieving pain', sideEffects: '  Nausea or Upset Stomach', precautions: 'Avoid Alcohol and Underlying Health Conditions' },
    { id: 11, name: 'Antacids', uses: 'For the relief of acidity and heartburn.', sideEffects: '  constipation or diarrhea, depending on the specific formulation', precautions: 'Avoid long-term use without medical supervision' },
    { id: 12, name: 'Probiotics', uses: ' Promote gut health and balance of intestinal bacteria .', sideEffects: ' May cause mild gastrointestinal symptoms like gas or bloating', precautions: 'Start with a low dose to minimize potential side effects.' },
    { id: 13, name: 'Multivitamins', uses: ' Provide a combination of essential vitamins and minerals. .', sideEffects: ' May cause mild gastrointestinal discomfort, nausea, or allergic reactions in some individuals.', precautions: 'Be cautious with high doses of fat-soluble vitamins..' },
    { id: 14, name: 'Amoxicillin', uses: ' Antibiotic for bacterial infections .', sideEffects: ' vomiting, diarrhea, and skin rash.', precautions: 'Take the full course of medication as prescribed, even if symptoms improve before completion.' },
    { id: 15, name: 'Escitalopram', uses: ' SSRI for depression and anxiety .', sideEffects: '  nausea, insomnia, drowsiness', precautions: 'Monitor for changes in mood or behavior, especially in the early stages of treatment.' },
    {id: 16, name: 'Aspirin', uses: 'Pain relief, fever reduction', sideEffects: 'Upset stomach', precautions: 'Avoid on an empty stomach'},
    {id: 17, name: 'Ibuprofen', uses: 'Pain relief, inflammation reduction', sideEffects: 'Stomach upset, headache', precautions: 'Take with food or milk'},
    {id: 18, name: 'Paracetamol (Acetaminophen)', uses: 'Fever reduction, mild pain relief', sideEffects: 'Rare liver damage in high doses', precautions: 'Do not exceed recommended dosage'},
    {id: 19, name: 'Omeprazole', uses: 'Acid reflux, stomach ulcers', sideEffects: 'Nausea, headache', precautions: 'Inform your doctor of any other medications'},
    {id: 20, name: 'Simvastatin', uses: 'Cholesterol reduction', sideEffects: 'Muscle pain, weakness', precautions: 'Avoid grapefruit and alcohol consumption'},
    {id: 21, name: 'Diphenhydramine', uses: 'Allergy relief, sleep aid', sideEffects: 'Drowsiness, dry mouth', precautions: 'Avoid alcohol and driving'},
    {id: 22, name: 'Ciprofloxacin', uses: 'Antibiotic for infections', sideEffects: 'Nausea, diarrhea', precautions: 'Take with plenty of water'},
    {id: 23, name: 'Albuterol', uses: 'Asthma relief, bronchodilation', sideEffects: 'Tremors, increased heart rate', precautions: 'Use a spacer for inhalation'},
    {id: 24, name: 'Metformin', uses: 'Type 2 diabetes management', sideEffects: 'GI upset, lactic acidosis', precautions: 'Monitor kidney function'},
    {id: 25, name: 'Sertraline', uses: 'Antidepressant, anxiety', sideEffects: 'Insomnia, nausea', precautions: 'Gradual dose adjustments'},
    {id: 26, name: 'Hydrochlorothiazide', uses: 'Hypertension, edema', sideEffects: 'Electrolyte imbalance', precautions: 'Monitor potassium levels'},
    {id: 27, name: 'Warfarin', uses: 'Anticoagulant', sideEffects: 'Bleeding', precautions: 'Regular INR monitoring'},

];

const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')


function searchMedicine() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const searchResultsSection = document.getElementById('searchResults');
    const medicineDetailsSection = document.getElementById('medicineDetails');
    const errorMessage = document.getElementById('searchErrorMessage');

    // Clear previous results and error message
    searchResultsSection.innerHTML = '';
    medicineDetailsSection.innerHTML = '';
    errorMessage.style.display = 'none';

    if (searchInput === '') {
        errorMessage.style.display = 'block';
    } else {
        // Filter medicines based on similar spellings
        const results = medicineDatabase.filter(medicine => isSimilarSpelling(searchInput, medicine.name.toLowerCase()));

        if (results.length > 0) {
            // Display search results
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.textContent = result.name;
                resultItem.addEventListener('click', () => displayMedicineDetails(result));

                searchResultsSection.appendChild(resultItem);
            });
        } else {
            searchResultsSection.innerHTML = '<p>No results found.</p>';
        }
    }
}

// Function to check if the input has a similar spelling to the medicine name
function isSimilarSpelling(input, medicineName) {
    // You can implement a more sophisticated algorithm for similarity checking
    // For simplicity, let's consider it a match if the input is a substring of the medicine name
    return medicineName.includes(input);
}


function displayMedicineDetails(selectedMedicine) {
    const medicineDetailsSection = document.getElementById('medicineDetails');
    medicineDetailsSection.innerHTML = '';

    const detailsHeading = document.createElement('h2');
    detailsHeading.textContent = selectedMedicine.name;

    const usesParagraph = document.createElement('p');
    usesParagraph.innerHTML = `<span class="highlight">Uses:</span> ${selectedMedicine.uses}`;

    const sideEffectsParagraph = document.createElement('p');
    sideEffectsParagraph.innerHTML = `<span class="highlight">Side Effects:</span> ${selectedMedicine.sideEffects}`;

    const precautionsParagraph = document.createElement('p');
    precautionsParagraph.innerHTML = `<span class="highlight">Precautions:</span> ${selectedMedicine.precautions}`;

    medicineDetailsSection.appendChild(detailsHeading);
    medicineDetailsSection.appendChild(usesParagraph);
    medicineDetailsSection.appendChild(sideEffectsParagraph);
    medicineDetailsSection.appendChild(precautionsParagraph);

    // Display medicine details section
    medicineDetailsSection.style.display = 'block';
}

// Function to convert text to speech
function speakText() {
    const selectedMedicine = getCurrentSelectedMedicine();

    if (selectedMedicine) {
        const textToSpeech = new SpeechSynthesisUtterance();
        textToSpeech.text = `${selectedMedicine.name}. Uses: ${selectedMedicine.uses}. Side Effects: ${selectedMedicine.sideEffects}. Precautions: ${selectedMedicine.precautions}`;
        window.speechSynthesis.speak(textToSpeech);
    }
}

// New function to get the currently selected medicine
function getCurrentSelectedMedicine() {
    const lastDisplayedMedicine = document.getElementById('medicineDetails').querySelector('h2');
    return medicineDatabase.find(medicine => medicine.name === lastDisplayedMedicine.textContent);
}


// Your existing code for medicine information

// Function to show medicine information section
function showMedicineInformation() {
    document.getElementById('medicineSection').style.display = 'block';
    document.getElementById('healthAssistantSection').style.display = 'none';
}

// Function to show health assistant section
function showHealthAssistant() {
    document.getElementById('medicineSection').style.display = 'none';
    document.getElementById('healthAssistantSection').style.display = 'block';
}


// Your existing code for medicine information

// Function to show medicine information section
// Your existing code for medicine information

// Function to show medicine information section
function showMedicineInformation() {
    document.getElementById('medicineSection').style.display = 'block';
    document.getElementById('healthAssistantSection').style.display = 'none';
}

// Function to show health assistant section
function showHealthAssistant() {
    document.getElementById('medicineSection').style.display = 'none';
    document.getElementById('healthAssistantSection').style.display = 'block';
}

// Function to handle health issues and provide homemade tips
function handleHealthIssue(issue) {
    // Define some simple homemade tips based on health issues
    const healthTips = {
        fever: "Rest, stay hydrated, and take over-the-counter fever reducers like acetaminophen.",
        headache: "Ensure you are well-hydrated, manage stress, and take breaks if working on a computer for an extended period.",
        cough: "Stay hydrated, use honey and warm water, and consider over-the-counter cough medicines.",
        stomachache:" Try ginger tea or chew fresh ginger,Drink water, herbal teas, or clear broths,Placing a warm compress on your stomach may help ease discomfort.",
        Bodypain:"Soak in a warm bath with Epsom salt,Do light stretching or gentle exercises, Consider acetaminophen or ibuprofen",
        Dryskin:"Apply a good-quality moisturizer to your skin,Drink plenty of water to keep your body and skin hydrated",
        Vomit:"Sip on clear fluids like water, electrolyte drinks, or ginger tea to prevent dehydration,Stay away from strong smells  as they may trigger nausea, Rest",
        Anxiety:"Practice deep, slow breaths to help calm your nervous system,Reduce your intake of caffeine, which can contribute to feelings of anxiety,Practice mindfulness techniques or meditation to focus your mind and promote relaxation.",
        Cold:"Allow your body to rest and recover, Inhale steam to ease nasal congestion. You can use a bowl of hot water or take a hot shower, Inhale steam to ease nasal congestion. You can use a bowl of hot water or take a hot shower.",
        BodyWeakness:"Consume a well-balanced diet rich in fruits, vegetables, lean proteins, and whole grains to provide essential nutrients.,Take a full Rest,Engage in gentle exercises like walking or stretching",
        Dizziness:"Move slowly and avoid sudden changes in position to prevent dizziness,Ginger may help alleviate dizziness, deep breathing exercises,Take full rest",
    };

    // Convert the user input to lowercase for case-insensitive matching
    const lowercaseIssue = issue.toLowerCase();

    // Check if the issue is recognized and provide tips
    if (healthTips[lowercaseIssue]) {
        return healthTips[lowercaseIssue];
    } else {
        return "I'm sorry, I don't have specific tips for that issue. Please consult with a healthcare professional.";
    }
}

// Function to handle user input in the Health Assistant section
function handleHealthAssistantInput() {
    const userInput = prompt("Describe your health issue:");

    if (userInput) {
        const healthTips = handleHealthIssue(userInput);
        alert(healthTips);
    }
}

// Function to send user message in the chat
function sendUserMessage() {
    const userInput = document.getElementById('userInput').value;
    
    if (userInput) {
        displayMessage('user', userInput);
        const healthTips = handleHealthIssue(userInput);
        displayMessage('assistant', healthTips);
        // You can extend this to handle the assistant's response based on the user input
    }
}

// Function to display messages in the chat
function displayMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    // Clear previous messages
    chatMessages.innerHTML = '';
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'user' ? 'user-message' : 'assistant-message');
    messageContainer.textContent = message;
    chatMessages.appendChild(messageContainer);
}


// Your existing code for medicine information

// Event listener for the Health Assistant input
document.getElementById('healthAssistantSection').addEventListener('click', showHealthAssistant);




// Function to convert text to speech
function speakText() {
    const selectedMedicine = getCurrentSelectedMedicine();
    const textToSpeech = new SpeechSynthesisUtterance();

    if (selectedMedicine) {
        textToSpeech.text = `${selectedMedicine.name}. Uses: ${selectedMedicine.uses}. Side Effects: ${selectedMedicine.sideEffects}. Precautions: ${selectedMedicine.precautions}`;
        window.speechSynthesis.speak(textToSpeech);
    }
}

// Event listener for the button
document.querySelector("button").addEventListener("click", speakText);

// Add this code at the bottom of your existing JavaScript file

// Function to show feedback section
function showFeedbackSection() {
    document.getElementById('medicineSection').style.display = 'none';
    document.getElementById('healthAssistantSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'block';
}



const feedback=document.querySelector(".feedback");
const emoji=document.querySelector(".emoji");
const textarea=document.querySelector(".textarea");
const btn=document.querySelector(".btn");

emoji.addEventListener('click',(e)=>{

    if(e.target.className.includes('emoji')) return;

    textarea.classList.add('textarea--active');
    btn.classList.add('btn--active');
})

document.querySelector('.container').addEventListener('mouseleave', () => {
    textarea.classList.remove("textarea--active");
    btn.classList.remove('btn--active');
});


// Add an event listener to toggle the visibility of the feedback form
document.getElementById('feedbackButton').addEventListener('click', function() {
    document.querySelector('.feedback').classList.toggle('feedback-active');
});

document.querySelector('.btn').addEventListener('click', function() {
    // Toggle the visibility of the feedback form
    document.querySelector('.feedback').classList.remove('feedback-active');
});

let speaking = false; // Track if speech synthesis is currently active

function toggleSpeaking() {
    if (!speaking) {
        startSpeaking(); // Start speaking
        document.getElementById('speakButton').style.backgroundColor = '#FF0000'; // Change background color to red
    } else {
        stopSpeaking(); // Stop speaking
        document.getElementById('speakButton').style.backgroundColor = '#008CBA'; // Change background color back to default
    }
}


function startSpeaking() {
    const selectedMedicine = getCurrentSelectedMedicine();
    const textToSpeech = new SpeechSynthesisUtterance();

    if (selectedMedicine) {
        textToSpeech.text = `${selectedMedicine.name}. Uses: ${selectedMedicine.uses}. Side Effects: ${selectedMedicine.sideEffects}. Precautions: ${selectedMedicine.precautions}`;
        window.speechSynthesis.speak(textToSpeech);

        // Update button visibility
        document.getElementById('speakButton').innerText = 'Stop Speaking';
        speaking = true;
    }
}

function stopSpeaking() {
    if (speaking) {
        window.speechSynthesis.cancel(); // Stop speech synthesis

        // Update button text
        document.getElementById('speakButton').innerText = 'Speak';
        speaking = false;
    }
}

// ... (Existing code remains unchanged)


