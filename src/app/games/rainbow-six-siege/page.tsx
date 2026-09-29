import { GamePage } from "../../components/GamePage";
export const dynamic = "force-dynamic";
export default async function Page({ searchParams }: { searchParams: Promise<{ player?: string }> }) {
  const { player } = await searchParams;
  return <GamePage slug="rainbow-six-siege" player={player}/>;
}
