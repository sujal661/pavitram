
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '../public/next.svg');
const DEST_DIR = path.join(__dirname, '../public/frames');

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// User requested 120 frames
for (let i = 0; i < 120; i++) {
  const padded = i.toString().padStart(3, '0');
  const filename = `frame_${padded}_delay-0.04s.webp`;
  const dest = path.join(DEST_DIR, filename);
  
  // We copy the SVG content but name it .webp. 
  // This is a placeholder hack. Chrome usually renders it.
  fs.copyFileSync(SOURCE, dest);
}

console.log('Generated 120 placeholder frames in public/frames/');
