import React, { useState, useEffect } from 'react';
import { defaultStudentData } from '../data/studentData';
import { Globe, Linkedin, Github, Instagram, MoreHorizontal, Edit3, Check, X, CreditCard, Camera } from 'lucide-react';

export const StudentCard = ({ onOpenIdCard, onOpenAbout, onZoomAvatar }) => {
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem('stu_profile');
      return saved ? { ...defaultStudentData, ...JSON.parse(saved) } : defaultStudentData;
    } catch {
      return defaultStudentData;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleSave = () => {
    setStudent(formData);
    try {
      localStorage.setItem('stu_profile', JSON.stringify(formData));
    } catch (e) {
      console.error(e);
    }
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 500;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setFormData(prev => ({ ...prev, pic: dataUrl }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="card w-full lg:max-w-[400px] flex-shrink-0 bg-white/90 dark:bg-gradient-to-br dark:from-[#0c234e]/90 dark:to-[#040f25]/90 border border-slate-200/90 dark:border-[rgba(125,190,255,0.22)] rounded-2xl p-5 shadow-xl backdrop-blur-xl transition-all">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-cyan-500/20 mb-3.5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyanAccent flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse"></span>
          Student Details
        </h2>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">B.Tech (DS)</span>
      </div>

      <div className="flex gap-4 items-start">
        <div className="relative group flex-shrink-0">
          <img
            src={formData.pic || defaultStudentData.pic}
            alt="Student Avatar"
            onClick={() => onZoomAvatar?.(formData.pic || defaultStudentData.pic)}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 dark:border-cyan-400/80 shadow-md cursor-zoom-in group-hover:scale-105 transition-transform"
          />
          {isEditing && (
            <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-1.5">
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full text-xs font-semibold px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/40 rounded text-slate-900 dark:text-slate-100"
              />
              <input
                type="text"
                value={formData.roll}
                onChange={e => setFormData({ ...formData, roll: e.target.value })}
                placeholder="Roll Number"
                className="w-full text-xs px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/40 rounded text-slate-900 dark:text-slate-100"
              />
              <div className="grid grid-cols-2 gap-1">
                <input
                  type="text"
                  value={formData.dept}
                  onChange={e => setFormData({ ...formData, dept: e.target.value })}
                  placeholder="Department"
                  className="text-[11px] px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/40 rounded text-slate-900 dark:text-slate-100"
                />
                <input
                  type="text"
                  value={formData.sec}
                  onChange={e => setFormData({ ...formData, sec: e.target.value })}
                  placeholder="Section"
                  className="text-[11px] px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/40 rounded text-slate-900 dark:text-slate-100"
                />
              </div>
              <input
                type="text"
                value={formData.faculty}
                onChange={e => setFormData({ ...formData, faculty: e.target.value })}
                placeholder="Faculty Name"
                className="w-full text-[11px] px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/40 rounded text-slate-900 dark:text-slate-100"
              />
            </div>
          ) : (
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
              <dt className="text-slate-500 dark:text-slate-400 font-medium">Name:</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100 truncate">{student.name}</dd>

              <dt className="text-slate-500 dark:text-slate-400 font-medium">Roll No:</dt>
              <dd className="font-mono text-blue-600 dark:text-cyan-300 font-bold">{student.roll}</dd>

              <dt className="text-slate-500 dark:text-slate-400 font-medium">Dept:</dt>
              <dd className="text-slate-700 dark:text-slate-200">{student.dept}</dd>

              <dt className="text-slate-500 dark:text-slate-400 font-medium">Section:</dt>
              <dd className="text-slate-700 dark:text-slate-200">{student.sec}</dd>

              <dt className="text-slate-500 dark:text-slate-400 font-medium">Subject:</dt>
              <dd className="text-slate-700 dark:text-slate-200 font-medium">{student.subj}</dd>

              <dt className="text-slate-500 dark:text-slate-400 font-medium">Faculty:</dt>
              <dd className="text-slate-700 dark:text-slate-200">
                <span className="font-medium text-slate-900 dark:text-slate-100">{student.faculty}</span>
                <span className="block text-[10px] text-blue-600 dark:text-cyan-400 font-bold tracking-wider mt-0.5">
                  {student.facultyDesignation}
                </span>
              </dd>
            </dl>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50 space-y-1.5 text-xs">
          <input
            type="text"
            value={formData.web}
            onChange={e => setFormData({ ...formData, web: e.target.value })}
            placeholder="Personal Website URL"
            className="w-full px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/30 rounded text-slate-900 dark:text-slate-200 text-xs"
          />
          <input
            type="text"
            value={formData.li}
            onChange={e => setFormData({ ...formData, li: e.target.value })}
            placeholder="LinkedIn Profile URL"
            className="w-full px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/30 rounded text-slate-900 dark:text-slate-200 text-xs"
          />
          <input
            type="text"
            value={formData.gh}
            onChange={e => setFormData({ ...formData, gh: e.target.value })}
            placeholder="GitHub Profile URL"
            className="w-full px-2 py-1 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/30 rounded text-slate-900 dark:text-slate-200 text-xs"
          />
        </div>
      )}

      {/* Social links row */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/40">
        <a
          href={student.web !== '#' ? student.web : undefined}
          target="_blank"
          rel="noopener noreferrer"
          title="Personal Website"
          onClick={e => { if (student.web === '#') { e.preventDefault(); alert('Add your website link using Edit'); } }}
          className="w-8 h-8 rounded-full border border-slate-300 dark:border-cyan-500/30 bg-slate-100 dark:bg-[#030817] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-blue-600 dark:hover:bg-cyan-600 transition-all shadow-sm"
        >
          <Globe className="w-3.5 h-3.5" />
        </a>
        <a
          href={student.li !== '#' ? student.li : undefined}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="w-8 h-8 rounded-full border border-slate-300 dark:border-cyan-500/30 bg-slate-100 dark:bg-[#030817] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#0077b5] transition-all shadow-sm"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <a
          href={student.gh !== '#' ? student.gh : undefined}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="w-8 h-8 rounded-full border border-slate-300 dark:border-cyan-500/30 bg-slate-100 dark:bg-[#030817] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-700 transition-all shadow-sm"
        >
          <Github className="w-3.5 h-3.5" />
        </a>
        <a
          href={student.ig !== '#' ? student.ig : undefined}
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          onClick={e => { if (student.ig === '#') { e.preventDefault(); alert('Add your Instagram link using Edit'); } }}
          className="w-8 h-8 rounded-full border border-slate-300 dark:border-cyan-500/30 bg-slate-100 dark:bg-[#030817] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500 transition-all shadow-sm"
        >
          <Instagram className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={onOpenAbout}
          title="View Resume & More"
          className="w-8 h-8 rounded-full border border-slate-300 dark:border-cyan-500/30 bg-slate-100 dark:bg-[#030817] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyanAccent hover:border-blue-400 dark:hover:border-cyan-400 transition-all text-xs font-bold"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-4 pt-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Save
            </button>
            <button
              onClick={() => { setFormData(student); setIsEditing(false); }}
              className="flex items-center justify-center gap-1 py-1.5 px-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-600 transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-[#071430] dark:hover:bg-[#0c234e] text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-cyanAccent rounded-lg text-xs font-medium border border-slate-300 dark:border-[rgba(125,190,255,0.25)] transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={onOpenIdCard}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-[#071430] dark:hover:bg-[#0c234e] text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-cyanAccent rounded-lg text-xs font-medium border border-slate-300 dark:border-[rgba(125,190,255,0.25)] transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" /> View ID Card
            </button>
          </>
        )}
      </div>
    </div>
  );
};
