import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ListCard, { ListCardProps } from "./list-card";

type HorizonalListProps = {
  title: string;
  subtitle?: string;
  items: ({ id: string } & ListCardProps)[];
};

const HorizonalList = ({ title, subtitle, items }: HorizonalListProps) => {
  return (
    <section className="mb-4">
      <header className="mb-2">
        <h2 className="font-heading text-xl ">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground font-medium text-sm">
            {subtitle}
          </p>
        )}
      </header>
      <ScrollArea>
        <div className="flex space-x-4">
          {items.map(({ name, id, image, url, type, explicit, subtitle }) => (
            <ListCard
              key={id}
              name={name}
              image={image}
              url={url}
              type={type}
              explicit={explicit}
              subtitle={subtitle}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default HorizonalList;
