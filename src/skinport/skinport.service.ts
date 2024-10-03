import axios from "axios";
import { skinportApiUrl } from "../constants/constants";
import { SkinportItem } from "./interfaces/skinport-item.interface";
import { FormatedItem } from "./interfaces/formated-item.interface";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 });

const getSkinportItems = async (
  tradable: boolean | number = 0,
): Promise<SkinportItem[]> => {
  if (!skinportApiUrl) throw Error("There's no link for skinport API");
  try {
    const response = await axios.get(skinportApiUrl, {
      params: {
        tradable: tradable,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching items from Skinport:", err);
    throw err;
  }
};

const formatItems = async (): Promise<(FormatedItem | undefined)[]> => {
  const [tradableItems, nonTradableItems] = await Promise.all([
    getSkinportItems(true),
    getSkinportItems(0),
  ]);
  const now = Date.now();
  const tradableMap = new Map<
    string,
    Omit<FormatedItem, "non_tradable_min_price">
  >();
  tradableItems.forEach((item) => {
    tradableMap.set(item.market_hash_name, {
      tradable_min_price: item.min_price,
      currency: item.currency,
      market_hash_name: item.market_hash_name,
    });
  });

  const formatedItem = nonTradableItems
    .map((item): FormatedItem | undefined => {
      const formatedTradableItem = tradableMap.get(item.market_hash_name);
      if (formatedTradableItem)
        return {
          ...formatedTradableItem,
          non_tradable_min_price: item.min_price,
        };
    })
    .filter(Boolean);
  console.log(`Время форматирования: ${Date.now() - now}`);

  return formatedItem;
};

export const getFormatedSkinportItems = async (): Promise<
  (FormatedItem | undefined)[]
> => {
  const cachedData = cache.get<FormatedItem[]>("items");

  if (cachedData) return cachedData;

  const formatedData = await formatItems();
  cache.set("items", formatedData);

  return formatedData;
};
