"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Fabrication professionnelle",
    description:
      "Des solutions conçues et fabriquées selon des standards de sécurité élevés.",
  },
  {
    id: 2,
    title: "Installation sur site",
    description:
      "Une équipe spécialisée assure une installation précise et sécurisée.",
  },
  {
    id: 3,
    title: "Maintenance multi-marques",
    description:
      "Nous intervenons sur tous types de coffres, portes et systèmes de sécurité.",
  },
  {
    id: 4,
    title: "Réactivité & support",
    description:
      "Intervention rapide et accompagnement technique pour nos clients professionnels.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
            Pourquoi choisir MOBUMES ?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Une expertise complète dans la sécurité physique, de la fabrication à l’installation.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((f) => (
            <motion.div
              key={f.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {f.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


