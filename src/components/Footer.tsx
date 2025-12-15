import { useState } from 'react';
import { Github, Linkedin, Mail, Globe, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Footer = () => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const socialLinks = {
    github: 'https://github.com/pnsssanand',
    linkedin: 'https://www.linkedin.com/in/pinisetty-naga-satya-surya-shiva-anand-087351389/',
    portfolio: 'https://portfolio-anand-one.vercel.app/',
    email: 'pnsssanand@gmail.com',
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
  };

  return (
    <footer className="mt-12 sm:mt-20 border-t border-gray-200/50 bg-white/60 backdrop-blur-sm">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Branding Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">QR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                QR Generator
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs mx-auto md:mx-0">
              Create stunning, customizable QR codes instantly. Keep your links accessible and shareable.
            </p>
          </div>

          {/* Developer Section */}
          <div className="text-center">
            <p className="text-gray-600 flex items-center justify-center gap-2 mb-2">
              Designed & Developed with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Mr. Anand Pinisetty</h3>
            <p className="text-gray-500 text-sm">Full Stack Developer</p>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-right">
            <p className="text-gray-600 mb-4">Connect with the developer</p>
            <div className="flex items-center justify-center md:justify-end gap-3 mb-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-600 group-hover:text-violet-600 transition-colors" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </a>
              <button
                onClick={() => setEmailDialogOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
            <a
              href={socialLinks.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-2 border-gray-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200"
              >
                <Globe className="w-4 h-4 mr-2" />
                View Developer Portfolio
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200/50 bg-gray-50/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} QR Generator. All rights reserved.</p>
            
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm">
              <span className="text-gray-400">&lt;/&gt;</span>
              <span>Built with React, TypeScript & Firebase</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-violet-600 transition-colors">Privacy Policy</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="hover:text-violet-600 transition-colors">Terms of Service</a>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => setEmailDialogOpen(true)}
                className="hover:text-violet-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          
          <p className="text-center text-xs text-gray-400 mt-4">
            v1.0.0 • Crafted with precision by Anand Pinisetty
          </p>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-violet-600" />
              Contact Email
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-800">{socialLinks.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={copyEmail}
                variant="outline"
                className="flex-1 border-2 hover:border-violet-400 hover:bg-violet-50"
              >
                Copy Email
              </Button>
              <a href={`mailto:${socialLinks.email}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                  Send Email
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
