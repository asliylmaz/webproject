import axios from 'axios';

export default async function handler(req, res) {
  try {
    let allVideos = [];
    let page = 1;
    let total = 0;
    const perPage = 25; // Her sayfada dönecek video sayısı

    // Döngü ile tüm sayfaları al
    do {
      const response = await axios({
        method: 'get',
        url: `https://api.vimeo.com/me/videos`,
        headers: {
          Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
        },
        params: {
          page,
          per_page: perPage,
        },
      });

      const { data } = response;
      allVideos = [...allVideos, ...data.data]; // Gelen videoları diziye ekle
      total = data.total; // Toplam video sayısını belirle
      page++; // Sonraki sayfa için artır
    } while (allVideos.length < total);

    res.status(200).json({ data: allVideos }); // Tüm videoları dön
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'API request failed' });
  }
}
