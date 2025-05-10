import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

interface IPicture {
  format: string;
  data: Buffer;
}

const musicFolder = path.join(process.cwd(), 'public', 'music');

export async function GET() {
  try {
    const files = await fs.readdir(musicFolder);
    const mp3Files = files.filter(file => file.endsWith('.mp3'));

    const metadataPromises = mp3Files.map(async (file) => {
      const filePath = path.join(musicFolder, file);
      const metadata = await parseFile(filePath);
      const { title, artist } = metadata.common;
      const picture = metadata.common.picture?.[0] as IPicture | undefined;

      let cover = '/music/default-cover.jpg'; // Default cover
      if (picture && picture.data) {
        const base64String = Buffer.from(picture.data).toString('base64');
        cover = `data:${picture.format};base64,${base64String}`;
      }

      return {
        title: title || file.replace('.mp3', ''),
        artist: artist || 'Unknown Artist',
        cover,
        file: `/music/${file}`,
        duration: metadata.format.duration || 0,
      };
    });

    const songs = await Promise.all(metadataPromises);
    return NextResponse.json({ songs });
  } catch (error) {
    console.error('Error reading music files:', error);
    return NextResponse.json({ error: 'Failed to load music files' }, { status: 500 });
  }
}
