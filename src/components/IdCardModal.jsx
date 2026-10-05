import React from 'react';
import { MBU_LOGO } from '../data/assets';
import { defaultStudentData } from '../data/studentData';
import { X, Award, ShieldCheck } from 'lucide-react';

export const IdCardModal = ({ isOpen, onClose, onZoomAvatar }) => {
  if (!isOpen) return null;

  let student = defaultStudentData;
  try {
    const saved = localStorage.getItem('stu_profile');
    if (saved) student = { ...defaultStudentData, ...JSON.parse(saved) };
  } catch {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-gradient-to-b dark:from-[#0c234e] dark:to-[#040f25] border-2 border-blue-500/40 dark:border-cyan-400/40 rounded-3xl p-6 shadow-2xl text-center overflow-hidden">
        {/* Top glow decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-blue-500 dark:via-cyan-400 to-transparent"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700 p-1.5 rounded-full transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* University Crest */}
        <div className="flex justify-center mb-3">
          <div className="bg-slate-50 dark:bg-white/95 px-4 py-1.5 rounded-xl shadow-sm border border-slate-200 dark:border-cyan-200">
            <img src={MBU_LOGO} alt="Mohan Babu University" className="h-10 object-contain" />
          </div>
        </div>

        <p className="text-[11px] font-bold tracking-widest text-blue-600 dark:text-cyan-300 uppercase">
          Department of Data Science
        </p>

        {/* Student Avatar */}
        <div className="my-4 flex justify-center">
          <div className="relative">
            <img
              src={student.pic || defaultStudentData.pic}
              alt={student.name}
              onClick={() => onZoomAvatar?.(student.pic || defaultStudentData.pic)}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 dark:border-cyan-400 shadow-xl cursor-zoom-in hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 border-2 border-white dark:border-[#040f25]">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">{student.name}</h3>
        <p className="font-mono text-blue-600 dark:text-cyan-300 font-semibold text-sm mt-0.5">{student.roll}</p>

        {/* Details list */}
        <div className="bg-slate-50 dark:bg-[#030817]/70 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3.5 my-4 text-left text-xs">
          <dl className="grid grid-cols-[85px_1fr] gap-y-1.5">
            <dt className="text-slate-500 dark:text-slate-400">Department:</dt>
            <dd className="text-slate-800 dark:text-slate-100 font-medium">{student.dept}</dd>

            <dt className="text-slate-500 dark:text-slate-400">Section:</dt>
            <dd className="text-slate-800 dark:text-slate-100 font-medium">{student.sec}</dd>

            <dt className="text-slate-500 dark:text-slate-400">Subject:</dt>
            <dd className="text-slate-800 dark:text-slate-100 font-medium">{student.subj}</dd>

            <dt className="text-slate-500 dark:text-slate-400">Faculty:</dt>
            <dd className="text-slate-800 dark:text-slate-100 font-medium">
              {student.faculty}
              <span className="block text-[10px] text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-wider mt-0.5">
                {student.facultyDesignation}
              </span>
            </dd>
          </dl>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700/50">
          <span className="flex items-center gap-1 font-medium">
            <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            {student.academicYear}
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{student.institution}</span>
        </div>
      </div>
    </div>
  );
};
