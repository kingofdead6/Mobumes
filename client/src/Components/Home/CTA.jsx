"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative py-28 px-6 bg-stone-950 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-800 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">
            Besoin d’une solution de sécurité fiable ?
          </h2>

          <p className="mt-6 text-lg text-stone-300 leading-relaxed">
            Que ce soit pour un coffre-fort, une porte blindée ou une solution de stockage sécurisé,
            notre équipe vous accompagne de la fabrication jusqu’à l’installation.
          </p>

          <div className="mt-10 space-y-3 text-stone-300">
            <p>✔ Devis rapide et personnalisé</p>
            <p>✔ Installation sur tout le territoire</p>
            <p>✔ Support technique professionnel</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
          

            <a
              href="#contact"
              className="px-6 py-4 border border-white/30 hover:border-white text-white font-medium rounded-xl transition text-center"
            >
              Demander un devis
            </a>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="bg-white text-black rounded-2xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-semibold mb-6">
            Demande de devis rapide
          </h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
            />

            <input
              type="tel"
              placeholder="Téléphone"
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
            />

            <textarea
              placeholder="Décrivez votre besoin..."
              rows={4}
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
            />

            <button
              type="button"
              className="w-full py-4 bg-stone-950 hover:bg-blue-600 text-white font-medium rounded-xl transition"
            >
              Envoyer la demande
            </button>
          </form>

          <p className="mt-4 text-xs text-stone-500 text-center">
            Réponse sous 24h • Données confidentielles
          </p>
        </motion.div>

      </div>
    </section>
  );
}