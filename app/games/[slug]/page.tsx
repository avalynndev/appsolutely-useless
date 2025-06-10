import { games } from "@/lib/game-data";
import { GamePageClient } from "./view";

export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.id,
  }));
}

interface GamePageProps {
  params: { slug: string };
}

export default function GamePage({ params }: GamePageProps) {
  return <GamePageClient slug={params.slug} />;
}
