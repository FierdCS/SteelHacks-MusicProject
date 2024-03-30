function playSound(note) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Sine wave
    oscillator.frequency.setValueAtTime(getFrequency(note), audioContext.currentTime); // Set frequency
    oscillator.connect(audioContext.destination); // Connect to speakers
    oscillator.start(); // Start oscillator
    setTimeout(() => {
        oscillator.stop(); // Stop oscillator after 0.5 seconds
    }, 500);
}

function getFrequency(note) {
    const notes = {
        'C4': 261.63,
        'D4': 293.66,
        'E4': 329.63,
        'F4': 349.23,
        'G4': 392.00,
        'A4': 440.00,
        'B4': 493.88,
        'C5': 523.25
    };
    return notes[note];
}