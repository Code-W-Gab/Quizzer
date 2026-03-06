import { useState } from 'react';
import { Download} from 'lucide-react';

export default function ImportQuizDialog({ onImport, onClose }) {
  const [shareCode, setShareCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async () => {
    if (!shareCode.trim()) {
      setError('Please enter a share code');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await onImport(shareCode.trim().toUpperCase());
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to import quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 md:w-100 mx-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold dark:text-white flex items-center gap-2">
          <Download className="size-5" />
          Import Quiz
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
            Enter Share Code:
          </label>
          <input
            type="text"
            value={shareCode}
            onChange={(e) => setShareCode(e.target.value.toUpperCase())}
            placeholder="e.g., A3B5C7D9"
            maxLength={8}
            className="w-full px-4 py-1 md:py-2 text-lg md:text-xl font-mono font-bold text-center border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-1 md:py-2 border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={loading}
            className="flex-1 py-1 md:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Importing...' : 'Import'}
          </button>
        </div>
      </div>
    </div>
  );
}