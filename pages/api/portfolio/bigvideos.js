import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.vimeo.com/me/projects/22254145/videos',
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`, // Correctly using template literals for the token
      },
    });

    res.status(200).json(response.data); // Return the response data
  } catch (error) {
    console.error('API request failed:', error); // Log the error
    res.status(500).json({ error: 'API request failed' });
  }
}
