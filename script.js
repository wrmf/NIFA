// Update the fetch URL in script.js
fetch('http://127.0.0.1:1337/random-question')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(questionData => {
    console.log(questionData); // Debugging: Log the received data

    // Hypothetical example: Update the DOM with the received data
    // Assuming you have an element with the ID 'aircraftData' in your HTML
    const aircraftElement = document.getElementById('aircraftData');
    if (aircraftElement) {
      aircraftElement.textContent = JSON.stringify(questionData); // Update the element with the data
    }
  })
  .catch(error => console.error('Error fetching question data:', error));