import ClosedEye from "./ClosedEye";
import OpenEye from "./OpenEye";

interface props {
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  click: () => void;
}

export default function ({ value, onChange, showPassword, click }: props) {
  return (
    <div className="mt-4 w-full">
      <label htmlFor="password">Password*</label>
      <div className="flex h-8 mt-1 border border-neutral-600 rounded-sm">
        <input
          type={`${showPassword ? "text" : "password"}`}
          name="password"
          id="password"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className="w-[87%] h-full outline-none pl-2 text-sm"
          required
        />
        {showPassword ? (
          <div
            onClick={click}
            className="w-[13%] h-full flex justify-center items-center cursor-pointer"
          >
            <ClosedEye />
          </div>
        ) : (
          <div
            onClick={click}
            className="flex h-full w-[13%] justify-center items-center"
          >
            <OpenEye />
          </div>
        )}
      </div>
    </div>
  );
}
