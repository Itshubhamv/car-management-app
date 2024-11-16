import CarDetailsPage from "@/app/components/CarDetailsPage";
import Header from "@/app/components/Header";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <CarDetailsPage id={id} />
        </div>
      </div>
    </div>
  );
}
