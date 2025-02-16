document.addEventListener('DOMContentLoaded', () => {
    const prizeDisplay = document.getElementById('prizeDisplay');
    const prizeName = document.getElementById('prizeName');
    const spinArea = document.getElementById('spinArea');
    const startButton = document.getElementById('startButton');
    const modeSelection = document.getElementsByName('mode');
    const rangeField = document.getElementById('rangeField');
    const prizeListInput = document.getElementById('prizeList');
    const currentPrizeListInput = document.getElementById('currentPrizeList');
    const drumRoll = document.getElementById('drumRoll');
    const prizeInputContainer = document.getElementById('prizeInput');
    const slotInputContainer = document.getElementById('slotInput');

    let interval;
    let mode = "roulette";
    let isSpinning = false;
    let currentPrizeIndex = 0;

    modeSelection.forEach(radio => {
        radio.addEventListener('change', () => {
            mode = radio.value;
            if (mode === "roulette") {
                prizeInputContainer.classList.remove('hidden');
                slotInputContainer.classList.add('hidden');
                prizeDisplay.classList.add('hidden');
            } else if (mode === "slot") {
                prizeInputContainer.classList.add('hidden');
                slotInputContainer.classList.remove('hidden');
                prizeDisplay.classList.remove('hidden');
            }
        });
    });

    startButton.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        spinArea.textContent = '--';

        drumRoll.play();

        if (mode === 'roulette') {
            const prizes = parsePrizes(prizeListInput.value);
            interval = setInterval(() => {
                spinArea.textContent = prizes[Math.floor(Math.random() * prizes.length)];
            }, 100);
        } else if (mode === 'slot') {
            const ranges = parseRanges(rangeField.value);
            const prizes = parsePrizes(currentPrizeListInput.value);

            interval = setInterval(() => {
                spinArea.textContent = ranges[Math.floor(Math.random() * ranges.length)];
            }, 100);

            prizeName.textContent = prizes[currentPrizeIndex];
            currentPrizeIndex = (currentPrizeIndex + 1) % prizes.length;
        }

        setTimeout(stopSpin, 2650);
    });

    function stopSpin() {
        if (!isSpinning) return;
        clearInterval(interval);
        drumRoll.pause();
        drumRoll.currentTime = 0;
        isSpinning = false;
    }

    function parsePrizes(input) {
        return input.split(',').map(item => item.trim()).filter(item => item);
    }

    function parseRanges(input) {
        const ranges = [];
        input.split(',').forEach(part => {
            const [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) {
                ranges.push(i);
            }
        });
        return ranges;
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(error => console.error('Service Worker registration failed:', error));
}
