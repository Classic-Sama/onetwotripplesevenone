
    document.querySelectorAll('.tilt-card').forEach(card => {
    const img = card.querySelector('img');
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;
        img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});
    const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-image');

function openPopup(src) {
  popupImg.src = src;
  popup.style.display = 'flex';
}

function closePopup(e) {
  if (e.target === popup) popup.style.display = 'none';
}

popup.addEventListener('mousemove', e => {
    const rect = popupImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    popupImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

popup.addEventListener('mouseleave', () => {
    popupImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});
async function loadPhrases() {
    const response = await fetch('phrases.json');
    return await response.json();
}

function randomPosition() {
    return {
        top: Math.random() * window.innerHeight + 'px',
        left: Math.random() * window.innerWidth + 'px'
    };
}

function typeLine(text) {
    const span = document.createElement('span');
    span.className = 'typing-line';
    const pos = randomPosition();
    span.style.top = pos.top;
    span.style.left = pos.left;
    document.body.appendChild(span);
    
    let i = 0;
    const interval = setInterval(() => {
        span.textContent += text[i++];
        if (i >= text.length) {
            clearInterval(interval);
            setTimeout(() => span.remove(), 10000);
        }
    }, 50);
}

loadPhrases().then(phrases => {
    setInterval(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        typeLine(randomPhrase);
    }, 3000);
});