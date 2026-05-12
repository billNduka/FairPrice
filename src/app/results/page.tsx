"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceHistogram } from "@/components/PriceHistogram";
import { PriceBySource } from "@/components/PriceBySource";

const mockResults = [
  { site: "Jumia", price: "₦250,000", link: "#", image:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/045684/1.jpg?2327" },
  { site: "Konga", price: "₦245,000", link: "#", image:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/045684/1.jpg?2327"},
  { site: "Slot", price: "₦255,000", link: "#", image:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/045684/1.jpg?2327" },
];

const sortTypes = {
  Popularity: "Popularity",
  Newest: "Newest",
  Rating: "Rating",
  PriceAscending: "Price: Ascending",
  PriceDescending : "Price: Descending" 
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<keyof typeof sortTypes>("Popularity")

  useEffect(() => {
    fetch(`http://localhost:5500/products/search?query=${query}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.filteredResults);
        console.log("Fetched results:", data.filteredResults); // Log the actual data here
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query, sort]);
  
  return (
    <main className="p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Results for: <span className="text-blue-600">{query}</span>
      </h2>



      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <PriceBySource results={results.map(r => ({ price: r.price, source: r.source }))} />
          <PriceHistogram results={results.map(r => ({ price: r.price, source: r.source }))} />
          <select 
            className="text-white bg-slate-900 border border-slate-700 rounded px-3 py-2 my-3"
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof sortTypes)}
          >
            {Object.values(sortTypes).map((item) => (<option key={item}>{item}</option>))}
            {/* <option>Popularity</option>
            <option>Newest</option>
            <option>Price: Ascending</option>
            <option>Price: Descending</option> */}
          </select>

          <ul className="space-y-4">
            {results.map((item, idx) => (
              <li key={idx} className="border object-contain p-4 rounded-lg shadow ">
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{item.source.toUpperCase()}</p>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-green-600">{item.price}</p>
                    <a href={item.link} className="text-blue-500 underline border border-dashed p-1">
                      View product
                    </a>
                  </div>

                  
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
    
  );
  
}
