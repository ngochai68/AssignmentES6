const container = document.querySelector('.intl-play-scroll-content');
const videoPlayer = document.getElementById('video-player');
const episodeTitle = document.getElementById('episode-title');

function handleEpisodeClick(event) {
  event.preventDefault();
  const clickedItem = event.target.closest('.drama-item');
  
  if (!clickedItem) return;

  const dramaItems = container.querySelectorAll('.drama-item');

  dramaItems.forEach(item => {
    item.parentNode.classList.toggle('selected', item === clickedItem);
  });

  const videoUrl = clickedItem.dataset.videoUrl;
  const episodeName = clickedItem.dataset.episodeName;

  videoPlayer.src = videoUrl;
  episodeTitle.innerHTML = episodeName;
}

container.addEventListener('click', handleEpisodeClick);
