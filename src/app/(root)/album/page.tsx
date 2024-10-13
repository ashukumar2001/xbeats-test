import { getTopAlbums } from "@/lib/music-api-instance";
import { Lang } from "@/types";
import TopAlbums from "./_components/top-albums";

type TopAlbumsPageProps = {
  searchParams: { page?: number; lang?: Lang };
};
export default async function TopAlbumsPage({
  searchParams,
}: TopAlbumsPageProps) {
  const { lang, page = 1 } = searchParams;
  const initialTopAlbumsData = await getTopAlbums(page, 50, lang);
  return (
    <section className="mb-4">
      <header className="mb-2">
        <h2 className="font-heading text-xl">New Releases</h2>
      </header>

      <TopAlbums initialAlbums={initialTopAlbumsData} lang={lang} />
    </section>
  );
}
