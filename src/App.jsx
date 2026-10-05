import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ModulesPage } from './pages/ModulesPage';
import { ExperimentsListPage } from './pages/ExperimentsListPage';
import { IdCardModal } from './components/IdCardModal';
import { AboutModal } from './components/AboutModal';
import { getExperimentById } from './data/experimentsData';

export const App = () => {
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash || '#/';
  });

  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);

      if (hash === '#/id') {
        setIsIdCardOpen(true);
      } else if (hash === '#/about') {
        setIsAboutOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (modId, expId) => {
    const newHash = `#/exp/${modId}/${expId}`;
    window.location.hash = newHash;
    setCurrentRoute(newHash);
  };

  const goTo = (hash) => {
    window.location.hash = hash;
    setCurrentRoute(hash);
  };

  // Parse Hash Route
  const cleanHash = currentRoute.replace(/^#\/?/, '');
  const parts = cleanHash.split('/');
  const route = parts[0] || '';

  // 1. Workspace Route: #/exp/...
  if (route === 'exp') {
    let targetExp;

    if (parts.length >= 3) {
      const p1 = parts[1];
      const p2 = parts[2];

      // Check if URL is like #/exp/4/0 or #/exp/5/1 or #/exp/4/all
      if (/^\d+$/.test(p1)) {
        targetExp = getExperimentById(p1, p2);
      } else {
        targetExp = getExperimentById(p2);
      }
    } else if (parts.length === 2) {
      targetExp = getExperimentById(parts[1]);
    } else {
      targetExp = getExperimentById('4a');
    }

    return (
      <WorkspacePage
        key={targetExp.id}
        expId={targetExp.id}
        moduleId={targetExp.moduleId}
        onNavigate={navigateTo}
      />
    );
  }

  // 2. Tools Route: #/tools
  if (route === 'tools') {
    const toolsExp = getExperimentById('tools');
    return (
      <WorkspacePage
        key="tools"
        expId={toolsExp.id}
        moduleId={toolsExp.moduleId}
        onNavigate={navigateTo}
      />
    );
  }

  // 3. Modules Route: #/modules or #/module/:id
  if (route === 'modules') {
    return (
      <ModulesPage
        moduleId={1}
        onOpenIdCard={() => setIsIdCardOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
    );
  }

  if (route === 'module') {
    const modId = parseInt(parts[1], 10) || 1;
    return (
      <ModulesPage
        moduleId={modId}
        onOpenIdCard={() => setIsIdCardOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
    );
  }

  // 4. Experiments Catalog: #/exps
  if (route === 'exps') {
    return (
      <ExperimentsListPage
        onNavigate={navigateTo}
      />
    );
  }

  // 5. Default: Home Page
  return (
    <>
      <HomePage
        onNavigate={navigateTo}
        onOpenTools={() => goTo('#/tools')}
      />
      <IdCardModal
        isOpen={isIdCardOpen}
        onClose={() => {
          setIsIdCardOpen(false);
          if (window.location.hash === '#/id') goTo('#/');
        }}
      />
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => {
          setIsAboutOpen(false);
          if (window.location.hash === '#/about') goTo('#/');
        }}
      />
    </>
  );
};
