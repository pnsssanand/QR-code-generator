
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, Share2, Sparkles } from 'lucide-react';
import { getQRFromFirestore, QRData } from '@/utils/firebaseUtils';
import { ShareButtons } from '@/components/ShareButtons';
import { downloadQRCode, downloadQRAsPDF } from '@/utils/downloadUtils';

const QRPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQRData = async () => {
      if (!id) {
        setError('Invalid QR code ID');
        setLoading(false);
        return;
      }

      try {
        const data = await getQRFromFirestore(id);
        if (data) {
          setQrData(data);
        } else {
          setError('QR code not found');
        }
      } catch (err) {
        console.error('Error fetching QR data:', err);
        setError('Failed to load QR code');
      } finally {
        setLoading(false);
      }
    };

    fetchQRData();
  }, [id]);

  const handleDownloadPNG = () => {
    if (qrData) {
      const qrElement = document.getElementById('qr-display');
      if (qrElement) {
        downloadQRCode(qrElement, `qr-code-${id}`, 'png');
      }
    }
  };

  const handleDownloadPDF = () => {
    if (qrData) {
      const qrElement = document.getElementById('qr-display');
      if (qrElement) {
        downloadQRAsPDF(qrElement, `qr-code-${id}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center relative overflow-hidden">
        {/* Background elements - mobile optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center relative z-10 px-4">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-violet-200 border-t-violet-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">Loading QR code...</p>
        </div>
      </div>
    );
  }

  if (error || !qrData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center relative overflow-hidden p-4">
        {/* Background elements - mobile optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/70 backdrop-blur-lg relative z-10">
          <CardContent className="text-center py-8 sm:py-12">
            <div className="mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">❌</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">QR Code Not Found</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">{error}</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 h-auto">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Create New QR Code
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background elements - mobile optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Enhanced Header - responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              QR Code Preview
            </h1>
          </div>
          <Link to="/">
            <Button variant="outline" className="mb-4 border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 px-4 sm:px-6 py-2.5 sm:py-3 h-auto text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Create New QR Code
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-lg">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl">Shared QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              {/* Enhanced QR Code Display - responsive */}
              <div className="flex justify-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100 shadow-inner">
                <div id="qr-display" className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <QRCodeSVG
                    value={qrData.text}
                    size={window.innerWidth < 640 ? 200 : 280}
                    fgColor={qrData.fgColor}
                    bgColor={qrData.bgColor}
                    level="M"
                  />
                </div>
              </div>

              {/* Content Info - responsive */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl">
                <p className="text-sm text-blue-700 font-semibold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Content:
                </p>
                <p className="text-xs sm:text-sm text-blue-600 break-all font-mono bg-white/60 p-3 sm:p-4 rounded-lg">{qrData.text}</p>
              </div>

              {/* Enhanced Download Buttons - responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadPNG} 
                  className="h-12 sm:h-14 border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download PNG
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadPDF} 
                  className="h-12 sm:h-14 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download PDF
                </Button>
              </div>

              {/* Enhanced Share Section - responsive */}
              <div className="border-t-2 border-gray-100 pt-6">
                <Label className="flex items-center gap-2 sm:gap-3 mb-4 text-base sm:text-lg font-semibold text-gray-700">
                  <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  Share This QR Code
                </Label>
                <ShareButtons 
                  qrId={id!} 
                  text={qrData.text} 
                  hostedUrl={window.location.href} 
                />
              </div>

              {/* Timestamp - responsive */}
              <div className="text-center py-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500">
                  Created: {qrData.timestamp instanceof Date ? 
                    qrData.timestamp.toLocaleDateString() : 
                    new Date(qrData.timestamp).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Footer - responsive */}
        <footer className="text-center mt-12 sm:mt-16 py-8 sm:py-12 border-t border-gray-200/50">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-lg">
            <p className="text-gray-700 font-semibold text-base sm:text-lg">
              Designed and Developed by Mr. Anand Pinisetty
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Crafted with ❤️ and modern web technologies
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default QRPreview;
