import { useState } from 'react';

interface UseScriptGenerationReturn {
  generateScript: (prompt: string) => Promise<void>;
  script: string | null;
  videoUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useScriptGeneration(): UseScriptGenerationReturn {
  const [script, setScript] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateScript = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setScript(null);
    setVideoUrl(null);

    try {
      // Generate the script
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      setScript(data.script);

      // Render the script
      const renderResponse = await fetch('http://localhost:3000/api/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script: data.script }),
      });

      if (!renderResponse.ok) {
        throw new Error('Failed to render script');
      }

      const renderData = await renderResponse.json();
      setVideoUrl(`http://localhost:3000/videos/${renderData.videoUrl}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { generateScript, script, videoUrl, isLoading, error };
}
