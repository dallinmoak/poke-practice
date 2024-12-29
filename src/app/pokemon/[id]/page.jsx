import PokemonPage from "@/components/client/pokemonPage";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <>
      <PokemonPage id={id} />
    </>
  )
}