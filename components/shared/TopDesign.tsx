export const TopDesign = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[50vh]  z-10">
      <section className="relative h-full w-full">
        <div className="h-[450px] w-[450px] bg-primary rounded-full absolute -top-40 right-40 blur-3xl"></div>
        <div className="h-[450px] w-[450px] bg-primary rounded-full absolute top-20 right-0 blur-3xl"></div>
      </section>
    </div>
  );
};
