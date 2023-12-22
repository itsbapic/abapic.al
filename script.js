function getRandomSpeed(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array of neon colors
const neonColors = ["#FACE00", "#00C0DE", "#5EEC00", "#EC005E", "#FFFFFF"];
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()~`-=_+[]{};':,.<>/?";
const individualCharacterSpeed = 200; // Speed of each character change
const minSpeed = individualCharacterSpeed * 1/25; // Fastest speed of next char iteration
const maxSpeed = individualCharacterSpeed * 1; // Slowest speed of next char iteration
const numCharactersEffected = 0.25; // Number of characters the effect is applied to at any given time

document.addEventListener('DOMContentLoaded', (event) => {
  const h2 = document.querySelector('h2');
  const text = h2.innerText;
  h2.innerHTML = text.split('').map(char => `<span style="display: inline-block; width: 28px;">${char}</span>`).join('');

  const spans = document.querySelectorAll('h2 span');
  const averageChangingChars = Math.ceil(spans.length * numCharactersEffected);
  let animatingIndices = new Set();

  // Function to start a new character animation
  const startNewCharacterAnimation = () => {
    if (animatingIndices.size < averageChangingChars) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * spans.length);
      } while (animatingIndices.has(randomIndex));

      changeCharacter(randomIndex);
      animatingIndices.add(randomIndex);

      // Remove index from set after animation completes
      setTimeout(() => {
        animatingIndices.delete(randomIndex);
      }, letters.length * getRandomSpeed(minSpeed, maxSpeed));
    }
  };

  const changeCharacter = (index) => {
 
    // Pick a random neon color for highlighting
    const highlightColor = neonColors[Math.floor(Math.random() * neonColors.length)];
    spans[index].style.color = 'black'; // Set text color to black
    spans[index].style.backgroundColor = highlightColor; // Set background to the neon color

    const originalChar = spans[index].innerText;
    let availableIndexes = Array.from({ length: letters.length }, (_, i) => i);

    const charInterval = setInterval(() => {
      if (availableIndexes.length === 0) {
        clearInterval(charInterval);
        spans[index].innerText = originalChar;
        spans[index].style.color = 'white'; // Reset text color to white
        spans[index].style.backgroundColor = 'transparent'; // Remove background highlight

        // Start a new character animation
        startNewCharacterAnimation();
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      const charIndex = availableIndexes.splice(randomIndex, 1)[0];
      spans[index].innerText = letters[charIndex];
    }, getRandomSpeed(minSpeed, maxSpeed)); 
  };

  // Start the initial set of animations
  for (let i = 0; i < averageChangingChars; i++) {
    startNewCharacterAnimation();
  }
});