"use client";

import { useState } from "react";
import { Check, ChevronDown, Save } from "lucide-react";
import {
  assistantTones,
  primaryGoals,
  type WidgetSettings,
} from "@/types/settings";
import {
  getSettingsErrors,
  widgetSettingsSchema,
  type WidgetSettingsFormErrors,
} from "@/lib/validation";

interface SettingsFormProps {
  settings: WidgetSettings;
  onChange: (settings: WidgetSettings) => void;
  onSave: (settings: WidgetSettings) => void;
}

export function SettingsForm({
  settings,
  onChange,
  onSave,
}: SettingsFormProps) {
  const [errors, setErrors] = useState<WidgetSettingsFormErrors>({});

  const update = <K extends keyof WidgetSettings>(
    field: K,
    value: WidgetSettings[K],
  ) => {
    onChange({ ...settings, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = widgetSettingsSchema.safeParse(settings);
    if (!result.success) {
      setErrors(getSettingsErrors(result));
      return;
    }
    setErrors({});
    onSave(result.data);
  };

  const fieldProps = (field: keyof WidgetSettings) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form className="space-y-7" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="field-label" htmlFor="businessName">
          Business name
        </label>
        <input
          className="field-input"
          id="businessName"
          value={settings.businessName}
          onChange={(event) => update("businessName", event.target.value)}
          placeholder="Your company name"
          {...fieldProps("businessName")}
        />
        <FieldError field="businessName" errors={errors} />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="field-label" htmlFor="welcomeMessage">
            Welcome message
          </label>
          <span className="text-xs text-muted">
            {settings.welcomeMessage.length}/240
          </span>
        </div>
        <textarea
          className="field-input min-h-28 resize-y"
          id="welcomeMessage"
          value={settings.welcomeMessage}
          onChange={(event) => update("welcomeMessage", event.target.value)}
          placeholder="Introduce your assistant to visitors"
          {...fieldProps("welcomeMessage")}
        />
        <FieldError field="welcomeMessage" errors={errors} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="primaryGoal"
          label="Primary goal"
          value={settings.primaryGoal}
          options={primaryGoals}
          onChange={(value) => update("primaryGoal", value)}
          error={errors.primaryGoal}
        />
        <SelectField
          id="assistantTone"
          label="Assistant tone"
          value={settings.assistantTone}
          options={assistantTones}
          onChange={(value) => update("assistantTone", value)}
          error={errors.assistantTone}
        />
      </div>

      <fieldset>
        <legend className="field-label mb-3">Information to collect</legend>
        <div className="space-y-3">
          <Toggle
            id="collectEmail"
            label="Email address"
            checked={settings.collectEmail}
            onChange={(checked) => update("collectEmail", checked)}
          />
          <Toggle
            id="collectPhone"
            label="Phone number"
            checked={settings.collectPhone}
            onChange={(checked) => update("collectPhone", checked)}
          />
        </div>
      </fieldset>

      <div>
        <label className="field-label" htmlFor="accentColor">
          Accent color
        </label>
        <div className="mt-1.5 flex gap-3">
          <input
            className="h-11 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            id="accentColor"
            type="color"
            value={settings.accentColor}
            onChange={(event) => update("accentColor", event.target.value)}
            {...fieldProps("accentColor")}
          />
          <div className="flex-1">
            <label className="sr-only" htmlFor="accentColorValue">
              Accent color hex value
            </label>
            <input
              className="field-input mt-0 font-mono uppercase"
              id="accentColorValue"
              value={settings.accentColor}
              onChange={(event) => update("accentColor", event.target.value)}
              {...fieldProps("accentColor")}
            />
          </div>
        </div>
        <FieldError field="accentColor" errors={errors} />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
        <p className="flex items-center gap-2 text-xs text-muted">
          <Check size={15} className="text-emerald-500" aria-hidden="true" />
          Changes update the preview instantly
        </p>
        <button className="button-primary" type="submit">
          <Save size={16} aria-hidden="true" />
          Save settings
        </button>
      </div>
    </form>
  );
}

function FieldError({
  field,
  errors,
}: {
  field: keyof WidgetSettings;
  errors: WidgetSettingsFormErrors;
}) {
  return errors[field] ? (
    <p className="mt-1.5 text-sm text-red-600" id={`${field}-error`}>
      {errors[field]}
    </p>
  ) : null;
}

function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-1.5">
        <select
          className="field-input appearance-none pr-10"
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
          size={17}
          aria-hidden="true"
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3.5 transition hover:border-slate-300">
      <label className="cursor-pointer text-sm font-medium text-ink" htmlFor={id}>
        {label}
      </label>
      <label className="relative cursor-pointer" htmlFor={id}>
        <input
          className="peer sr-only"
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="block h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2" />
        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
      </label>
    </div>
  );
}
