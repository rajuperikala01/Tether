interface contact {
  id: number;
  firstName: string;
  lastName: string;
  onClick: () => void;
}

export default function Contact({ id, firstName, lastName, onClick }: contact) {
  return (
    <div
      className="h-14 w-[97%] md:w-[95%] flex px-3 items-center justify-between mt-1 hover:bg-neutral-800 rounded-sm"
      onClick={onClick}
    >
      <div className="basis-[80%] flex h-full items-center gap-2">
        <div className="h-10 w-10 flex justify-center font-medium text-sm items-center rounded-full bg-gray-600">
          {firstName.slice(0, 1)}
          {lastName.slice(0, 1)}
        </div>
        <div className="text-sm">{firstName + " " + lastName}</div>
      </div>
      <div className="basis-[20%] flex items-center justify-center text-xs text-neutral-400">
        1.50 AM
      </div>
    </div>
  );
}
