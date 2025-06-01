import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMP_DIR = path.join(__dirname, '../../temp');
const VIDEOS_DIR = path.join(__dirname, '../../public/videos');

export async function renderManimScript(script) {
  try {
    // Ensure directories exist
    await fs.mkdir(TEMP_DIR, { recursive: true });
    await fs.mkdir(VIDEOS_DIR, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const scriptPath = path.join(TEMP_DIR, `script_${timestamp}.py`);
    const outputFilename = `animation_${timestamp}.mp4`;

    // Write script to file
    await fs.writeFile(scriptPath, script);

    // Run Manim
    const command = `manim -qm ${scriptPath} Scene -o ${outputFilename}`;
    const { stdout, stderr } = await execAsync(command, { cwd: VIDEOS_DIR });

    console.log('Manim stdout:', stdout);
    if (stderr) console.error('Manim stderr:', stderr);

    // Manim creates videos in a subdirectory structure
    const manimOutputPath = path.join(
      VIDEOS_DIR,
      'media',
      'videos',
      `script_${timestamp}`,
      '720p30',
      outputFilename
    );

    // Verify video file exists
    try {
      await fs.access(manimOutputPath);
    } catch (error) {
      throw new Error('Video file was not created successfully');
    }

    // Move the video file to the videos directory
    const finalOutputPath = path.join(VIDEOS_DIR, outputFilename);
    await fs.rename(manimOutputPath, finalOutputPath);

    // Clean up script file and temporary directories
    await fs.unlink(scriptPath);
    await fs.rm(path.join(VIDEOS_DIR, 'media'), { recursive: true, force: true });

    return outputFilename;
  } catch (error) {
    console.error('Error rendering Manim script:', error);
    // Clean up any temporary files
    try {
      await fs.unlink(scriptPath);
      await fs.rm(path.join(VIDEOS_DIR, 'media'), { recursive: true, force: true });
    } catch (cleanupError) {
      console.error('Error cleaning up temporary files:', cleanupError);
    }
    throw error;
  }
}
