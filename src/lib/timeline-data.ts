export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: "Discovery" | "Conflict" | "Politics" | "Society";
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "e1",
    year: "1497",
    title: "John Cabot Reaches Newfoundland",
    description: "European exploration began in earnest. John Cabot, an Italian navigator sailing for the British Crown, mapped the island of Newfoundland.",
    category: "Discovery"
  },
  {
    id: "e2",
    year: "1534",
    title: "Jacques Cartier's First Voyage",
    description: "Jacques Cartier made three voyages across the Atlantic, claiming the land for King Francis I of France.",
    category: "Discovery"
  },
  {
    id: "e3",
    year: "1604",
    title: "First European Settlement",
    description: "The first European settlement north of Florida was established by French explorers Pierre de Monts and Samuel de Champlain, first on St. Croix Island, then at Port-Royal.",
    category: "Discovery"
  },
  {
    id: "e4",
    year: "1608",
    title: "Founding of Québec",
    description: "Samuel de Champlain built a fortress at what is now Québec City, forging alliances with Algonquin, Montagnais, and Huron-Wendat.",
    category: "Discovery"
  },
  {
    id: "e5",
    year: "1670",
    title: "Hudson's Bay Company",
    description: "King Charles II of England granted the Hudson's Bay Company exclusive trading rights over the watershed draining into Hudson Bay.",
    category: "Politics"
  },
  {
    id: "e6",
    year: "1759",
    title: "Battle of the Plains of Abraham",
    description: "The British defeated the French in Québec City, marking the end of France's empire in America.",
    category: "Conflict"
  },
  {
    id: "e7",
    year: "1774",
    title: "The Quebec Act",
    description: "Passed by the British Parliament to restore French civil law while maintaining British criminal law, accommodating the Catholic majority.",
    category: "Politics"
  },
  {
    id: "e8",
    year: "1812",
    title: "The War of 1812",
    description: "The United States invaded Canada during a conflict with Britain. Canadian volunteers and First Nations repulsed the invaders, solidifying Canada's distinct identity.",
    category: "Conflict"
  },
  {
    id: "e9",
    year: "1867",
    title: "Confederation",
    description: "On July 1st, the British North America Act established the Dominion of Canada, uniting Ontario, Quebec, Nova Scotia, and New Brunswick.",
    category: "Politics"
  },
  {
    id: "e10",
    year: "1885",
    title: "Transcontinental Railway Completion",
    description: "The Canadian Pacific Railway was completed, fulfilling a promise made to British Columbia upon its entry to Confederation.",
    category: "Society"
  },
  {
    id: "e11",
    year: "1917",
    title: "Battle of Vimy Ridge",
    description: "Canadian Corps captured Vimy Ridge in France in World War I, a defining moment that forged a new sense of national identity.",
    category: "Conflict"
  },
  {
    id: "e12",
    year: "1918",
    title: "Women's Suffrage",
    description: "Most Canadian female citizens aged 21 and over were granted the right to vote in federal elections, following the trailblazing efforts of suffragettes.",
    category: "Society"
  },
  {
    id: "e13",
    year: "1921",
    title: "National Colours Assigned",
    description: "King George V proclaimed red and white as the national colours of Canada.",
    category: "Society"
  },
  {
    id: "e14",
    year: "1944",
    title: "D-Day Invasion",
    description: "Canadian soldiers landed at Juno Beach in Normandy as part of the massive Allied invasion of Europe during World War II.",
    category: "Conflict"
  },
  {
    id: "e15",
    year: "1965",
    title: "New Canadian Flag",
    description: "The modern red and white maple leaf flag was first raised on February 15th, replacing the Red Ensign.",
    category: "Society"
  },
  {
    id: "e16",
    year: "1982",
    title: "Charter of Rights and Freedoms",
    description: "The Constitution of Canada was patriaed, meaning it could be amended without British approval, and the Canadian Charter of Rights and Freedoms was entrenched.",
    category: "Politics"
  }
];
