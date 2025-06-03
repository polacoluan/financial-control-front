import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const CreateButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ children, ...props }, ref) => (
  <Button ref={ref} {...props} variant="default">
    <Plus className="mr-2 h-4 w-4" />
    {children ?? "Criar"}
  </Button>
));

CreateButton.displayName = "CreateButton";

export default CreateButton;
