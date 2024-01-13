import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  error?: FieldErrors;
  type?: string;
}

export default function MessageInput({
  placeholder,
  id,
  register,
  required,
  error,
  type,
}: MessageInputProps) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        {...register(id, { required })}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
        
      />
    </div>
  );
}
