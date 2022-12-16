import { useUtterances } from '../../hooks/utterances';

const COMMENTS_SECTION_ID = 'comments';

export function Comments() {
  useUtterances(COMMENTS_SECTION_ID);

  return <div id={COMMENTS_SECTION_ID} />;
}
