import Convertible from "./Convertible.svelte";
import Coupe from "./Coupe.svelte";
import Electric from "./Electric.svelte";
import Hatchback from "./Hatchback.svelte";
import Hybrid from "./Hybrid.svelte";
import Sedan from "./Sedan.svelte";
import Suv from "./suv.svelte";
import Truck from "./Truck.svelte";
import Van from "./Van.svelte";

// src/lib/carTypes.js (or wherever you prefer)
export const carTypesWithSvgIcons = [
    {
      type: "SUV",
      icon: Suv,
    },
    {
      type: "Sedan",
      icon: Sedan,
    },
    {
      type: "Hatchback",
      icon: Hatchback,
    },
    {
      type: "Coupe",
      icon: Coupe,
    },
    {
      type: "Hybrid",
      icon: Hybrid,
    },
    {
      type: "Convertible",
      icon: Convertible,
    },
    {
      type: "Van",
      icon:Van,
    },
    {
      type: "Truck",
      icon: Truck,
    },
    {
      type: "Electric",
      icon: Electric,
    },
];