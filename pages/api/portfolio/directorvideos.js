
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

    let allVideos = [];
    let page = 1;
    let total = 0;
    const perPage = 25; // Her sayfada kaç video geleceğini belirtiyoruz

    // Tüm sayfaları çekmek için döngü
    do {
      const videoResponse = await axios({
        method: 'get',
        url: `https://api.vimeo.com/users/${userId}/videos`,
        headers: {
          Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
        },
        params: {
          page,
          per_page: perPage, // Sayfa başına dönecek video sayısı
        },
      });

      const { data } = videoResponse;
      allVideos = [...allVideos, ...data.data]; // Videoları biriktiriyoruz
      total = data.total; // Toplam video sayısını belirliyoruz
      page++; // Bir sonraki sayfaya geçiyoruz
    } while (allVideos.length < total); // Tüm videolar alınıncaya kadar döngü devam eder

    res.status(200).json({ data: allVideos }); // Tüm videoları döndürüyoruz
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Error fetching videos' });
  }
}
