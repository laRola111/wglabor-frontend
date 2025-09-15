// RUTA: src/components/ui/StatusBadge.js (NUEVO ARCHIVO)
'use client';

const StatusBadge = ({ status }) => {
  const baseClasses = "text-xs font-bold uppercase px-2.5 py-1 rounded-full";
  
  const statusStyles = {
    active: "bg-green-500/20 text-green-400",
    inactive: "bg-red-500/20 text-red-400",
    draft: "bg-gray-500/20 text-gray-400",
  };

  const classes = `${baseClasses} ${statusStyles[status] || statusStyles['draft']}`;

  return (
    <span className={classes}>
      {status}
    </span>
  );
};

export default StatusBadge;