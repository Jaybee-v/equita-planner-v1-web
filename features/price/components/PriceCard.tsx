import Price from "@/types/Price";

type PriceCardProps = {
  price: Price;
};

export const PriceCard = ({ price }: PriceCardProps) => {
  return (
    <article className="border rounded-lg p-4">
      <h2 className="text-lg font-bold">{price.label}</h2>
      <p className="text-xs text-gray-500">
        {price.description.slice(0, 30)}...
      </p>
      <p className="font-bold text-right">{price.price} €</p>
    </article>
  );
};
