import React, { ReactNode } from "react";

export function FormGroup({
  label,
  description,
  children,
  className,
}: {
  label: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-sm leading-6">
        <label htmlFor={label} className="label">
          {label}
        </label>
        {description ? <p className="text-muted">{description}</p> : null}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function FormGroupToggle({
  label,
  description,
  children,
  className,
}: {
  label: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-x-3 ${className ?? ""}`}>
      <div className="flex h-6 items-center">{children}</div>
      <div className="text-sm leading-6">
        <label htmlFor={label} className="label">
          {label}
        </label>
        {description ? <div className="text-muted">{description}</div> : null}
      </div>
    </div>
  );
}

export function FormLegend({
  title,
  description,
  className,
}: {
  title: string;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ?? ""}>
      <legend className="text-sm font-medium leading-6 text-gray-900">
        {title}
      </legend>
      {description ? (
        <div className="text-sm text-muted">{description}</div>
      ) : null}
    </div>
  );
}

export function FormLayoutTwoColumn(props: {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-8 gap-y-10 xl:grid-cols-4 ${
        props.className ?? ""
      }`}
    >
      <div>
        {props.title ? (
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {props.title}
          </h2>
        ) : null}
        {props.description ? (
          <div className="mt-1 text-sm leading-6 text-muted">
            {props.description}
          </div>
        ) : null}
      </div>

      <div className="xl:col-span-3 2xl:col-span-2 space-y-10">
        {props.children}
      </div>
    </div>
  );
}
