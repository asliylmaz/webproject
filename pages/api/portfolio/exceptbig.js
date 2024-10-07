import axios from 'axios';

export default async function handler(req, res) {
  try {
    let allVideos = [];
    let page = 1;
    let total = 0;
    const perPage = 25; // Her sayfada kaç video geleceğini belirtiyoruz

    // Döngü ile tüm sayfaları çekiyoruz
    do {
      const response = await axios({
        method: 'get',
        url: `https://api.vimeo.com/me/projects/22254297/videos`,
        headers: {
          Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
        },
        params: {
          page,
          per_page: perPage, // Her sayfada dönecek video sayısı
        },
      });

      const { data } = response;
      allVideos = [...allVideos, ...data.data]; // Gelen videoları dizimize ekliyoruz
      total = data.total; // Toplam video sayısını belirliyoruz
      page++; // Sonraki sayfa için sayfa numarasını artırıyoruz
    } while (allVideos.length < total); // Tüm videoları alana kadar döngüye devam ediyoruz

    res.status(200).json({ data: allVideos }); // Tüm videoları frontend'e döndürüyoruz
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'API request failed' }); // Hata durumunda yanıt döndürüyoruz
  }
}
