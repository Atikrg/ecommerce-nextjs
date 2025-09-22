import { nanoid } from "nanoid";

import { customAlphabet } from "nanoid";

export function generateOrderId(){
  const numbersOnly = customAlphabet("0123456789", 6); // length 10
  return "ORDERID-" + numbersOnly();
};
