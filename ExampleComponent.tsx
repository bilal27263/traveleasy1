import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";

const ExampleComponent = () => {
  return (
    <div>
      <Button variant="primary" size="default">
        Primary Button
      </Button>
      <Button variant="secondary" size="sm">
        Secondary Button
      </Button>
      <div className={buttonVariants({ variant: "link", size: "lg" })}>
        Link styled div
      </div>
    </div>
  );
};

export default ExampleComponent;