import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

const musicFolder = path.join(process.cwd(), 'public', 'music');

export async function GET() {
  try {
    const files = await fs.readdir(musicFolder);
    const mp3Files = files.filter(file => file.endsWith('.mp3'));

    const metadataPromises = mp3Files.map(async (file) => {
      const filePath = path.join(musicFolder, file);
      const metadata = await parseFile(filePath);
      const { title, artist } = metadata.common;
      const picture = metadata.common.picture?.[0];

      const cover = picture
        ? `data:${picture.format};base64,${picture.data.toString('base64')}`
        : null;

      return {
        title: title || file.replace('.mp3', ''),
        artist: artist || 'Unknown Artist',
        cover,
        file: `/music/${file}`,
      };
    });

    const songs = await Promise.all(metadataPromises);
    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error reading music files:', error);
    return NextResponse.json({ error: 'Failed to load music files' }, { status: 500 });
  }
}
