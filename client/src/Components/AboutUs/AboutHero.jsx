"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShopImage from "../../assets/shopPic.jpg"; // ← Update with your actual image path

export default function AboutHero() {
  return (
    <section className="pt-24 pb-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight text-stone-950 leading-tight">
              Qui sommes-nous ?
            </h1>
            
            <div className="mt-10 space-y-6 text-lg text-stone-700 leading-relaxed">
              <p>
                MOBUMES est une entreprise spécialisée dans la fabrication de solutions de sécurité physique. 
                Nous mettons à la disposition de nos clients une équipe expérimentée de spécialistes en maintenance, 
                réparation et installation de tous types de produits, quelle que soit la marque (coffres-forts, armoires blindées, portes blindées, etc.).
              </p>
              <p>
                Nos services complets vont du conseil et de la conception des produits jusqu’à la livraison et l’installation. 
                Forts de nombreuses années d’expérience, nous assurons la conception, la fabrication, l’installation et la sécurisation 
                de vos biens les plus précieux.
              </p>
              
            </div>

            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-stone-900 hover:bg-blue-700 text-white font-medium rounded-2xl transition"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>

          {/* Right - Shop Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={ShopImage}
              alt="Showroom MOBUMES à Staoueli"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm uppercase tracking-widest">Notre Showroom</p>
              <p className="text-2xl font-semibold mt-1">Staoueli, Alger</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}