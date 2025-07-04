'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import axonLogo from '@/assets/axon-logo.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { z } from 'zod';
import { sendMagicLinkMutationRequestSchema } from '@/kubb/zod/sendMagicLinkSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSendMagicLink } from '@/kubb/src/kubb/hooks/authHooks/useSendMagicLink';
import { toast } from 'sonner';

type formData = z.infer<typeof sendMagicLinkMutationRequestSchema>;

export default function LoginPage() {
  const { mutateAsync, isPending, isError, isSuccess } = useSendMagicLink();

  const form = useForm<formData>({
    resolver: zodResolver(sendMagicLinkMutationRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  async function handleOnSubmitingEmail({ email }: formData) {
    await mutateAsync(
      { data: { email } },
      {
        onSuccess: () => {
          toast.success('✅ Link enviado com sucesso!');
          console.log('✅ Link enviado com sucesso!');
        },
        onError: error => {
          toast.error('❌ Erro ao enviar link!');
          console.error('❌ Erro ao enviar link:', error);
        },
      }
    );
  }

  return (
    <Card className="w-96 h-96 bg-foreground border-primary">
      <CardHeader className="w-full flex items-center justify-center">
        <Image src={axonLogo} alt="logo da axon" className="w-24 h-24" />
        <CardTitle className="text-3xl text-zinc-100">Axon</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmitingEmail)}
            className="flex gap-3 flex-col w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-zinc-50">
                  <FormLabel className="text-xl font-semibold italic">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <input
                        {...field}
                        type="email"
                        autoComplete="off"
                        placeholder="Digite seu email"
                        className="peer w-full bg-transparent py-2 px-0 !text-white placeholder:text-zinc-400 border-none rounded-none shadow-none focus:outline-none"
                      />
                      <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 bg-[var(--primary)] transition-transform duration-300 peer-focus:scale-x-100 origin-left" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Enviar</Button>
          </form>
        </Form>

        <Link
          href="/register"
          className="relative inline-block text-secondary group"
        >
          <span className="relative z-10 text-sm font-semibold">
            Registrar uma nova conta!
          </span>
          <span className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--secondary)] transition-transform duration-700 group-hover:scale-x-100" />
        </Link>
      </CardContent>
    </Card>
  );
}
