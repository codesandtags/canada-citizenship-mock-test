export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: "Discovery" | "Conflict" | "Politics" | "Society";
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "magna-carta",
    year: "1215",
    title: "Magna Carta",
    description: "The Great Charter of Freedoms was signed in England, establishing the rule of law and laying the foundation for freedom of conscience and religion.",
    category: "Politics"
  },
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
    id: "peace-montreal",
    year: "1701",
    title: "Peace of Montreal",
    description: "The French and the Iroquois signed a peace treaty, ending the Beaver Wars and bringing peace to the region.",
    category: "Conflict"
  },
  {
    id: "e6",
    year: "1759",
    title: "Battle of the Plains of Abraham",
    description: "The British defeated the French in Québec City, marking the end of France's empire in America.",
    category: "Conflict"
  },
  {
    id: "royal-proclamation",
    year: "1763",
    title: "Royal Proclamation",
    description: "King George III guaranteed territorial rights to Indigenous peoples, forming the basis for treaties and Aboriginal rights.",
    category: "Politics"
  },
  {
    id: "e7",
    year: "1774",
    title: "The Quebec Act",
    description: "Passed by the British Parliament to restore French civil law while maintaining British criminal law, accommodating the Catholic majority.",
    category: "Politics"
  },
  {
    id: "constitutional-act",
    year: "1791",
    title: "Constitutional Act",
    description: "Divided the Province of Quebec into Upper Canada (mostly English-speaking) and Lower Canada (mostly French-speaking), granting legislative assemblies.",
    category: "Politics"
  },
  {
    id: "abolish-slavery",
    year: "1793",
    title: "Upper Canada Abolishes Slavery",
    description: "Lieutenant Governor John Graves Simcoe passed the Act Against Slavery, making Upper Canada the first province in the British Empire to move toward abolition.",
    category: "Society"
  },
  {
    id: "e8",
    year: "1812",
    title: "The War of 1812",
    description: "The United States invaded Canada during a conflict with Britain. Canadian volunteers and First Nations repulsed the invaders, solidifying Canada's distinct identity.",
    category: "Conflict"
  },
  {
    id: "responsible-gov",
    year: "1848",
    title: "Responsible Government",
    description: "Nova Scotia became the first British North American colony to attain full responsible government, followed by the United Province of Canada.",
    category: "Politics"
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
    title: "Transcontinental Railway",
    description: "The Canadian Pacific Railway was completed, fulfilling a promise made to British Columbia upon its entry to Confederation.",
    category: "Society"
  },
  {
    id: "boer-war",
    year: "1899",
    title: "South African War (Boer War)",
    description: "Over 7,000 Canadians volunteered to fight in the South African War (1899-1902), cementing national pride in the Canadian military.",
    category: "Conflict"
  },
  {
    id: "ww1",
    year: "1914",
    title: "First World War Begins",
    description: "Britain declared war on Germany in 1914. More than 600,000 Canadians served in the First World War (1914-1918), leading to massive sacrifices and a unified identity.",
    category: "Conflict"
  },
  {
    id: "suffrage-prairies",
    year: "1916",
    title: "Women's Suffrage in Prairies",
    description: "Manitoba, Saskatchewan, and Alberta became the first provinces to grant women the right to vote in provincial elections.",
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
    title: "Federal Women's Suffrage",
    description: "Most Canadian female citizens aged 21 and over were granted the right to vote in federal elections, following the trailblazing efforts of suffragettes.",
    category: "Society"
  },
  {
    id: "rcmp",
    year: "1920",
    title: "RCMP Established",
    description: "The Royal North-West Mounted Police merged with the Dominion Police to become the Royal Canadian Mounted Police (RCMP).",
    category: "Politics"
  },
  {
    id: "e13",
    year: "1921",
    title: "National Colours Assigned",
    description: "King George V proclaimed red and white as the national colours of Canada.",
    category: "Society"
  },
  {
    id: "ww2",
    year: "1939",
    title: "Second World War",
    description: "More than one million Canadians and Newfoundlanders served in the Second World War (1939-1945), making massive contributions to the Allied victory.",
    category: "Conflict"
  },
  {
    id: "e14",
    year: "1944",
    title: "D-Day Invasion",
    description: "Canadian soldiers landed at Juno Beach in Normandy as part of the massive Allied invasion of Europe during World War II.",
    category: "Conflict"
  },
  {
    id: "aboriginal-vote",
    year: "1960",
    title: "Aboriginal Right to Vote",
    description: "Aboriginal people were granted the right to vote in federal elections without losing their treaty status.",
    category: "Society"
  },
  {
    id: "e15",
    year: "1965",
    title: "New Canadian Flag",
    description: "The modern red and white maple leaf flag was first raised on February 15th, replacing the Red Ensign.",
    category: "Society"
  },
  {
    id: "languages-act",
    year: "1969",
    title: "Official Languages Act",
    description: "Passed by Parliament, ensuring federal services are provided in both English and French.",
    category: "Politics"
  },
  {
    id: "multiculturalism",
    year: "1971",
    title: "Multiculturalism Policy",
    description: "Canada became the first country in the world to adopt an official policy of multiculturalism.",
    category: "Society"
  },
  {
    id: "terry-fox",
    year: "1980",
    title: "Terry Fox's Marathon of Hope",
    description: "Terry Fox, who lost his right leg to cancer, began his cross-Canada run to raise money for cancer research.",
    category: "Society"
  },
  {
    id: "e16",
    year: "1982",
    title: "Charter of Rights and Freedoms",
    description: "The Constitution of Canada was patriated, meaning it could be amended without British approval, and the Canadian Charter of Rights and Freedoms was entrenched.",
    category: "Politics"
  },
  {
    id: "nunavut",
    year: "1999",
    title: "Creation of Nunavut",
    description: "The map of Canada was redrawn as Nunavut, the third territory, was created, granting the Inuit people greater self-government.",
    category: "Politics"
  }
];
