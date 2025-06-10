import { games } from "@/lib/game-data";
import { GamePageClient } from "@/components/game-view";

export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.id,
  }));
}


export default function GamePage({ params }: any) {
  return <GamePageClient params={params} />;
}
