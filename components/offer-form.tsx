"use client";

import { Suspense, useActionState } from "react";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { submitOffer } from "@/app/site-offert/actions";
import type { OfferFormState } from "@/app/site-offert/actions";
import { ArrowIcon } from "@/components/arrow-icon";
import { OfferSrcField } from "@/components/offer-src-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EXISTING_WEBSITE_OPTIONS,
  OFFER_FIELD_LABELS,
  ORGANIZATION_TYPES,
} from "@/lib/offer-schema";
import type { OfferField } from "@/lib/offer-schema";

const INITIAL_STATE: OfferFormState = { status: "idle" };

const CONSENT_LABEL = "J'accepte que ces informations servent à me recontacter au sujet de cette offre.";

const SELECT_CLASS =
  "h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm";

const LINK_CLASS =
  "rounded-sm text-green underline underline-offset-2 outline-none hover:text-green-light focus-visible:ring-3 focus-visible:ring-ring/50";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="h-11 w-fit px-5 text-base">
      {pending ? "Envoi en cours…" : "Je candidate"}
      <ArrowIcon />
    </Button>
  );
}

function Field({ name, error, children }: { name: OfferField; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{OFFER_FIELD_LABELS[name]}</Label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function OfferForm() {
  const [state, formAction] = useActionState(submitOffer, INITIAL_STATE);

  if (state.status === "success") {
    return (
      <p role="status" className="text-lg text-text">
        Merci, votre candidature a bien été envoyée. Je reviens vers vous sous 24 à 48 heures.
      </p>
    );
  }

  const common = (name: OfferField) => ({
    id: name,
    name,
    "aria-invalid": !!state.errors?.[name],
    "aria-describedby": state.errors?.[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={formAction} noValidate className="ph-no-capture flex flex-col gap-5 text-left">
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />
      <Suspense fallback={<input type="hidden" name="src" value="direct" />}>
        <OfferSrcField />
      </Suspense>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field name="name" error={state.errors?.name}>
          <Input
            {...common("name")}
            type="text"
            autoComplete="name"
            defaultValue={state.values?.name}
            className="h-11"
          />
        </Field>
        <Field name="organization" error={state.errors?.organization}>
          <Input
            {...common("organization")}
            type="text"
            autoComplete="organization"
            defaultValue={state.values?.organization}
            className="h-11"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field name="organizationType" error={state.errors?.organizationType}>
          <select
            {...common("organizationType")}
            defaultValue={state.values?.organizationType ?? ""}
            className={SELECT_CLASS}
          >
            <option value="">Choisir</option>
            {ORGANIZATION_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field name="commune" error={state.errors?.commune}>
          <Input
            {...common("commune")}
            type="text"
            autoComplete="address-level2"
            defaultValue={state.values?.commune}
            className="h-11"
          />
        </Field>
      </div>

      <Field name="activity" error={state.errors?.activity}>
        <Input
          {...common("activity")}
          type="text"
          defaultValue={state.values?.activity}
          className="h-11"
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field name="email" error={state.errors?.email}>
          <Input
            {...common("email")}
            type="email"
            autoComplete="email"
            defaultValue={state.values?.email}
            className="h-11"
          />
        </Field>
        <Field name="phone" error={state.errors?.phone}>
          <Input
            {...common("phone")}
            type="tel"
            autoComplete="tel"
            defaultValue={state.values?.phone}
            className="h-11"
          />
        </Field>
      </div>

      <Field name="existingWebsite" error={state.errors?.existingWebsite}>
        <select
          {...common("existingWebsite")}
          defaultValue={state.values?.existingWebsite ?? ""}
          className={SELECT_CLASS}
        >
          <option value="">Choisir</option>
          {EXISTING_WEBSITE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field name="goal" error={state.errors?.goal}>
        <Input
          {...common("goal")}
          type="text"
          defaultValue={state.values?.goal}
          className="h-11"
        />
      </Field>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            {...common("consent")}
            type="checkbox"
            defaultChecked={state.values?.consent === "on"}
            className="mt-0.5 size-6 shrink-0 accent-green outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          <Label htmlFor="consent" className="items-start text-base leading-snug font-normal">
            {CONSENT_LABEL}
          </Label>
        </div>
        {state.errors?.consent && (
          <p id="consent-error" role="alert" className="text-sm text-destructive">
            {state.errors.consent}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="text-sm text-[#596870]">
        Bichon Christopher (MetaVosgiens by KRYST) utilise les informations de ce formulaire
        uniquement pour répondre à votre candidature. Elles sont conservées 24 mois maximum. Détail
        et droits dans la{" "}
        <a
          href="/politique-confidentialite"
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
