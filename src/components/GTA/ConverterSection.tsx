'use client';

import React, { useState, useRef, useCallback } from 'react';
import { PhotoIcon, ArrowRightIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { CloudArrowUpIcon, CameraIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useCommonContext } from '~/context/common-context';
import { useSSETaskStatus } from '~/hooks/useSSETaskStatus';
import { AuroraText } from "~/components/magicui/aurora-text";
import { PulsatingButton } from "~/components/magicui/pulsating-button";

const ConverterSection = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('vice-city');
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // GTA Styles
  const gtaStyles = [
    { id: 'vice-city', name: 'Vice City', description: '80s neon Miami vibes', color: 'from-pink-500 to-purple-500' },
    { id: 'san-andreas', name: 'San Andreas', description: '90s California street style', color: 'from-orange-500 to-red-500' },
    { id: 'liberty-city', name: 'Liberty City', description: 'Urban noir atmosphere', color: 'from-blue-500 to-cyan-500' },
    { id: 'modern', name: 'GTA V', description: 'Modern Los Santos aesthetic', color: 'from-green-500 to-teal-500' },
  ];
  
  const {
    userData,
    setShowLoginModal,
    setShowPricingModal
  } = useCommonContext();

  const handleTaskComplete = useCallback((data: any) => {
    if (data?.outputUrls && data.outputUrls.length > 0) {
      setConvertedImage(data.outputUrls[0]);
      setProgress(100);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    setIsConverting(false);
    setCurrentTaskId(null);
  }, []);

  const handleTaskError = useCallback((error: string) => {
    alert('Image generation failed: ' + error);
    setIsConverting(false);
    setCurrentTaskId(null);
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  }, []);

  // Start progress animation when converting
  React.useEffect(() => {
    if (isConverting && !progressInterval.current) {
      setProgress(0);
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return 95; // Don't go to 100% until actually complete
          return prev + Math.random() * 3 + 1;
        });
      }, 1000);
    } else if (!isConverting && progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
      if (!convertedImage) {
        setProgress(0);
      }
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isConverting, convertedImage]);

  const { isConnecting, connectionError, isPolling, pollingAttempts } = useSSETaskStatus(currentTaskId, {
    onComplete: handleTaskComplete,
    onError: handleTaskError,
    fallbackPollingDelay: 10 * 1000, // 10秒后开始轮询
    pollingInterval: 20 * 1000, // 轮询间隔
    maxPollingAttempts: 5, // 最多轮询5次
  });

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setUploadedImage(result.url);
      } else {
        alert('上传失败: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('上传失败');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleConvert = async () => {
    if (!uploadedImage) return;
    
    // 检查登录状态
    if (!userData?.user_id && process.env.NEXT_PUBLIC_CHECK_GOOGLE_LOGIN !== '0') {
      setShowLoginModal(true);
      return;
    }
    
    setIsConverting(true);
    
    // Add some visual feedback
    const selectedStyleName = gtaStyles.find(s => s.id === selectedStyle)?.name || 'GTA';
    
    try {
      // 调用KIE.AI图生图API
      const response = await fetch('/api/generate/handleKie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textStr: `${selectedStyleName} style`,
          inputImageUrl: uploadedImage,
          user_id: userData?.user_id || 'guest',
          is_public: true,
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 601) {
        // 需要登录
        setShowLoginModal(true);
        setIsConverting(false);
        return;
      }
      
      if (result.status === 602) {
        // 需要付费
        setShowPricingModal(true);
        setIsConverting(false);
        return;
      }
      
      if (result.uid) {
        // 使用SSE监听任务状态
        console.log("dong setCurrentTaskId",result.uid);
        setCurrentTaskId(result.uid);
      } else {
        throw new Error(result.msg || 'Generation failed');
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Conversion failed: ' + (error as Error).message);
      setIsConverting(false);
    }
  };


  return (
    <section id="converter" className="relative py-20">
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <AuroraText>GTA AI Art Generator</AuroraText>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your photos into stunning Grand Theft Auto style artwork with AI
          </p>
        </div>

        {/* Main Comparison Area */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Original Image Side */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Original</h3>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              
              <div 
                className={`
                  relative aspect-square rounded-2xl border-2 transition-all duration-300 overflow-hidden
                  ${dragOver ? 'border-purple-400 bg-purple-400/10' : 'border-gray-600 hover:border-gray-500'}
                  ${uploadedImage ? 'border-green-400' : 'border-dashed'}
                  bg-gray-900/30 backdrop-blur-sm
                `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {uploadedImage ? (
                  <div className="relative w-full h-full group cursor-pointer">
                    <img
                      src={uploadedImage}
                      alt="Original image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                        Click to change
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                        setConvertedImage(null);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 cursor-pointer">
                    {isUploading ? (
                      <>
                        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-gray-300 font-medium">Uploading...</p>
                      </>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="w-16 h-16 text-gray-500 mb-4" />
                        <p className="text-xl font-semibold text-white mb-2">Drop image here</p>
                        <p className="text-gray-400 text-center mb-6">or click to browse</p>
                        <div className="flex space-x-2">
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">JPG</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">PNG</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">WebP</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">Max 10MB</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                  <ArrowRightIcon className="w-6 h-6 text-white" />
                </div>
                <div className="w-0.5 h-8 bg-gradient-to-b from-pink-500 to-purple-500"></div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  VS
                </span>
              </div>
            </div>

            {/* GTA Style Result Side */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <SparklesIcon className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">GTA Style</h3>
                <SparklesIcon className="w-5 h-5 text-pink-400" />
              </div>
              
              <div className="relative aspect-square rounded-2xl border-2 border-purple-500/50 bg-gray-900/30 backdrop-blur-sm overflow-hidden">
                {convertedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={convertedImage}
                      alt="GTA style result"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <CheckCircleIcon className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                ) : isConverting ? (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="relative">
                      <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mb-4"></div>
                      <SparklesIcon className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">AI Processing...</h3>
                    <p className="text-gray-400 text-center mb-4">Creating your GTA masterpiece</p>
                    
                    {/* Progress Indicator */}
                    <div className="w-full max-w-xs">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Status Messages */}
                    {isConnecting && !isPolling && (
                      <p className="text-sm text-blue-400 mt-3">Establishing connection...</p>
                    )}
                    {connectionError && !isPolling && (
                      <p className="text-sm text-red-400 mt-3">Connection: {connectionError}</p>
                    )}
                    {currentTaskId && !isConnecting && !connectionError && !isPolling && (
                      <p className="text-sm text-green-400 mt-3">Real-time monitoring active</p>
                    )}
                    {isPolling && (
                      <p className="text-sm text-yellow-400 mt-3">
                        Polling mode active... ({pollingAttempts}/5)
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                      <SparklesIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Your GTA Art Preview</h3>
                    <p className="text-gray-400 text-center">Upload an image to see the magic happen</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Style Selection & Convert Button */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
            
            {/* Style Selector */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">Choose Your GTA Style</h4>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {gtaStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-300 text-left
                      ${selectedStyle === style.id
                        ? `border-purple-400 bg-gradient-to-br ${style.color} bg-opacity-20`
                        : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${style.color}`}></div>
                      <span className="font-semibold text-white text-sm">{style.name}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{style.description}</p>
                    
                    {selectedStyle === style.id && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircleIcon className="w-6 h-6 text-purple-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Convert Button */}
            <div className="flex flex-col items-center space-y-4">
              <PulsatingButton
                onClick={handleConvert}
                disabled={!uploadedImage || isConverting}
                className={`
                  px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 min-w-[200px]
                  ${!uploadedImage || isConverting
                    ? 'bg-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                  }
                `}
              >
                {isConverting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-5 h-5" />
                    <span>Transform Now</span>
                  </div>
                )}
              </PulsatingButton>
              
              {uploadedImage && !isConverting && (
                <p className="text-sm text-gray-400 text-center">
                  Style: <span className="text-purple-400 font-medium">
                    {gtaStyles.find(s => s.id === selectedStyle)?.name}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Result Actions */}
        {convertedImage && (
          <div className="mt-8 text-center">
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                <span>Transformation Complete!</span>
              </h4>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = convertedImage!;
                    link.download = `gta-${selectedStyle}-${Date.now()}.jpg`;
                    link.click();
                  }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <CloudArrowUpIcon className="w-5 h-5 rotate-180" />
                  <span>Download HD Image</span>
                </button>
                
                <button 
                  onClick={() => {
                    setConvertedImage(null);
                    setUploadedImage(null);
                  }}
                  className="flex items-center space-x-2 border border-gray-500 hover:border-gray-400 hover:bg-gray-800/50 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                >
                  <ArrowRightIcon className="w-5 h-5 rotate-180" />
                  <span>Try Another Image</span>
                </button>
              </div>
              
              <p className="text-sm text-gray-400 mt-4">
                Share your amazing GTA artwork with the world! 🎨
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConverterSection;