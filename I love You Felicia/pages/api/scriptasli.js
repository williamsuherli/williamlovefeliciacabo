let currentIndex = 0;
const texts = ['.text1', '.text2', '.text3', '.text4'];

setInterval(function () {
  const currentText = document.querySelector(texts[currentIndex]);
  currentText.classList.remove('show');
  currentIndex = (currentIndex + 1) % texts.length;
  const nextText = document.querySelector(texts[currentIndex]);
  nextText.classList.add('show');
}, 3000);

function showHearts() {
  const container = document.querySelector('.content-container');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  const size = Math.random() * 20 + 10 + 'px';
  heart.style.width = size;
  heart.style.height = size;

  const containerRect = container.getBoundingClientRect();
  const heartX = containerRect.left + containerRect.width / 2 - size / 2;
  heart.style.left = heartX + 'px';
  heart.style.bottom = '40px';

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 3000);

  const loveButton = document.querySelector('.love-button');
  loveButton.classList.add('shake');
  setTimeout(() => {
    loveButton.classList.remove('shake');
  }, 500);
}

const audio = document.getElementById('myAudio');
const playButton = document.querySelector('.play-button');
const repeatButton = document.querySelector('.repeat-button');
const musicDuration = document.querySelector('.music-duration');
const musicProgress = document.getElementById('musicProgress');
const progressBarFill = document.querySelector('.progress-bar-fill');
const lyricsContainer = document.querySelector('.lyrics-container');
const profileImage = document.getElementById('profileImage'); 

let isPlaying = false;
let currentLyricIndex = 0;
let isRepeating = false;

const lyricsData = [
  ["00:16", "00:19", "Lue Bin.. Lue Bin.."],
  ["00:19", "00:22", "Keng koi guek nio e ju khua ju jip sim"],
  ["00:22", "00:23", "Lue bak ciu"],
  ["00:23", "00:26", "Tak pai khua tiok be kong ua wa pien ciu"],
  ["00:26", "00:27", "Lu ce kai sui cabo"],
  ["00:28", "00:32", "Co wae sim kau phak phik phok"],
  ["00:33", "00:36", "Hey, Wa Cai.. Wa Cai"],
  ["00:37", "00:39", "Ta pai wa pun lu, lu kong wa e chui ti"],
  ["00:39", "00:41", "Wa Ai Lu Cai"],
  ["00:41", "00:43", "Wa bo kho leng e kong phien ua baby"],
  ["00:43", "00:49", "Ing wi tatapai wa khua tiok pak kai cabo, wa ai kong"],
  ["00:50", "00:55", "Lu Si Sui Cabo..."],
  ["00:55", "00:59", "Lue sen chai sue kau pu tek liau"],
  ["00:60", "01:02", "Tapi Lu Beh Pi..."],
  ["01:03", "01:08", "Kak Wa e Cabo..."],
  ["01:09", "01:13", "Bin e lai ceng..."],
  ["01:13", "01:18", "Tapi Sim Beh cai tiao lai ua"],
  ["01:18", "01:20", "Bo Piao Ho Khua..."],
  ["01:21", "01:25", "Yau Kin Sim Ai Sui"],
  ["01:26", "01:28", "Heyyy..."],
  ["01:28", "01:30", "Lu e Chui Tun"],
  ["01:30", "01:32", "Ane ang ang lang khua liau gien cim lu"],
  ["01:32", "01:33", "Lu Chio E Tiam Sia"],
  ["01:33", "01:37", "Co wa thiau bu, thiau kau nangkak siau lang"],
  ["01:37", "01:39", "Lu cekai sui Cabo.."],
  ["01:39", "01:43", "Wa tatajit Kong kak lu"],
  ["01:44", "01:49", "Oh lu cai lu cai lu cai lu bo pi yau khi salon"],
  ["01:49", "01:54", "Lu cuma pi yau iong sase se lue tha mo"],
  ["01:54", "01:57", "Oh ing wi tatapai wa khua tiok pak kai cabo"],
  ["01:57", "02:01", "Wa Ai Kong"],
  ["02:01", "02:06", "Lu Si Sui Cabo... Oh"],
  ["02:06", "02:10", "Lu sencai Lue sen chai sue kau pu tek liau"],
  ["02:10", "02:13", "Tapi lu beh pi..."],
  ["02:13", "02:19", "Kak Wa E Cabo..."],
  ["02:19", "02:24", "Bin E Lai Ceng.."],
  ["02:24", "02:28", "Tapi sim beh cai tiao lai ua"],
  ["02:28", "02:31", "Bo piao ho khua..."],
  ["02:31", "02:36", "Yau Kin Sim Ai Sui..."],
  ["02:36", "02:41", "Lu e sim ai sui....."],
  ["02:41", "02:45", "Lu e sim ai sui... 😘"],
  ["02:45", "02:49", "Bo Piao Ho Khua"],
  ["02:49", "02:53", "Yau Kin Sim Ai Sui..."],
  ["02:53", "02:59", "Lu Si Sui Cabooooo 👉❤️👈"],
  ["02:59", "03:03", "Lu sencai sui kao bu tek liau.."],
  ["03:03", "03:06", "Tapi Lu beh pi..."],
  ["03:06", "03:12", "Kak Wa E Cabooooo"],
  ["03:12", "03:16", "Bin e lai ceng...."],
  ["03:16", "03:21", "Tapi sim beh cai tiao lai ua...."],
  ["03:21", "03:24", "Bo Piao Ho Khua..."],
  ["03:24", "03:30", "Yau Kin Sim Ai Suiiiii"],
  ["03:30", "03:32", "Yeahhhhh........."]
];

