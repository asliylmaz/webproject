// pages/404.js
// import React from 'react';

// const Custom404 = () => {
//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#000', // Arka planı siyah yap
//       color: '#fff', // Metin rengi beyaz olsun
//       flexDirection: 'column',
//       textAlign: 'center',
//       fontFamily: 'Arial, sans-serif' // Basit ve modern bir font
//     }}>
//       <h1 style={{ fontSize: '72px', margin: '0' }}>404</h1>
//       <p style={{ fontSize: '24px', margin: '0' }}>This page could not be found.</p>
//     </div>
//   );
// };

// export default Custom404;
import React from 'react';

const Custom404 = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000', // Black background
      color: '#fff', // White text color
      fontFamily: 'Arial, sans-serif' // Simple and modern font
    }}>
      <h1 style={{ fontSize: '24px', margin: '0', paddingRight: '10px' }}>404</h1>
      <div style={{ width: '1px', height: '45px', backgroundColor: '#fff', margin: '0 10px' }}></div>
      <p style={{ fontSize: '15px', margin: '0', paddingLeft: '10px', letterSpacing: '2px' }}>This page could not be found.</p>
    </div>
  );
};

export default Custom404;
