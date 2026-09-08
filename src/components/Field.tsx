/**
 * Uncontrolled form primitives. Deliberately server components: they are
 * rendered by the page and passed into HeraldForm as children, so they cost no
 * client JavaScript at all.
 *
 * The field id is the field name, which is unique per form. Two forms on one
 * page would collide; give the second one prefixed names if that ever happens.
 */
type BaseProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  /**
   * Browser autofill hint. Every field on this site went without one, so a
   * reader subscribing by post had to type their own name and address by hand.
   * See the HTML autocomplete token list for values.
   */
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal" | "url" | "search";
};

/**
 * The asterisk is decoration: `required` already tells assistive technology
 * the field is mandatory, so reading a bare "star" on top of that is noise.
 */
function RequiredMark({ required }: { required?: boolean }) {
  if (!required) return null;
  return (
    <span className="ml-1 text-cherry" aria-hidden="true">
      *
    </span>
  );
}

export function Field({
  name,
  label,
  required,
  placeholder,
  type = "text",
  className,
  autoComplete,
  inputMode,
}: BaseProps & { type?: string }) {
  const id = name;
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        <RequiredMark required={required} />
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="field"
      />
    </div>
  );
}

export function TextArea({
  name,
  label,
  required,
  placeholder,
  rows = 5,
  className,
  maxLength,
}: BaseProps & { rows?: number; maxLength?: number }) {
  const id = name;
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        <RequiredMark required={required} />
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        className="field resize-y"
      />
    </div>
  );
}

export function Select({
  name,
  label,
  required,
  options,
  className,
  placeholder = "Choose one",
}: BaseProps & { options: string[] }) {
  const id = name;
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        <RequiredMark required={required} />
      </label>
      {/*
        Without an empty first option a select arrives pre-filled with
        options[0] and `required` means nothing, so every unconsidered /contact
        submission came through tagged as the first subject in the list.
      */}
      <select id={id} name={name} required={required} defaultValue="" className="field">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
