import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 bg-page border-t border-border-subtle">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo pribadi */}
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-bold text-heading">
              <img
                src="/assets/logo_AZAN.webp"
                alt="Azan"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Social Links - ganti dengan akun Anda */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://github.com/username"
              target="_blank"
              className="text-muted hover:text-heading text-2xl transition duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/username"
              target="_blank"
              className="text-muted hover:text-heading text-2xl transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/username"
              target="_blank"
              className="text-muted hover:text-heading text-2xl transition duration-300"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Copyright - ganti dengan nama Anda */}
          <div className="text-center md:text-right">
            <p className="text-muted text-sm">
              Copyright © 2026 AZAN DEV. All rights reserved.
            </p>
            <p className="text-subtle text-xs mt-1">
              Fullstack Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