function timeToSeconds(timeString) {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
  musicDuration.textContent = formatTime(audio.duration);
});

function playMusic() {
  if (!isPlaying) {
    if (audio.currentTime === 0) {
      currentLyricIndex = 0;
    }

    audio.play();
    playButton.querySelector('i').classList.remove('fa-play');
    playButton.querySelector('i').classList.add('fa-pause');
    isPlaying = true;
    updateDuration();
  } else {
    audio.pause();
    playButton.querySelector('i').classList.remove('fa-pause');
    playButton.querySelector('i').classList.add('fa-play');
    isPlaying = false;
  }
}

function toggleRepeat() {
  isRepeating = !isRepeating;
  audio.loop = isRepeating;
  repeatButton.classList.toggle('active');
}

function updateDuration() {
  musicDuration.textContent = formatTime(audio.duration - audio.currentTime);

  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBarFill.style.width = `${percentage}%`;

  if (audio.currentTime >= audio.duration) {
    if (isRepeating) {
      audio.currentTime = 0;
      audio.play();
      currentLyricIndex = 0; 
      showLyrics();
    } else {
      playButton.querySelector('i').classList.remove('fa-pause');
      playButton.querySelector('i').classList.add('fa-play');
      isPlaying = false;
    }
    musicDuration.textContent = formatTime(audio.duration);
  } else {
    setTimeout(updateDuration, 1000);
  }

  showLyrics();
}

function showLyrics() {
  const currentTime = audio.currentTime;

  // Perbaikan: Loop melalui lirik untuk mencari yang sesuai 
  for (let i = 0; i < lyricsData.length; i++) {
    const lyric = lyricsData[i];
    if (currentTime >= timeToSeconds(lyric[0]) && currentTime < timeToSeconds(lyric[1])) {
      lyricsContainer.querySelector('.lyrics').textContent = lyric[2];
      lyricsContainer.querySelector('.lyrics').classList.remove('hide');
      currentLyricIndex = i; // Perbarui currentLyricIndex 
      return; // Keluar dari loop setelah menemukan lirik yang sesuai
    } else {
      lyricsContainer.querySelector('.lyrics').classList.add('hide');
    }
  }
}

const musicTitle = document.querySelector('.music-title');
musicTitle.textContent = 'Yau Kin Sim Ai Sui'; 

audio.addEventListener('ended', () => {
  if (!isRepeating) { 
    audio.currentTime = 0;
    playButton.querySelector('i').classList.remove('fa-pause');
    playButton.querySelector('i').classList.add('fa-play');
    isPlaying = false;
    musicDuration.textContent = formatTime(audio.duration);
    currentLyricIndex = 0;
    showLyrics();
  }
});

function setAudioTimeFromClick(event) {
  const progressBarRect = musicProgress.getBoundingClientRect();
  const clickX = event.clientX - progressBarRect.left;
  const percentage = (clickX / progressBarRect.width) * 100;
  audio.currentTime = (percentage / 100) * audio.duration;
  progressBarFill.style.width = `${percentage}%`;
  currentLyricIndex = 0; 
  showLyrics();
}

function handleProgressInput(event) {
  setAudioTimeFromClick(event);
  musicProgress.classList.add('active');
}

function handleProgressInputEnd() {
  musicProgress.classList.remove('active');
}

musicProgress.addEventListener('pointerdown', handleProgressInput);
musicProgress.addEventListener('pointerup', handleProgressInputEnd);

musicProgress.addEventListener('pointermove', (event) => {
  if (event.buttons === 1 || event.pointerType === 'touch') {
    setAudioTimeFromClick(event);
  }
});

function checkCaptcha() {
  const answer = document.getElementById('captchaInput').value.toLowerCase();
  const message = document.getElementById('captchaMessage');
  const blurOverlay = document.getElementById('blurOverlay');

  if (answer === 'william') {
    blurOverlay.style.display = 'none';
    message.textContent = '';
  } else {
    message.textContent = 'Maaf, jawaban salah.';
  }
}

const captchaInput = document.getElementById('captchaInput');
captchaInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    checkCaptcha();
  }
});


// Fetch foto dan atur sebagai src gambar
fetch('public/fotofelicia.jpg')
  .then(response => response.blob())
  .then(blob => {
    const objectURL = URL.createObjectURL(blob);
    profileImage.src = objectURL;
  })
  .catch(error => console.error('Error:', error)); 

// Fetch audio dan atur sebagai src audio
fetch('public/musik.m4a') 
  .then(response => response.blob())
  .then(blob => {
    const objectURL = URL.createObjectURL(blob);
    audio.src = objectURL;
  })
  .catch(error => console.error('Error:', error));