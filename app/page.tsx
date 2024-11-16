import Cars from "./components/Cars";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 dark:bg-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <Cars />
        </div>
      </div>
    </div>
  );
}
