export const cx = (...classNames: (string | boolean)[]) =>
  classNames.filter(Boolean).join(" ");

// because we use sanity-next-image
// vercel throws error when using normal imports
export const myLoader = ({ src }: any) => {
  return src;
};

export default function Container(props: {
  large?: boolean;
  alt?: boolean;
  className?: string;
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <div
      className={cx(
        "px-8 mx-auto xl:px-5 w-[1000px]",
        props.large ? " max-w-screen-xl" : " max-w-screen-lg",
        !props.alt && "py-5 lg:py-8",
        props.className || ""
      )}
    >
      {props.children}
    </div>
  );
}
