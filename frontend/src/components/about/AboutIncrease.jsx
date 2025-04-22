import React, { useEffect, useRef, useState } from 'react';

const statsData = [
  {
    id: 1,
    title: 'Monthly visits',
    count: 100,
    suffix: 'k',
  },
  {
    id: 2,
    title: 'Customers',
    count: 12,
    suffix: '+',
  },
  {
    id: 3,
    title: 'Industry Awards',
    count: 20,
    suffix: '+',
  },
];

const StatCard = ({ title, count, suffix }) => {
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const [currentCount, setCurrentCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1000;
          const increment = count / (duration / 20);

          intervalRef.current = setInterval(() => {
            start += increment;
            setCurrentCount(prev => {
              const nextVal = Math.ceil(start);
              if (nextVal >= count) {
                clearInterval(intervalRef.current);
                return count;
              }
              return nextVal;
            });
          }, 20);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [count, hasAnimated]);

  return (
    <div
      ref={ref}
      className="p-8 flex flex-col items-center text-center bg-[#F4F9FE] rounded-lg shadow-sm"
    >
      <div className="text-4xl sm:text-6xl font-bold txt-gl">
        {currentCount}
        {suffix}
      </div>
      <div className="text-base  txt-gd font-medium mt-2">
        {title}
      </div>
    </div>
  );
};

const AboutIncrease = () => {
  return (
    <div className="bg-[#F4F9FE] mx-auto py-10 px-4 sm:px-6 lg:px-8 md:rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            count={stat.count}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutIncrease;
