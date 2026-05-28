
import fs from 'fs';
import path from 'path';
import { streamerMock } from '../src/mocks/streamerMock';

const AVATARS_DIR = path.join(process.cwd(), 'public', 'images', 'streamers');

async function fetchAvatar(handle: string) {
  try {
    // Adicionando um User-Agent para evitar ser bloqueado
    const response = await fetch(`https://www.youtube.com/${handle}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    const text = await response.text();
    const match = text.match(/<meta property="og:image" content="([^"]+)"/);
    return match ? match[1] : null;
  } catch (error) {
    console.error(`Error fetching avatar for ${handle}:`, error);
    return null;
  }
}

async function downloadImage(url: string, fileName: string, force: boolean = false) {
  const filePath = path.join(AVATARS_DIR, fileName);
  
  const isUpdate = fs.existsSync(filePath);
  if (isUpdate && !force) {
    console.log(`Skipping ${fileName}, already exists. Use --force to update.`);
    return true;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);
    console.log(`${isUpdate ? 'Updated' : 'Downloaded'} ${fileName}`);
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return false;
  }
}

async function main() {
  const force = process.argv.includes('--force');
  console.log(`Starting avatar fetch... ${force ? '(Forcing updates)' : ''}`);
  
  if (!fs.existsSync(AVATARS_DIR)) {
    fs.mkdirSync(AVATARS_DIR, { recursive: true });
  }

  const results: Record<string, string> = {};

  for (const streamer of streamerMock) {
    const handleMatch = streamer.channelLink?.match(/@([^/?]+)/);
    const handle = handleMatch ? `@${handleMatch[1]}` : `@${streamer.streamerName.replace(/\s+/g, '')}`;
    
    console.log(`Processing ${streamer.streamerName} (${handle})...`);
    
    const avatarUrl = await fetchAvatar(handle);
    if (avatarUrl) {
      const fileName = `${streamer.streamerName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      const success = await downloadImage(avatarUrl, fileName, force);
      if (success) {
        results[streamer.id] = `/images/streamers/${fileName}`;
      }
    } else {
      console.warn(`Could not find avatar for ${streamer.streamerName}`);
    }
  }

  console.log("\nSuggested streamerImage mappings:");
  console.log(JSON.stringify(results, null, 2));
  console.log("\nDone!");
}

main();
