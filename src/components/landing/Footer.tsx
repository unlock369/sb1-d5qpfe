import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              {['Features', 'Security', 'Team', 'Enterprise'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              {['Documentation', 'Help', 'API', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              {['Privacy', 'Terms', 'License', 'Cookies'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2024 Memories App. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {[Github, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}