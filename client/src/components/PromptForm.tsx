import React, { useState } from 'react';
import { useScriptGeneration } from '@/hooks/useScriptGeneration';
import { CodeView } from './CodeView';
import { VideoDisplay } from './VideoDisplay';

const samplePrompts = [
  "Create a bouncing ball animation",
  "Draw a rotating square",
  "Animate a sine wave",
  "Show a triangle with labeled vertices",
  "Create a matrix transformation visualization"
];

export const PromptForm: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const { generateScript, script, videoUrl, isLoading, error } = useScriptGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await generateScript(prompt);
  };

  const handleSampleClick = async (samplePrompt: string) => {
    setPrompt(samplePrompt);
    await generateScript(samplePrompt);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sample, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSampleClick(sample)}
                disabled={isLoading}
                className="px-3 py-1 text-sm bg-black/40 text-gray-300 rounded-full border border-white/10 hover:bg-black/60 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sample}
              </button>
            ))}
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the animation you want to create..."
            className="w-full h-32 p-4 mt-4 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-8"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {error && (
        <div className="mt-4 mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {script && <CodeView code={script} />}
      <br />
      {videoUrl && <VideoDisplay videoUrl={videoUrl} />}
      <br />
    </div>
  );
};
