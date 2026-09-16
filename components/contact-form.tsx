"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowIcon } from "@/components/arrow-icon";

const INITIAL_STATE: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-fit">
      {pending ? "Envoi en cours…" : "Envoyer"}
      <ArrowIcon />
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, INITIAL_STATE);

  if (state.status === "success") {
    return (
      <p role="status" className="text-lg text-text">
        Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.
      </p>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5 text-left">
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={state.values?.name}
            aria-invalid={!!state.errors?.name}
          />
          {state.errors?.name && (
            <p role="alert" className="text-sm text-destructive">
              {state.errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            name="company"
            type="text"
            defaultValue={state.values?.company}
            aria-invalid={!!state.errors?.company}
          />
          {state.errors?.company && (
            <p role="alert" className="text-sm text-destructive">
              {state.errors.company}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state.values?.email}
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email && (
            <p role="alert" className="text-sm text-destructive">
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={state.values?.phone}
            aria-invalid={!!state.errors?.phone}
          />
          {state.errors?.phone && (
            <p role="alert" className="text-sm text-destructive">
              {state.errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="website">Site web (facultatif)</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={state.values?.website}
          aria-invalid={!!state.errors?.website}
        />
        {state.errors?.website && (
          <p role="alert" className="text-sm text-destructive">
            {state.errors.website}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Votre message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={state.values?.message}
          aria-invalid={!!state.errors?.message}
        />
        {state.errors?.message && (
          <p role="alert" className="text-sm text-destructive">
            {state.errors.message}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
