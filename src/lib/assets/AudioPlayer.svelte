<script lang="ts">
  let { audioUrl } = $props<{
    audioUrl?: string | null;
  }>();
  let audioElement: HTMLAudioElement;
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let playbackRate = $state(1);
  let volume = $state(0.5);
  let animationFrameId: number;

  function togglePlay(): void {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    isPlaying = !isPlaying;
  }

  function updateTime(): void {
    if (audioElement && !audioElement.paused) {
      currentTime = audioElement.currentTime;
      animationFrameId = requestAnimationFrame(updateTime);
    }
  }

  function checkIfPlaying(): void {
    if (isPlaying) {
      updateTime();
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      currentTime = audioElement.currentTime;
    }
  }

  function loadDuration(): void {
    duration = audioElement.duration;
  }

  function handleSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    audioElement.currentTime = parseFloat(input.value);
    currentTime = audioElement.currentTime;
  }

  function changeSpeed(event: Event): void {
    const input = event.target as HTMLInputElement;
    playbackRate = parseFloat(input.value);
    audioElement.playbackRate = playbackRate;
  }

  function changeVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    volume = parseFloat(input.value);
    audioElement.volume = volume;
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centiseconds = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centiseconds.toString().padStart(3, '0')}`;
  }

  $effect(() => {
    checkIfPlaying();
  });
</script>

<div class="player">
  <audio
    bind:this={audioElement}
    src={audioUrl}
    onloadedmetadata={loadDuration}
    onended={() => (isPlaying = false)}
    onplay={() => (isPlaying = true)}
    onpause={() => (isPlaying = false)}
  ></audio>
  <button onclick={togglePlay}>Play</button>
  <!--Just for testing-->
  <input type="range" min="0" max={duration || 0} value={currentTime} oninput={handleSeek} />
  <p>{formatTime(currentTime)}</p>
  <input type="range" min="0" max="1" step="0.01" value={volume} oninput={changeVolume} />
  <p>{Math.round(volume * 100)}%</p>
  <input type="range" min="0.25" max="2" step="0.05" value={playbackRate} oninput={changeSpeed} />
  <p>{playbackRate.toFixed(2)}x</p>
</div>

<style>
  .player {
    display: flex;
    align-items: center;
  }
  input {
    margin: 0;
  }
</style>