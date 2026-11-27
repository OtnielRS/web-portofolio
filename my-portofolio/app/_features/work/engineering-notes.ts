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
    focus: "A playful quiz experience with authenticated API access",
    scope: "Full-stack developer · October 2026",
    contribution: "I built a responsive React interface with Tailwind CSS and Vite, managed application state with Redux, added JWT authentication and access checks, and connected the frontend to RESTful APIs.",
    challenge: "The quiz needs to keep question progress and scores consistent while connecting a responsive interface to authenticated API endpoints.",
    approach: "React and Tailwind CSS provide the interface, Vite supports the frontend build, and Redux manages application state. Asynchronous requests fetch and display data from RESTful APIs.",
    validation: "JWT authentication with jsonwebtoken and access checks manages sessions and protects private API endpoints.",
    topics: ["Responsive React interface with Tailwind CSS and Vite", "Redux application state management", "JWT authentication and private API access checks", "Asynchronous RESTful API integration"],
  },
];
