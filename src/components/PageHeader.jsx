function PageHeader({ subHeading, heading, image, children }) {
  return (
    <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between relative">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {subHeading}
        </div>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">{heading}</h1>
        {children}
      </div>
      <div className="absolute top-2 right-2">
        <img src={image} alt="" className="w-12 h-auto inline-block" />
      </div>
    </header>
  );
}

export default PageHeader;
