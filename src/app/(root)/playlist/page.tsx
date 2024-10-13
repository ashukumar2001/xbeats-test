import { getFeaturedPlaylists } from "@/lib/music-api-instance";
import { Lang } from "@/types";
import TopPlaylists from "./_components/top-playlists";

type TopPlaylistsPageProps = {
  searchParams: { page?: number; lang?: Lang };
};

export default async function TopPlaylistsPage({
  searchParams,
}: TopPlaylistsPageProps) {
  const { lang, page = 1 } = searchParams;
  const featruedPlaylists = await getFeaturedPlaylists(page, 50, lang);
  return (
    <section className="mb-4">
      <header className="mb-2">
        <h2 className="font-heading text-xl">Top Playlists</h2>
      </header>

      <TopPlaylists initialPlaylists={featruedPlaylists} />
    </section>
  );
}
