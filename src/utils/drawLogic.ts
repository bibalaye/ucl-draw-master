import { Team } from '@/data/teams';

export interface DrawConstraints {
  maxOpponentsPerPot: number;
  maxHomeMatches: number;
  maxAwayMatches: number;
  maxOpponentsFromSameAssociation: number;
}

export const defaultConstraints: DrawConstraints = {
  maxOpponentsPerPot: 2,
  maxHomeMatches: 4,
  maxAwayMatches: 4,
  maxOpponentsFromSameAssociation: 2
};

export class DrawEngine {
  private teams: Team[];
  private constraints: DrawConstraints;

  constructor(teams: Team[], constraints: DrawConstraints = defaultConstraints) {
    this.teams = [...teams];
    this.constraints = constraints;
  }

  resetDraw(): void {
    this.teams.forEach(team => {
      team.opponents = [];
      team.homeMatches = [];
      team.awayMatches = [];
    });
  }

  canFaceOpponent(teamId: number, opponentId: number): boolean {
    const team = this.teams.find(t => t.id === teamId);
    const opponent = this.teams.find(t => t.id === opponentId);
    
    if (!team || !opponent || teamId === opponentId) return false;

    // Same association check
    if (team.association === opponent.association) return false;

    // Already facing check
    if (team.opponents.includes(opponentId)) return false;

    // Max opponents from same association check
    const opponentsFromSameAssociation = team.opponents
      .map(id => this.teams.find(t => t.id === id))
      .filter(t => t && t.association === opponent.association).length;
    
    if (opponentsFromSameAssociation >= this.constraints.maxOpponentsFromSameAssociation) return false;

    // Pot constraint check (2 opponents per pot)
    const opponentsFromSamePot = team.opponents
      .map(id => this.teams.find(t => t.id === id))
      .filter(t => t && t.pot === opponent.pot).length;
    
    if (opponentsFromSamePot >= this.constraints.maxOpponentsPerPot) return false;

    return true;
  }

  getValidOpponents(teamId: number, fromPot: number): number[] {
    return this.teams
      .filter(t => t.pot === fromPot && this.canFaceOpponent(teamId, t.id))
      .map(t => t.id);
  }

  assignOpponent(teamId: number, opponentId: number, isHome: boolean): void {
    const team = this.teams.find(t => t.id === teamId);
    const opponent = this.teams.find(t => t.id === opponentId);
    
    if (!team || !opponent) return;

    // Add to opponents lists
    team.opponents.push(opponentId);
    opponent.opponents.push(teamId);

    // Assign home/away
    if (isHome) {
      team.homeMatches.push(opponentId);
      opponent.awayMatches.push(teamId);
    } else {
      team.awayMatches.push(opponentId);
      opponent.homeMatches.push(teamId);
    }
  }

  canPlayAtHome(teamId: number): boolean {
    const team = this.teams.find(t => t.id === teamId);
    return team ? team.homeMatches.length < this.constraints.maxHomeMatches : false;
  }

  canPlayAway(teamId: number): boolean {
    const team = this.teams.find(t => t.id === teamId);
    return team ? team.awayMatches.length < this.constraints.maxAwayMatches : false;
  }

  getTeamStats(teamId: number): { 
    opponents: number; 
    homeMatches: number; 
    awayMatches: number; 
    opponentsByPot: Record<number, number>;
    opponentsByAssociation: Record<string, number>;
  } {
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return { 
      opponents: 0, 
      homeMatches: 0, 
      awayMatches: 0, 
      opponentsByPot: {}, 
      opponentsByAssociation: {} 
    };

    const opponentsByPot: Record<number, number> = {};
    const opponentsByAssociation: Record<string, number> = {};

    team.opponents.forEach(oppId => {
      const opp = this.teams.find(t => t.id === oppId);
      if (opp) {
        opponentsByPot[opp.pot] = (opponentsByPot[opp.pot] || 0) + 1;
        opponentsByAssociation[opp.association] = (opponentsByAssociation[opp.association] || 0) + 1;
      }
    });

    return {
      opponents: team.opponents.length,
      homeMatches: team.homeMatches.length,
      awayMatches: team.awayMatches.length,
      opponentsByPot,
      opponentsByAssociation
    };
  }

  simulateCompleteDraw(): boolean {
    this.resetDraw();
    
    // For each team, assign 8 opponents (2 from each pot)
    for (const team of this.teams) {
      for (let pot = 1; pot <= 4; pot++) {
        let assigned = 0;
        const targetAssignments = this.constraints.maxOpponentsPerPot;
        
        while (assigned < targetAssignments) {
          const validOpponents = this.getValidOpponents(team.id, pot);
          if (validOpponents.length === 0) {
            // Backtrack or fail
            return false;
          }

          // Pick a random valid opponent
          const randomIndex = Math.floor(Math.random() * validOpponents.length);
          const opponentId = validOpponents[randomIndex];
          
          // Determine home/away based on current balance
          const canHome = this.canPlayAtHome(team.id);
          const canAway = this.canPlayAway(team.id);
          
          if (!canHome && !canAway) return false;
          
          const isHome = canHome && (!canAway || Math.random() < 0.5);
          
          this.assignOpponent(team.id, opponentId, isHome);
          assigned++;
        }
      }
    }

    return true;
  }

  getUpdatedTeams(): Team[] {
    return [...this.teams];
  }
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};