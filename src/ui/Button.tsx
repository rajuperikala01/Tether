interface props {
  type: "submit" | "button" | "reset" | undefined;
  content: string;
}

export default function Button({ type, content }: props) {
  return (
    <button
      type={type}
      className="h-8 w-full mt-6 font-semibold text-sm
       bg-neutral-300 text-black border-sm
       hover:bg-neutral-200 hover:shadow-md hover:shadow-neutral-600"
    >
      {content}
    </button>
  );
}
