document.addEventListener('DOMContentLoaded', () => {
    // 1. Wave Animation Logic for Title
    const titleElement = document.getElementById('wave-title');
    // Read text, converting <br> and newlines into spaces
    const titleText = titleElement.innerText.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
    // Clear the original text
    titleElement.innerHTML = '';
    
    // Split into words, then span each character
    const words = titleText.split(' ');
    let globalIndex = 0;
    
    words.forEach((word) => {
        const wordWrap = document.createElement('div');
        wordWrap.className = 'wave-word';
        
        word.split('').forEach((char) => {
            const span = document.createElement('span');
            span.innerText = char;
            span.style.animationDelay = `${globalIndex * 0.05}s`;
            wordWrap.appendChild(span);
            globalIndex++;
        });
        
        titleElement.appendChild(wordWrap);
    });
    
    // 2. Countdown Timer Logic
    // Target date: March 25, 2026, 02:30 PM (14:30:00) local time
    const targetDate = new Date('2026-03-25T14:30:00').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance <= 0) {
            // Event has started or passed
            clearInterval(timerInterval);
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            
            const countdownTitle = document.querySelector('.countdown-container h2');
            countdownTitle.innerText = "Event Has Started!";
            countdownTitle.style.color = 'var(--accent-1)';
            return;
        }
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update DOM with zero padding if needed
        daysEl.innerText = days < 10 ? `0${days}` : days;
        hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
        minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
    }
    
    // Initial call
    updateCountdown();
    // Update every second
    const timerInterval = setInterval(updateCountdown, 1000);
});
