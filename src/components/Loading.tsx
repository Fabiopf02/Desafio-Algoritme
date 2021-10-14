import React from 'react';

import LoadingGit from 'assets/loading.gif';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <img src={LoadingGit} width={100} alt="loading..." />
      <h3>Carregando...</h3>
    </div>
  );
};

export default Loading;
