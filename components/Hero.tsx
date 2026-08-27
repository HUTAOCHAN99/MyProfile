"use client";

import Image from "next/image";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import FuiBackground from "./FuiBackground";

interface Person {
  id: number;
  name: string;
  role: string;
  image: string;
  social: {
    github: string;
    instagram: string;
    linkedin: string;
  };
  bio: string;
  introduction: string;
}

// Data profil - TODO: ganti semua data di bawah ini dengan data Anda
const person: Person = {
  id: 1,
  name: "Ahmad Zhofir Amanullah Nayif", // TODO: ganti dengan nama Anda
  role: "Fullstack Developer)",
  image: "/assets/Zhofir.webp", // TODO: ganti dengan foto Anda
  social: {
    github: "https://github.com/HUTAOCHAN99",
    instagram: "https://www.instagram.com/ahmad_zhofir_a_nayif",
    linkedin: "https://www.linkedin.com/in/username",
  },
  bio: "Fullstack Developer dengan pengalaman dalam pengembangan web modern menggunakan Next.js, React, dan Flutter",
  introduction: "Sebagai seorang Fullstack Developer, saya memadukan logika backend yang solid dengan antarmuka yang intuitif untuk menciptakan aplikasi web dan mobile yang berpusat pada kepuasan pengguna.",
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-linear-to-b from-page to-page-alt relative overflow-hidden"
    >
      <FuiBackground />

      <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col relative z-10">
        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full"
          >
            {/* Left Content - Photo dengan overlay di dalamnya */}
            <div className="relative w-full lg:w-1/2">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="relative aspect-square">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-linear-to-t from-page/90 via-page/50 to-transparent rounded-2xl">
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-heading leading-tight">
                        {person.name}
                      </h1>
                      <p className="text-primary text-sm sm:text-base md:text-lg font-medium mt-1">
                        {person.role}
                      </p>
                      <div className="w-12 h-1 bg-primary mt-2"></div>
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={person.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body hover:text-heading text-lg md:text-xl transition duration-300 hover:scale-110"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href={person.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body hover:text-heading text-lg md:text-xl transition duration-300 hover:scale-110"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href={person.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body hover:text-heading text-lg md:text-xl transition duration-300 hover:scale-110"
                      >
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Description */}
            <div className="w-full lg:w-1/2 space-y-4">
              <p className="text-primary font-semibold text-sm tracking-wider">
                -- Introduction
              </p>

              <h2 className="text-lg sm:text-xl md:text-2xl text-heading/90 font-medium">
                {person.bio}
              </h2>

              <div className="space-y-3 text-sm sm:text-base text-body">
                <p className="text-justify">
                  {person.introduction}
                </p>
              </div>

              <a
                href="#about"
                className="inline-flex items-center text-primary text-sm sm:text-base font-medium hover:text-primary-light transition duration-300 group pt-2"
              >
                Perjalanan saya
                <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
