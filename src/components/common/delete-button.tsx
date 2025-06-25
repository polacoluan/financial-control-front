import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { forwardRef } from 'react';

const DeleteButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ children, ...props }, ref) => (
  <Button ref={ref} {...props} variant="destructive">
    <X className="mr-2 h-4 w-4" />
    {children ?? 'Deletar'}
  </Button>
));

DeleteButton.displayName = 'DeleteButton';

export default DeleteButton;
