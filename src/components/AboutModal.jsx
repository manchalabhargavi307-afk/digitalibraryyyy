import React from 'react';
import { defaultStudentData } from '../data/studentData';
import { X, User, Briefcase, GraduationCap, Code2, FolderGit2 } from 'lucide-react';

export const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  let student = defaultStudentData;
  try {
    const saved = localStorage.getItem('stu_profile');
    if (saved) student = { ...defaultStudentData, ...JSON.parse(saved) };
  } catch {}

  const resume = defaultStudentData.resume;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gradient-to-b dark:from-[#0c234e] dark:to-[#040f25] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 shadow-2xl overflow-y-auto">
        <button
          onClick={onClose}
          className="sticky top-0 float-right text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 p-2 rounded-full transition-all z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{student.name}</h2>
            <p className="text-xs text-blue-600 dark:text-cyan-300 font-mono">{student.roll} • {student.institution}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-slate-50 dark:bg-[#030817]/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-2 flex items-center gap-1.5">
            About Me
          </h3>
          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line">
            {student.about || defaultStudentData.about}
          </p>
        </div>

        {/* Career Objective */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> Career Objective
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-[#030817]/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            {resume.objective}
          </p>
        </div>

        {/* Education */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> Education
          </h3>
          <div className="space-y-2.5">
            {resume.education.map((edu, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-[#030817]/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{edu.degree}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{edu.school}</p>
                </div>
                <span className="text-[11px] font-medium text-blue-700 dark:text-cyan-300 px-2 py-0.5 bg-blue-50 dark:bg-cyan-950/60 rounded-md border border-blue-200 dark:border-cyan-800/40">
                  {edu.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2 mb-3">
            <Code2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resume.technicalSkills.map((cat, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-[#030817]/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-blue-700 dark:text-cyan-300 block mb-1.5">{cat.category}</span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill, sIdx) => (
                    <span key={sIdx} className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded border border-slate-300 dark:border-slate-700/60 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2 mb-3">
            <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> Featured Projects
          </h3>
          <div className="space-y-3">
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-[#030817]/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{proj.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
