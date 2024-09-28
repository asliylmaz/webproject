
import axios from 'axios';

export default async function handler(req, res) {
  const { vimeoURL } = req.query; // Client'tan gelen Vimeo URL'sini alıyoruz

  if (!process.env.VIMEO_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'API key not found' });
  }

  if (!vimeoURL) {
    return res.status(400).json({ error: 'Vimeo URL is required' });
  }

  try {
    // Yönetmenin kullanıcı ID'sini Vimeo URL'sinden alıyoruz
    const username = vimeoURL.split("vimeo.com/")[1];
    const userResponse = await axios({
      method: 'get',
      url: `https://api.vimeo.com/users/${username}`,
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      },
    });

    if (!userResponse.data || !userResponse.data.uri) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = userResponse.data.uri.split("/users/")[1];

    // Kullanıcı ID'si ile videoları alıyoruz
    const videoResponse = await axios({
      method: 'get',
      url: `https://api.vimeo.com/users/${userId}/videos`,
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      },
    });

    const videos = videoResponse.data.data; // Videoları JSON formatında alıyoruz

    res.status(200).json({ data: videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Error fetching videos' });
  }
}
