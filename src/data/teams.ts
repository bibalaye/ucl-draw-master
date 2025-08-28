export interface Team {
  id: number;
  name: string;
  country: string;
  association: string;
  pot: number;
  opponents: number[];
  homeMatches: number[];
  awayMatches: number[];
}

export const teams: Team[] = [
  // Pot 1
  { id: 1, name: "Real Madrid", country: "ESP", association: "ESP", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 2, name: "Manchester City", country: "ENG", association: "ENG", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 3, name: "Bayern Munich", country: "GER", association: "GER", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 4, name: "PSG", country: "FRA", association: "FRA", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 5, name: "Liverpool", country: "ENG", association: "ENG", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 6, name: "Inter Milan", country: "ITA", association: "ITA", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 7, name: "Borussia Dortmund", country: "GER", association: "GER", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 8, name: "RB Leipzig", country: "GER", association: "GER", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 9, name: "Barcelona", country: "ESP", association: "ESP", pot: 1, opponents: [], homeMatches: [], awayMatches: [] },

  // Pot 2
  { id: 10, name: "Arsenal", country: "ENG", association: "ENG", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 11, name: "Atletico Madrid", country: "ESP", association: "ESP", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 12, name: "Atalanta", country: "ITA", association: "ITA", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 13, name: "Juventus", country: "ITA", association: "ITA", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 14, name: "AC Milan", country: "ITA", association: "ITA", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 15, name: "Lille", country: "FRA", association: "FRA", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 16, name: "Bayer Leverkusen", country: "GER", association: "GER", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 17, name: "Red Bull Salzburg", country: "AUT", association: "AUT", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 18, name: "Benfica", country: "POR", association: "POR", pot: 2, opponents: [], homeMatches: [], awayMatches: [] },

  // Pot 3
  { id: 19, name: "Monaco", country: "FRA", association: "FRA", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 20, name: "Sporting CP", country: "POR", association: "POR", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 21, name: "PSV Eindhoven", country: "NED", association: "NED", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 22, name: "Dinamo Zagreb", country: "CRO", association: "CRO", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 23, name: "Feyenoord", country: "NED", association: "NED", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 24, name: "Club Brugge", country: "BEL", association: "BEL", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 25, name: "Celtic", country: "SCO", association: "SCO", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 26, name: "Young Boys", country: "SUI", association: "SUI", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 27, name: "Shakhtar Donetsk", country: "UKR", association: "UKR", pot: 3, opponents: [], homeMatches: [], awayMatches: [] },

  // Pot 4
  { id: 28, name: "Bologna", country: "ITA", association: "ITA", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 29, name: "Girona", country: "ESP", association: "ESP", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 30, name: "Stuttgart", country: "GER", association: "GER", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 31, name: "Sturm Graz", country: "AUT", association: "AUT", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 32, name: "Brest", country: "FRA", association: "FRA", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 33, name: "Aston Villa", country: "ENG", association: "ENG", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 34, name: "Red Star Belgrade", country: "SRB", association: "SRB", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 35, name: "Sparta Prague", country: "CZE", association: "CZE", pot: 4, opponents: [], homeMatches: [], awayMatches: [] },
  { id: 36, name: "Slovan Bratislava", country: "SVK", association: "SVK", pot: 4, opponents: [], homeMatches: [], awayMatches: [] }
];

export const getTeamsByPot = (pot: number): Team[] => {
  return teams.filter(team => team.pot === pot);
};

export const getTeamById = (id: number): Team | undefined => {
  return teams.find(team => team.id === id);
};