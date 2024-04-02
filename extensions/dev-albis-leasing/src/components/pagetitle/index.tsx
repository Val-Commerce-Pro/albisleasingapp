interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
};
