"use client";

import { ArrowRight, Play, Waves } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative bg-background min-h-[85vh] flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      {/* Animated Waveform Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-40 w-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Waves />
          </div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Comparte tu <span className="text-primary">Música</span> con el Mundo
          </h1>
          <p className="text-xl text-foreground/80 max-w-lg">
            Una plataforma construida para músicos y creadores de contenido. 
            Sube, comparte y conecta con una comunidad de artistas y fans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Empezar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <button
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary/20 bg-background hover:bg-accent transition-colors"
              onClick={() => {
                // Add demo functionality here
              }}
            >
              Ver demo
              <Play className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/40">
            <div>
              <h3 className="text-3xl font-bold">10k+</h3>
              <p className="text-foreground/60">Artistas</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">50k+</h3>
              <p className="text-foreground/60">Tracks</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">100k+</h3>
              <p className="text-foreground/60">Oyentes</p>
            </div>
          </div>
        </div>

        {/* Right Column - Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17L15 12L9 7V17Z" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Subida Fácil</h3>
            <p className="text-foreground/60">
              Sube tus tracks en minutos con nuestra interfaz de arrastrar y soltar.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Comunidad</h3>
            <p className="text-foreground/60">
              Conecta con otros artistas y construye tu audiencia.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Monetización</h3>
            <p className="text-foreground/60">
              Gana dinero con tu música a través de ventas y streaming.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-foreground/60">
              Analiza el crecimiento con estadísticas detalladas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 