import { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';

export default function ShareQuizDialog({ folder, onGenerateCode, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(folder.shareCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 md:w-100 mx-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold break-all dark:text-white flex items-center gap-2 pr-3">
          Share Quiz: {folder.name}
        </h2>
        
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-3 right-3">
        <X className="size-6" />
      </button>
      {folder.isShared && folder.shareCode ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Share this code with others to let them import your quiz:
          </p>
          
          <div className="flex items-center gap-2 justify-center">
            <input
              type="text"
              value={folder.shareCode}
              readOnly
              className="flex-1 py-1 md:py-1.5 text-xl font-mono font-bold text-center border-2 border-green-500 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleCopy}
              className="p-2.5 md:p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
            </button>
          </div>

          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Anyone with this code can copy your quiz and all its questions.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Generate a share code to allow others to import a copy of this quiz folder.
          </p>
          
          <button
            onClick={onGenerateCode}
            className="w-full py-1.5 md:py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
          >
            Generate Share Code
          </button>
        </div>
      )}
    </div>
  );
}