import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function appleProfilePlugin(): Plugin {
  return {
    name: 'apple-profile-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/upload-video') && req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              const pubDir = path.resolve(__dirname, 'public');
              if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
              const pubPath = path.resolve(pubDir, 'guide.mp4');
              fs.writeFileSync(pubPath, buffer);

              const distDir = path.resolve(__dirname, 'dist');
              if (fs.existsSync(distDir)) {
                fs.writeFileSync(path.resolve(distDir, 'guide.mp4'), buffer);
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, url: `/guide.mp4?v=${Date.now()}` }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        if (req.url?.startsWith('/api/upload-donate') && req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              const pubDir = path.resolve(__dirname, 'public');
              if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
              fs.writeFileSync(path.resolve(pubDir, 'donate.webp'), buffer);
              fs.writeFileSync(path.resolve(pubDir, 'donate.png'), buffer);

              const distDir = path.resolve(__dirname, 'dist');
              if (fs.existsSync(distDir)) {
                fs.writeFileSync(path.resolve(distDir, 'donate.webp'), buffer);
                fs.writeFileSync(path.resolve(distDir, 'donate.png'), buffer);
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, url: `/donate.webp?v=${Date.now()}` }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        if (req.url?.startsWith('/LocketGold.mobileconfig')) {
          const filePath = path.resolve(__dirname, 'public/LocketGold.mobileconfig');
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            res.writeHead(200, {
              'Content-Type': 'application/x-apple-aspen-config',
              'Content-Disposition': 'attachment; filename="LocketGold.mobileconfig"',
              'Content-Length': stat.size,
              'Cache-Control': 'no-cache',
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        if (req.url?.startsWith('/guide.mp4')) {
          const filePath = path.resolve(__dirname, 'public/guide.mp4');
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            const range = req.headers.range;
            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
              const chunksize = end - start + 1;
              res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
              });
              fs.createReadStream(filePath, { start, end }).pipe(res);
              return;
            } else {
              res.writeHead(200, {
                'Content-Length': stat.size,
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
              });
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), appleProfilePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
