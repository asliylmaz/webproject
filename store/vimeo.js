fetch('https://api.vimeo.com/users/c9eb10c810e67702eb86dabb23460b0bc1fee675/videos', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer 5dd3b19924ed3314e5c36a34a75a9192' // Access token'ı buraya yerleştirin
    }
  })
  
  .then(response => response.json())
  .then(data => {
    // Videolarını burada işleyebilirsin
    console.log(data);
  });
  
