
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  qrId: string | null;
  text: string;
  hostedUrl: string;
}

export const ShareButtons = ({ qrId, text, hostedUrl }: ShareButtonsProps) => {
  const shareText = `Check out this QR code I generated: ${text}`;
  const shareUrl = hostedUrl || window.location.href;

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code Generator',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Copied to clipboard",
        description: "Share link copied to clipboard!",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleEmailShare = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent('Check out this QR code')}&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.location.href = emailUrl;
  };

  const handleInstagramShare = () => {
    toast({
      title: "Instagram Sharing",
      description: "Download the QR code and share it manually on Instagram!",
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleWebShare}
        className="text-xs"
      >
        Share
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleWhatsAppShare}
        className="text-xs bg-green-50 hover:bg-green-100 text-green-700"
      >
        WhatsApp
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleFacebookShare}
        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700"
      >
        <Facebook className="w-3 h-3 mr-1" />
        Facebook
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleTwitterShare}
        className="text-xs bg-sky-50 hover:bg-sky-100 text-sky-700"
      >
        <Twitter className="w-3 h-3 mr-1" />
        Twitter
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleInstagramShare}
        className="text-xs bg-pink-50 hover:bg-pink-100 text-pink-700"
      >
        Instagram
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleEmailShare}
        className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700"
      >
        <Mail className="w-3 h-3 mr-1" />
        Email
      </Button>
    </div>
  );
};
