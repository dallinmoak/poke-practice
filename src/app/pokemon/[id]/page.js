import PokemonPage from "@/components/pokemonPage";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <>
      <PokemonPage id={id} />
    </>
  )
}