import React from 'react';
import { getAssetPath } from '@/lib/assetPath';
import { imagePaths } from '@/lib/assets';

const ImageTest: React.FC = () => {
  return (
    <div style={{ padding: '40px', background: '#111', color: 'white', minHeight: '100vh' }}>
      <h1>Image Test Page</h1>
      
      <h2>Episode Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {Object.entries(imagePaths.episodes).map(([key, path]) => (
          <div key={key} style={{ width: '300px', marginBottom: '20px' }}>
            <p>{key}: {path}</p>
            <img 
              src={getAssetPath(path)} 
              alt={key} 
              style={{ width: '100%', height: 'auto', border: '1px solid #333' }}
            />
          </div>
        ))}
      </div>
      
      <h2>Direct Image References</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ width: '300px', marginBottom: '20px' }}>
          <p>Direct path: /assets/images/episode1.webp</p>
          <img 
            src="/assets/images/episode1.webp" 
            alt="Episode 1" 
            style={{ width: '100%', height: 'auto', border: '1px solid #333' }}
          />
        </div>
        <div style={{ width: '300px', marginBottom: '20px' }}>
          <p>With getAssetPath: {getAssetPath('/assets/images/episode1.webp')}</p>
          <img 
            src={getAssetPath('/assets/images/episode1.webp')} 
            alt="Episode 1" 
            style={{ width: '100%', height: 'auto', border: '1px solid #333' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageTest; 