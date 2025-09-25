"use client";
import { useSearchParams } from "next/navigation";

const mockResults = [
  { site: "Jumia", price: "₦250,000", link: "#", image:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/045684/1.jpg?2327" },
  { site: "Konga", price: "₦245,000", link: "#", image:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/045684/1.jpg?2327"},
  { site: "Slot", price: "₦255,000", link: "#", image:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/045684/1.jpg?2327" },
];

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <main className="p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Results for: <span className="text-blue-600">{query}</span>
      </h2>

      <ul className="space-y-4">
        {mockResults.map((item, idx) => (
          <li key={idx} className="border p-4 rounded-lg shadow">
            <p className="font-medium">{item.site}</p>
            <p className="text-green-600">{item.price}</p>
            <a href={item.link} className="text-blue-500 underline border border-dashed p-1">
              View product
            </a>
            <img className= "border-solid rounded green-300" src={item.image}></img>
          </li>
        ))}
      </ul>
    </main>
  );
}
