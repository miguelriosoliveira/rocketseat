import { useEffect } from 'react';

export function useUtterances(commentsComponentId: string) {
  useEffect(() => {
    const scriptParentNode = document.getElementById(commentsComponentId);
    if (!scriptParentNode) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute(
      'repo',
      'miguelriosoliveira/ignite-reactjs-desafio-05-criando-um-projeto-do-zero'
    );
    script.setAttribute('issue-term', 'title');
    script.setAttribute('label', 'comments :crystal_ball:');
    script.setAttribute('theme', 'dark-blue');

    scriptParentNode.appendChild(script);

    // eslint-disable-next-line consistent-return
    return () => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.removeChild(scriptParentNode.firstChild);
    };
  }, [commentsComponentId]);
}
