# Canada Citizenship Mock Test - V0.0.5

## Planned Features and Improvements

### 1. Authentication Migration to Supabase
- Replace NextAuth (Auth.js) with **Supabase Auth**.
- Support for **Google** and **GitHub** OAuth providers.
- Maintain existing session management logic but adapted for Supabase hooks/middleware.
- Ensure Prisma is still used for database operations (if compatible) or migrate to Supabase Client for direct DB access if it improves performance.

### 2. Dashboard: Progress & Statistics
- Enhance the user dashboard for logged-in users.
- **Progress Tracker:** Display total tests taken, average score, and pass/fail ratio.
- **Historical Analysis:** Show improvement over time using a simple chart or sparkline.
- **Weak Areas:** Categorize mistakes by "Discover Canada" chapters (e.g., "The Justice System", "History", "Government") to help users focus their study.

### 3. Footer Implementation
- **Copyright:** Include "© codesandtags" in the footer.
- **Version:** Display the current application version (e.g., v0.0.5).
- **Official References:** Add links to:
    - [Official Discover Canada Study Guide](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/study.html)
    - [Official Study Questions](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/study-questions.html)
    - [Immigration, Refugees and Citizenship Canada (IRCC)](https://www.canada.ca/en/immigration-refugees-citizenship.html)

### 4. Timeline Improvements
- Add more critical historical dates and facts from the "Discover Canada" guide to the `/timeline` page.
- **Key dates to include:**
    - 1215: Magna Carta (Freedom of conscience/religion).
    - 1701: Peace of Montreal (Ending Beaver Wars).
    - 1763: Royal Proclamation (Aboriginal rights).
    - 1791: Constitutional Act (Upper and Lower Canada).
    - 1793: Upper Canada abolishes slavery.
    - 1848: Responsible Government established.
    - 1899-1902: South African War (Boer War).
    - 1914-1918: First World War (WWI).
    - 1916: Women's suffrage in MB, SK, AB.
    - 1920: RCMP established.
    - 1939-1945: Second World War (WWII).
    - 1944: D-Day invasion (Juno Beach).
    - 1960: Aboriginal people gain the right to vote.
    - 1969: Official Languages Act.
    - 1971: Multiculturalism policy.
    - 1980: Terry Fox Marathon of Hope.
    - 1999: Creation of Nunavut.
- Improve the visual representation of these events with better categorization and icons.

### 5. Visual Consistency
- Ensure the footer and new dashboard components match the existing "Canadian-themed" aesthetic (Red/White/Neutral tones).

