fetch('http://127.0.0.1:1337/random-question')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(questionData => {
    console.log(questionData);

    const aircraftElement = document.getElementById('aircraftData');
    if (aircraftElement) {
      aircraftElement.textContent = JSON.stringify(questionData);
    }
  })
  .catch(error => console.error('Error fetching question data:', error));