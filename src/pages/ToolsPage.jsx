import React from 'react';
import { WorkspacePage } from './WorkspacePage';

export const ToolsPage = ({ onNavigate }) => {
  // Uses custom playground experiment or 5a/default
  return (
    <WorkspacePage
      expId="5a"
      moduleId={3}
      onNavigate={onNavigate}
    />
  );
};
