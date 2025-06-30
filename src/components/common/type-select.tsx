import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTypes } from '@/context/TypesContext';

export function TypeSelect({
  typeId,
  setTypeId,
}: {
  typeId: string;
  setTypeId: (value: string) => void;
}) {
  const { types } = useTypes();
  return (
    <Select onValueChange={(value) => setTypeId(value)} value={typeId}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione um tipo" />
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type.id} value={type.id}>
            {type.type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
