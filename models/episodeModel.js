const axios = require("axios");

const Episode = {
  addEpisodeToMovie: async (movieId, updatedEpisodes) => {
    try {
      // Gửi yêu cầu patch để cập nhật danh sách episodes trên server
      const patchResponse = await axios.patch(
        `http://localhost:3000/movies/${movieId}`,
        {
          episodes: updatedEpisodes,
        }
      );

      return patchResponse.data;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Episode;
