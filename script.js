fetch('Flashcards.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('flashcard-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playAudioBtn = document.getElementById('playAudioBtn');

    let currentIndex = 0;
    let currentAudio = null;

    function showCard(index) {
      container.innerHTML = ''; // clear old card

      // create card elements
      const card = document.createElement('div');
      card.classList.add('flashcard');

      const img = document.createElement('img');
      img.src = data[index].image;
      img.alt = data[index].text;

      const text = document.createElement('p');
      text.textContent = data[index].text;

      card.appendChild(img);
      card.appendChild(text);
      container.appendChild(card);

      // stop previous audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // play audio automatically
      currentAudio = new Audio(data[index].audio);
      currentAudio.play().catch(err => {
        console.warn('Audio auto-play blocked (user gesture required):', err);
      });
    }

    // play audio manually
    playAudioBtn.addEventListener('click', () => {
      if (currentAudio) {
        currentAudio.currentTime = 0;
        currentAudio.play();
      }
    });

    // next/prev buttons
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % data.length;
      showCard(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + data.length) % data.length;
      showCard(currentIndex);
    });

    // show first card
    showCard(currentIndex);
  })
  .catch(error => console.error('Error loading flashcards:', error));
