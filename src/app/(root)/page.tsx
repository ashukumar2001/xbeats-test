import ListCard from "@/components/blocks/horizontal-list/list-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getHomeData } from "@/lib/music-api-instance";
import { cn } from "@/lib/utils";
export default async function Home() {
  const homePageData = await getHomeData();

  return Object.entries(homePageData).map(([key, section]) => {
    if ("random_songs_listid" in section || key === "discover") return null;
    return (
      <section key={key} className="mb-4">
        <header className="mb-2">
          <h2 className="font-heading text-xl ">{section.title}</h2>
          {section.subtitle && (
            <p className="text-muted-foreground font-medium text-sm">
              {section.subtitle}
            </p>
          )}
        </header>
        <ScrollArea>
          <div
            className={cn("flex gap-1 sm:gap-2 pb-4", {
              "grid grid-flow-col grid-rows-2 place-content-start": [
                "trending",
                "albums",
                "charts",
              ].includes(key),
            })}
          >
            {section.data.map(
              ({ name, id, image, url, type, explicit, subtitle }) => (
                <ListCard
                  key={id}
                  name={name}
                  image={image}
                  url={url}
                  type={type}
                  explicit={explicit}
                  subtitle={subtitle}
                />
              )
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    );
  });
}
