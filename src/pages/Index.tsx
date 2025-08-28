import { useState } from 'react';
import { Team, teams } from '@/data/teams';
import UEFAHeader from '@/components/UEFAHeader';
import DrawMachine from '@/components/DrawMachine';
import MatchupResults from '@/components/MatchupResults';

const Index = () => {
  const [drawnTeams, setDrawnTeams] = useState<Team[]>(teams);

  const handleDrawComplete = (newTeams: Team[]) => {
    setDrawnTeams(newTeams);
  };

  return (
    <div className="uefa-container">
      <UEFAHeader />
      
      <main className="container mx-auto px-6 py-12 space-y-12">
        <DrawMachine onDrawComplete={handleDrawComplete} />
        <MatchupResults teams={drawnTeams} />
      </main>
      
      <footer className="bg-primary/5 border-t border-border/30 py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>Simulateur UEFA Champions League 2025/26 - Format Phase de Ligue</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
