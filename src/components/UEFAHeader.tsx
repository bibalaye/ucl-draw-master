import { Trophy, Star } from 'lucide-react';

const UEFAHeader = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary-light" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 animate-uefa-float">
          <Star className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-20 right-20 animate-uefa-float" style={{ animationDelay: '1s' }}>
          <Star className="w-6 h-6 text-white/20" />
        </div>
        <div className="absolute bottom-10 left-1/4 animate-uefa-float" style={{ animationDelay: '2s' }}>
          <Star className="w-4 h-4 text-white/20" />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Trophy className="w-12 h-12 text-white" />
          <h1 className="text-5xl font-bold text-white tracking-tight">
            UEFA Champions League
          </h1>
          <Trophy className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white/90">
            Simulateur de Tirage au Sort
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Découvrez le nouveau format de la phase de ligue avec 36 équipes. 
            Chaque équipe affronte 8 adversaires dans cette simulation officielle.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-white/70">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">36</div>
            <div className="text-sm">Équipes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-sm">Matchs par équipe</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">144</div>
            <div className="text-sm">Matchs au total</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UEFAHeader;