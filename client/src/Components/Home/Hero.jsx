"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroBgPc from "../../assets/HeroBgPc.png";
import HeroBgMobile from "../../assets/HeroBgMobile.png";
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      
      {/* Responsive Background */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Mobile Image */}
          <source
            media="(max-width: 768px)"
            srcSet={HeroBgMobile}
          />

          {/* Desktop Image */}
          <img
            src={HeroBgPc}
            alt="Sécurité physique"
            className="w-full h-full object-cover"
          />
        </picture>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl text-center text-white">

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight"
          >
            Solutions de sécurité physique haute performance
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          >
            Fabrication, installation et maintenance de coffres forts,
            armoires sécurisées et portes blindées pour protéger vos biens
            et documents sensibles.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Voir les produits
            </Link>

            <Link
              to="/sell-us-something"
              className="px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
            >
              Demander un devis
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-sm text-gray-300"
          >
            +10 ans d’expertise • Installation & maintenance • Solutions professionnelles
          </motion.p>

        </div>
      </div>
    </section>
  );
}