import React, { useState } from 'react';
import { cn } from "@/lib/utils"
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import { Check, Copy } from "lucide-react";

interface CodeViewProps {
  code: string;
  className?: string;
}

export const CodeView: React.FC<CodeViewProps> = ({ code, className }) => {
  const [copied, setCopied] = useState(false);
  const highlightedCode = Prism.highlight(code, Prism.languages.python, 'python');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("w-full rounded-lg border border-white/10 bg-black/20 mb-8", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
        <span className="text-sm text-gray-300">Generated Code</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 bg-black/20">
        <pre className="!bg-black/40 !m-0 !p-4 rounded-lg overflow-x-auto">
          <code 
            className="language-python !bg-transparent !text-gray-200"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}; 