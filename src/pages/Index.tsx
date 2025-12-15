
import { useState, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Download, Share2, Palette, Link as LinkIcon, Sparkles, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ColorPicker } from '@/components/ColorPicker';
import { ShareButtons } from '@/components/ShareButtons';
import { downloadQRCode, downloadQRAsPDF } from '@/utils/downloadUtils';
import { uploadToCloudinary } from '@/utils/cloudinaryUtils';
import { saveQRToFirestore } from '@/utils/firebaseUtils';
import Footer from '@/components/Footer';

const Index = () => {
  const [text, setText] = useState('https://example.com');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrId, setQrId] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text or URL to generate QR code",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Generate QR code and upload to Cloudinary
      const imageUrl = await uploadToCloudinary(qrRef.current!);
      
      // Save to Firestore and get document ID
      const docId = await saveQRToFirestore({
        text,
        imageUrl,
        fgColor,
        bgColor,
        timestamp: new Date()
      });
      
      setQrId(docId);
      
      toast({
        title: "Success",
        description: "QR code generated and hosted successfully!",
      });
    } catch (error) {
      console.error('Error generating QR:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [text, fgColor, bgColor]);

  const handleDownloadPNG = () => {
    downloadQRCode(qrRef.current!, `qr-code-${Date.now()}`, 'png');
  };

  const handleDownloadPDF = () => {
    downloadQRAsPDF(qrRef.current!, `qr-code-${Date.now()}`);
  };

  const hostedUrl = qrId ? `${window.location.origin}/qr/${qrId}` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements - smaller and better positioned for mobile */}
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              QR Code Generator
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Create stunning, customizable QR codes instantly. Generate QR codes for URLs, text, and more with beautiful customization options and seamless sharing.
          </p>
          
          {/* Feature highlights - responsive grid */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              <Zap className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-gray-700">Instant Generation</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              <Palette className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Full Customization</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              <Share2 className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Easy Sharing</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Enhanced Input Section */}
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-lg hover:shadow-3xl transition-all duration-300 hover:scale-[1.01]">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                  <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                Enter Your Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <Label htmlFor="text" className="text-base sm:text-lg font-semibold text-gray-700">Text or URL</Label>
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter URL or text to generate QR code"
                  className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold text-gray-700">
                  <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  Customize Colors
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <ColorPicker
                    label="Foreground"
                    color={fgColor}
                    onChange={setFgColor}
                  />
                  <ColorPicker
                    label="Background"
                    color={bgColor}
                    onChange={setBgColor}
                  />
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-12 sm:h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                size="lg"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Generate QR Code
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced QR Code Display */}
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-lg hover:shadow-3xl transition-all duration-300">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl">Your QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              <div className="flex justify-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100 shadow-inner">
                <div ref={qrRef} className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <QRCodeSVG
                    value={text}
                    size={window.innerWidth < 640 ? 180 : 220}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="M"
                  />
                </div>
              </div>

              {qrId && (
                <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl animate-fade-in">
                  <p className="text-sm text-green-700 font-semibold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Hosted URL:
                  </p>
                  <p className="text-xs sm:text-sm text-green-600 break-all font-mono bg-white/50 p-3 rounded-lg">{hostedUrl}</p>
                </div>
              )}

              {/* Enhanced Download Buttons - responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadPNG} 
                  className="h-10 sm:h-12 border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  PNG
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadPDF} 
                  className="h-10 sm:h-12 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  PDF
                </Button>
              </div>

              {/* Enhanced Share Section */}
              <div className="border-t-2 border-gray-100 pt-6">
                <Label className="flex items-center gap-2 sm:gap-3 mb-4 text-base sm:text-lg font-semibold text-gray-700">
                  <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  Share QR Code
                </Label>
                <ShareButtons qrId={qrId} text={text} hostedUrl={hostedUrl} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
