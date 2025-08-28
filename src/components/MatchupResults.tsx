import { Team, getTeamById } from '@/data/teams';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Plane } from 'lucide-react';

interface MatchupResultsProps {
  teams: Team[];
}

const MatchupResults = ({ teams }: MatchupResultsProps) => {
  if (teams.length === 0 || teams.every(t => t.opponents.length === 0)) {
    return null;
  }

  const potColors = {
    1: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    2: 'bg-blue-100 text-blue-800 border-blue-300',
    3: 'bg-green-100 text-green-800 border-green-300',
    4: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Résultats du tirage</h2>
      
      <div className="grid gap-4">
        {teams.map(team => (
          <Card key={team.id} className="uefa-card p-4">
            <div className="flex items-start gap-4">
              {/* Team Header */}
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={potColors[team.pot as keyof typeof potColors]}>
                    Pot {team.pot}
                  </Badge>
                  <h3 className="font-semibold text-lg">{team.name}</h3>
                  <span className="text-sm text-muted-foreground">({team.country})</span>
                </div>
              </div>

              {/* Opponents */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Home Matches */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">À domicile</span>
                    </div>
                    <div className="space-y-1">
                      {team.homeMatches.map(oppId => {
                        const opponent = getTeamById(oppId);
                        return opponent ? (
                          <div key={oppId} className="match-item flex items-center justify-between">
                            <span className="font-medium">{opponent.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Pot {opponent.pot}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{opponent.country}</span>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Away Matches */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Plane className="w-4 h-4 text-accent" />
                      <span className="font-medium text-sm">À l'extérieur</span>
                    </div>
                    <div className="space-y-1">
                      {team.awayMatches.map(oppId => {
                        const opponent = getTeamById(oppId);
                        return opponent ? (
                          <div key={oppId} className="match-item flex items-center justify-between">
                            <span className="font-medium">{opponent.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Pot {opponent.pot}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{opponent.country}</span>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Total: {team.opponents.length} adversaires</span>
                    <span>Domicile: {team.homeMatches.length}</span>
                    <span>Extérieur: {team.awayMatches.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchupResults;