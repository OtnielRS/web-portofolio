type Overview = { summary: string; features: string[]; experienceTitle: string; experience: string; details: string; accessTitle: string; access: string };

export const projectOverviews: Record<string, Overview> = {
  bastion: {
    summary: "Bastionfall is a single-player fantasy city-defense game. Players manage resources, respond to AI-generated events, and defend their city through a 100-day campaign with 10 monster waves.",
    features: ["City upgrades and resource management", "AI-generated events and choices", "Monster waves and delayed consequences", "Saved campaigns and difficulty settings"],
    experienceTitle: "Gameplay experience",
    experience: "Every day brings decisions about strengthening the city, recruiting soldiers, and preparing for the next invasion.",
    details: "Players upgrade buildings, manage defenses, and respond to narrative events. Their choices can change resources and influence future city events.",
    accessTitle: "Campaign access",
    access: "Players can sign in, continue a saved campaign, or start a new game.",
  },
  chess: {
    summary: "Hacktiv Chess Ultimate is a chess web app with real-time multiplayer matches, matchmaking, and session recovery. Players can also challenge Stockfish and practice tactical puzzles.",
    features: ["Casual and ranked multiplayer matches", "Stockfish opponents and tactical puzzles", "Live clocks and move history", "Post-game analysis and board customization"],
    experienceTitle: "Playing experience",
    experience: "Players choose a time control, find an opponent, and follow the match with live clocks and a move timeline.",
    details: "The app supports multiplayer games, engine practice, and post-game move analysis. Board colors and pieces can be personalized from settings.",
    accessTitle: "Player accounts",
    access: "Accounts provide access to player profiles, game histories, and persistent player data. Session recovery lets reconnecting players resume their games.",
  },
  store: {
    summary: "Alice Store is a laptop catalog where shoppers browse products by category and explore specifications, images, and prices.",
    features: ["Featured laptops and product categories", "Catalog search and price filters", "Product galleries and detailed specifications", "Account access and wishlists"],
    experienceTitle: "Shopping experience",
    experience: "The storefront guides visitors from featured laptops to a searchable catalog and detailed product information.",
    details: "Shoppers can filter laptops by category and price, view product galleries, and save candidates to a wishlist for later consideration.",
    accessTitle: "Customer accounts",
    access: "Visitors can browse the catalog publicly and sign in to access account features such as their wishlist.",
  },
  social: {
    summary: "Tempat Gosip is a mobile social media app for sharing posts and connecting with other people through likes, comments, and following.",
    features: ["Post creation and a home feed", "Likes and comments", "User profiles and following", "Sign-in, registration, and device sessions"],
    experienceTitle: "Social experience",
    experience: "The mobile feed brings posts and conversations together, while profiles help people discover and follow other users.",
    details: "Users can publish posts, interact through likes and comments, and manage follow relationships within the mobile application.",
    accessTitle: "Account access",
    access: "Sign-in and registration connect users to authenticated accounts, with sessions stored securely on their device.",
  },
  animal: {
    summary: "Animal Quiz is a single-player animal quiz web app for children. Players choose an answer for each question, and their score is based on the number of correct answers.",
    features: ["Animal learning cards", "Multiple-choice quizzes and trivia", "Progress tracking and answer reviews", "Parent accounts and child profiles"],
    experienceTitle: "Learning experience",
    experience: "Easy-to-understand questions and a colorful interface help children discover animals through play.",
    details: "Children answer questions, track their progress, and see their score at the end. The results screen reviews answers and shares an animal fact.",
    accessTitle: "Parent access",
    access: "Parents can register or sign in, then use the dashboard to add child profiles before starting a quiz.",
  },
};
