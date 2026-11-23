// These notes use the project contributions recorded in PRODUCT.md and the supplied résumé.
type EngineeringNote = {
  art: string;
  href: string;
  focus: string;
  scope: string;
  contribution: string;
  challenge: string;
  approach: string;
  validation: string;
  topics: string[];
  overviewOnly?: boolean;
};

export const engineeringNotes: EngineeringNote[] = [
  {
    art: "bastion",
    href: "/work/bastionfall",
    focus: "AI narration with validation and fallbacks",
    scope: "Backend developer in a team of three · November 2026",
    contribution: "I built the TypeScript game engine and integrated Gemini-generated events with Zod validation and fallback handling for a 100-day city-defense campaign.",
    challenge: "The campaign combines AI-generated narrative with game rules and delayed consequences. Generated event data needs a validation boundary before the game uses it.",
    approach: "Zod validation and fallback handling support the AI integration. The game engine manages campaign state and consequences in TypeScript, while Gemini supplies generated narrative events.",
    validation: "The project work included difficulty simulations, alongside validation and fallback handling. These are the implementation areas behind the campaign shown in the live demo.",
    topics: ["TypeScript game engine", "Gemini-generated events", "Zod validation and fallbacks", "Delayed consequences and difficulty simulations"],
  },
  {
    art: "chess",
    href: "/work/hacktiv-chess",
    focus: "Real-time play with server-side validation and recovery",
    scope: "Backend developer in a team of three · One-week project · October 2026",
    contribution: "I built real-time synchronization, server-side move validation, and session recovery for a multiplayer chess app.",
    challenge: "A multiplayer match needs consistent moves, turns, and clocks across players, including when a connection is interrupted.",
    approach: "Socket.io synchronizes moves, turns, and timers. Move validation runs on the server; persistent game history and session recovery support reconnecting players.",
    validation: "Server-side move validation, matchmaking, authentication, and reconnection handling were part of my backend contribution. The live application exposes the multiplayer experience built on those systems.",
    topics: ["Socket.io move, turn, and timer synchronization", "Server-side move validation", "Matchmaking and authentication", "Persistent game history and session recovery"],
  },
  {
    art: "store",
    href: "/work/alice-store",
    focus: "A laptop catalog with authentication and persistent product data",
    scope: "Full-stack developer · November 2026",
    contribution: "I built a full-stack laptop catalog with product categories, detailed specifications, authentication, and MongoDB persistence.",
    challenge: "The application combines public product browsing with account authentication and structured laptop specifications.",
    approach: "Next.js and React provide the interface, MongoDB stores application data, and JWT with bcryptjs supports authentication. Zod validates user input.",
    validation: "Input validation, authentication, and database persistence are part of the implementation. The live demo shows the catalog, categories, and product-detail experience.",
    topics: ["Laptop categories and detailed specifications", "Next.js and React interface", "MongoDB persistence", "JWT authentication and Zod validation"],
  },
  {
    art: "social",
    href: "/work/tempat-gosip",
    focus: "A mobile social app with a GraphQL API and secure sessions",
    scope: "Full-stack developer · October 2026",
    contribution: "I built a mobile social app with posts, likes, comments, following, a GraphQL API, and secure device sessions.",
    challenge: "The mobile experience connects social interactions with authenticated accounts and persistent application data.",
    approach: "React Native and Expo provide the mobile application. Apollo Client connects to a Node.js GraphQL API with Apollo Server and MongoDB. JWT sessions use Expo SecureStore on the device.",
    validation: "The implementation includes authenticated sessions and secure device storage. The supplied app screens show sign-in, account creation, the home feed, and a profile.",
    topics: ["React Native and Expo mobile interface", "Posts, likes, comments, and following", "Apollo and GraphQL API", "JWT sessions with Expo SecureStore"],
  },
  {
    art: "animal",
    href: "/work/animal-quiz",
    focus: "Discovering the animal world through playful learning",
    scope: "Animal-learning web application",
    overviewOnly: true,
    contribution: "Animal Quiz is a children's animal-learning experience with learning cards, playful quizzes, and parent accounts.",
    challenge: "The experience introduces animals through easy-to-understand questions and a colorful, playful interface.",
    approach: "Children can explore animal learning cards and quizzes. The supplied homepage presents familiar animals and a start-adventure action.",
    validation: "The homepage also provides parent sign-in and account registration, alongside access to learning cards and trivia.",
    topics: ["Animal learning cards", "Playful quizzes and trivia", "Child-friendly homepage", "Parent sign-in and registration"],
  },
];
