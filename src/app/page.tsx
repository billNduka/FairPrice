import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">FairPriceNG</h1>
      <p className="text-gray-600 mb-6">
        Compare prices across Nigerian online stores
      </p>
      <SearchBar />
    </main>
  );
}
