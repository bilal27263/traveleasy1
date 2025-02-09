// components/ExampleComponent.tsx
import React from "react";
import { buttonVariants } from "@/components/ui/buttonVariants";

const ExampleComponent = () => {
  return (
    <div>
      <button className={buttonVariants({ variant: "primary", size: "default" })}>
        Primary Button
      </button>
      <button className={buttonVariants({ variant: "secondary", size: "sm" })}>
        Secondary Button
      </button>
    </div>
  );
};

export default ExampleComponent;