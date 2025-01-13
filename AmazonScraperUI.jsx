import React, { useState } from 'react';
import { Upload, ArrowUpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AmazonScraperUI = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.name.endsWith('.xlsx')) {
        setFile(uploadedFile);
        setError(null);
        setMessage('File uploaded successfully');
      } else {
        setError('Please upload an Excel (.xlsx) file');
        setFile(null);
      }
    }
  };

  const handleProcessASINs = async () => {
    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setIsProcessing(true);
    setMessage('Processing ASINs... This may take a few minutes.');
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/process-asins', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      setMessage('ASINs processed successfully! Check your Google Sheet for results.');
    } catch (err) {
      setError('An error occurred while processing the ASINs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Amazon ASIN Scraper</h1>
          
          {/* File Upload Section */}
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center w-full">
              <label 
                htmlFor="file-upload" 
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Excel file (.xlsx) with ASINs in column A</p>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".xlsx" 
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                />
              </label>
            </div>
          </div>

          {/* File Name Display */}
          {file && (
            <div className="mt-4 text-sm text-gray-600">
              Selected file: {file.name}
            </div>
          )}

          {/* Process Button */}
          <button
            onClick={handleProcessASINs}
            disabled={!file || isProcessing}
            className={`mt-6 flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md ${
              !file || isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <>
                <ArrowUpCircle className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Processing...
              </>
            ) : (
              'Process ASINs'
            )}
          </button>

          {/* Messages */}
          {message && (
            <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmazonScraperUI;