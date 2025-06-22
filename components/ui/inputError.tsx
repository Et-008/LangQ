export default function InputError({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return <span className="text-red-600 text-xs">{errorMessage}</span>;
}
