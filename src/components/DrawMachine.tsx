import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Team, getTeamsByPot } from '@/data/teams';
import { DrawEngine, shuffleArray } from '@/utils/drawLogic';
import DrawBall from './DrawBall';
import { Play, RotateCcw, Pause } from 'lucide-react';

interface DrawMachineProps {
  onDrawComplete: (teams: Team[]) => void;
}

const DrawMachine = ({ onDrawComplete }: DrawMachineProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPot, setCurrentPot] = useState(1);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [drawnTeam, setDrawnTeam] = useState<Team | null>(null);
  const [drawEngine] = useState(() => new DrawEngine([]));
  const [drawLog, setDrawLog] = useState<string[]>([]);

  const startDraw = () => {
    setIsDrawing(true);
    setCurrentPot(1);
    setCurrentTeamIndex(0);
    setDrawnTeam(null);
    setDrawLog([]);
    drawEngine.resetDraw();
    
    // Start the drawing process
    drawNextTeam();
  };

  const drawNextTeam = () => {
    if (currentPot > 4) {
      // Draw complete
      completeDraw();
      return;
    }

    const teamsInPot = getTeamsByPot(currentPot);
    const shuffledTeams = shuffleArray(teamsInPot);
    
    if (currentTeamIndex >= shuffledTeams.length) {
      // Move to next pot
      setCurrentPot(prev => prev + 1);
      setCurrentTeamIndex(0);
      setTimeout(drawNextTeam, 1000);
      return;
    }

    const team = shuffledTeams[currentTeamIndex];
    setDrawnTeam(team);
    
    // Add to draw log
    setDrawLog(prev => [...prev, `Pot ${currentPot}: ${team.name} (${team.country})`]);

    // Move to next team in pot
    setTimeout(() => {
      setCurrentTeamIndex(prev => prev + 1);
      setDrawnTeam(null);
      setTimeout(drawNextTeam, 1500);
    }, 2000);
  };

  const completeDraw = () => {
    // Simulate the complete draw assignment
    const success = drawEngine.simulateCompleteDraw();
    
    if (success) {
      const finalTeams = drawEngine.getUpdatedTeams();
      onDrawComplete(finalTeams);
      setDrawLog(prev => [...prev, '✅ Tirage terminé avec succès!']);
    } else {
      setDrawLog(prev => [...prev, '❌ Erreur dans le tirage, recommencez']);
    }
    
    setIsDrawing(false);
  };

  const resetDraw = () => {
    setIsDrawing(false);
    setCurrentPot(1);
    setCurrentTeamIndex(0);
    setDrawnTeam(null);
    setDrawLog([]);
    drawEngine.resetDraw();
  };

  const potNames = {
    1: 'Chapeau 1',
    2: 'Chapeau 2', 
    3: 'Chapeau 3',
    4: 'Chapeau 4'
  };

  return (
    <div className="space-y-6">
      {/* Main Draw Area */}
      <Card className="uefa-card p-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Machine de Tirage UEFA
          </h2>
          
          {/* Current Pot Display */}
          {isDrawing && (
            <div className="text-xl font-semibold text-muted-foreground">
              {potNames[currentPot as keyof typeof potNames]}
            </div>
          )}

          {/* Ball Display Area */}
          <div className="flex justify-center items-center min-h-[200px]">
            {drawnTeam ? (
              <div className="space-y-4">
                <DrawBall team={drawnTeam} isDrawing={true} size="lg" />
                <div className="text-center">
                  <div className="text-xl font-bold">{drawnTeam.name}</div>
                  <div className="text-sm text-muted-foreground">{drawnTeam.country}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <DrawBall size="lg" />
                <div className="text-muted-foreground">
                  {isDrawing ? 'Tirage en cours...' : 'Prêt pour le tirage'}
                </div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startDraw} 
              disabled={isDrawing}
              className="uefa-button"
            >
              <Play className="w-4 h-4 mr-2" />
              {isDrawing ? 'Tirage en cours...' : 'Commencer le tirage'}
            </Button>
            
            <Button 
              onClick={resetDraw}
              variant="outline"
              disabled={isDrawing}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer
            </Button>
          </div>
        </div>
      </Card>

      {/* Draw Log */}
      {drawLog.length > 0 && (
        <Card className="uefa-card p-6">
          <h3 className="text-lg font-semibold mb-4">Journal du tirage</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {drawLog.map((entry, index) => (
              <div 
                key={index}
                className="text-sm p-2 rounded bg-muted/30 animate-in slide-in-from-bottom-2"
              >
                {entry}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DrawMachine;