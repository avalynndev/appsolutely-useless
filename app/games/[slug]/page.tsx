'use client'
 
import { useParams } from 'next/navigation'
import { GamePageClient } from "./view";


export default function GamePage() {
  const params = useParams<{ slug: string }>();
  return <GamePageClient slug={params.slug} />;
}