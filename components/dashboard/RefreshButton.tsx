"use client";
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '../ui/Button';

export function RefreshButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="secondary"
      loading={pending}
      onClick={() => startTransition(() => router.refresh())}
      className="self-start"
    >
      Atualizar dados
    </Button>
  );
}
