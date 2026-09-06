type BaseProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export function Field({
  name,
  label,
  required,
  placeholder,
  type = "text",
  className,
}: BaseProps & { type?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="ml-1 text-cherry">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field"
      />
    </div>
  );
}

export function TextArea({ name, label, required, placeholder, rows = 5, className }: BaseProps & { rows?: number }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="ml-1 text-cherry">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
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
}: BaseProps & { options: string[] }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="ml-1 text-cherry">*</span>}
      </label>
      <select id={name} name={name} required={required} className="field">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
