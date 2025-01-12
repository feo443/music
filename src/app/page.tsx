import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Upload, Disc, Radio, Coins, Crown, Shield, Twitter, Instagram, Facebook, Youtube } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Cómo funciona */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Comienza en minutos</h2>
          <p className="text-muted-foreground text-center mb-12">Comparte tu música con el mundo en cuatro simples pasos</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Paso 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-card p-8 rounded-xl flex flex-col items-center text-center hover:bg-accent transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition duration-500">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Sube tu música</h3>
                <p className="text-muted-foreground">Sube tus tracks en alta calidad y gestiona tu catálogo musical con facilidad.</p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-card p-8 rounded-xl flex flex-col items-center text-center hover:bg-accent transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition duration-500">
                  <Disc className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Crea tu perfil</h3>
                <p className="text-muted-foreground">Personaliza tu perfil de artista y muestra tu identidad al mundo.</p>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-card p-8 rounded-xl flex flex-col items-center text-center hover:bg-accent transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition duration-500">
                  <Radio className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Comparte</h3>
                <p className="text-muted-foreground">Distribuye tu música y llega a más oyentes en todo el mundo.</p>
              </div>
            </div>

            {/* Paso 4 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-card p-8 rounded-xl flex flex-col items-center text-center hover:bg-accent transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition duration-500">
                  <Coins className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Monetiza</h3>
                <p className="text-muted-foreground">Gana dinero con tu música y gestiona tus ingresos fácilmente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background via-card to-card relative">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="absolute inset-x-0 -top-40 -bottom-40 overflow-hidden rounded-t-[3rem] bg-gradient-to-b from-purple-50/50 via-white/20 to-background/50 dark:from-purple-950/50 dark:via-background/20 dark:to-background/50 backdrop-blur-3xl border-x border-t border-border/50 -z-10"></div>
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-foreground via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Elige el plan perfecto para ti
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Comienza gratis o desbloquea todas las funciones con Premium
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plan Gratuito */}
            <div className="group relative">
              <div className="absolute -inset-[3px] bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="relative h-full bg-background/95 backdrop-blur-xl p-8 rounded-xl transition-all duration-500 border border-border/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.04] to-transparent rounded-xl"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Free</h3>
                      <p className="text-muted-foreground font-medium">Para empezar</p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">$0</span>
                      <span className="text-muted-foreground font-medium">/mes</span>
                    </div>
                  </div>
                  <ul className="space-y-6 mb-10">
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 flex items-center justify-center group-hover/item:from-gray-500/30 group-hover/item:to-gray-400/30 transition-all duration-300 backdrop-blur-sm">
                        <Shield className="w-5 h-5 text-foreground/70" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Calidad estándar</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 flex items-center justify-center group-hover/item:from-gray-500/30 group-hover/item:to-gray-400/30 transition-all duration-300 backdrop-blur-sm">
                        <Shield className="w-5 h-5 text-foreground/70" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">3 tracks por mes</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 flex items-center justify-center group-hover/item:from-gray-500/30 group-hover/item:to-gray-400/30 transition-all duration-300 backdrop-blur-sm">
                        <Shield className="w-5 h-5 text-foreground/70" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Estadísticas básicas</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 flex items-center justify-center group-hover/item:from-gray-500/30 group-hover/item:to-gray-400/30 transition-all duration-300 backdrop-blur-sm">
                        <Shield className="w-5 h-5 text-foreground/70" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Perfil personalizable</span>
                    </li>
                  </ul>
                  <button className="w-full py-5 rounded-xl bg-gradient-to-r from-gray-200 via-white to-gray-200 text-black text-lg font-semibold hover:opacity-90 transition-opacity">
                    Comenzar Gratis
                  </button>
                </div>
              </div>
            </div>

            {/* Plan Premium */}
            <div className="group relative">
              <div className="absolute -inset-[3px] bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="relative h-full bg-background/95 backdrop-blur-xl p-8 rounded-xl transition-all duration-500 border border-purple-500/20 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.07] to-transparent rounded-xl"></div>
                <div className="absolute -top-5 right-8">
                  <span className="relative px-4 py-2 rounded-full font-medium text-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-75"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    <span className="relative text-white">Recomendado</span>
                  </span>
                </div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Premium</h3>
                      <p className="text-muted-foreground font-medium">Todo lo que necesitas</p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">$9.99</span>
                      <span className="text-muted-foreground font-medium">/mes</span>
                    </div>
                  </div>
                  <ul className="space-y-6 mb-10">
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:from-purple-500/30 group-hover/item:to-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Calidad HD</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:from-purple-500/30 group-hover/item:to-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Tracks ilimitados</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:from-purple-500/30 group-hover/item:to-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Analytics avanzados</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:from-purple-500/30 group-hover/item:to-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Distribución directa</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:from-purple-500/30 group-hover/item:to-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Monetización</span>
                    </li>
                    <li className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:from-purple-500/30 group-hover/item:to-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-lg text-foreground/90 font-medium">Soporte 24/7</span>
                    </li>
                  </ul>
                  <button className="relative w-full py-5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] focus:scale-[0.98]">
                    Comenzar Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-20">
            {/* Logo y descripción */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Music Platform</h3>
              <p className="text-muted-foreground text-sm">La plataforma que te ayuda a compartir tu música con el mundo y monetizar tu talento.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">1</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">2</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">3</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">4</a>
                </li>
              </ul>
            </div>

            {/* Compañía */}
            <div>
              <h4 className="font-semibold mb-4">Ejemplo</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">1</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">2</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">3</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">4</a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <button className="mt-4 px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-lg hover:bg-muted-foreground transition-colors">
                Contactar Soporte
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">© 2024 Music Platform. Todos los derechos reservados.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacidad</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Términos</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
