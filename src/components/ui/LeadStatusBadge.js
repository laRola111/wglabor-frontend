// RUTA: src/components/ui/LeadStatusBadge.js (NUEVO ARCHIVO)
'use client';

const LeadStatusBadge = ({ status }) => {
  const baseClasses = "text-xs font-bold uppercase px-2.5 py-1 rounded-full inline-block";
  
  const statusStyles = {
    new: "bg-blue-500/20 text-blue-400",
    contacted: "bg-yellow-500/20 text-yellow-400",
    converted: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  const classes = `${baseClasses} ${statusStyles[status] || 'bg-gray-500/20 text-gray-400'}`;

  return (
    <span className={classes}>
      {status}
    </span>
  );
};

export default LeadStatusBadge;