import { Pen } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '../ui/button';

const EditButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ children, ...props }, ref) => (
  <Button ref={ref} {...props} variant="outline">
    <Pen className="mr-2 h-4 w-4" />
    {children ?? 'Editar'}
  </Button>
));

EditButton.displayName = 'EditButton';

export default EditButton;
