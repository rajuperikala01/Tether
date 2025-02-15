interface props {
  label: string;
  type: string;
  id: string;
  onChange: (value: string) => void;
  value: string;
}

export default function Input({ label, type, id, onChange, value }: props) {
  return (
    <div className="w-full flex flex-col gap-1 mt-4">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="w-full h-8 pl-2 outline-none text-sm border border-neutral-600 rounded-sm"
      />
    </div>
  );
}
