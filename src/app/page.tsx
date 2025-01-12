import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Upload, Disc, Radio, Coins, Sparkles, Crown, Rocket, Shield, Zap, Star, 
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Sube tu música",
    description: "Arrastra y suelta tus archivos. Soportamos todos los formatos de alta calidad.",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    icon: Disc,
    title: "Crea tu perfil",
    description: "Personaliza tu página de artista con fotos, biografía y enlaces sociales.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Radio,
    title: "Comparte",
    description: "Distribuye tu música y llega a nuevos oyentes en todo el mundo.",
    color: "from-pink-500/20 to-orange-500/20"
  },
  {
    icon: Coins,
    title: "Monetiza",
    description: "Recibe pagos por streams, ventas y suscripciones de fans.",
    color: "from-orange-500/20 to-blue-500/20"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* How it Works Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comienza en minutos
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Un proceso simple y rápido para empezar a compartir tu música con el mundo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-full w-full h-[2px] bg-gradient-to-r from-primary/40 to-transparent -translate-y-1/2 z-0" />
              )}
              
              {/* Card */}
              <div className="relative z-10 p-8 rounded-2xl bg-gradient-to-br border border-border/40 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 rounded-2xl -z-10`} />
                
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground/60">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="container mx-auto px-4 py-24 border-t border-border/40">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Planes Disponibles
          </span>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Elige el plan perfecto para ti
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Compara nuestros planes y elige el que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="relative group">
            <div className="relative p-8 bg-card rounded-3xl border border-border/40 h-full hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Plan Gratuito</h3>
                  <p className="text-sm text-foreground/60">Comienza gratis</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-foreground/60">/mes</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Subida de música en calidad estándar (MP3 320kbps)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Estadísticas básicas de reproducciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Perfil de artista personalizable</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Hasta 3 tracks por mes</span>
                </li>
              </ul>

              <button className="w-full py-3 rounded-xl border-2 border-primary/20 text-primary hover:bg-primary/10 transition-colors">
                Comenzar Gratis
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="relative group">
            <div className="absolute inset-0.5 bg-gradient-to-br from-primary to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative p-8 bg-card rounded-3xl border border-primary/50 h-full hover:border-primary transition-colors">
              <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  <Crown className="w-3 h-3" />
                  Recomendado
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Plan Premium</h3>
                  <p className="text-sm text-foreground/60">Todo lo que necesitas</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$9.99</span>
                <span className="text-foreground/60">/mes</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Subidas ilimitadas en calidad HD (FLAC, WAV)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Analytics avanzado con datos demográficos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Distribución directa a plataformas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Monetización y reportes de ganancias</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Protección de derechos de autor</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground/80">Soporte prioritario 24/7</span>
                </li>
              </ul>

              <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Comenzar Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card">
        <div className="container mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Music Platform</h3>
              <p className="text-foreground/60 mb-4">
                La plataforma perfecta para artistas y creadores de música.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3">
                {["Explorar", "Precios"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help & Support */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Ayuda y Soporte
              </h4>
              <ul className="space-y-3">
                {["FAQ", "Contacto", "Centro de Ayuda", "Estado del Sistema", "Términos de Uso"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Contacto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-foreground/60 hover:text-primary transition-colors inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>soporte@musicplatform.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              © 2024 Music Platform. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Términos
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
