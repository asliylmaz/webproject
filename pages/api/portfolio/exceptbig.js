import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.vimeo.com/me/projects/22254297/videos', // Corrected: URL is a string
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`, // Corrected: Template literal with backticks
      },
    });

    res.status(200).json(response.data); // Send the response data back
  } catch (error) {
    console.error('API request failed:', error); // Log the error for debugging
    res.status(500).json({ error: 'API request failed' }); // Send error response
  }
}
