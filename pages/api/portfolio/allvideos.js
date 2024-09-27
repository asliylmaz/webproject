import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.vimeo.com/me/videos',
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`, // Corrected template literal for API token
      },
    });

    res.status(200).json(response.data); // Return the data from the Vimeo API
  } catch (error) {
    console.error('API request failed:', error); // Log the error for debugging
    res.status(500).json({ error: 'API request failed' });
  }
}
