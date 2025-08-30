let startTime = 0, elapsed = 0, timerInterval, lastLapTime = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("laps");

function format(ms) {
  const msPart = ms % 1000;
  const totalSec = Math.floor(ms / 1000);
  const sec = totalSec % 60;
  const mins = Math.floor(totalSec / 60) % 60;
  const hrs = Math.floor(totalSec / 3600);
  return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}.${msPart.toString().padStart(3,'0')}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsed = now - startTime;
  display.textContent = format(elapsed);
}

startBtn.onclick = () => {
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(updateDisplay, 10);
  startBtn.disabled = true; pauseBtn.disabled = false;
  lapBtn.disabled = false; resetBtn.disabled = false;
};

pauseBtn.onclick = () => {
  clearInterval(timerInterval);
  startBtn.disabled = false; pauseBtn.disabled = true;
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  elapsed = 0; lastLapTime = 0;
  display.textContent = "00:00:00.000";
  lapsList.innerHTML = "";
  startBtn.disabled = false; pauseBtn.disabled = lapBtn.disabled = resetBtn.disabled = true;
};

lapBtn.onclick = () => {
  const lapTime = elapsed - lastLapTime;
  lastLapTime = elapsed;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapsList.children.length + 1}: ${format(lapTime)}`;
  lapsList.prepend(li);
};
