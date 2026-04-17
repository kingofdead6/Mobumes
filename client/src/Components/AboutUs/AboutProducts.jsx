"use client";

import React from "react";

export default function AboutProducts() {
  return (
    <section className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-stone-950">
            Nos Produits et Services
          </h2>
          <p className="mt-4 text-xl text-stone-600 max-w-2xl mx-auto">
            Des solutions de sécurité sur mesure, fabriquées avec rigueur et installées avec expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - Product List */}
          <div>
            <h3 className="text-2xl font-semibold text-stone-900 mb-8">
              Nos réalisations en menuiserie métallique
            </h3>
            
            <ul className="space-y-5 text-lg text-stone-700">
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Coffres-forts de toutes tailles
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Portes de chambres fortes
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Armoires blindées et armoires sécurisées
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Armoires ignifuges
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Armoires à armes
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Armoires à chéquiers
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Armoires en grillage métallique
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Aménagement de chambres fortes
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Portes blindées
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Portes coupe-feu conformes aux normes européennes
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-700 mt-1.5 text-xl">•</span>
                Portes blindées à effet bois conformes aux normes européennes
              </li>
            </ul>
          </div>

          {/* Right - Key Strengths */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-6">
                Pourquoi choisir MOBUMES ?
              </h3>
              
              <div className="space-y-8 text-stone-700">
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-700 font-semibold text-xl">1</div>
                  <div>
                    <p className="font-medium text-stone-900">Garantie complète</p>
                    <p className="mt-1">Sur tous nos produits ainsi que la maintenance et les pièces détachées.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-700 font-semibold text-xl">2</div>
                  <div>
                    <p className="font-medium text-stone-900">Fabrication sur mesure</p>
                    <p className="mt-1">Nous réalisons des produits spécifiques selon vos cahiers des charges dans des délais très courts.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-700 font-semibold text-xl">3</div>
                  <div>
                    <p className="font-medium text-stone-900">Installation & Maintenance</p>
                    <p className="mt-1">Service complet d’installation, réparation et maintenance multi-marques.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-700 font-semibold text-xl">4</div>
                  <div>
                    <p className="font-medium text-stone-900">Showroom à Staoueli</p>
                    <p className="mt-1">Venez découvrir nos produits en personne au cœur de Staoueli, Alger.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-200">
              <p className="text-stone-600 leading-relaxed">
                N’hésitez pas à nous contacter pour toute information sur nos produits et services. 
                Nous serons ravis de répondre à toutes vos questions et de vous accueillir dans nos locaux.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}