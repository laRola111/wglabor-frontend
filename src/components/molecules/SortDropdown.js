// RUTA: src/components/molecules/SortDropdown.js
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortDropdown({ lang, dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentSort = searchParams.get('sort') || 'date_desc';

  const handleSortChange = (e) => {
    const newSortValue = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSortValue);
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const options = [
    { value: 'date_desc', label: dict.jobs.mostRecent },
    { value: 'salary_desc', label: dict.jobs.highestSalary },
    { value: 'title_asc', label: dict.jobs.titleAZ },
  ];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-by" className="text-dark-text-muted text-sm">{dict.jobs.sort}</label>
      <select 
        id="sort-by"
        value={currentSort}
        onChange={handleSortChange}
        className="bg-dark-background border border-dark-border rounded-md px-3 py-1.5 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-accent-primary"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}