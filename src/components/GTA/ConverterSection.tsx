'use client';

import React, { useState, useRef } from 'react';
import { ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/solid';
import StyleSelector from './StyleSelector';
import Image from 'next/image';
import { useCommonContext } from '~/context/common-context';

const ConverterSection = () => {
  const [selectedStyle, setSelectedStyle] = useState('original');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    userData,
    setShowLoginModal,
    setShowPricingModal
  } = useCommonContext();

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
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    try {
      // 调用KIE.AI图生图API
      const response = await fetch('/api/generate/handleKie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textStr: `GTA style, ${selectedStyle} style`,
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
        // 重置轮询计数并开始轮询任务状态
        setPollCount(0);
        pollTaskStatus(result.uid);
      } else {
        throw new Error(result.msg || 'Generation failed');
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      alert('转换失败: ' + (error as Error).message);
      setIsConverting(false);
    }
  };

  const pollTaskStatus = async (uid: string) => {
    const startTime = Date.now();
    const timeout = 5 * 60 * 1000; // 5分钟超时
    let pollCount = 0;
    const maxPolls = 100; // 最大轮询次数，防止无限轮询
    
    const checkStatus = async () => {
      try {
        const elapsed = Date.now() - startTime;
        pollCount++;
        
        // 更新轮询计数显示
        setPollCount(pollCount);
        
        // 检查超时或达到最大轮询次数
        if (elapsed > timeout || pollCount > maxPolls) {
          console.warn(`Polling timeout reached for task ${uid}. Elapsed: ${elapsed}ms, Polls: ${pollCount}`);
          alert('图片生成超时，请重试或联系客服');
          setIsConverting(false);
          setPollCount(0);
          return;
        }
        
        const response = await fetch(`/api/generate/status?uid=${uid}`);
        const result = await response.json();
        
        if (result.status === 1) {
          // 完成
          const outputUrls = JSON.parse(result.outputUrl || '[]');
          if (outputUrls.length > 0) {
            setConvertedImage(outputUrls[0]);
          }
          setIsConverting(false);
          setPollCount(0);
        } else if (result.status === -1) {
          // 失败
          alert('图片生成失败');
          setIsConverting(false);
          setPollCount(0);
        } else {
          // 继续轮询，动态调整轮询间隔
          const interval = pollCount < 10 ? 2000 : pollCount < 30 ? 3000 : 5000;
          setTimeout(checkStatus, interval);
        }
      } catch (error) {
        console.error('Status check error:', error);
        alert('检查状态失败，请重试');
        setIsConverting(false);
        setPollCount(0);
      }
    };
    
    checkStatus();
  };

  return (
    <section id="converter" className="relative py-20">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-linear-to-br from-black/80 to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">GTA Style Converter</span>
          </h2>
          <p className="text-xl text-gray-300">Upload your photo and transform it into GTA-style artwork</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Area */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Upload Image</h3>
            
            {/* Upload Area */}
            <div 
              className="bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer min-h-[300px] flex flex-col justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
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
                <div className="space-y-4">
                  <div className="relative w-full max-w-sm mx-auto">
                    <img
                      src={uploadedImage}
                      alt="Uploaded image"
                      className="rounded-lg object-cover w-full h-[400px]"
                    />
                  </div>
                  <p className="text-green-400">图片上传成功</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                      setConvertedImage(null);
                    }}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    重新上传
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {isUploading ? (
                    <>
                      <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-gray-300">上传中...</p>
                    </>
                  ) : (
                    <>
                      <PhotoIcon className="w-16 h-16 text-gray-600 mx-auto" />
                      <p className="text-gray-300 text-lg">拖拽图片到此处或点击上传</p>
                      <p className="text-sm text-gray-500">支持 JPG、PNG、WebP 格式，最大 10MB</p>
                      <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white font-medium">
                        选择文件
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Convert Button */}
            <button 
              onClick={handleConvert}
              disabled={!uploadedImage || isConverting}
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-full font-semibold text-lg transition-all"
            >
              {isConverting ? '转换中...' : '开始转换'}
            </button>
          </div>
          
          {/* Right Column - Result Area */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">转换结果</h3>
            
            <div className="bg-gray-900/50 border border-gray-600 rounded-2xl p-8 min-h-[400px] flex flex-col justify-center">
              {convertedImage ? (
                <div className="text-center space-y-4">
                  <div className="relative w-full max-w-sm mx-auto">
                    <img
                      src={convertedImage}
                      alt="Converted image"
                      className="rounded-lg object-cover w-full h-[400px]"
                    />
                  </div>
                  <p className="text-green-400">转换完成！</p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = convertedImage!;
                        link.download = 'gta-style-image.jpg';
                        link.click();
                      }}
                      className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white"
                    >
                      下载图片
                    </button>
                    <button 
                      onClick={() => setConvertedImage(null)}
                      className="border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-lg text-white"
                    >
                      重新转换
                    </button>
                  </div>
                </div>
              ) : isConverting ? (
                <div className="text-center space-y-4">
                  <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                  <h3 className="text-xl font-bold text-white">AI正在处理您的图片...</h3>
                  <p className="text-gray-400">这可能需要几分钟时间</p>
                  {pollCount > 0 && (
                    <p className="text-sm text-gray-500">检查状态中... ({pollCount}次)</p>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto flex items-center justify-center">
                    <PhotoIcon className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">转换结果将在此显示</h3>
                  <p className="text-gray-400">上传图片并选择风格，然后点击转换按钮</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConverterSection;